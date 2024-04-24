import { Events } from "../Events.js";

export class Search {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "search";
    elm.classList.add("hstack");

    const textField = document.createElement("div");
    textField.classList.add("m-textfield-group");
    
    const inputElm = document.createElement("input");
    inputElm.id = "building-name";
    inputElm.placeholder = "Building Name";
    inputElm.classList.add("m-textfield");
    inputElm.type = "text";
    
    const inputLabel = document.createElement("label");
    inputLabel.htmlFor = "building-name";
    inputLabel.classList.add("m-textfield-label");
    inputLabel.innerText = "Building Name";

    const searchBtn = document.createElement("button");
    searchBtn.id = "search-button";
    searchBtn.innerText = "Search";
    searchBtn.addEventListener("click", async () => {
      const query = inputElm.value;
      await this.search(query);
    });

    const sortBtn = document.createElement("button");
    sortBtn.id = "sort-button";
    sortBtn.innerText = "Sort by distance";
    sortBtn.addEventListener("click", async () => {
      await this.sort();
    });

    textField.appendChild(inputElm);
    textField.appendChild(inputLabel);
    elm.appendChild(textField);
    elm.appendChild(searchBtn);
    elm.appendChild(sortBtn);

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
