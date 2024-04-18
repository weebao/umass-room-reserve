import { App } from './App.js';

// Mount the application to the root element.
const app = new App();
await app.render('root');

// Testing Support
const resetState = () => {
  localStorage.clear();
  const app = new App();
  app.render('root');
};

document.getElementById('reset-state').addEventListener('click', resetState);
