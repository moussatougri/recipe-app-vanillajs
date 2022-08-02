//Recipe API
const appId = "42d120f9";
const appKeys = "b0dc85059ad7e651a82eb38781cb8389";

//selectoren
const searchBar = document.querySelector(".search-bar");
const searchBarInput = document.querySelector("input");
const swiperWrapper = document.querySelector(".swiper-wrapper");

//submit input value
searchBar.addEventListener("submit", function (e) {
  e.preventDefault();
  searchBarInput.value;
  fetchData(searchBarInput.value);
  searchBarInput.value = "";
});

//swiper
const swiper = new Swiper(".swiper", {
  // Optional parameters
  spaceBetween: 5,
  slidesPerView: 1,
  loop: true,
  freeMode: true,
  loopAdditionalSlides: 5,
  speed: 500,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const fetchData = (result) => {
  const basicUrl = `https://api.edamam.com/search?q=${result}&app_id=${appId}&app_key=${appKeys}&to=20`;
  fetch(basicUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      createSilder(data.hits);
    });
};

const createSilder = (results) => {
  results.forEach(function (result) {
    const swiperSlideDiv = document.createElement("div");
    swiperSlideDiv.classList.add("swiper-slide");
    const swiperSlideContainer = document.createElement("div");

    swiperSlideContainer.classList.add("tumb-tile");
    swiperSlideContainer.setAttribute("data-id", `${result.recipe.label}`);
    const images = document.createElement("img");
    images.src = result.recipe.image;

    const button = document.createElement("button");
    button.classList.add("view-button");
    button.innerText = "view more";

    button.addEventListener("click", getMealCard);

    swiperWrapper.appendChild(swiperSlideDiv);
    swiperSlideDiv.appendChild(swiperSlideContainer);
    swiperSlideContainer.appendChild(button);
    swiperSlideContainer.appendChild(images);
    swiperSlideContainer.appendChild(button);
  });
};

function getMealCard(e) {
  e.preventDefault();
  if (e.target.classList.contains("view-button")) {
    let mealItem = e.target.parentElement;

    const baseUrl = `https://api.edamam.com/search?q=${mealItem.dataset.id}&app_id=${appId}&app_key=${appKeys}&to=1`;

    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => viewMoreCard(data.hits));
  }
}

const viewMoreCard = (data) => {
  data = data[0].recipe;
  console.log(data.image);
};
