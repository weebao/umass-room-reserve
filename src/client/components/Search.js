import { URL } from "../services/url.js";
import { Events } from "../Events.js";
import {
  getRoomsByQueryWithMock,
  getBuildingByQuery,
} from "../services/rooms.js";
import { RoomCard } from "./RoomCard.js";

export class Search {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "search";

    const searchBarContainer = document.createElement("div");
    searchBarContainer.id = "search-bar-container";

    const searchBarElm = document.createElement("div");
    searchBarElm.id = "search-bar";
    searchBarElm.innerHTML = `
      <img src="/assets/search-icon.svg" id="search-bar-icon" alt="Search Icon" />
    `;

    const inputElm = document.createElement("input");
    inputElm.id = "search-input";
    inputElm.placeholder = "Search by building, location, etc.";
    inputElm.classList.add("textfield");
    inputElm.type = "text";

    const sortBtn = document.createElement("button");
    sortBtn.id = "sort-button";
    sortBtn.innerHTML = `
      <img src="/assets/location-icon.svg" id="location-icon" alt="Location Icon" />
      <span>Sort by distance</span>
    `;

    const resultContainer = document.createElement("div");
    resultContainer.id = "result-container";
    resultContainer.classList.add("grid-container");

    // Only fetch results when the user stops inputting for 1 second
    let timeoutId;
    inputElm.addEventListener("input", (event) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        resultContainer.innerHTML = "<img src='/assets/loading.svg' alt='Loading' />";
        await this.#searchAndRender(event.target.value, resultContainer);
      }, 1000);
    });

    sortBtn.addEventListener("click", async () => {
      resultContainer.innerHTML = "<img src='/assets/loading.svg' alt='Loading' />";
      await this.#searchAndRender(inputElm.value, resultContainer); // @weebao please fix this
    });

    searchBarElm.appendChild(inputElm);
    searchBarContainer.appendChild(searchBarElm);
    searchBarContainer.appendChild(sortBtn);
    elm.appendChild(searchBarContainer);
    elm.appendChild(resultContainer);

    resultContainer.innerHTML = "<img src='/assets/loading.svg' alt='Loading' />";
    this.#searchAndRender("", resultContainer);

    return elm;
  }

  async #searchAndRender(query, container) {
    console.log("rebder")

    if (query === "") {
      const rooms = await (await fetch(`${URL}/room/all`)).json()

      container.innerHTML = "";
      const roomCard = new RoomCard();
      rooms.forEach((room) => {
        const cardElem = roomCard.render(room);
        container.appendChild(cardElem);
      })
    } else {
      // TODO: Implement search by query (makes professor Montazeralghaem proud!)
      const rooms = await (await fetch(`${URL}/room/all`)).json()
      query = query.trim();
      const newRooms = rooms.filter((props) => { // a simple 
        return props.name.toLowerCase().includes(query.toLowerCase()) || props.buildingName.toLowerCase().includes(query.toLowerCase());
      })

      container.innerHTML = "";

      if (newRooms.length === 0) {
        const noResults = document.createElement("h2");
        noResults.textContent = "No results found";
        noResults.style.textAlign = "center";
        container.appendChild(noResults);
        return;
      }

      const roomCard = new RoomCard();
      newRooms.forEach((room) => {
        const cardElem = roomCard.render(room);
        container.appendChild(cardElem);
      })
    }

    return container;
  }
}