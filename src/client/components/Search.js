import { Events } from "../Events.js";
import { getBuildingByQuery } from "../services/rooms.js";

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
      await this.sort();
    });

    searchBarElm.appendChild(inputElm);
    elm.appendChild(searchBarElm);
    // textField.appendChild(inputLabel);
    // elm.appendChild(textField);
    // elm.appendChild(searchBtn);
    elm.appendChild(sortBtn);

    return elm;
  }

  async search(){
    const searchQuery = searchInput.value.toLowerCase();
    try {
        const response = await fetch(`http://localhost:3260/getBuilding?name=${searchQuery}`);
        const buildings = await response.json(); 
        displayResults(buildings);
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = '<p>Error loading results.</p>';
    }

    function displayResults(buildings) {
      resultsContainer.innerHTML = '';
      buildings.forEach(building => {
          const card = document.createElement('div');
          card.className = 'result-card'; // Add a class for styling

          //Display buidling name
          const buildingName = document.createElement('h3');
          buildingName.textContent = building.name;

          //Add image of the buidling as background
          const img_url =  imageFolder + '/' + building.img_name;
          card.style.backgroundImage = `url('${img_url}')`;
          card.style.filter = `brightness(50%)`;

          card.appendChild(buildingName);
          resultsContainer.appendChild(card);
      });
    }
  }
}
