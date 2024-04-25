import { App } from './App.js';
import { Events } from './Events.js';

const events = Events.events();

window.addEventListener('popstate', async () => {
  path = window.location.pathname;
  await events.publish('navigateTo', path);
});

document.addEventListener('DOMContentLoaded', async () => {
  path = window.location.pathname;
  await events.publish('navigateTo', path);
});

let path = "/";
const app = new App();
await app.render('root');
