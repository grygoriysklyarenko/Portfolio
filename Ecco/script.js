let headerBtn = document.querySelector(".header__button");
headerBtn.addEventListener(`click`, function () {
  document
    .querySelector(".footer__shopping-block")
    .scrollIntoView({ behavior: "smooth" });
});

let bootsDescription = document.querySelector(".footer__boot-description");
let bootsImages = document.querySelectorAll(".footer__boot-images");
let bootsImagesMobile = document.querySelector(".footer__boot-images--mobile");
let footerSlogan = document.querySelector(".footer__slogan");
let form = document.querySelector(".form");
let blackSneaker = document.querySelector(".footer__black-sneaker");
let redSneaker = document.querySelector(".footer__red-sneaker");

class Boot {
  constructor(model) {
    this.getInfo(model);
    this.getData();
    this.model = model;
  }

  async getInfo(model) {
    let response = await fetch(`./json/${model}.json`),
      data = await response.json();

    this.setInfo(data);
  }

  setInfo(data) {
    for (let key in data) {
      this[key] = data[key];
    }

    this.renderInfo();
  }

  renderInfo() {
    for (let key in this) {
      key === "name" && (footerSlogan.innerHTML = this[key]);

      if (key === "description") {
        let table = document.createElement("table");
        let description = this[key];

        for (let key in description) {
          table.innerHTML += `<tr class="footer__boot-description--tr"><td>${key}: </td><td>${description[key]}</td></tr>`;
        }

        bootsDescription.append(table);
      }

      if (key === "images") {
        let images = this[key];

        for (let key in images) {
          bootsImages.forEach(function (boot) {
            boot.innerHTML += `<img src="${images[key]}" alt="boot" class="footer__boot-image" />`;
          });
        }
      }
    }

    let bootImage = document.querySelectorAll(".footer__boot-image");
    bootImage.forEach(function (image) {
      image.addEventListener(`click`, function () {
        modalWrapper.style.display = `flex`;
        modalWrapper.innerHTML = `<img src="${this.src}" alt="boot" class="modal__image" />`;

        let modalImage = document.querySelector(".modal__image");
        modalImage.addEventListener(`click`, function (e) {
          e.stopPropagation();
        });
      });
    });
  }

  async getData() {
    let response_size = await fetch(`./json/sizes.json`),
      data_sizes = await response_size.json();
    let response_color = await fetch(`./json/colors.json`),
      data_colors = await response_color.json();
    this.renderData(data_sizes, data_colors);
  }

  renderData(data_sizes, data_colors) {
    for (let key in data_colors) {
      let colors = data_colors[key];
      let selectColor = document.querySelector(".select-color");
      let selectColorValue = document.querySelector(".select-color__value");
      let selectColorDropdown = document.querySelector(
        ".select-color__dropdown"
      );
      selectColorDropdown.innerHTML = "";
      colors.forEach(function (color) {
        let colorResponse = document.querySelector(".color-response");
        selectColorDropdown.innerHTML += `<li class="select__option select-color__option">Цвет: ${color}</li>`;
        selectColorDropdown.addEventListener("click", (e) => {
          let option = e.target.closest(".select-color__option");
          if (option) {
            selectColorValue.textContent = option.textContent;
            e.target.closest(".select-color").blur();
            selectColor.dispatchEvent(
              new CustomEvent("change", { detail: option.textContent })
            );
          }
        });
        selectColor.addEventListener(
          "change",
          (e) => (colorResponse.value = e.detail)
        );
      });
    }

    for (let key in data_sizes) {
      let sizes = data_sizes[key];
      let selectSize = document.querySelector(".select-size");
      let selectSizeValue = document.querySelector(".select-size__value");
      let selectSizeDropdown = document.querySelector(".select-size__dropdown");
      selectSizeDropdown.innerHTML = "";
      sizes.forEach(function (size) {
        let sizeResponse = document.querySelector(".size-response");
        selectSizeDropdown.innerHTML += `<li class="select__option select-size__option">Размер: ${size}</li>`;
        selectSizeDropdown.addEventListener("click", (e) => {
          let option = e.target.closest(".select-size__option");
          if (option) {
            selectSizeValue.textContent = option.textContent;
            e.target.closest(".select-size").blur();
            selectSize.dispatchEvent(
              new CustomEvent("change", { detail: option.textContent })
            );
          }
          selectSize.addEventListener(
            "change",
            (e) => (sizeResponse.value = e.detail)
          );
        });
      });
    }
  }
}

let Cross = new Boot(`soft_8_black`);

let arrowForward = document.querySelector(".footer__arrow-button--reverse");
arrowForward.addEventListener(`click`, function () {
  bootsImages.forEach(function (boot) {
    boot.innerHTML = ``;
  });
  bootsDescription.innerHTML = ``;
  Cross = new Boot(`soft_8_red`);
  arrowForward.setAttribute("disabled", true);
  arrowBackward.removeAttribute("disabled");
  arrowForward.classList.toggle(`footer__arrow-button--invisible`);
  arrowBackward.classList.toggle(`footer__arrow-button--invisible`);
  blackSneaker.classList.remove(`footer__black-sneaker--moove-up`);
  redSneaker.classList.add(`footer__red-sneaker--moove-up`);
  blackSneaker.classList.add(`footer__black-sneaker--moove-down`);
  redSneaker.classList.remove(`footer__red-sneaker--moove-down`);
});

let arrowBackward = document.querySelector(".footer__arrow-button");
arrowBackward.addEventListener(`click`, function () {
  bootsImages.forEach(function (boot) {
    boot.innerHTML = ``;
  });
  bootsDescription.innerHTML = ``;
  Cross = new Boot(`soft_8_black`);
  arrowBackward.setAttribute("disabled", true);
  arrowForward.removeAttribute("disabled");
  arrowBackward.classList.toggle(`footer__arrow-button--invisible`);
  arrowForward.classList.toggle(`footer__arrow-button--invisible`);
  blackSneaker.classList.remove(`footer__black-sneaker--moove-down`);
  redSneaker.classList.add(`footer__red-sneaker--moove-down`);
  blackSneaker.classList.add(`footer__black-sneaker--moove-up`);
  redSneaker.classList.remove(`footer__red-sneaker--moove-up`);
});

let modalWrapper = document.querySelector(".modal__wrapper");
modalWrapper.addEventListener(`click`, function () {
  modalWrapper.style.display = `none`;
});

let bootButton = document.querySelector(".footer__boot-button");
bootButton.addEventListener(`click`, function () {
  bootsImages.forEach(function (boot) {
    boot.style.display = `none`;
  });
  bootsDescription.style.display = `none`;
  form.style.display = `flex`;
  bootButton.style.display = `none`;
});

let formBack = document.querySelector(".form__back");
formBack.addEventListener(`click`, function () {
  form.style.display = `none`;
  bootsImages.forEach(function (boot) {
    boot.style.display = `flex`;
  });
  bootsDescription.style.display = `flex`;
  bootButton.style.display = `flex`;
  bootsImagesMobile.style.display = `none`;
});
