const primaryMenu = document.querySelector("#siteMenu .navbar-nav");
if (primaryMenu) {
  const menuOrder = ["index.html", "masters.html", "catalog.html", "shop.html", "contacts.html"];
  const menuItems = [...primaryMenu.children];
  menuItems.sort((firstItem, secondItem) => {
    const firstPage = new URL(firstItem.querySelector("a").href).pathname.split("/").pop();
    const secondPage = new URL(secondItem.querySelector("a").href).pathname.split("/").pop();
    const firstHref = firstItem.querySelector("a").hash ? "contacts.html#location-title" : firstPage;
    const secondHref = secondItem.querySelector("a").hash ? "contacts.html#location-title" : secondPage;
    const fullOrder = [...menuOrder, "contacts.html#location-title"];
    return fullOrder.indexOf(firstHref) - fullOrder.indexOf(secondHref);
  });
  menuItems.forEach((item) => primaryMenu.append(item));
}

const services = {
  "women-cut": { title: "Женская стрижка", price: "от 2 400 ₽", duration: "60–90 минут", image: "images/women-cut.webp", description: "Форма, которая работает каждый день: консультация, мытьё, стрижка и лёгкая укладка.", details: "Мастер учитывает густоту, структуру волос и привычный способ укладки. В конце объясняет, как поддерживать форму дома." },
  "men-cut": { title: "Мужская стрижка", price: "от 1 800 ₽", duration: "45–60 минут", image: "images/men-cut.webp", description: "Точная форма и комфортная длина: от классики до современной текстуры.", details: "На консультации подбирается форма с учётом роста волос и привычного ухода. В услугу включены мытьё и финишная укладка." },
  "color": { title: "Окрашивание", price: "от 5 200 ₽", duration: "от 2 часов", image: "images/color.webp", description: "Цвет с учётом исходной базы, состояния волос и желаемого результата.", details: "Перед процедурой мастер обсуждает оттенок и план ухода. Итоговая стоимость зависит от длины волос, техники и расхода материалов." },
  "style": { title: "Укладка", price: "от 1 700 ₽", duration: "45–75 минут", image: "images/bob.webp", description: "Повседневная или вечерняя укладка с естественным движением волос.", details: "Подбираем объём, текстуру и степень фиксации под событие и тип волос." },
  "beard": { title: "Оформление бороды", price: "от 1 200 ₽", duration: "30–45 минут", image: "images/beard.webp", description: "Аккуратный контур и форма бороды с учётом черт лица.", details: "Мастер подбирает длину, выстраивает контур и даёт рекомендации по домашнему уходу." },
  "care": { title: "Уход для волос", price: "от 2 000 ₽", duration: "45–60 минут", image: "images/hair-care.png", description: "Уход после консультации о состоянии волос и кожи головы.", details: "Состав и этапы процедуры подбираются индивидуально. Результат зависит от исходного состояния волос." },
  "fringe": { title: "Стрижка чёлки", price: "от 900 ₽", duration: "20–30 минут", image: "images/fringe.png", description: "Обновим длину и форму чёлки без полной стрижки.", details: "Мастер учитывает форму лица и то, как чёлка лежит без укладки. После стрижки покажет, как быстро уложить её дома." },
  "toning": { title: "Тонирование", price: "от 3 500 ₽", duration: "60–90 минут", image: "images/toning.png", description: "Мягкое обновление оттенка и блеска волос.", details: "Мастер подбирает оттенок после оценки исходного цвета и состояния волос. Тонирование помогает освежить цвет без резкой смены образа." },
  "clipper": { title: "Стрижка машинкой", price: "от 1 400 ₽", duration: "30–45 минут", image: "images/clipper-cut.png", description: "Ровная длина и аккуратный переход.", details: "Обсудим желаемую длину и форму перехода. Мастер обработает контур и завершит стрижку лёгкой укладкой." },
  "men-style": { title: "Мужская укладка", price: "от 1 300 ₽", duration: "30–45 минут", image: "images/men-styling.png", description: "Форма и текстура на каждый день или к событию.", details: "Мастер подберёт средство и способ укладки под длину и структуру волос, покажет, как повторить результат дома." },
  "repair": { title: "Восстановление волос", price: "от 3 200 ₽", duration: "60–90 минут", image: "images/hair-repair.png", description: "Питательный уход для сухих и повреждённых волос.", details: "После консультации мастер подберёт состав и этапы ухода с учётом состояния волос. Процедура направлена на мягкость и гладкость." },
  "scalp": { title: "Массаж головы", price: "от 1 600 ₽", duration: "30–45 минут", image: "images/scalp-massage.png", description: "Мягкий массаж кожи головы во время ухода.", details: "Процедура включает очищение и спокойный массаж у мойки. Подходит, когда хочется выделить время на отдых и уход." }
};

