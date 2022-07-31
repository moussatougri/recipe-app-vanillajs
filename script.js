//Recipe API
const appId = "42d120f9";
const appKeys = "b0dc85059ad7e651a82eb38781cb8389";

//selectoren
const searchBar = document.querySelector(".search-bar");
const searchBarInput = document.querySelector("input");

//submit input value
searchBar.addEventListener("submit", function (e) {
  e.preventDefault();
  searchBarInput.value;
  console.log(searchBarInput.value);
  fetchData(searchBarInput.value);
  searchBarInput.value = "";
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
      console.log(data.hits);
    });
};
