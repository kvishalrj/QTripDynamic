import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);

  const adventureId = params.get("adventure");

  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let adventureDetails = await response.json();
    return adventureDetails;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  if (adventure) {
    
    let adventureName = document.getElementById("adventure-name");
    adventureName.innerHTML = adventure.name;

    let adventureSubtitle = document.getElementById("adventure-subtitle");
    adventureSubtitle.innerHTML = adventure.subtitle;

    let photoGallery = document.getElementById("photo-gallery");
    adventure.images.forEach(img =>{

      let imgDiv = document.createElement("div");

      imgDiv.innerHTML = `<img src="${img}" alt="${adventure.name}" class="activity-card-image">`;

      photoGallery.appendChild(imgDiv);

    });

    let adventureContent = document.getElementById("adventure-content");
    adventureContent.innerHTML = adventure.content;

  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // Get the photo gallery element
  let photoGallery = document.getElementById("photo-gallery");
  
  // Clear any existing content
  photoGallery.innerHTML = "";

  // Create the carousel container
  let carouselContainer = document.createElement("div");
  carouselContainer.setAttribute("id", "carouselExampleIndicators");
  carouselContainer.classList.add("carousel", "slide");
  carouselContainer.setAttribute("data-bs-ride", "carousel");

  // Create the carousel indicators
  let carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");
  images.forEach((img, index) => {
    let indicator = document.createElement("button");
    indicator.setAttribute("type", "button");
    indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicator.setAttribute("data-bs-slide-to", index);
    if (index === 0) {
      indicator.classList.add("active");
      indicator.setAttribute("aria-current", "true");
    }
    indicator.setAttribute("aria-label", `Slide ${index + 1}`);
    carouselIndicators.appendChild(indicator);
  });

  // Create the carousel inner container
  let carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");
  images.forEach((img, index) => {
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselItem.classList.add("active");
    }
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", img);
    imgElement.classList.add("d-block", "w-100", "activity-card-image");
    imgElement.setAttribute("alt", `Slide ${index + 1}`);
    carouselItem.appendChild(imgElement);
    carouselInner.appendChild(carouselItem);
  });

  // Create the carousel control prev button
  let carouselControlPrev = document.createElement("button");
  carouselControlPrev.classList.add("carousel-control-prev");
  carouselControlPrev.setAttribute("type", "button");
  carouselControlPrev.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlPrev.setAttribute("data-bs-slide", "prev");
  carouselControlPrev.innerHTML = `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;

  // Create the carousel control next button
  let carouselControlNext = document.createElement("button");
  carouselControlNext.classList.add("carousel-control-next");
  carouselControlNext.setAttribute("type", "button");
  carouselControlNext.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlNext.setAttribute("data-bs-slide", "next");
  carouselControlNext.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;

  // Append everything to the carousel container
  carouselContainer.appendChild(carouselIndicators);
  carouselContainer.appendChild(carouselInner);
  carouselContainer.appendChild(carouselControlPrev);
  carouselContainer.appendChild(carouselControlNext);

  // Append the carousel container to the photo gallery element
  photoGallery.appendChild(carouselContainer);
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