const showSiteToast = (message, title = "Новый образ") => {
  let region = document.querySelector("#site-toast-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "site-toast-region";
    region.className = "toast-container position-fixed bottom-0 start-50 translate-middle-x p-3";
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    document.body.append(region);
  }
  const toast = document.createElement("div");
  toast.className = "toast site-toast";
  toast.setAttribute("role", "status");
  toast.innerHTML = '<div class="toast-header"><strong class="me-auto"></strong><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button></div><div class="toast-body"></div>';
  toast.querySelector("strong").textContent = title;
  toast.querySelector(".toast-body").textContent = message;
  region.append(toast);
  toast.addEventListener("hidden.bs.toast", () => toast.remove(), { once: true });
  bootstrap.Toast.getOrCreateInstance(toast, { delay: 4500 }).show();
};

const formatDate = (isoDate) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate || "");
  return match ? match[3] + "." + match[2] + "." + match[1] : isoDate;
};

const catalogFilters = document.querySelectorAll("#serviceFilters [data-category]");
if (catalogFilters.length) {
  const groups = document.querySelectorAll(".catalog-group");
  catalogFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const activeCategory = button.getAttribute("aria-pressed") === "true" ? null : button.dataset.category;
      catalogFilters.forEach((filter) => filter.setAttribute("aria-pressed", String(filter.dataset.category === activeCategory)));
      groups.forEach((group) => { group.hidden = activeCategory !== null && group.id !== activeCategory; });
    });
  });
}

const query = new URLSearchParams(location.search);
const selectedService = query.get("service");

if (document.querySelector("[data-product-title]")) {
  if (!selectedService || !Object.hasOwn(services, selectedService)) {
    location.replace("catalog.html");
  } else {
    const item = services[selectedService];
    const fields = {
      "[data-product-title]": item.title,
      "[data-product-description]": item.description,
      "[data-product-details]": item.details,
      "[data-product-price]": item.price,
      "[data-product-duration]": item.duration,
      "[data-product-crumb]": item.title
    };
    Object.entries(fields).forEach(([selector, value]) => {
      document.querySelectorAll(selector).forEach((target) => { target.textContent = value; });
    });
    const image = document.querySelector("[data-product-image]");
    if (image) { image.src = item.image; image.alt = item.title; }
    const book = document.querySelector("[data-product-book]");
    if (book) book.href = "order.html?service=" + encodeURIComponent(selectedService);
    const modalTrigger = document.querySelector("[data-bs-target='#bookingModal'][data-service]");
    if (modalTrigger) modalTrigger.dataset.service = selectedService;
    document.title = item.title + " — Новый образ";
  }
}

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

const galleryModal = document.querySelector("#galleryModal");
if (galleryModal) {
  const galleryItems = [...document.querySelectorAll("[data-gallery-index] img")].map((image) => ({ src: image.src, alt: image.alt }));
  const galleryImage = galleryModal.querySelector("[data-gallery-image]");
  const galleryCaption = galleryModal.querySelector("[data-gallery-caption]");
  const galleryCounter = galleryModal.querySelector("[data-gallery-counter]");
  let galleryIndex = 0;
  const showGalleryItem = (index) => {
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    galleryImage.src = item.src;
    galleryImage.alt = item.alt;
    galleryCaption.textContent = item.alt;
    galleryCounter.textContent = (galleryIndex + 1) + " из " + galleryItems.length;
  };
  galleryModal.addEventListener("show.bs.modal", (event) => showGalleryItem(Number(event.relatedTarget?.dataset.galleryIndex || 0)));
  galleryModal.querySelector("[data-gallery-prev]").addEventListener("click", () => showGalleryItem(galleryIndex - 1));
  galleryModal.querySelector("[data-gallery-next]").addEventListener("click", () => showGalleryItem(galleryIndex + 1));
}

