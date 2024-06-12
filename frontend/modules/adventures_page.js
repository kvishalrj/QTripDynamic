
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  
  const city = params.get('city');
  
  // console.log(city);

  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let adventures = await response.json();
    return adventures;

  } catch (error) {
    console.error("Error fetching cities:", error);
    return null; 
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  if (adventures) {
    adventures.forEach((key) => {
      
      const adventureCard = document.createElement("div");
      adventureCard.className = "col-6 col-lg-3 mb-3"; // Bootstrap classes for responsiveness

      const adventureLink = document.createElement("a");
      adventureLink.href = `detail/?adventure=${key.id}`;
      adventureLink.id = key.id; 

      adventureLink.innerHTML = `
      <div class="activity-card">
        <img src="${key.image}" class="activity-card img" alt="${key.category}">
        <div class="adventure-detail-card">
          <div class="d-flex justify-content-between">
              <h6>${key.name}</h6>
              <h6>${key.costPerHead}</h6>
          </div>
          <div class="d-flex justify-content-between">
              <h6>Duration</h6>
              <h6>${key.duration} Hours</h6>
          </div>
        </div>
        <p class="category-banner">${key.category}</p>
      </div>
      `;    

      adventureCard.appendChild(adventureLink);

      const dataContainer = document.getElementById("data");
      dataContainer.appendChild(adventureCard);

    });
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adventure => adventure.duration >= low && adventure.duration <= high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure => {
    return categoryList.includes(adventure.category);
  });

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = list;

  // Filter by duration if duration filter is provided
  if (filters.duration) {
    let li = filters.duration.split("-");
    let low = li[0];
    let high = li[1];

    filteredList = filterByDuration(filteredList, low, high);
  }

  // Filter by category if category filter is provided
  if (filters.category && filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  return filteredList;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  try {
    
    var filtersJSON = JSON.stringify(filters);

    localStorage.setItem('filters', filtersJSON);
    
    return true;

  } catch (error) {
    console.error('Error saving filters to localStorage:', error);
    return false;
  }

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  try {
      var filtersJSON = localStorage.getItem('filters');
      
      var filters = JSON.parse(filtersJSON);
      
      return filters;
    } catch (error) {
      console.error('Error retrieving filters from localStorage:', error);
      return null;
    }

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  var durationSelect = document.getElementById('duration-select');
  if (filters && filters.duration) {
      durationSelect.value = filters.duration;
  }

  const categoryListContainer = document.getElementById('category-list');
  categoryListContainer.innerHTML = '';

  if (filters.category) {
    filters.category.forEach(category => {
      const categoryPill = document.createElement('span');
      categoryPill.className = 'category-filter';
      categoryPill.textContent = category;
      categoryListContainer.appendChild(categoryPill);
    });
  }

}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
