const services = {
  "women-cut": { title: "Женская стрижка", price: "от 2 400 ₽", duration: "60–90 минут", image: "images/women-cut.webp", description: "Форма, которая работает каждый день: консультация, мытьё, стрижка и лёгкая укладка.", details: "Мастер учитывает густоту, структуру волос и привычный способ укладки. В конце объясняет, как поддерживать форму дома." },
  "men-cut": { title: "Мужская стрижка", price: "от 1 800 ₽", duration: "45–60 минут", image: "images/men-cut.webp", description: "Точная форма и комфортная длина: от классики до современной текстуры.", details: "На консультации подбирается форма с учётом роста волос и привычного ухода. В услугу включены мытьё и финишная укладка." },
  "color": { title: "Окрашивание", price: "от 5 200 ₽", duration: "от 2 часов", image: "images/color.webp", description: "Цвет с учётом исходной базы, состояния волос и желаемого результата.", details: "Перед процедурой мастер обсуждает оттенок и план ухода. Итоговая стоимость зависит от длины волос, техники и расхода материалов." },
  "style": { title: "Укладка", price: "от 1 700 ₽", duration: "45–75 минут", image: "images/bob.webp", description: "Повседневная или вечерняя укладка с естественным движением волос.", details: "Подбираем объём, текстуру и степень фиксации под событие и тип волос." },
  "beard": { title: "Оформление бороды", price: "от 1 200 ₽", duration: "30–45 минут", image: "images/men-cut.webp", description: "Аккуратный контур и форма бороды с учётом черт лица.", details: "Мастер подбирает длину, выстраивает контур и даёт рекомендации по домашнему уходу." },
  "care": { title: "Уход для волос", price: "от 2 000 ₽", duration: "45–60 минут", image: "images/salon.webp", description: "Уход после консультации о состоянии волос и кожи головы.", details: "Состав и этапы процедуры подбираются индивидуально. Результат зависит от исходного состояния волос." }
};

const query = new URLSearchParams(location.search);
const selectedService = query.get("service");

document.querySelectorAll("[data-product-title]").forEach((node) => {
  const item = services[selectedService] || services["women-cut"];
  const fields = {
    "[data-product-title]": item.title,
    "[data-product-description]": item.description,
    "[data-product-details]": item.details,
    "[data-product-price]": item.price,
    "[data-product-duration]": item.duration
  };
  Object.entries(fields).forEach(([selector, value]) => {
    document.querySelectorAll(selector).forEach((target) => { target.textContent = value; });
  });
  const image = document.querySelector("[data-product-image]");
  if (image) { image.src = item.image; image.alt = item.title + " — демонстрационное изображение"; }
  const book = document.querySelector("[data-product-book]");
  if (book) book.href = "order.html?service=" + encodeURIComponent(selectedService && services[selectedService] ? selectedService : "women-cut");
  const modalTrigger = document.querySelector("[data-bs-target='#bookingModal'][data-service]");
  if (modalTrigger) modalTrigger.dataset.service = selectedService && services[selectedService] ? selectedService : "women-cut";
  document.title = item.title + " — Новый образ";
});

const bookingModal = document.querySelector("#bookingModal");
if (bookingModal) {
  bookingModal.addEventListener("show.bs.modal", (event) => {
    const key = event.relatedTarget?.dataset.service || "women-cut";
    const item = services[key] || services["women-cut"];
    bookingModal.querySelector("[data-modal-service]").textContent = item.title;
    bookingModal.querySelector("[data-modal-price]").textContent = item.price;
    bookingModal.querySelector("[data-modal-link]").href = "order.html?service=" + encodeURIComponent(key);
  });
}

