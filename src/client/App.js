import { Events } from "./Events.js";

import { isLoggedIn } from "./modules/session.js";

import Navbar from "./components/Navbar.js";

// Lazy load the pages for faster initial load
const importLoginPage = async () =>
  (await import("./pages/Login.js")).LoginPage;
const importHomePage = async () => (await import("./pages/Home.js")).HomePage;
const importRegisterPage = async () =>
  (await import("./pages/Register.js")).RegisterPage;
const importProfilePage = async () =>
  (await import("./pages/Profile.js")).ProfilePage;
const importNotFoundPage = async () =>
  (await import("./pages/404.js")).NotFoundPage;

export class App {
  #events = null;
  #mainViewElm = null;

  #loginPage = null;
  #homePage = null;
  #registerPage = null;
  #notFoundPage = null;
  
  #profilePageObj = null;
  
  constructor() {
    this.#events = Events.events();
  }

  /**
   * Renders the application on the specified root element.
   * @param {string} root - The ID of the root element where the application will be rendered.
   * @returns {Promise<void>} A promise that resolves when the rendering is complete.
   */
  async render(root) {
    this.#events.subscribe("navigateTo", async (page) => {
      await this.#navigateTo(page);
    });

    const rootElm = document.getElementById(root);
    rootElm.innerHTML = "";

    const navbar = new Navbar();
    let navbarElm = await navbar.render();
    rootElm.appendChild(navbarElm);
    this.#events.subscribe("rerenderNav", async () => { 
      const newNavbarElm = await navbar.render();
      rootElm.replaceChild(newNavbarElm, navbarElm);
      navbarElm = newNavbarElm;
    });

    this.#mainViewElm = document.createElement("main");
    this.#mainViewElm.id = "main-view";

    rootElm.appendChild(this.#mainViewElm);
  }

  /**
   * Navigates to the specified page.
   *
   * @param {string} page - The page to navigate to.
   * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
   */
  async #navigateTo(page) {
    // console.log(page);
    if (!page || typeof page !== "string") {
      return;
    }
    this.#mainViewElm.innerHTML = "";
    const loggedIn = await isLoggedIn();
    switch (page) {
      case "":
      case "/":
      case "/home":
        if (!this.#homePage) {
          const HomePage = await importHomePage();
          const homePageObj = new HomePage();
          this.#homePage = await homePageObj.render();
        }
        this.#mainViewElm.appendChild(this.#homePage);
        page = "/home";
        break;
      case "/login":
        if (loggedIn) {
          await this.#navigateTo("/home");
          return;
        }
        if (!this.#loginPage) {
          const LoginPage = await importLoginPage();
          const loginPageObj = new LoginPage();
          this.#loginPage = await loginPageObj.render();
        }
        this.#mainViewElm.appendChild(this.#loginPage);
        break;
      case "/register":
        if (loggedIn) {
          await this.#navigateTo("/home");
          return;
        }
        if (!this.#registerPage) {
          const RegisterPage = await importRegisterPage();
          const registerPageObj = new RegisterPage();
          this.#registerPage = await registerPageObj.render();
        }
        this.#mainViewElm.appendChild(this.#registerPage);
        break;
      case "/profile":
        if (!loggedIn) {
          await this.#navigateTo("/login");
          return;
        }
        if (!this.#profilePageObj) {
          const ProfilePage = await importProfilePage();
          const profilePageObj = new ProfilePage();
          this.#profilePageObj = profilePageObj;
        }
        this.#mainViewElm.appendChild(await this.#profilePageObj.render());
        break;
      default:
        if (!this.#notFoundPage) {
          const NotFoundPage = await importNotFoundPage();
          const notFoundPageObj = new NotFoundPage();
          this.#notFoundPage = await notFoundPageObj.render();
        }
        this.#mainViewElm.appendChild(this.#notFoundPage);
        return;
    }
    window.history.pushState({}, page, window.location.origin + page);
  }
}
