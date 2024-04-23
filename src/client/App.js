import { Events } from "./Events.js";

import { NavBar } from "./components/Navbar.js";

import { LoginPage } from "./pages/Login.js";
import { HomePage } from "./pages/Home.js";
import { NotFoundPage } from "./pages/404.js";

export class App {
  #events = null;
  #mainViewElm = null;
  #isLoggedIn = false;

  #loginPage = null;
  #homePage = null;
  #notFoundPage = null;

  constructor() {
    this.#events = Events.events();
  }

  async render(root) {
    const rootElm = document.getElementById(root);
    rootElm.innerHTML = "";

    const navbar = new NavBar();
    const navbarElm = await navbar.render();
    rootElm.appendChild(navbarElm);

    this.#mainViewElm = document.createElement("main");
    this.#mainViewElm.id = "main-view";

    rootElm.appendChild(this.#mainViewElm);

    if (this.#isLoggedIn) {
      this.navigateTo("/home");
    } else {
      this.navigateTo("/login");
    }

    this.#events.subscribe(
      "navigateTo",
      async (view) => await this.navigateTo(view)
    );
  }

  async navigateTo(page) {
    this.#mainViewElm.innerHTML = "";
    switch (page) {
      case "/login":
        if (!this.#loginPage) {
          const loginPage = new LoginPage();
          this.#loginPage = await loginPage.render();
        }
        this.#mainViewElm.appendChild(this.#loginPage);
        break;
      case "/home":
      case "/":
        if (!this.#homePage) {
          const homePage = new HomePage();
          this.#homePage = await homePage.render();
        }
        this.#mainViewElm.appendChild(this.#homePage);
        break;
      default:
        if (!this.#notFoundPage) {
          const notFoundPage = new NotFoundPage();
          this.#notFoundPage = await notFoundPage.render();
        }
        this.#mainViewElm.appendChild(this.#notFoundPage);
        break;
    }
  }
}
