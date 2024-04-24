import { Events } from "../Events.js";
import { Search } from "../components/Search.js";

export class HomePage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "home";
    elm.classList.add("center");
    elm.innerHTML = `
      <h1>UMASS ROOM RESERVATION</h1>
      <p>No need to go to other websites and fill out tedious forms again and again. Click on any room below you want to reserve and we will fill out the form for you. It\'s as simple as that!</p>
    `;

    const search = new Search();
    const searchElm = await search.render();
    elm.appendChild(searchElm);

    return elm;
  }
}
