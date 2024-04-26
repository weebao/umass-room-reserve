import { Events } from "../Events.js";
// import { getBuildingByQuery } from "../services/rooms.js";
import { buildings, rooms } from "../mock/mockdata.js";

export class Search {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "search";
    elm.classList.add("hstack");

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

    // Only fetch results when the user stops inputting for 1 second
    let timeoutId;
    inputElm.addEventListener("input", (event) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        await this.search(event.target.value);
      }, 1000);
    });

    const sortBtn = document.createElement("button");
    sortBtn.id = "sort-button";
    sortBtn.innerHTML = `
      <img src="/assets/location-icon.svg" id="location-icon" alt="Location Icon" />
      <span>Sort by distance</span>
    `
    sortBtn.addEventListener("click", async () => {
      await this.search(inputElm.value); // @weebao please fix this
    });

    searchBarElm.appendChild(inputElm);
    elm.appendChild(searchBarElm);
    // textField.appendChild(inputLabel);
    // elm.appendChild(textField);
    // elm.appendChild(searchBtn);
    elm.appendChild(sortBtn);

    return elm;
  }

  async search(query) {
    try {
      // const response = await fetch(
      //   `http://localhost:3260/api/getBuilding?name=${query}`
      // );
      // const data = await response.json();
      const bld = buildings.filter((building) => {
        return building.name.toLowerCase().includes(query.toLowerCase());
      });

      const rm = rooms.filter((room) => {
        return bld.some(e => {
          return e.building_id === room.building_id;
        });
      });

      // First sort by building, and get only rooms that match the remain building id
      return { "buildings": bld, "rooms": rm }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

}
