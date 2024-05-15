import { Events } from '../Events.js';
import { URL } from "../services/url.js";
import { getSession } from '../modules/session.js';
import { reserveRoom } from '../services/reserve.js';

export class BookingPage {
    #events = null;
    #today = null;
    #data = null;
    #roomProps = null;

    constructor(data) {
        this.#events = Events.events();
        this.#today = new Date().toISOString().split('T')[0];
        this.#data = data
        this.#roomProps = null;
    }

    async render() {
        // we need to fetch to get neccessary data from backend first
        const metaData = await (await fetch(`${URL}/room?id=${this.#data.id}`)).json();

        const bookingElm = document.createElement('form');
        // bookingElm.id = 'booking-form'; // can make it to be more unique by adding user id
        bookingElm.classList.add('booking-form');

        const headerContainer = document.createElement('div');
        headerContainer.id = 'header-container';

        const imageBackground = document.createElement('img');
        imageBackground.id = 'background-image';
        imageBackground.src = `${metaData.img}`;
        imageBackground.alt = 'Building image';
        imageBackground.classList.add('background-image');
        headerContainer.addEventListener('mouseenter', () => {
            imageBackground.style.opacity = 0.75;
            metadataContainer.style.opacity = 0.75;
            reserveButtonElm.style.opacity = 0.75;
        });

        headerContainer.addEventListener('mouseleave', () => {
            imageBackground.style.opacity = 0.25;
            metadataContainer.style.opacity = 1;
            reserveButtonElm.style.opacity = 1;
        });

        // Appending header container to booking element
        bookingElm.appendChild(headerContainer);

        const headerElm = document.createElement('div');
        headerElm.id = 'header';
        headerElm.innerText = `${metaData.name}`; // TODO: Must be dynamic and retrieved from user card

        const metadataContainer = document.createElement('div');
        metadataContainer.id = 'metadata-container';

        // Definition for location icon and location info that will stay inside locationContainer
        const locationIconElm = document.createElement('img');
        locationIconElm.src = '/assets/location-solid-icon.svg';
        locationIconElm.alt = 'Location icon';
        locationIconElm.classList.add('icon-svg');

        const locationInfoElm = document.createElement('div');
        locationInfoElm.classList.add('description-metadata');
        locationInfoElm.innerText = `${metaData.buildingName}` // TODO: Must be dynamic and retrieved from user card

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
        availabilityInfoElm.innerText = `Available ${metaData.availableTimes.length} spots for today` // TODO: Must be dynamic and retrieved from user card

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

        reserveButtonElm.addEventListener('mouseenter', () => {
            reserveButtonElm.style.opacity = 1;
        });

        reserveButtonElm.addEventListener('mouseleave', () => {
            reserveButtonElm.style.opacity = 0.25;
        });

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

        const inputNumberPeople = document.createElement('select');
        // inputNumberPeople.type = 'number';
        inputNumberPeople.id = 'number-people';
        inputNumberPeople.name = 'numberPeople';
      
        const optionDefaultPeople = document.createElement('option');
        optionDefaultPeople.value = '';
        optionDefaultPeople.innerText = 'Select number of people';
        optionDefaultPeople.disabled = true; // Disable the placeholder
        optionDefaultPeople.selected = true; // Mark as selected

        const optionOnePeople = document.createElement('option');
        optionOnePeople.value = '3-5';
        optionOnePeople.innerText = '3-5';

        const optionTwoPeople = document.createElement('option');
        optionTwoPeople.value = 'More than 5';
        optionTwoPeople.innerText = 'More than 5';

        // Appending options to select element
        inputNumberPeople.appendChild(optionDefaultPeople);
        inputNumberPeople.appendChild(optionOnePeople);
        inputNumberPeople.appendChild(optionTwoPeople);

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
        optionDefault.disabled = true; // Disable the placeholder
        optionDefault.selected = true; // Mark as selected

        const optionYes = document.createElement('option');
        optionYes.value = 'Yes';
        optionYes.innerText = 'Yes';

        const optionNo = document.createElement('option');
        optionNo.value = 'No';
        optionNo.innerText = 'No';

        const optionMaybe = document.createElement('option');
        optionMaybe.value = 'Maybe';
        optionMaybe.innerText = 'Maybe';

        // Appending options to select element
        selectDesktopComputer.appendChild(optionDefault);
        selectDesktopComputer.appendChild(optionYes);
        selectDesktopComputer.appendChild(optionNo);
        selectDesktopComputer.appendChild(optionMaybe);

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
        labelTimeSlot.htmlFor = 'time-slot';
        labelTimeSlot.innerText = 'Time slot';

        const selectTimeFrom = document.createElement("select");
        selectTimeFrom.id = 'time-from';
        selectTimeFrom.disabled = true;

        const optionTimeFromDefault = document.createElement('option');
        optionTimeFromDefault.value = '';
        optionTimeFromDefault.innerText = 'From';
        optionTimeFromDefault.disabled = true; // Disable the placeholder
        optionTimeFromDefault.selected = true; // Mark as selected

        selectTimeFrom.appendChild(optionTimeFromDefault);

        const selectTimeTo = document.createElement('select');
        selectTimeTo.id = 'time-to';
        selectTimeTo.disabled = true;

        const optionTimeToDefault = document.createElement('option');
        optionTimeToDefault.value = '';
        optionTimeToDefault.innerText = 'To';
        optionTimeToDefault.disabled = true; // Disable the placeholder
        optionTimeToDefault.selected = true; // Mark as selected

        selectTimeTo.appendChild(optionTimeToDefault);

        const timeInputWrapper = document.createElement('div');
        timeInputWrapper.classList.add('time-slot-grid');

        timeInputWrapper.appendChild(selectTimeFrom);
        timeInputWrapper.appendChild(selectTimeTo);

        // Appending label and select elements to its wrapper
        timeSlotWrapper.appendChild(labelTimeSlot);
        timeSlotWrapper.appendChild(timeInputWrapper);

        // Add event listener to update 'time to' minimum date
        selectTimeFrom.addEventListener('change', () => {
            selectTimeTo.min = selectTimeFrom.value;
        });

        // Add event listener to update 'time from' maximum date
        selectTimeTo.addEventListener('change', () => {
            selectTimeFrom.max = selectTimeTo.value;
        });

        inputDate.addEventListener('change', async () => {
            if (inputDate.value) {
                this.#roomProps = await (await fetch(`${URL}/room?id=${this.#data.id}&date=${inputDate.value}`)).json();
                this.#roomProps["availableTimes"].forEach((roomProp) => {
                    const optionTimeFrom = document.createElement('option');
                    optionTimeFrom.value = roomProp.slice(0, 8);
                    optionTimeFrom.innerText = roomProp.slice(0, 8);
                    selectTimeFrom.appendChild(optionTimeFrom);
                });
                selectTimeFrom.disabled = false;
            } else {
                selectTimeFrom.disabled = true;
                selectTimeTo.disabled = true;
                selectTimeFrom.value = '';
                selectTimeTo.value = '';
                this.#roomProps = null;
            }
        });

        selectTimeFrom.addEventListener('change', () => {
            if (selectTimeFrom.value) {
                selectTimeTo.disabled = false;
                selectTimeTo.innerHTML = '';
                selectTimeTo.appendChild(optionTimeToDefault);

                this.#roomProps["availableTimes"].forEach((e) => {
                    if (Number(e.slice(9, 11)) > Number(selectTimeFrom.value.slice(0, 2))) {
                        const optionTimeTo = document.createElement('option');
                        optionTimeTo.value = e.slice(9, 17);
                        optionTimeTo.innerText = e.slice(9, 17);
                        selectTimeTo.appendChild(optionTimeTo);
                    }
                })
            } else {
                selectTimeTo.disabled = true;
                selectTimeTo.value = '';
            }
        });

        const saveInfoElm = document.createElement('div');
        saveInfoElm.id = 'save-info-text';
        saveInfoElm.innerText = '*We will save the inputs above so you do not have to re-enter them each time you book';

        const reserveButtonWrapperEnd = document.createElement('div');
        reserveButtonWrapperEnd.id = 'reserve-button-wrapper';

        const reserveButtonElmEnd = document.createElement('button');
        reserveButtonElmEnd.id = 'reserve-button-end';
        reserveButtonElmEnd.innerText = 'Reserve';
        reserveButtonElmEnd.type = 'submit';
        reserveButtonElmEnd.classList.add('custom-button');
        reserveButtonWrapperEnd.appendChild(reserveButtonElmEnd);

        const notiDiv = document.createElement('div');
        notiDiv.id = 'reserve-noti';
        reserveButtonWrapperEnd.appendChild(notiDiv);
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
        bookingElm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const numberPeople = bookingElm.querySelector('#number-people').value;
            const desktopComputer = bookingElm.querySelector('#desktop-computer').value;
            const timeFrom = bookingElm.querySelector('#time-from').value;
            const timeTo = bookingElm.querySelector('#time-to').value;

            // this.#events.publish('book-room', { numberPeople, desktopComputer, timeFrom, timeTo });
            // console.log(this.#data.id, inputDate.value,  timeFrom, timeTo)

            const room_id = this.#data.id;
            const date = inputDate.value;
            const userData = await getSession();

            const formData = {
                numPeople: numberPeople ?? "3-5",
                useComputer: desktopComputer ?? "Maybe",
                firstName: userData.firstName ?? "",
                lastName: userData.lastName ?? "",
                major : userData.major ?? "",
                studentRole : userData.role ? 
                    (userData.role.toLowerCase() === "undergraduate" ? "Undergraduate" :
                    userData.role.toLowerCase() === "graduate" ? "Graduate" : "Other") 
                    : "Other",
                email : userData.email ?? "",
            };
            
            notiDiv.innerHTML = "";
            try {
                const data = await reserveRoom(room_id, date, timeFrom, timeTo, formData);
                notiDiv.textContent = "*Reserved successfully";
            } catch {
                notiDiv.textContent = "*Reservation error";
                console.log(data)
            }
        });

        return bookingElm;
    }
}


