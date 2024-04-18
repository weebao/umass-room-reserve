import { Events } from './Events.js';

export class NavBar {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    // Create a <div> element to hold the navigation bar
    const elm = document.createElement('div');
    elm.id = 'navbar';

    // Populate the <div> element with the navigation links
    elm.innerHTML = `
    <ul>
      <li><a href="#todolist">Todo List</a></li>
      <li><a href="#archive">Archive</a></li>
    </ul>
  `;

    // Get all the anchor tags within the <div> element
    const links = elm.querySelectorAll('a');

    // Add event listeners to each anchor tag
    links.forEach(link => {
      link.addEventListener('click', async e => {
        // Prevent the default anchor tag behavior
        e.preventDefault();

        // Get the view name from the href attribute
        const view = e.target.getAttribute('href').replace('#', '');

        // Update the window's hash to reflect the current view
        window.location.hash = view;

        // Call the navigateTo function with the view name
        await this.#events.publish('navigateTo', view);
      });
    });

    // Return the populated navigation bar element
    return elm;
  }
}
