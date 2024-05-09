import { Events } from '../Events.js';

export class BookingPage {
    #events = null;
    #today = null;
    #data = null;

    constructor(data) {
        this.#events = Events.events();
        this.#today = new Date().toISOString().split('T')[0];
        this.#data = data;
        console.log("minhdz", this.#data)
    }

    async render() {
        const bookingElm = document.createElement('form');
        // bookingElm.id = 'booking-form'; // can make it to be more unique by adding user id
        bookingElm.classList.add('booking-form');

        const headerContainer = document.createElement('div');
        headerContainer.id = 'header-container';

        const imageBackground = document.createElement('img');
        imageBackground.id = 'background-image';
        imageBackground.src = `/assets/building_images/${this.#data.img_name}`;
        imageBackground.alt = 'Building image';
        imageBackground.classList.add('background-image');
        headerContainer.addEventListener('mouseenter', () => {
            imageBackground.style.opacity = 0.6;
        });

        headerContainer.addEventListener('mouseleave', () => {
            imageBackground.style.opacity = 0.27;
        });

        // Appending header container to booking element
        bookingElm.appendChild(headerContainer);

        const headerElm = document.createElement('div');
        headerElm.id = 'header';
        headerElm.innerText = `${this.#data.room_type}-${this.#data.room_label}`; // TODO: Must be dynamic and retrieved from user card

        const metadataContainer = document.createElement('div');
        metadataContainer.id = 'metadata-container';

        // Definition for location icon and location info that will stay inside locationContainer
        const locationIconElm = document.createElement('img');
        locationIconElm.src = '/assets/location-solid-icon.svg';
        locationIconElm.alt = 'Location icon';
        locationIconElm.classList.add('icon-svg');

        const locationInfoElm = document.createElement('div');
        locationInfoElm.classList.add('description-metadata');
        locationInfoElm.innerText = `${this.#data.building_name}` // TODO: Must be dynamic and retrieved from user card

        // Container for location icon and location info
        const locationContainer = document.createElement('div');
        locationContainer.id = 'location-container';
        locationContainer.classList.add('metadata-wrapper');
        locationContainer.appendChild(locationIconElm);
        locationContainer.appendChild(locationInfoElm);

        // Definition for availability icon and availability info that will stay inside availabilityContainer
        // Availability icon should also different based on availability
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
        headerContainer.appendChild(imageBackground)
        headerContainer.appendChild(metadataContainer)
        headerContainer.appendChild(reserveButtonWrapper)

        // form inputs declaration
        const formInputsContainer = document.createElement('div');
        formInputsContainer.id = 'form-inputs-container';
        formInputsContainer.classList.add('form-inputs-container');

        // Number of people input declaration
        const numberPeopleWrapper = document.createElement('div');
        numberPeopleWrapper.classList.add('input-wrapper');

        const labelNumberPeople = document.createElement('label');
        labelNumberPeople.for = 'number-people';
        labelNumberPeople.innerText = 'Number of people';

        const inputNumberPeople = document.createElement('input');
        inputNumberPeople.type = 'number';
        inputNumberPeople.id = 'number-people';
        inputNumberPeople.name = 'numberPeople';

        // Appending number of people input to its wrapper
        numberPeopleWrapper.appendChild(labelNumberPeople);
        numberPeopleWrapper.appendChild(inputNumberPeople);

        // Optional Question: Will you be using the desktop computer?
        const optionalQuestionWrapper = document.createElement('div');
        optionalQuestionWrapper.classList.add('input-wrapper');

        const labelDesktopComputer = document.createElement('label');
        labelDesktopComputer.for = 'desktop-computer';
        labelDesktopComputer.innerText = 'Will you be using the desktop computer?'; // Must be dynamic to ask question regarding place that book-er considering

        const selectDesktopComputer = document.createElement('select');
        selectDesktopComputer.id = 'desktop-computer';
        selectDesktopComputer.name = 'desktopComputer';

        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.innerText = 'Select an option';

        const optionYes = document.createElement('option');
        optionYes.value = 'yes';
        optionYes.innerText = 'Yes';

        const optionNo = document.createElement('option');
        optionNo.value = 'no';
        optionNo.innerText = 'No';

        // Appending options to select element
        selectDesktopComputer.appendChild(optionDefault);
        selectDesktopComputer.appendChild(optionYes);
        selectDesktopComputer.appendChild(optionNo);

        // Appending label and select element to its wrapper
        optionalQuestionWrapper.appendChild(labelDesktopComputer);
        optionalQuestionWrapper.appendChild(selectDesktopComputer);

        const dateWrapper = document.createElement('div');
        dateWrapper.classList.add('input-wrapper');

        const labelDate = document.createElement('label');
        labelDate.for = 'date';
        labelDate.innerText = 'Date';

        const inputDate = document.createElement('input');
        inputDate.type = 'date';
        inputDate.id = 'date';
        inputDate.name = 'date';
        inputDate.min = this.#today;

        // Appending date input to its wrapper
        dateWrapper.appendChild(labelDate);
        dateWrapper.appendChild(inputDate);

        // Time slot input declaration
        const timeSlotWrapper = document.createElement('div');
        timeSlotWrapper.classList.add('input-wrapper');

        const labelTimeSlot = document.createElement('label');
        labelTimeSlot.for = 'time-slot';
        labelTimeSlot.innerText = 'Time slot';

        const selectTimeFrom = document.createElement('input');
        selectTimeFrom.type = 'text'
        selectTimeFrom.id = 'time-from';
        selectTimeFrom.name = 'timeFrom';
        selectTimeFrom.classList.add('time-slot');
        selectTimeFrom.placeholder = 'From';
        selectTimeFrom.disabled = true;
        selectTimeFrom.onfocus = (event) => {
            event.target.type = 'time';
        }
        selectTimeFrom.addEventListener('blur', (event) => {
            if (event.target.value === '') {
                event.target.type = 'text';
                event.target.placeholder = 'From';
            }
        });
        selectTimeFrom.min = this.#today;

        // Options should be dynamically generated based on availability
        const selectTimeTo = document.createElement('input');
        selectTimeTo.type = 'text'
        selectTimeTo.id = 'time-to';
        selectTimeTo.name = 'timeTo';
        selectTimeTo.classList.add('time-slot');
        selectTimeTo.min = this.#today;
        selectTimeTo.placeholder = 'To';
        selectTimeTo.disabled = true;
        selectTimeTo.onfocus = (event) => {
            if (event.target.type == 'text') {
                event.target.type = 'time';
            }
        }
        selectTimeTo.addEventListener('blur', (event) => {
            if (event.target.value === '') {
                event.target.type = 'text';
                event.target.placeholder = 'To';
            }
        });

        const timeInputWrapper = document.createElement('div');
        timeInputWrapper.classList.add('time-slot-grid');

        timeInputWrapper.appendChild(selectTimeFrom);
        timeInputWrapper.appendChild(selectTimeTo);

        // Appending label and select elements to its wrapper
        timeSlotWrapper.appendChild(labelTimeSlot);
        timeSlotWrapper.appendChild(timeInputWrapper);

        // Add event listener to update 'time to' minimum date
        selectTimeFrom.addEventListener('change', function () {
            selectTimeTo.min = selectTimeFrom.value;
        });

        // Add event listener to update 'time from' maximum date
        selectTimeTo.addEventListener('change', function () {
            selectTimeFrom.max = selectTimeTo.value;
        });

        inputDate.addEventListener('change', function () {
            if (inputDate.value) {
                selectTimeFrom.disabled = false;
                selectTimeTo.disabled = false;
            } else {
                selectTimeFrom.disabled = true;
                selectTimeTo.disabled = true;
            }
        });

        const saveInfoElm = document.createElement('div');
        saveInfoElm.id = 'save-info-text';
        saveInfoElm.innerText = '*We will save the inputs above so you do not have to re-enter them each time you book';

        const reserveButtonWrapperEnd = document.createElement('div');
        const reserveButtonElmEnd = document.createElement('button');
        reserveButtonElmEnd.id = 'reserve-button-end';
        reserveButtonElmEnd.innerText = 'Reserve';
        reserveButtonElmEnd.type = 'submit';
        reserveButtonElmEnd.classList.add('custom-button');
        reserveButtonWrapperEnd.appendChild(reserveButtonElmEnd);
        // Appending all form inputs to form inputs container

        formInputsContainer.appendChild(numberPeopleWrapper);
        formInputsContainer.appendChild(optionalQuestionWrapper);
        formInputsContainer.appendChild(dateWrapper);
        formInputsContainer.appendChild(timeSlotWrapper);
        formInputsContainer.appendChild(saveInfoElm);
        formInputsContainer.appendChild(reserveButtonWrapperEnd);

        // Appending form inputs container to booking element
        bookingElm.appendChild(formInputsContainer);

        bookingElm.appendChild(formInputsContainer);

        // Tonight TODOs:
        /**
         * The background can change to images instead so that it looks cooler
         * Set up url from card to this sites 
         * Do the submit event listener
         * Fetch data from card to this site (maybe from backend instead!)
         */
        // Event listener for form submission
        bookingElm.addEventListener('submit', event => {
            event.preventDefault();
            const numberPeople = bookingElm.querySelector('#number-people').value;
            const desktopComputer = bookingElm.querySelector('#desktop-computer').value;
            const timeFrom = bookingElm.querySelector('#time-from').value;
            const timeTo = bookingElm.querySelector('#time-to').value;

            // this.#events.publish('book-room', { numberPeople, desktopComputer, timeFrom, timeTo });
        });

        return bookingElm;
    }
}


