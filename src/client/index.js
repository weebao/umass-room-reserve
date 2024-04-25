import { App } from './App.js';
import { Events } from './Events.js';

const events = Events.events();

let path = "/";
const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  path = window.location.pathname;
  await app.render('root');
  await events.publish('navigateTo', path);
});

window.addEventListener('popstate', async () => {
  path = window.location.pathname;
  await events.publish('navigateTo', path);
});
