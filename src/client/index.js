import { App } from './App.js';

let path = "/";
const app = new App();
await app.render('root');

window.addEventListener('popstate', async () => {
  path = window.location.pathname;
  await app.navigateTo(path);
});

document.addEventListener('DOMContentLoaded', async () => {
  path = window.location.pathname;
  if (path !== "/") {
    await app.navigateTo(path);
  }
});