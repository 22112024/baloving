document.addEventListener("DOMContentLoaded", function () {
  // =============================
  // === Переход по ссылкам =========
  // =============================
  function openLink(url) {
    window.location.href = url;
  }
  window.openLink = openLink;

  // =============================
  // === Предотвращение окна "Повторная отправка формы" =========
  // =============================
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }

  // =========================
  // === Переключение языка (основной переключатель) ===
  // =========================
  const russianButton = document.getElementById("russian");
  const englishButton = document.getElementById("english");

  function switchLanguage() {
    if (russianButton.classList.contains("active")) {
      russianButton.classList.remove("active");
      russianButton.classList.add("inactive");
      englishButton.classList.remove("inactive");
      englishButton.classList.add("active");
    } else {
      russianButton.classList.remove("inactive");
      russianButton.classList.add("active");
      englishButton.classList.remove("active");
      englishButton.classList.add("inactive");
    }
  }

  // =========================
  // === Переключение валюты (основной переключатель) ===
  // =========================
  const idrButton = document.getElementById("idr");
  const usdButton = document.getElementById("usd");
  const rubButton = document.getElementById("rub");

  function switchCurrency(event) {
    const target = event.target;
    [idrButton, usdButton, rubButton].forEach((button) => {
      button.classList.remove("active");
      button.classList.add("inactive");
    });
    target.classList.remove("inactive");
    target.classList.add("active");
  }

  // Обработчики для переключения языка и валюты в основном переключателе
  const languageSwitcher = document.getElementById("languageSwitcher");
  if (languageSwitcher) {
    languageSwitcher.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("russian") ||
        event.target.classList.contains("english")
      ) {
        switchLanguage();
      }
      if (
        event.target.classList.contains("idr") ||
        event.target.classList.contains("usd") ||
        event.target.classList.contains("rub")
      ) {
        switchCurrency(event);
      }
    });
  }

  // Устанавливаем начальные состояния
  if (russianButton && englishButton) {
    russianButton.classList.add("active");
    englishButton.classList.add("inactive");
  }
  if (idrButton && usdButton && rubButton) {
    idrButton.classList.add("active");
    usdButton.classList.add("inactive");
    rubButton.classList.add("inactive");
  }

  // Функция для закрытия выпадающих меню при клике вне их области
  function closeMenus(e) {
    const langContainer = document.getElementById("languageContainer");
    const currContainer = document.getElementById("currencyContainer");
    if (
      !e.target.closest("#languageContainer") &&
      !e.target.closest(".language")
    ) {
      langContainer.style.display = "none";
    }
    if (
      !e.target.closest("#currencyContainer") &&
      !e.target.closest(".currency")
    ) {
      currContainer.style.display = "none";
    }
    // Убираем обработчик после срабатывания
    document.removeEventListener("click", closeMenus);
  }

  // ======================================
  // === Функции для работы с выпадающими меню =========
  // ======================================
  function toggleLanguageMenu(event) {
    event.stopPropagation(); // Останавливаем всплытие
    if (window.innerWidth < 1150) {
      const langContainer = document.getElementById("languageContainer");
      const currentDisplay = window.getComputedStyle(langContainer).display;
      console.log("Текущий display языка:", currentDisplay);
      langContainer.style.display =
        currentDisplay === "none" ? "block" : "none";
      console.log("После клика display языка:", langContainer.style.display);
      // Добавляем обработчик клика вне меню для его закрытия
      setTimeout(() => {
        document.addEventListener("click", closeMenus);
      }, 0);
    }
  }
  window.toggleLanguageMenu = toggleLanguageMenu;

  function toggleCurrencyMenu(event) {
    event.stopPropagation(); // Останавливаем всплытие
    if (window.innerWidth < 1150) {
      const currContainer = document.getElementById("currencyContainer");
      const currentDisplay = window.getComputedStyle(currContainer).display;
      currContainer.style.display =
        currentDisplay === "none" ? "block" : "none";
      // Добавляем обработчик клика вне меню для его закрытия
      setTimeout(() => {
        document.addEventListener("click", closeMenus);
      }, 0);
    }
  }
  window.toggleCurrencyMenu = toggleCurrencyMenu;

  // Добавляем триггеры для выпадающих меню на экранах меньше 1150px
  if (window.innerWidth < 1150) {
    const languageElement = document.querySelector(".language");
    if (languageElement) {
      languageElement.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleLanguageMenu(event);
      });
    }

    const currencyElement = document.querySelector(".currency");
    if (currencyElement) {
      currencyElement.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleCurrencyMenu(event);
      });
    }
  }

  // ================================
  // === Переключение через выпадающее меню ===
  // ================================
  function switchLanguageFromMenu(event) {
    event.stopPropagation();
    const selectedLang = event.target.textContent.trim();
    const langOptions = document.querySelectorAll(
      "#languageContainer .language_list .language div"
    );
    langOptions.forEach((opt) => {
      opt.classList.remove("active");
      opt.classList.add("inactive");
    });
    event.target.classList.add("active");
    event.target.classList.remove("inactive");

    // Обновляем основной переключатель
    if (selectedLang === "RU") {
      russianButton.classList.add("active");
      russianButton.classList.remove("inactive");
      englishButton.classList.add("inactive");
      englishButton.classList.remove("active");
    } else if (selectedLang === "EN") {
      englishButton.classList.add("active");
      englishButton.classList.remove("inactive");
      russianButton.classList.add("inactive");
      russianButton.classList.remove("active");
    }
    document.getElementById("languageContainer").style.display = "none";
  }
  window.switchLanguageFromMenu = switchLanguageFromMenu;

  function switchCurrencyFromMenu(event) {
    event.stopPropagation();
    const selectedCurr = event.target.textContent.trim();
    const currOptions = document.querySelectorAll(
      "#currencyContainer .currency_list .currency div"
    );
    currOptions.forEach((opt) => {
      opt.classList.remove("active");
      opt.classList.add("inactive");
    });
    event.target.classList.add("active");
    event.target.classList.remove("inactive");

    if (selectedCurr === "IDR") {
      idrButton.classList.add("active");
      idrButton.classList.remove("inactive");
      usdButton.classList.add("inactive");
      rubButton.classList.add("inactive");
      usdButton.classList.remove("active");
      rubButton.classList.remove("active");
    } else if (selectedCurr === "USD") {
      usdButton.classList.add("active");
      usdButton.classList.remove("inactive");
      idrButton.classList.add("inactive");
      rubButton.classList.add("inactive");
      idrButton.classList.remove("active");
      rubButton.classList.remove("active");
    } else if (selectedCurr === "RUB") {
      rubButton.classList.add("active");
      rubButton.classList.remove("inactive");
      idrButton.classList.add("inactive");
      usdButton.classList.add("inactive");
      idrButton.classList.remove("active");
      usdButton.classList.remove("active");
    }
    document.getElementById("currencyContainer").style.display = "none";
  }
  window.switchCurrencyFromMenu = switchCurrencyFromMenu;

  // =============================
  // === Остальной существующий код =========
  // =============================
  // (Здесь остальной код, связанный с фильтрами, слайдерами и т.д.)

  // Функции для работы с выпадающими меню фильтров
  function toggleDropdownMenu(menuId) {
    const dropdownMenu = document.getElementById(menuId);
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("active");
    }
  }
  function closeDropdownMenu(menuId) {
    const dropdownMenu = document.getElementById(menuId);
    if (dropdownMenu) {
      dropdownMenu.classList.remove("active");
    }
  }

  document.addEventListener("click", function (event) {
    const dropdownMenus = [
      "district_dropdown",
      "type_dropdown",
      "rooms_dropdown",
      "price_dropdown",
    ];
    dropdownMenus.forEach((menuId) => {
      const dropdownMenu = document.getElementById(menuId);
      const menuTrigger = document.querySelector(`.${menuId.split("_")[0]}`);
      if (
        dropdownMenu &&
        dropdownMenu.classList.contains("active") &&
        !dropdownMenu.contains(event.target) &&
        (!menuTrigger || !menuTrigger.contains(event.target))
      ) {
        dropdownMenu.classList.remove("active");
      }
    });
  });

  document.querySelectorAll(".dropdown_menu").forEach((menu) => {
    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
  document.querySelectorAll(".dropdown_menu .save_button").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const dropdownMenu = button.closest(".dropdown_menu");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("active");
      }
    });
  });

  // Работа с фильтрами (UI)
  document.querySelectorAll(".rooms_btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
  });
  document.querySelectorAll(".choose_price").forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
  });

  const districtTrigger = document.querySelector(".district");
  if (districtTrigger) {
    districtTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      toggleDropdownMenu("district_dropdown");
    });
  }
  const typeTrigger = document.querySelector(".type");
  if (typeTrigger) {
    typeTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      toggleDropdownMenu("type_dropdown");
    });
  }
  const roomsTrigger = document.querySelector(".rooms");
  if (roomsTrigger) {
    roomsTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      toggleDropdownMenu("rooms_dropdown");
    });
  }
  const priceTrigger = document.querySelector(".price");
  if (priceTrigger) {
    priceTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      toggleDropdownMenu("price_dropdown");
    });
  }

  document
    .querySelectorAll('.rooms_menu .input_fields input[type="number"]')
    .forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value.length > 1) {
          this.value = this.value.slice(0, 1);
        }
      });
    });
  document
    .querySelectorAll('.price_menu .input_fields input[type="number"]')
    .forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value.length > 3) {
          this.value = this.value.slice(0, 3);
        }
      });
    });

  function formatSelection(items, maxChars) {
    let result = "";
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const separator = result ? ", " : "";
      if ((result + separator + item).length <= maxChars) {
        result += separator + item;
        count++;
      } else {
        break;
      }
    }
    const remaining = items.length - count;
    if (remaining > 0) {
      result += " +" + remaining;
    }
    return result;
  }
  function updateFilterText(inputId, items, labelText, defaultText) {
    const selectionText =
      items.length > 0 ? formatSelection(items, 14) : defaultText;
    const inputEl = document.getElementById(inputId);
    if (inputEl) {
      inputEl.innerHTML = `${labelText}<br/><span class="sub_text">${selectionText}</span>`;
    }
  }
  const districtSaveBtn = document.getElementById("district_saveButton");
  if (districtSaveBtn) {
    districtSaveBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const selectedDistricts = Array.from(
        document.querySelectorAll(".district input[type='checkbox']:checked")
      ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
      updateFilterText(
        "district_input",
        selectedDistricts,
        "Район",
        "один или несколько"
      );
      closeDropdownMenu("district_dropdown");
    });
  }
  const typeSaveBtn = document.getElementById("type_saveButton");
  if (typeSaveBtn) {
    typeSaveBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const selectedTypes = Array.from(
        document.querySelectorAll(".type input[type='checkbox']:checked")
      ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
      updateFilterText(
        "type_input",
        selectedTypes,
        "Тип жилья",
        "один или несколько"
      );
      closeDropdownMenu("type_dropdown");
    });
  }
  const searchButton = document.querySelector(".search_buttom");
  if (searchButton) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedDistricts = Array.from(
        document.querySelectorAll(".district input[type='checkbox']:checked")
      ).map((checkbox) => checkbox.id);
      const selectedTypes = Array.from(
        document.querySelectorAll(".type input[type='checkbox']:checked")
      ).map((checkbox) => checkbox.id);
      const roomsFrom = document.getElementById("rooms_from")
        ? document.getElementById("rooms_from").value
        : "";
      const roomsTo = document.getElementById("rooms_to")
        ? document.getElementById("rooms_to").value
        : "";
      const selectedRooms = Array.from(
        document.querySelectorAll(".rooms .rooms_btn.selected")
      ).map((btn) => btn.textContent.trim());
      const priceFrom = document.getElementById("price_from")
        ? document.getElementById("price_from").value
        : "";
      const priceTo = document.getElementById("price_to")
        ? document.getElementById("price_to").value
        : "";
      const selectedPriceButton = document.querySelector(
        ".price .choose_price.selected"
      );
      let chosenPrice = "";
      if (selectedPriceButton) {
        chosenPrice =
          selectedPriceButton.dataset.price ||
          selectedPriceButton.textContent.trim();
      }
      const queryParams = {
        district: selectedDistricts.join(","),
        type: selectedTypes.join(","),
        rooms:
          roomsFrom || roomsTo
            ? `${roomsFrom}-${roomsTo}`
            : selectedRooms.join(","),
        price: priceFrom || priceTo ? `${priceFrom}-${priceTo}` : chosenPrice,
      };
      Object.keys(queryParams).forEach((key) => {
        if (!queryParams[key]) {
          delete queryParams[key];
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      window.location.href = "search_results.html?" + queryString;
    });
  }

  // =============================
  // === Слайдер для карточек на главной странице =========
  // =============================
  document.querySelectorAll(".card").forEach((card) => {
    const container = card.querySelector(".card_image_svg");
    const images = container.querySelectorAll("img.slider_image");
    const leftBtn = card.querySelector(".card_slider_btn_left");
    const rightBtn = card.querySelector(".card_slider_btn_right");

    let dotsContainer = container.querySelector(".slider_dots");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.classList.add("slider_dots");
      container.appendChild(dotsContainer);
    }
    dotsContainer.innerHTML = "";
    images.forEach((img, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        images[currentIndex].classList.remove("active");
        currentIndex = index;
        images[currentIndex].classList.add("active");
        updateDots();
      });
      dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;
    if (images.length > 0) {
      images.forEach((img, index) => {
        img.classList.toggle("active", index === 0);
      });
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    leftBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      images[currentIndex].classList.add("active");
      updateDots();
    });

    rightBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
      updateDots();
    });

    if (window.innerWidth <= 550) {
      leftBtn.style.display = "flex";
      rightBtn.style.display = "flex";
      let touchstartX = 0;
      let touchendX = 0;
      const threshold = 30;
      container.addEventListener(
        "touchstart",
        function (event) {
          touchstartX = event.changedTouches[0].screenX;
        },
        false
      );
      container.addEventListener(
        "touchend",
        function (event) {
          touchendX = event.changedTouches[0].screenX;
          handleGesture();
        },
        false
      );
      function handleGesture() {
        if (touchendX < touchstartX - threshold) {
          images[currentIndex].classList.remove("active");
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.add("active");
          updateDots();
        }
        if (touchendX > touchstartX + threshold) {
          images[currentIndex].classList.remove("active");
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          images[currentIndex].classList.add("active");
          updateDots();
        }
      }
    }
  });

  // =============================
  // === Слайдер (галерея на странице описания) =================
  // =============================
  const sliderEl = document.querySelector(".slider");
  const sliderContainer = document.querySelector(".slider_container");
  const sliderBtnLeft = document.querySelector(".slider_btn_left");
  const sliderBtnRight = document.querySelector(".slider_btn_right");
  const sliderClose = document.querySelector(".slider_close");
  const mainPhotoEl = document.querySelector("#mainPhoto");
  const sliderImages = Array.from(
    document.querySelectorAll(".slider_gallery .thumbnail")
  );
  let slideIndex = -1;

  function changePicture(dir) {
    if (dir === "left") {
      slideIndex = slideIndex > 0 ? slideIndex - 1 : sliderImages.length - 1;
    } else if (dir === "right") {
      slideIndex = slideIndex < sliderImages.length - 1 ? slideIndex + 1 : 0;
    }
    const img = sliderImages[slideIndex];
    if (img && mainPhotoEl) {
      mainPhotoEl.src = img.src;
    }
  }

  function openSlider(img) {
    slideIndex = sliderImages.findIndex(
      (thumbnail) => thumbnail.src === img.src
    );
    if (slideIndex === -1) slideIndex = 0;
    if (mainPhotoEl) {
      mainPhotoEl.src = img.src;
    }
    console.log("Открываю слайдер. slideIndex =", slideIndex, "src =", img.src);
    if (sliderEl) sliderEl.classList.add("active");
    if (sliderBtnLeft) sliderBtnLeft.style.display = "block";
    if (sliderBtnRight) sliderBtnRight.style.display = "block";
  }

  if (sliderImages.length > 0 && sliderEl && mainPhotoEl) {
    sliderImages.forEach((thumbnail) => {
      thumbnail.addEventListener("click", (event) => {
        event.preventDefault();
        openSlider(thumbnail);
      });
    });
    const cardElements = Array.from(
      document.querySelectorAll(".section_gallery > div")
    );
    cardElements.forEach((card) => {
      card.addEventListener("click", (event) => {
        const img = event.target.closest("img");
        if (img) {
          openSlider(img);
        }
      });
    });
    if (sliderBtnLeft) {
      sliderBtnLeft.addEventListener("click", (event) => {
        event.preventDefault();
        changePicture("left");
      });
    }
    if (sliderBtnRight) {
      sliderBtnRight.addEventListener("click", (event) => {
        event.preventDefault();
        changePicture("right");
      });
    }
    if (sliderClose) {
      sliderClose.addEventListener("click", (event) => {
        event.preventDefault();
        if (sliderEl) sliderEl.classList.remove("active");
        if (sliderBtnLeft) sliderBtnLeft.style.display = "none";
        if (sliderBtnRight) sliderBtnRight.style.display = "none";
      });
    }
  }

  // =============================
  // === Мобильный слайдер для главного фото (при ≤800px) ============
  // =============================
  if (window.innerWidth <= 800) {
    const mainPhotoImg = document.querySelector(".main_photo img");
    const mainPhotoContainer = document.querySelector(".main_photo");
    const mobileImages = Array.from(
      document.querySelectorAll(".slider_gallery .thumbnail")
    ).map((img) => img.src);
    let currentMobileIndex = mobileImages.indexOf(mainPhotoImg.src);
    if (currentMobileIndex === -1) currentMobileIndex = 0;

    let mobileDotsContainer = mainPhotoContainer.querySelector(".slider_dots");
    if (!mobileDotsContainer) {
      mobileDotsContainer = document.createElement("div");
      mobileDotsContainer.classList.add("slider_dots");
      mainPhotoContainer.appendChild(mobileDotsContainer);
    }
    mobileDotsContainer.innerHTML = "";
    mobileImages.forEach((src, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === currentMobileIndex) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", () => {
        currentMobileIndex = index;
        mainPhotoImg.src = mobileImages[currentMobileIndex];
        updateMobileDots();
      });
      mobileDotsContainer.appendChild(dot);
    });

    function updateMobileDots() {
      const dots = mobileDotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentMobileIndex);
      });
    }

    const mobileLeftBtn = document.querySelector(".main_slider_btn_left");
    const mobileRightBtn = document.querySelector(".main_slider_btn_right");

    if (mobileLeftBtn) {
      mobileLeftBtn.addEventListener("click", function (e) {
        e.preventDefault();
        currentMobileIndex =
          currentMobileIndex > 0
            ? currentMobileIndex - 1
            : mobileImages.length - 1;
        mainPhotoImg.src = mobileImages[currentMobileIndex];
        updateMobileDots();
      });
    }
    if (mobileRightBtn) {
      mobileRightBtn.addEventListener("click", function (e) {
        e.preventDefault();
        currentMobileIndex =
          currentMobileIndex < mobileImages.length - 1
            ? currentMobileIndex + 1
            : 0;
        mainPhotoImg.src = mobileImages[currentMobileIndex];
        updateMobileDots();
      });
    }
  }

  // =============================
  // === Изменение цвета иконки STAR =========
  // =============================
  document.querySelectorAll(".star_icon").forEach(function (star) {
    function handleStarClick(e) {
      e.preventDefault(); // Предотвращаем стандартное поведение
      e.stopPropagation(); // Останавливаем распространение события
      star.classList.toggle("selected"); // Переключаем класс
    }

    // Обработка клика мышью
    star.addEventListener("click", handleStarClick);

    // Обработка касания на мобильных устройствах
    star.addEventListener("touchend", handleStarClick);

    // Предотвращаем запуск события touchend на родительском элементе
    star.addEventListener("touchstart", function (e) {
      e.stopPropagation(); // Останавливаем распространение на touchstart
    });
  });

  // =============================
  // === Отправка жалобы =========
  // =============================
  const complaintLink = document.getElementById("complaintLink");
  const complaintMenu = document.getElementById("complaintMenu");
  const complaintOverlay = document.getElementById("complaintOverlay");

  function openComplaintMenu() {
    if (complaintMenu) complaintMenu.classList.add("active");
    if (complaintOverlay) complaintOverlay.classList.add("active");
  }
  function closeComplaintMenu() {
    if (complaintMenu) complaintMenu.classList.remove("active");
    if (complaintOverlay) complaintOverlay.classList.remove("active");
  }
  if (complaintLink) {
    complaintLink.addEventListener("click", function (e) {
      e.preventDefault();
      openComplaintMenu();
    });
  }
  const closeComplaintButton = document.querySelector(
    ".close_complaint_button"
  );
  if (closeComplaintButton) {
    closeComplaintButton.addEventListener("click", function (e) {
      e.preventDefault();
      closeComplaintMenu();
    });
  }
  document.addEventListener("click", function (e) {
    if (
      complaintMenu &&
      !complaintMenu.contains(e.target) &&
      complaintLink &&
      !complaintLink.contains(e.target)
    ) {
      closeComplaintMenu();
    }
  });
  if (complaintMenu) {
    complaintMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
});