const shopButtons = document.querySelectorAll("[data-shop-product]");
if (shopButtons.length) {
  const cartCount = document.querySelector("[data-cart-count]");
  const cartStorageKey = "novyi-obraz-cart-count";
  let count = 0;
  try { count = Number(localStorage.getItem(cartStorageKey) || 0); } catch { count = 0; }
  if (!Number.isFinite(count) || count < 0) count = 0;
  cartCount.textContent = count;
  shopButtons.forEach((button) => button.addEventListener("click", () => {
    count += 1;
    cartCount.textContent = count;
    try { localStorage.setItem(cartStorageKey, String(count)); } catch { /* Cart still works for this visit. */ }
    showSiteToast(button.dataset.shopProduct + " добавлен в корзину.", "Магазин ухода");
  }));
}

const reviewForm = document.querySelector("#review-form");
if (reviewForm) {
  const reviewModal = document.querySelector("#reviewModal");
  const reviewCarousel = document.querySelector("#salonReviews");
  const reviewList = reviewCarousel.querySelector(".carousel-inner");
  const reviewStatus = document.querySelector("#review-status");
  const reviewError = document.querySelector("#review-form-error");
  const nameInput = reviewForm.querySelector("#review-name");
  const serviceInput = reviewForm.querySelector("#review-service");
  const ratingInput = reviewForm.querySelector("#review-rating");
  const textInput = reviewForm.querySelector("#review-text");
  const storageKey = "novyi-obraz-reviews";
  const initialRatings = [5, 5, 4.7];

  const readReviews = () => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(value)) return [];
      return value.filter((review) =>
        typeof review?.name === "string" && review.name.trim().length >= 2 &&
        typeof review?.text === "string" && review.text.trim().length >= 20 &&
        Object.hasOwn(services, review.service) &&
        Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5
      );
    } catch {
      return [];
    }
  };

  const appendReview = (review) => {
    const article = document.createElement("article");
    article.className = "carousel-item";
    const slide = document.createElement("div");
    slide.className = "review-slide";
    const quote = document.createElement("blockquote");
    quote.className = "review-quote";
    quote.textContent = "«" + review.text + "»";
    const score = document.createElement("span");
    score.className = "review-score";
    score.setAttribute("aria-label", "Оценка " + review.rating + " из 5");
    const small = document.createElement("small");
    small.textContent = "из 5";
    score.append(document.createTextNode(review.rating.toFixed(1).replace(".", ",") + " "), small);
    const author = document.createElement("p");
    author.className = "review-author mb-0";
    const name = document.createElement("strong");
    name.textContent = review.name;
    const service = document.createElement("span");
    service.textContent = services[review.service].title;
    author.append(name, document.createElement("br"), service);
    slide.append(quote, score, author);
    article.append(slide);
    reviewList.append(article);
    return article;
  };

  const updateAverage = (reviews) => {
    const ratings = [...initialRatings, ...reviews.map((review) => review.rating)];
    const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    document.querySelector("[data-review-average]").textContent = average.toFixed(1).replace(".", ",");
  };

  const savedReviews = readReviews();
  savedReviews.forEach(appendReview);
  if (savedReviews.length) {
    reviewList.querySelector(".carousel-item.active")?.classList.remove("active");
    reviewList.lastElementChild.classList.add("active");
  }
  updateAverage(savedReviews);

  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    nameInput.value = nameInput.value.trim();
    textInput.value = textInput.value.trim();
    reviewForm.classList.add("was-validated");
    if (!reviewForm.checkValidity() || !Object.hasOwn(services, serviceInput.value)) return;

    const review = {
      name: nameInput.value,
      service: serviceInput.value,
      rating: Number(ratingInput.value),
      text: textInput.value
    };
    const reviews = [...readReviews(), review];
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch {
      reviewError.textContent = "Не удалось добавить отзыв. Попробуйте ещё раз.";
      reviewError.hidden = false;
      return;
    }

    appendReview(review);
    updateAverage(reviews);
    reviewError.hidden = true;
    reviewStatus.textContent = "Спасибо! Ваш отзыв добавлен.";
    reviewStatus.hidden = false;
    reviewModal.addEventListener("hidden.bs.modal", () => {
      const carousel = bootstrap.Carousel.getOrCreateInstance(reviewCarousel);
      carousel.to(reviewList.children.length - 1);
      carousel.pause();
      reviewStatus.scrollIntoView({ behavior: "smooth", block: "center" });
    }, { once: true });
    bootstrap.Modal.getOrCreateInstance(reviewModal).hide();
    reviewForm.reset();
    reviewForm.classList.remove("was-validated");
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
      empty.textContent = "Пока нет записей.";
      bookingsList.append(empty);
      return;
    }
    const list = document.createElement("ul");
    list.className = "booking-list";
    items.forEach((item) => {
      const li = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = formatDate(item.date) + " в " + item.time + " — " + (services[item.service]?.title || item.service) + " (" + item.name + "). ";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn btn-sm btn-outline-dark";
      remove.textContent = "Удалить";
      remove.setAttribute("aria-label", "Удалить запись на " + formatDate(item.date) + " в " + item.time);
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
      showAlert("Это время уже занято. Выберите другое.", "warning");
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
      showAlert("Не удалось сохранить запись. Попробуйте ещё раз.", "danger");
      return;
    }
    showAlert("Вы выбрали " + formatDate(booking.date) + " в " + booking.time + ". Запись добавлена в раздел «Мои записи».", "success");
    showSiteToast("Запись на " + formatDate(booking.date) + " в " + booking.time + " успешно сохранена.", "Запись подтверждена");
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
  const moving = [...document.querySelectorAll("main section h2, main section .section-lead, main section .service-card, main section .product-card, main section .benefit, main section .gallery-photo, main section .mini-gallery img, main section .map-frame, main section .price-list, main section .story-copy, main section .team-card, main section .master-profile")];
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

const chatLauncher = document.createElement("button");
chatLauncher.type = "button";
chatLauncher.className = "chat-launcher";
chatLauncher.setAttribute("aria-expanded", "false");
chatLauncher.setAttribute("aria-controls", "consultant-chat");
chatLauncher.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A7 7 0 0 1 3 13V8a5 5 0 0 1 5-5h9a4 4 0 0 1 4 4Z"/></svg><span>Чат</span>';

const chatPanel = document.createElement("section");
chatPanel.id = "consultant-chat";
chatPanel.className = "chat-panel";
chatPanel.hidden = true;
chatPanel.setAttribute("aria-label", "Чат с консультантом");
chatPanel.innerHTML = '<div class="chat-panel__header"><div><strong>Консультант</strong><span>Обычно отвечает сразу</span></div><button type="button" class="chat-close" aria-label="Закрыть чат"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div class="chat-log" aria-live="polite"><p class="chat-message chat-message--bot">Здравствуйте! Помогу выбрать услугу, средство или удобное время.</p></div><form class="chat-form"><label class="visually-hidden" for="chat-message">Сообщение</label><input class="form-control" id="chat-message" type="text" maxlength="300" placeholder="Напишите вопрос" required><button class="btn btn-salon" type="submit">Отправить</button></form>';
document.body.append(chatLauncher, chatPanel);

const setChatOpen = (open) => {
  chatPanel.hidden = !open;
  chatLauncher.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("chat-open", open);
  if (open) chatPanel.querySelector("input").focus();
};
chatLauncher.addEventListener("click", () => setChatOpen(chatPanel.hidden));
chatPanel.querySelector(".chat-close").addEventListener("click", () => setChatOpen(false));
chatPanel.querySelector(".chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = chatPanel.querySelector("input");
  const question = input.value.trim();
  if (!question) return;
  const log = chatPanel.querySelector(".chat-log");
  const userMessage = document.createElement("p");
  userMessage.className = "chat-message chat-message--user";
  userMessage.textContent = question;
  log.append(userMessage);
  input.value = "";
  const answer = document.createElement("p");
  answer.className = "chat-message chat-message--bot";
  const normalized = question.toLowerCase();
  if (normalized.includes("цен") || normalized.includes("стоим")) answer.textContent = "Цены указаны в разделе «Услуги». Итоговую стоимость мастер уточнит до начала работы.";
  else if (normalized.includes("запис") || normalized.includes("время")) answer.textContent = "Откройте форму записи — там показаны доступные даты и время.";
  else if (normalized.includes("уход") || normalized.includes("средств")) answer.textContent = "Для точного подбора ухода расскажите мастеру о типе волос и желаемом результате.";
  else answer.textContent = "Спасибо за вопрос! Оставьте заявку на сайте или позвоните по номеру +7 (495) 000-22-10.";
  log.append(answer);
  log.scrollTop = log.scrollHeight;
});
