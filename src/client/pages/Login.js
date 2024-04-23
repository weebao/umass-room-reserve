import { Events } from '../Events.js';

export class LoginPage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const loginElm = document.createElement('div');
    loginElm.id = 'login-page';

    const titleElm = document.createElement('h1');
    titleElm.innerText = 'Login';

    const registerWrapperelm = document.createElement('div');
    registerWrapperelm.id = 'register-wrapper';
    registerWrapperelm.innerHTML = `You doesn't seems familiar <a href="#register">Create a new account</a>`;

    const formElm = document.createElement('form');
    formElm.id = 'login-form';
    formElm.innerHTML = `
      <input type="text" id="school-email" name="schoolEmail" placeholder="School Email (@umass.edu)" required>
      <input type="password" id="password" name="password" placeholder="Password" required>
      <label for="remember-me">
        <input type="checkbox" id="remember-me" name="remember_me"> 
        Remember me
      </label>
      <a href="#forgot-password" >Forgot password?</a>
      <button type="submit" id="sign-in">Sign In</button>
    `;
    // TODO: remove style property and add a class to the anchor tag forgot-password

    formElm.addEventListener('submit', event => {
      event.preventDefault();
      const schoolEmail = formElm.querySelector('#school-email').value;
      const password = formElm.querySelector('#password').value;
      this.#events.publish('login', { username, password }); // TODO: really have to understand where to subscribe this event
    });

    loginElm.appendChild(titleElm);
    loginElm.appendChild(registerWrapperelm);
    loginElm.appendChild(formElm);

    return loginElm;
  }
}