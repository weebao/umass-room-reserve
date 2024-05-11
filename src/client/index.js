import { App } from './App.js';
import { Events } from './Events.js';

const events = Events.events();

let path = "/";
const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  const url = new URL(window.location.href);
  path = url.pathname + url.search;
  await app.render('root');
  await events.publish('navigateTo', path);
});

window.addEventListener('popstate', async () => {
  const url = new URL(window.location.href);
  path = url.pathname + url.search;
  await events.publish('navigateTo', path);
});