// ================
// === Окно information =========
function openInformationMenu() {
  const informationMenu = document.getElementById("informationMenu");
  const informationOverlay = document.getElementById("overlay");
  if (informationMenu && informationOverlay) {
    informationMenu.classList.add("active");
    informationOverlay.classList.add("active");
  }
}
window.openInformationMenu = openInformationMenu;

function closeInformationMenu() {
  const informationMenu = document.getElementById("informationMenu");
  const informationOverlay = document.getElementById("overlay");
  if (informationMenu && informationOverlay) {
    informationMenu.classList.remove("active");
    informationOverlay.classList.remove("active");
  }
}
window.closeInformationMenu = closeInformationMenu;

const informationButton = document.getElementById("informationButton");
if (informationButton) {
  informationButton.addEventListener("click", function (e) {
    e.preventDefault();
    openInformationMenu();
  });
}
const closeInformationButton = document.getElementById(
  "closeInformationButton"
);
if (closeInformationButton) {
  closeInformationButton.addEventListener("click", function (e) {
    e.preventDefault();
    closeInformationMenu();
  });
}
const informationOverlay = document.getElementById("overlay");
if (informationOverlay) {
  informationOverlay.addEventListener("click", function (e) {
    closeInformationMenu();
  });
}


// =============================
// === ПРОКРУТКА ВВЕРХ GO-TOP =========
// =============================

const goTopBtn = document.querySelector(".go-top");

// ПРОКРУТКА КНОПКИ
window.addEventListener("scroll", trackScroll);

// Добавляем обработчик клика на кнопку
goTopBtn.addEventListener("click", goTop);

// Функция для отслеживания прокрутки
function trackScroll() {
  const scrolled = window.scrollY; // Получаем текущую прокрутку
  const coords = document.documentElement.clientHeight; // Высота видимой области окна

  // Если прокрутили вниз больше, чем на высоту окна
  if (scrolled > coords) {
    goTopBtn.classList.add("go-top--show"); // Показываем кнопку
  } else {
    goTopBtn.classList.remove("go-top--show"); // Скрываем кнопку
  }
}

// Функция для плавной прокрутки вверх
function goTop() {
  if (window.scrollY > 0) {
    // Используем requestAnimationFrame для плавной прокрутки
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Плавная прокрутка
    });
  }
}
