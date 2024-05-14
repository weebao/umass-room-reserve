import { Events } from "../Events.js";
import { Search } from "../components/Search.js";
// import { DataCard } from "../components/DataCard.js";
import { buildings } from "../mock/mockdata.js";

export class HomePage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "home";
    elm.classList.add("vstack", "home-container");
    elm.innerHTML = `
      <div class="header">
        <h1>UMASS ROOM RESERVATION</h1>
        <p>No need to go to other websites and fill out tedious forms again and again. Click on any room below you want to reserve and we will fill out the form for you. It\'s as simple as that!</p>
      </div>
    `;

    const search = new Search();
    (search.render()).then((searchElm) => elm.appendChild(searchElm));
    // elm.appendChild(searchElm);

    // const dataCard = new DataCard();

    // let searchResult = await search.search("");
    // let dataCardElm = await dataCard.render({buildings: [], rooms: []});

    // let timeoutId;
    // searchElm.querySelector("#search-input").addEventListener("input", async (event) => {
    //   clearTimeout(timeoutId);
    //   timeoutId = setTimeout(async () => {
    //     if (elm.querySelector("#grid-container")) elm.removeChild(dataCardElm);

    //     dataCardElm = await dataCard.render(await search.search(event.target.value))
        
    //     elm.appendChild(dataCardElm);
    //   }, 1000);
    // });


    return elm;
  }
}
