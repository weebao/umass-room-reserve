import { Events } from "../Events.js";
import { isLoggedIn, clearSession } from "../modules/session.js";

export default class Navbar {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    // Create a <div> element to hold the navigation bar
    const elm = document.createElement("nav");
    elm.id = "navbar";
    elm.classList.add("navbar");

    // Populate the <div> element with the navigation links
    elm.innerHTML = `
    <a href="/home" id="home"></a>
    ${
      (await isLoggedIn())
        ? `
          <ul id="menu">
            <li><a href="/profile" id="profile">Profile</a></li>
            <li><a href="/logout" id="logout">Logout</a></li>
          </ul>
        `
        : `
        <ul id="menu">
          <li><a href="/login" id="login">Login</a></li>
          <li><a href="/register" id="register">Register</a></li>
        </ul>
        `
    }
  `;

    // Get all the anchor tags within the <div> element
    const links = elm.querySelectorAll("a");

    // Subscribe a function for rerendering nav
    this.#events.subscribe("rerenderNav", this.#rerender);

    // Add event listeners to each anchor tag
    links.forEach((link) => {
      link.addEventListener("click", async (e) => {
        // Prevent the default anchor tag behavior
        e.preventDefault();

        // Get the page name from the href attribute
        const page = link.getAttribute("href");

        // Clear session and rerender when log out
        if (page === "/logout") {
          await clearSession();
          await this.#rerender();
          return;
        }

        // Call the navigateTo function with the view name
        await this.#events.publish("navigateTo", page);
      });
    });

    // Return the populated navigation bar element
    return elm;
  }

  #rerender = async () => {
    const menuElm = document.getElementById("menu");
    menuElm.innerHTML = await isLoggedIn() ? `
      <li><a href="/profile" id="profile">Profile</a></li>
      <li><a href="/logout" id="logout">Logout</a></li>
    ` : `
      <li><a href="/login" id="login">Login</a></li>
      <li><a href="/register" id="register">Register</a></li>
    `;
  };
}
