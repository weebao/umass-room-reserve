import { Events } from "../Events.js";

export class DataCard {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render(data) {
    const cardElm = document.createElement("div");
  }
}