const orderForm = document.querySelector("#booking-form");
if (orderForm) {
  const dateInput = orderForm.querySelector("#visit-date");
  const timeInput = orderForm.querySelector("#visit-time");
  const serviceInput = orderForm.querySelector("#service");
  const formAlert = document.querySelector("#booking-alert");
  const bookingsList = document.querySelector("#my-bookings");
  const storageKey = "novyi-obraz-demo-bookings";
  const slots = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
  const day = (offset) => {
    const value = new Date();
    value.setHours(12, 0, 0, 0);
    value.setDate(value.getDate() + offset);
    return [value.getFullYear(), String(value.getMonth() + 1).padStart(2, "0"), String(value.getDate()).padStart(2, "0")].join("-");
  };
  dateInput.min = day(1);
  dateInput.max = day(60);
  if (selectedService && services[selectedService]) serviceInput.value = selectedService;

  const readBookings = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
    catch { return []; }
  };
  const writeBookings = (items) => {
    try { localStorage.setItem(storageKey, JSON.stringify(items)); return true; }
    catch { return false; }
  };
  const showAlert = (message, type) => {
    formAlert.className = "alert alert-" + type;
    formAlert.textContent = message;
    formAlert.hidden = false;
    formAlert.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };
  const updateSlots = () => {
    const current = timeInput.value;
    const occupied = new Set(readBookings().filter((item) => item.date === dateInput.value).map((item) => item.time));
    timeInput.replaceChildren(new Option("Выберите время", ""));
    slots.forEach((time) => {
      const option = new Option(time + (occupied.has(time) ? " — занято" : ""), time);
      option.disabled = occupied.has(time);
      timeInput.add(option);
    });
    if (!occupied.has(current)) timeInput.value = current;
  };
  const renderBookings = () => {
    const items = readBookings().filter((item) => item.date >= day(0)).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    bookingsList.replaceChildren();
    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "text-muted-salon";
      empty.textContent = "Пока нет сохранённых демонстрационных записей.";
      bookingsList.append(empty);
      return;
    }
    const list = document.createElement("ul");
    list.className = "booking-list";
    items.forEach((item) => {
      const li = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = item.date + " в " + item.time + " — " + (services[item.service]?.title || item.service) + " (" + item.name + "). ";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn btn-sm btn-outline-dark";
      remove.textContent = "Удалить";
      remove.setAttribute("aria-label", "Удалить запись на " + item.date + " в " + item.time);
      remove.addEventListener("click", () => {
        if (writeBookings(readBookings().filter((saved) => saved.id !== item.id))) {
          renderBookings();
          updateSlots();
        }
      });
      li.append(label, remove);
      list.append(li);
    });
    bookingsList.append(list);
  };
  dateInput.addEventListener("change", updateSlots);
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    orderForm.classList.add("was-validated");
    if (!orderForm.checkValidity()) return;
    const items = readBookings();
    if (items.some((item) => item.date === dateInput.value && item.time === timeInput.value)) {
      showAlert("Это время уже занято в демонстрационном расписании. Выберите другое.", "warning");
      updateSlots();
      return;
    }
    const booking = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2),
      name: orderForm.querySelector("#client-name").value.trim(),
      service: serviceInput.value,
      date: dateInput.value,
      time: timeInput.value
    };
    if (!writeBookings([...items, booking])) {
      showAlert("Браузер не разрешил сохранить запись. Проверьте настройки локального хранилища.", "danger");
      return;
    }
    showAlert("Демонстрационная запись сохранена в этом браузере: " + booking.date + " в " + booking.time + ". В салон данные не отправлены.", "success");
    orderForm.reset();
    orderForm.classList.remove("was-validated");
    dateInput.min = day(1);
    if (selectedService && services[selectedService]) serviceInput.value = selectedService;
    updateSlots();
    renderBookings();
  });
  updateSlots();
  renderBookings();
}

document.querySelectorAll(".site-navbar .nav-link").forEach((link) => {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
  link.addEventListener("click", () => {
    const menu = document.querySelector("#siteMenu");
    if (menu?.classList.contains("show") && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const moving = [...document.querySelectorAll("main section h2, main section .section-lead, main section .service-card, main section .benefit, main section .gallery-photo, main section .map-frame, main section .price-list, main section .story-copy")];
  moving.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = (index % 3) * 75 + "ms";
  });
  document.documentElement.classList.add("js-motion");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.visible = "";
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -30px 0px", threshold: .05 });
  moving.forEach((element) => observer.observe(element));
  const title = document.querySelector(".hero-title");
  if (title) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        title.style.scale = String(Math.max(.95, 1 - window.scrollY / 9000));
        ticking = false;
      });
    }, { passive: true });
  }
}

const scrollTopButton = document.createElement("button");
scrollTopButton.type = "button";
scrollTopButton.className = "scroll-top";
scrollTopButton.setAttribute("aria-label", "Вернуться наверх страницы");
scrollTopButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 11 6-6 6 6M6 19l6-6 6 6" /></svg>';
document.body.append(scrollTopButton);
const toggleScrollTopButton = () => scrollTopButton.classList.toggle("is-visible", window.scrollY > 360);
window.addEventListener("scroll", toggleScrollTopButton, { passive: true });
toggleScrollTopButton();
scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});
