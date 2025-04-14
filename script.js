document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  // Проверка флага searchClicked для восстановления или сброса данных
  const searchClicked = localStorage.getItem("searchClicked");
  if (searchClicked === "true") {
    localStorage.removeItem("searchClicked");
    restoreFromLocalStorage();
    const selectedDistrictsNames = Array.from(
      document.querySelectorAll(".district input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
    updateFilterText(
      "district_input",
      selectedDistrictsNames,
      "Район",
      "мультивыбор"
    );
    const selectedTypesNames = Array.from(
      document.querySelectorAll(".type input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
    updateFilterText(
      "type_input",
      selectedTypesNames,
      "Тип жилья",
      "мультивыбор"
    );
    const selectedTermsNames = Array.from(
      document.querySelectorAll(".term input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
    updateFilterText("term_input", selectedTermsNames, "Срок", "мультивыбор");
    const selectedFiltersNames = Array.from(
      document.querySelectorAll(".filter input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
    updateFilterText(
      "filter_input_mobile",
      selectedFiltersNames,
      "Фильтр",
      "мультивыбор"
    );
  } else {
    localStorage.removeItem("selectedDistricts");
    localStorage.removeItem("selectedTypes");
    localStorage.removeItem("selectedTerms");
    localStorage.removeItem("selectedFilters");
    localStorage.removeItem("roomsFrom");
    localStorage.removeItem("roomsTo");
    localStorage.removeItem("priceFrom");
    localStorage.removeItem("priceTo");
    document
      .querySelectorAll(".district input[type='checkbox']")
      .forEach((checkbox) => (checkbox.checked = false));
    document
      .querySelectorAll(".type input[type='checkbox']")
      .forEach((checkbox) => (checkbox.checked = false));
    document
      .querySelectorAll(".term input[type='checkbox']")
      .forEach((checkbox) => (checkbox.checked = false));
    document
      .querySelectorAll(".filter input[type='checkbox']")
      .forEach((checkbox) => (checkbox.checked = false));
    if (document.getElementById("rooms_from"))
      document.getElementById("rooms_from").value = "";
    if (document.getElementById("rooms_to"))
      document.getElementById("rooms_to").value = "";
    if (document.getElementById("price_from"))
      document.getElementById("price_from").value = "";
    if (document.getElementById("price_to"))
      document.getElementById("price_to").value = "";
    updateFilterText("district_input", [], "Район", "мультивыбор");
    updateFilterText("type_input", [], "Тип жилья", "мультивыбор");
    updateFilterText("term_input", [], "Срок", "мультивыбор");
    updateFilterText("filter_input_mobile", [], "Фильтр", "мультивыбор");
    updateFilterText("price_input", [], "Цена", "мультивыбор");
  }

  // Переключение языка
  const russianButton = document.getElementById("russian");
  const englishButton = document.getElementById("english");
  console.log("Language buttons:", russianButton, englishButton);

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

  // Переключение валюты
  const idrButton = document.getElementById("idr");
  const usdButton = document.getElementById("usd");
  const rubButton = document.getElementById("rub");
  console.log("Currency buttons:", idrButton, usdButton, rubButton);

  function switchCurrency(event) {
    const target = event.target;
    [idrButton, usdButton, rubButton].forEach((button) => {
      button.classList.remove("active");
      button.classList.add("inactive");
    });
    target.classList.remove("inactive");
    target.classList.add("active");
  }

  // Обработчики для переключения языка и валюты
  const languageSwitcher = document.getElementById("languageSwitcher");
  console.log("Language switcher:", languageSwitcher);
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

  if (russianButton && englishButton) {
    russianButton.classList.add("active");
    englishButton.classList.add("inactive");
  }

  if (idrButton && usdButton && rubButton) {
    idrButton.classList.add("active");
    usdButton.classList.add("inactive");
    rubButton.classList.add("inactive");
  }

  // Функции для работы с выпадающими меню
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

  // Закрытие меню при клике вне его
  document.addEventListener("click", function (event) {
    const dropdownMenus = [
      "district_dropdown",
      "type_dropdown",
      "rooms_dropdown",
      "price_dropdown",
      "term_dropdown",
      "filter_dropdown",
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

  // Предотвращаем закрытие меню при клике внутри него
  document.querySelectorAll(".dropdown_menu").forEach((menu) => {
    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  // Закрытие меню по кнопке "Сохранить"
  document.querySelectorAll(".dropdown_menu .save_button").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const dropdownMenu = button.closest(".dropdown_menu");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("active");
      }
    });
  });

  // Установка "цена за месяц" активной по умолчанию
  const priceButtons = document.querySelectorAll(".price .choose_price");
  priceButtons.forEach((button) => {
    if (button.getAttribute("data-price") === "per_month") {
      button.classList.add("selected"); // Активна по умолчанию
    }
  });

  // Взаимоисключающий выбор кнопок .choose_price
  document.querySelectorAll(".price .choose_price").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Предотвращаем действие ссылки, если есть
      priceButtons.forEach((btn) => btn.classList.remove("selected")); // Снимаем выбор со всех
      this.classList.add("selected"); // Выбираем только текущую кнопку
    });
  });

  // Ограничение количества знаков в полях ввода для rooms и price
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
    .querySelectorAll('.price .input_fields input[type="number"]')
    .forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value.length > 3) {
          this.value = this.value.slice(0, 3);
        }
      });
    });

  // Обработчики открытия выпадающих меню для фильтров
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

  const termTrigger = document.querySelector(".term");
  if (termTrigger) {
    termTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      toggleDropdownMenu("term_dropdown");
    });
  }

  const filterTrigger = document.querySelector(".filter");
  if (filterTrigger) {
    filterTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      toggleDropdownMenu("filter_dropdown");
    });
  }

  function formatSelection(items, maxChars) {
    if (items.length === 0) return "";
    if (items.length === 1) {
      return items[0].length > maxChars
        ? items[0].substring(0, maxChars)
        : items[0];
    }
    let result = "";
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const separator = result ? ", " : "";
      const potentialLength = result.length + separator.length + item.length;
      if (potentialLength <= maxChars) {
        result += separator + item;
        count++;
      } else if (result === "" && item.length > maxChars) {
        result = item.substring(0, maxChars);
        count++;
        break;
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

  // Исправленная функция updateFilterText
  function updateFilterText(inputId, items, labelText, defaultText) {
    const selectionText =
      items.length > 0 ? formatSelection(items, 10) : defaultText;
    const inputEl = document.getElementById(inputId);
    if (inputEl) {
      if (inputId === "filter_input_mobile") {
        const subTextEl = inputEl.querySelector(".sub_text");
        if (subTextEl) {
          subTextEl.textContent = selectionText;
        }
      } else {
        inputEl.innerHTML = `${labelText}<br/><span class="sub_text">${selectionText}</span>`;
      }
    }
  }

  // Обработчики кнопок "Сохранить" для фильтров
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
        "мультивыбор"
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
      updateFilterText("type_input", selectedTypes, "Тип жилья", "мультивыбор");
      closeDropdownMenu("type_dropdown");
    });
  }

  const termSaveBtn = document.getElementById("term_saveButton");
  if (termSaveBtn) {
    termSaveBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const selectedTerms = Array.from(
        document.querySelectorAll(".term input[type='checkbox']:checked")
      ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
      updateFilterText("term_input", selectedTerms, "Срок", "мультивыбор");
      closeDropdownMenu("term_dropdown");
    });
  }

  const filterSaveBtn = document.getElementById("filter_saveButton");
  if (filterSaveBtn) {
    filterSaveBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const selectedFilters = Array.from(
        document.querySelectorAll(".filter input[type='checkbox']:checked")
      ).map((checkbox) => checkbox.nextElementSibling.textContent.trim());
      updateFilterText(
        "filter_input_mobile",
        selectedFilters,
        "Фильтр",
        "мультивыбор"
      );
      closeDropdownMenu("filter_dropdown");
    });
  }

  const priceSaveBtn = document.getElementById("price_saveButton");
  if (priceSaveBtn) {
    priceSaveBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const priceFrom = document.getElementById("price_from").value;
      const priceTo = document.getElementById("price_to").value;
      const selectedPriceButton = document.querySelector(
        ".price .choose_price.selected"
      );
      const pricePeriod = selectedPriceButton
        ? selectedPriceButton.getAttribute("value")
        : "в мес";

      let displayText = "мультивыбор";
      if (priceFrom || priceTo) {
        const fromValue = priceFrom || "0";
        const toValue = priceTo || "999";
        displayText = `${fromValue}-${toValue} ${pricePeriod}`;
      }

      updateFilterText("price_input", [], "Цена", displayText);
      closeDropdownMenu("price_dropdown");
    });
  }

  // Слайдер для карточек на главной странице
