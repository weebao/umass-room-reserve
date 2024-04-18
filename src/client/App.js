import { TodoListView } from './TodoListView.js';
import { Events } from './Events.js';
import { NavBar } from './Navbar.js';

export class App {
  #todolistViewElm = null;
  #mainViewElm = null;
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render(root) {
    const rootElm = document.getElementById(root);
    rootElm.innerHTML = '';

    const navbarElm = document.createElement('div');
    navbarElm.id = 'navbar';
    const navbar = new NavBar();
    navbarElm.appendChild(await navbar.render());

    this.#mainViewElm = document.createElement('div');
    this.#mainViewElm.id = 'main-view';

    rootElm.appendChild(navbarElm);
    rootElm.appendChild(this.#mainViewElm);

    const todoListView = new TodoListView();
    this.#todolistViewElm = await todoListView.render();
    this.#navigateTo('todolist');

    this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
  }

  #navigateTo(view) {
    this.#mainViewElm.innerHTML = '';
    if (view === 'todolist') {
      this.#mainViewElm.appendChild(this.#todolistViewElm);
      window.location.hash = view;
    } else if (view === 'archive') {
      // TODO: this is where we want to add the archive view
      const archive = document.createElement('div');
      archive.innerHTML = '<h1>Archive view (coming soon)</h1>';
      this.#mainViewElm.appendChild(archive);
      window.location.hash = view;
    } else {
      this.#mainViewElm.appendChild(this.todolist);
      window.location.hash = 'todolist';
    }
  }
}
