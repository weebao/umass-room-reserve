import { Events } from '../Events.js';

export class NavBar {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    // Create a <div> element to hold the navigation bar
    const elm = document.createElement('nav');
    elm.id = 'navbar';
    elm.classList.add('navbar');

    // Populate the <div> element with the navigation links
    elm.innerHTML = `
    <a href="#home">UMass Room Reserve</a>
    <ul>
      <li><a href="#login">Login</a></li>
      <li><a href="#register">Register</a></li>
    </ul>
  `;

    // Get all the anchor tags within the <div> element
    const links = elm.querySelectorAll('a');

    // Add event listeners to each anchor tag
    links.forEach(link => {
      link.addEventListener('click', async e => {
        // Prevent the default anchor tag behavior
        e.preventDefault();

        // Get the page name from the href attribute
        const page = e.target.getAttribute('href').replace('#', '/');

        // Update the window's pathname to reflect the current page
        window.history.pushState({}, page, window.location.origin + page);

        // Call the navigateTo function with the view name
        await this.#events.publish('navigateTo', page);
      });
    });

    // Return the populated navigation bar element
    return elm;
  }
}
