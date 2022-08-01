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
  slidesPerView: 2,
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
    const swiperSlideDiv2 = document.createElement("div");
    const recipeTitle = document.createElement("p");
    recipeTitle.innerText = result.recipe.label;
    swiperSlideDiv2.classList.add("tumb-tile");
    const images = document.createElement("img");
    images.src = result.recipe.image;

    swiperWrapper.appendChild(swiperSlideDiv);
    swiperSlideDiv.appendChild(swiperSlideDiv2);
    swiperSlideDiv.appendChild(recipeTitle);
    swiperSlideDiv2.appendChild(images);
  });
};
