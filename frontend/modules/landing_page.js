import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init");
  console.log(`${config.backendEndpoint}/cities`);
  let cities = await fetchCities();
  console.log(cities)

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/cities`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let cities = await response.json();
    return cities;

  } catch (error) {
    console.error("Error fetching cities:", error);
    return null; 
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // Create the city card element

  const cityCard = document.createElement("div");
  cityCard.className = "col-12 col-sm-6 col-lg-3 mb-4"; // Bootstrap classes for responsiveness

  const cityLink = document.createElement("a");
  cityLink.href = `pages/adventures/?city=${id}`;
  cityLink.id = id; 

  cityLink.innerHTML = `
  <div class="tile">
    <img src="${image}" class="card-img-top" alt="${city}">
    <div class="tile-text text-center mb-2">
      <h5 class="card-title">${city}</h5>
      <p class="card-text">${description}</p>
    </div>
  </div>
  `;    

  cityCard.appendChild(cityLink);

  const dataContainer = document.getElementById("data");
  dataContainer.appendChild(cityCard);

}

export { init, fetchCities, addCityToDOM };
