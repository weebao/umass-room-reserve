import { Events } from "../Events.js";

export class HomePage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "home";
    elm.innerHTML = `
      <h1>Home</h1>
      <p>Welcome to the home page</p>
    `;
    return elm;
  }
}
