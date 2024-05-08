import { Events } from "../Events.js";

export class RoomCard {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render(data) {
    const cardElm = document.createElement("div");
    cardElm.classList.add("card-element");
    cardElm.id = `card-${data.room_id}`;

    const descImg = document.createElement("img");
    descImg.classList.add("desc-img");
    descImg.src = `/assets/building_images/${data.img_name}`; // TODO: PLEASE FIX THIS FOR DESIRE LOCAL FILE
    descImg.alt = `W.E.B.DuboisLibrary`;

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description-container");

    const descHeader = document.createElement("h2");
    descHeader.classList.add("desc-header");
    descHeader.textContent = `${data.room_type}`;

    const descBody = document.createElement("div");
    descBody.classList.add("desc-body");

    
    const descLocation = document.createElement("span");
    descLocation.classList.add("desc-location");
    descLocation.textContent = `${data.building_name}`;

    const locaion_icon = document.createElement("img");
    locaion_icon.src = "/assets/location-solid-icon.svg";
    locaion_icon.alt = "Location Icon";
    locaion_icon.classList.add("icon-svg")
    
    const descLocationContainer = document.createElement("div");
    descLocationContainer.classList.add("desc-container");
    descLocationContainer.appendChild(locaion_icon);
    descLocationContainer.appendChild(descLocation);

    const availability_icon = document.createElement("img");
    availability_icon.src = "/assets/tick-icon.svg";
    availability_icon.alt = "Availability Icon";
    availability_icon.classList.add("icon-svg")
    availability_icon.id = "availability-icon";


    const descAvailability = document.createElement("span");
    descAvailability.classList.add("desc-availability");
    descAvailability.textContent = Math.random() > 0.5 ? "Available" : "2 rooms available from 2PM";
    
    const descAvailabilityContainer = document.createElement("div");
    descAvailabilityContainer.classList.add("desc-container");
    descAvailabilityContainer.appendChild(availability_icon);
    descAvailabilityContainer.appendChild(descAvailability);

    cardElm.appendChild(descImg);
    cardElm.appendChild(descriptionContainer);
    descriptionContainer.appendChild(descHeader);
    descriptionContainer.appendChild(descBody);
    descBody.appendChild(descLocationContainer);
    descBody.appendChild(descAvailabilityContainer);
    // const gridContainer = document.createElement("div");
    // gridContainer.id = "grid-container";
    // gridContainer.classList.add("grid-container");

    // // Card element dynamic definition  
    // const building = data["buildings"].find(building => {
    //   return building.building_id === room.building_id;
    // }); // TODO: Run time is a little bit high, need to optimize this

    
    // gridContainer.appendChild(cardElm);
    // data["rooms"].forEach((room, idx) => {
    // })

    return cardElm;
  }
}