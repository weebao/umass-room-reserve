import { Events } from "../Events.js";

export class Search {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "search";
    
    const inputElm = document.createElement("input");
    inputElm.id = "building-name";
    inputElm.type = "text";
    
    const inputLabel = document.createElement("label");
    inputLabel.htmlFor = "building-name";
    inputLabel.innerText = "Building Name";

    const searchBtn = document.createElement("button");
    searchBtn.id = "search-button";
    searchBtn.innerText = "Search";
    searchBtn.addEventListener("click", async () => {
      const query = inputElm.value;
      await this.search(query);
    });

    elm.appendChild(inputLabel);
    elm.appendChild(inputElm);
    elm.appendChild(searchBtn);

    return elm;
  }

  async search(query) {
    try {
      const response = await fetch(
        `http://localhost:3260/api/getBuilding?name=${query}`
      );
      const data = await response.json();
      console.log("Search Results: ", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
