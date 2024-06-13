import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
  
    const response = await fetch(`${config.backendEndpoint}/reservations/`);

    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    
    const reservations = await response.json();
    return reservations;

  } catch (error) {
    console.error('Error fetching reservations:', error);
    return null;
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    const noReservationBanner = document.getElementById('no-reservation-banner');
    const reservationTableParent = document.getElementById('reservation-table-parent');
    const reservationTable = document.getElementById('reservation-table');
  
    if (reservations.length === 0) {
      noReservationBanner.style.display = 'block';
      reservationTableParent.style.display = 'none';
    } else {
      noReservationBanner.style.display = 'none';
      reservationTableParent.style.display = 'block';
  
      reservations.forEach(reservation => {
        const tr = document.createElement('tr');
  
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const bookingDate = new Date(reservation.date).toLocaleDateString('en-IN', options);
        const bookingTime = new Date(reservation.time).toLocaleString('en-IN', { 
          weekday: undefined, 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          second: 'numeric', 
          hour12: true 
        }).replace(' at', ',');
  
        tr.innerHTML = `
          <td>${reservation.id}</td>
          <td>${reservation.name}</td>
          <td>${reservation.adventureName}</td>
          <td>${reservation.person}</td>
          <td>${bookingDate}</td>
          <td>${reservation.price}</td>
          <td>${bookingTime}</td>
          <td>
            <button id="${reservation.id}" class="reservation-visit-button">
              <a href="/frontend/pages/adventures/detail/?adventure=${reservation.adventure}" target="_blank">Visit Adventure</a>
            </button>
          </td>
        `;
  
        reservationTable.appendChild(tr);
      });
    }

}

export { fetchReservations, addReservationToTable };
