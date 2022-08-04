//Recipe API
const appId = "42d120f9";
const appKeys = "b0dc85059ad7e651a82eb38781cb8389";

//selectoren
const searchBar = document.querySelector(".search-bar");
const searchBarInput = document.querySelector("input");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const section = document.querySelector(".thumb-section");
const cardSection = document.querySelector(".card-section");

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
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 5,
      spaceBetween: 5,
    },
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

    const button = document.createElement("a");
    button.classList.add("view-button");
    button.innerText = "more Details";

    const recipeTitle = document.createElement("h3");
    recipeTitle.innerText = result.recipe.label;

    button.addEventListener("click", getMealCard);

    swiperWrapper.appendChild(swiperSlideDiv);
    swiperSlideDiv.appendChild(swiperSlideContainer);
    swiperSlideDiv.appendChild(recipeTitle);
    swiperSlideContainer.appendChild(button);
    swiperSlideContainer.appendChild(images);
    swiperSlideContainer.appendChild(button);
  });
};

function getMealCard(e) {
  e.preventDefault();
  if (e.target.classList.contains("view-button")) {
    let mealItem = e.target.parentElement;

    if (e.target) {
      section.style.display = "none";
      cardSection.style.display = "flex";
    }

    const baseUrl = `https://api.edamam.com/search?q=${mealItem.dataset.id}&app_id=${appId}&app_key=${appKeys}&to=1`;

    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => viewMoreCard(data.hits));
  }
}

const viewMoreCard = (data) => {
  data = data[0].recipe;

  let html = `
            <div class="card-container">
              <div class="detail-view">
              <button class="close-btn">X</button>
              <h2>${data.label}</h2>
                <img
                src="${data.image}"
                alt="food photo"
                class="detail-img"
              />
                 <p class="food-calorien">Calories: ${data.calories.toFixed(
                   2
                 )} kcal</p>
                 <p class="cuisineType">
                 cuisine type: ${data.cuisineType}
                </p>
                <h3 class="subcardtitle">HealthLabels</h3>
                <p class="healthLabels">
                  ${data.healthLabels}
                </p>
                <h3 class="subcardtitle">Ingredient</h3>
                <p class="ingredientLines">
                  ${data.ingredientLines}
                </p>
              </div>
            </div>  
           `;
  cardSection.innerHTML = html;

  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", function (e) {
    section.style.display = "block";
    cardSection.style.display = "none";
  });
};