document.querySelectorAll(".card").forEach((card) => {
  const container = card.querySelector(".card_image_svg");
  const images = container.querySelectorAll("img.slider_image");
  const leftBtn = card.querySelector(".card_slider_btn_left");
  const rightBtn = cardmissed call to action: card.querySelector(".card_slider_btn_right");

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

  // Добавляем поддержку свайпа
  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;

  container.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
    isSwiping = false;
  }, { passive: true });

  container.addEventListener("touchmove", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    if (Math.abs(touchEndX - touchStartX) > 10) {
      isSwiping = true;
    }
  }, { passive: true });

  container.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    if (isSwiping) {
      handleSwipe();
      event.stopPropagation(); // Предотвращаем срабатывание onclick
    }
    isSwiping = false;
  }, { passive: true });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50; // Минимальное расстояние для свайпа

    if (swipeDistance > minSwipeDistance) {
      // Свайп вправо (предыдущее изображение)
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      images[currentIndex].classList.add("active");
      updateDots();
    } else if (swipeDistance < -minSwipeDistance) {
      // Свайп влево (следующее изображение)
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
      updateDots();
    }
  }

  // Предотвращаем срабатывание onclick на кнопках и свайпе
  card.addEventListener("click", (event) => {
    if (event.target.closest(".card_slider_btn") || isSwiping) {
      event.stopPropagation();
    }
  });
});

  // Слайдер (галерея на странице описания)
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
    console.log("Changing picture, direction:", dir);
    if (dir === "left") {
      slideIndex = slideIndex > 0 ? slideIndex - 1 : sliderImages.length - 1;
    } else if (dir === "right") {
      slideIndex = slideIndex < sliderImages.length - 1 ? slideIndex + 1 : 0;
    }
    const img = sliderImages[slideIndex];
    if (img && mainPhotoEl) {
      console.log("Setting image URL:", img.currentSrc);
      mainPhotoEl.src = img.currentSrc;
      adjustMainPhoto();
      const blurredBg = document.querySelector(".blurred_background");
      if (blurredBg) {
        blurredBg.style.backgroundImage = `url(${img.currentSrc})`;
      }
    } else {
      console.log("Image or mainPhotoEl not found at index:", slideIndex);
    }
  }

  function openSlider(img) {
    const imgName = img.src.split("/").pop().split(".")[0];
    const galleryImg = sliderImages.find((thumbnail) =>
      thumbnail.src.includes(imgName)
    );
    slideIndex = sliderImages.indexOf(galleryImg);
    if (slideIndex === -1) slideIndex = 0;
    if (mainPhotoEl && galleryImg) {
      mainPhotoEl.src = galleryImg.currentSrc;
      adjustMainPhoto();
      const blurredBg = document.querySelector(".blurred_background");
      if (blurredBg) {
        blurredBg.style.backgroundImage = `url(${galleryImg.currentSrc})`;
      }
    }
    if (sliderEl) sliderEl.classList.add("active");
    if (sliderBtnLeft) sliderBtnLeft.style.display = "block";
    if (sliderBtnRight) sliderBtnRight.style.display = "block";
  }

  function adjustMainPhoto() {
    const img = mainPhotoEl;
    if (img && img.naturalWidth > img.naturalHeight) {
      img.style.width = "100%";
      img.style.height = "auto";
    } else if (img) {
      img.style.width = "auto";
      img.style.height = "100%";
    }
  }

  if (mainPhotoEl) {
    mainPhotoEl.addEventListener("load", adjustMainPhoto);
    mainPhotoEl.addEventListener("error", () => {
      console.error("Failed to load image:", mainPhotoEl.src);
    });
  }

  if (sliderImages.length > 0 && sliderEl && mainPhotoEl) {
    const cardElements = Array.from(
      document.querySelectorAll(".section_gallery > div img")
    );
    cardElements.forEach((img) => {
      img.addEventListener("click", (event) => {
        event.preventDefault();
        openSlider(img);
      });
    });

    sliderImages.forEach((thumbnail) => {
      thumbnail.addEventListener("click", (event) => {
        event.preventDefault();
        openSlider(thumbnail);
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

  // Работа стрелки и Esc в слайдере
  document.addEventListener("keydown", function (event) {
    if (sliderEl && sliderEl.classList.contains("active")) {
      switch (event.key) {
        case "ArrowLeft":
          changePicture("left");
          break;
        case "ArrowRight":
          changePicture("right");
          break;
        case "Escape":
          sliderEl.classList.remove("active");
          if (sliderBtnLeft) sliderBtnLeft.style.display = "none";
          if (sliderBtnRight) sliderBtnRight.style.display = "none";
          break;
      }
    }
  });

  // Работа ESC в Information
  document.addEventListener("keydown", function (event) {
    const informationMenu = document.getElementById("informationMenu");
    if (
      informationMenu &&
      informationMenu.classList.contains("active") &&
      event.key === "Escape"
    ) {
      closeInformationMenu();
    }
  });

  // Мобильный слайдер для главного фото (при ≤750px)
if (window.innerWidth <= 750) {
  const mainPhotoContainer = document.querySelector(".main_photo");
  const mainPhotoImg = document.querySelector(".main_photo img");
  const mainPicture = document.querySelector(".main_photo picture");
  const sliderGalleryItems = document.querySelectorAll(
    ".slider_gallery > div"
  );

  if (mainPhotoImg && mainPhotoContainer) {
    let mobileImages = Array.from(sliderGalleryItems).map((item) => {
      const source = item.querySelector("source[type='image/avif']");
      const img = item.querySelector("img.thumbnail");
      return source ? source.srcset : img.src;
    });

    if (mobileImages.length === 0) {
      const mainSource = mainPicture?.querySelector(
        "source[type='image/avif']"
      );
      mobileImages = [mainSource ? mainSource.srcset : mainPhotoImg.src];
    }

    let currentMobileIndex = 0;

    const mainPhotoSrc =
      mainPicture?.querySelector("source[type='image/avif']")?.srcset ||
      mainPhotoImg.src;
    currentMobileIndex = mobileImages.indexOf(mainPhotoSrc);
    if (currentMobileIndex === -1) currentMobileIndex = 0;

    let mobileDotsContainer =
      mainPhotoContainer.querySelector(".slider_dots");
    if (!mobileDotsContainer) {
      mobileDotsContainer = document.createElement("div");
      mobileDotsContainer.classList.add("slider_dots");
      mainPhotoContainer.appendChild(mobileDotsContainer);
    }
    mobileDotsContainer.innerHTML = "";

    mobileImages.forEach((src, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === currentMobileIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentMobileIndex = index;
        updateMainPhoto(mobileImages[currentMobileIndex]);
        updateMobileDots();
      });
      mobileDotsContainer.appendChild(dot);
    });

    function updateMainPhoto(src) {
      console.log("Updating mobile photo with src:", src);
      if (mainPicture) {
        const source = mainPicture.querySelector("source[type='image/avif']");
        if (source) {
          source.srcset = src.endsWith(".avif")
            ? src
            : src.replace(".jpg", ".avif");
          mainPhotoImg.src = src.endsWith(".avif")
            ? src.replace(".avif", ".jpg")
            : src;
          console.log(
            "Set source.srcset:",
            source.srcset,
            "img.src:",
            mainPhotoImg.src
          );
        } else {
          mainPhotoImg.src = src;
        }
      } else {
        mainPhotoImg.src = src;
      }
    }

    function updateMobileDots() {
      const dots = mobileDotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentMobileIndex);
      });
    }

    const mobileLeftBtn = document.querySelector(".main_slider_btn_left");
    const mobileRightBtn = document.querySelector(".main_slider_btn_right");

    if (mobileImages.length <= 1) {
      if (mobileLeftBtn) mobileLeftBtn.style.display = "none";
      if (mobileRightBtn) mobileRightBtn.style.display = "none";
      mobileDotsContainer.style.display = "none";
    } else {
      if (mobileLeftBtn) mobileLeftBtn.style.display = "";
      if (mobileRightBtn) mobileRightBtn.style.display = "";
      mobileDotsContainer.style.display = "";
    }

    if (mobileLeftBtn) {
      mobileLeftBtn.addEventListener("click", function (e) {
        e.preventDefault();
        currentMobileIndex =
          currentMobileIndex > 0
            ? currentMobileIndex - 1
            : mobileImages.length - 1;
        updateMainPhoto(mobileImages[currentMobileIndex]);
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
        updateMainPhoto(mobileImages[currentMobileIndex]);
        updateMobileDots();
      });
    }

    // Добавляем поддержку свайпа
    let touchStartX = 0;
    let touchEndX = 0;

    mainPhotoContainer.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    mainPhotoContainer.addEventListener("touchend", (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 50; // Минимальное расстояние для свайпа

      if (swipeDistance > minSwipeDistance) {
        // Свайп вправо (предыдущее изображение)
        currentMobileIndex =
          currentMobileIndex > 0
            ? currentMobileIndex - 1
            : mobileImages.length - 1;
        updateMainPhoto(mobileImages[currentMobileIndex]);
        updateMobileDots();
      } else if (swipeDistance < -minSwipeDistance) {
        // Свайп влево (следующее изображение)
        currentMobileIndex =
          currentMobileIndex < mobileImages.length - 1
            ? currentMobileIndex + 1
            : 0;
        updateMainPhoto(mobileImages[currentMobileIndex]);
        updateMobileDots();
      }
    }
  }
}

  // Изменение цвета иконки STAR
  document.querySelectorAll(".star_icon").forEach(function (star) {
    star.addEventListener("click", function (e) {
      e.stopPropagation();
      star.classList.toggle("selected");
    });
  });

  // Отправка жалобы (второй оверлей)
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

  // Закрытие complaintMenu при клике вне его
  document.addEventListener("click", function (e) {
    if (
      complaintMenu &&
      complaintMenu.classList.contains("active") &&
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

  // Логика для информационного меню (первый оверлей)
  const informationButton = document.getElementById("informationButton");
  const informationMenu = document.getElementById("informationMenu");
  const informationOverlay = document.getElementById("overlay");
  const closeButton = document.querySelector(".close_button");

  function openInformationMenu() {
    if (informationMenu) informationMenu.classList.add("active");
    if (informationOverlay) informationOverlay.classList.add("active");
  }

  function closeInformationMenu() {
    if (informationMenu) informationMenu.classList.remove("active");
    if (informationOverlay) informationOverlay.classList.remove("active");
  }

  function openLink(url) {
    window.open(url, "_blank");
  }

  if (informationButton) {
    informationButton.addEventListener("click", function (e) {
      e.preventDefault();
      openInformationMenu();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      closeInformationMenu();
    });
  }

  // Закрытие informationMenu при клике вне его
  document.addEventListener("click", function (event) {
    if (
      informationMenu &&
      informationMenu.classList.contains("active") &&
      !informationMenu.contains(event.target) &&
      informationButton &&
      !informationButton.contains(event.target)
    ) {
      closeInformationMenu();
    }
  });

  console.log("Script initialization completed");
});

// Блокировка масштабирования на мобиле пальцами или двойным тапом
document.addEventListener(
  "touchmove",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);

document.addEventListener(
  "dblclick",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  { passive: false }
);

// Функция restoreFromLocalStorage
function restoreFromLocalStorage() {
  const selectedDistricts = localStorage.getItem("selectedDistricts");
  const selectedTypes = localStorage.getItem("selectedTypes");
  const selectedTerms = localStorage.getItem("selectedTerms");
  const selectedFilters = localStorage.getItem("selectedFilters");
  if (selectedDistricts) {
    JSON.parse(selectedDistricts).forEach((district) => {
      const checkbox = document.querySelector(
        `.district input[type='checkbox'][value='${district}']`
      );
      if (checkbox) checkbox.checked = true;
    });
  }
  if (selectedTypes) {
    JSON.parse(selectedTypes).forEach((type) => {
      const checkbox = document.querySelector(
        `.type input[type='checkbox'][value='${type}']`
      );
      if (checkbox) checkbox.checked = true;
    });
  }
  if (selectedTerms) {
    JSON.parse(selectedTerms).forEach((term) => {
      const checkbox = document.querySelector(
        `.term input[type='checkbox'][value='${term}']`
      );
      if (checkbox) checkbox.checked = true;
    });
  }
  if (selectedFilters) {
    JSON.parse(selectedFilters).forEach((filter) => {
      const checkbox = document.querySelector(
        `.filter input[type='checkbox'][value='${filter}']`
      );
      if (checkbox) checkbox.checked = true;
    });
  }
}
