import { Events } from '../Events.js';

export class Booking {
    #events = null;

    constructor() {
        this.#events=  Events.events();
    }

    async render() {
        const bookingElm = document.createElement('div');
        bookingElm.id = 'booking-form';

        const headerElm = document.createElement('h1');
        headerElm.innerText = 'Study Room';

        const libraryInfoElm = document.createElement('p');
        libraryInfoElm.innerHTML = '<strong>W.E.B. Du Bois Library</strong>'


        const formElm = document.createElement('form');
        formElm.id = 'booking-form';
        formElm.innerHTML = `
            <label for="number-people">Number of people</label>
            <input type="number" id="number-people" name="numberPeople" required>
            
            <label for="desktop-computer">Will you be using the desktop computer?</label>
            <select id="desktop-computer" name="desktopComputer">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            
            <label for="time-slot">Time slot</label>
            <select id="time-from" name="timeFrom" required>
                <!-- Options should be dynamically generated based on availability -->
            </select>
            <select id="time-to" name="timeTo" required>
                <!-- Options should be dynamically generated based on availability -->
            </select>
            
            <button type="submit" id="reserve-button">Reserve</button>
        `;

        formElm.addEventListener('submit', event => {
            event.preventDefault();
            const numberPeople = formElm.querySelector('#number-people').value;
            const desktopComputer = formElm.querySelector('#desktop-computer').value;
            const timeFrom = formElm.querySelector('#time-from').value;
            const timeTo = formElm.querySelector('#time-to').value;
      
            this.#events.publish('book-room', { numberPeople, desktopComputer, timeFrom, timeTo });
          });
      
          const saveInfoElm = document.createElement('p');
          saveInfoElm.innerText = '*We will save the inputs above so you do not have to re-enter them each time you book';
      
          bookingElm.appendChild(headerElm);
          bookingElm.appendChild(libraryInfoElm);
          bookingElm.appendChild(formElm);
          bookingElm.appendChild(saveInfoElm);
      
          return bookingElm;
    }
}


