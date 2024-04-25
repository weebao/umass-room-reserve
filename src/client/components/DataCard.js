import { Events } from "../Events.js";

export class DataCard {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render(data) {
    const gridContainer = document.createElement("div");
    gridContainer.id = "grid-container";
    gridContainer.classList.add("grid-container");

    // Card element dynamic definition  
    data["rooms"].forEach((room, idx) => {
      const building = data["buildings"].find(building => {
        return building.building_id === room.building_id;
      }); // TODO: Run time is a little bit high, need to optimize this

      const cardElm = document.createElement("div");
      cardElm.classList.add("card-element");
      cardElm.id = `card-${room.room_id}`;

      const descImg = document.createElement("img");
      descImg.classList.add("desc-img");
      descImg.src = `/building_images/${building.img_name}.jpeg`; // TODO: PLEASE FIX THIS FOR DESIRE LOCAL FILE
      descImg.alt = `W.E.B.DuboisLibrary`;

      const descriptionContainer = document.createElement("div");
      descriptionContainer.classList.add("description-container");

      const descHeader = document.createElement("h2");
      descHeader.classList.add("desc-header");
      descHeader.textContent = `${room.room_type}`;

      const descBody = document.createElement("div");
      descBody.classList.add("desc-body");

      const descLocation = document.createElement("p");
      descLocation.classList.add("desc-location");
      descLocation.textContent = `${building.name}`;

      const descAvailability = document.createElement("p");
      descAvailability.classList.add("desc-availability");
      descAvailability.textContent = idx % 2 === 0 ? "Available" : "2 rooms available from 2PM";

      cardElm.appendChild(descImg);
      cardElm.appendChild(descriptionContainer);
      descriptionContainer.appendChild(descHeader);
      descriptionContainer.appendChild(descBody);
      descBody.appendChild(descLocation);
      descBody.appendChild(descAvailability);
      
      gridContainer.appendChild(cardElm);
    })

    return gridContainer;
  }
}