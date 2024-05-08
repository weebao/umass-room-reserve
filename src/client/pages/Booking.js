import { Events } from '../Events.js';

export class BookingPage {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const bookingElm = document.createElement('div');
        // bookingElm.id = 'booking-form'; // can make it to be more unique by adding user id
        bookingElm.classList.add('booking-form');

        const headerContainer = document.createElement('div');
        headerContainer.id = 'header-container';

        // Appending header container to booking element
        bookingElm.appendChild(headerContainer);

        const headerElm = document.createElement('div');
        headerElm.id = 'header';
        headerElm.innerText = 'Study Room'; // TODO: Must be dynamic and retrieved from user card

        const metadataContainer = document.createElement('div');
        metadataContainer.id = 'metadata-container';

        // Definition for location icon and location info that will stay inside locationContainer
        const locationIconElm = document.createElement('img');
        locationIconElm.src = '/assets/location-solid-icon.svg';
        locationIconElm.alt = 'Location icon';
        locationIconElm.classList.add('icon-svg');

        const locationInfoElm = document.createElement('div');
        locationInfoElm.classList.add('description-metadata');
        locationInfoElm.innerText = 'W.E.B. Du Bois Library' // TODO: Must be dynamic and retrieved from user card
        
        // Container for location icon and location info
        const locationContainer = document.createElement('div');
        locationContainer.id = 'location-container';
        locationContainer.classList.add('metadata-wrapper');
        locationContainer.appendChild(locationIconElm);
        locationContainer.appendChild(locationInfoElm);

        // Definition for availability icon and availability info that will stay inside availabilityContainer
        const availabilityIconElm = document.createElement('img');
        availabilityIconElm.src = '/assets/tick-icon.svg'; // TODO: must be dynamic, based on what is really available
        availabilityIconElm.alt = 'Availability icon';
        availabilityIconElm.classList.add('icon-svg');

        const availabilityInfoElm = document.createElement('div');
        availabilityInfoElm.classList.add('description-metadata');
        availabilityInfoElm.innerText = 'Available' // TODO: Must be dynamic and retrieved from user card

        // Container for availability icon and availability info
        const availabilityContainer = document.createElement('div');
        availabilityContainer.id = 'availability-container';
        availabilityContainer.classList.add('metadata-wrapper');
        availabilityContainer.appendChild(availabilityIconElm);
        availabilityContainer.appendChild(availabilityInfoElm);

        metadataContainer.appendChild(headerElm)
        metadataContainer.appendChild(locationContainer)
        metadataContainer.appendChild(availabilityContainer)

        // Reserve button declaration
        const reserveButtonWrapper = document.createElement('div');
        const reserveButtonElm = document.createElement('button');
        reserveButtonElm.id = 'reserve-button';
        reserveButtonElm.innerText = 'Reserve';
        reserveButtonElm.type = 'submit';
        reserveButtonElm.classList.add('custom-button');
        reserveButtonWrapper.appendChild(reserveButtonElm);

        // Appending necessary children to header container
        headerContainer.appendChild(metadataContainer)
        headerContainer.appendChild(reserveButtonWrapper)

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

        bookingElm.appendChild(formElm);
        bookingElm.appendChild(saveInfoElm);

        return bookingElm;
    }
}


