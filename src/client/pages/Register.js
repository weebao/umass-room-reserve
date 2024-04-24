import { Events } from '../Events.js';

export class RegisterPage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const registerElm = document.createElement('div');
    registerElm.id = 'register-view';

    const titleElm = document.createElement('h1');
    titleElm.innerText = 'Register';

    const loginWrapperElm = document.createElement('div');
    loginWrapperElm.id = 'login-wrapper';
    loginWrapperElm.innerHTML = `Already have an account? <a href="#login">Log in</a>`;

    const formElm = document.createElement('form');
    formElm.id = 'register-form';
    formElm.innerHTML = `
      <input type="text" id="first-name" name="firstName" placeholder="First name" required>

      <input type="text" id="last-name" name="lastName" placeholder="Last name" required>

      <input type="text" id="major" name="major" placeholder="Major/Department" required>

      <input type="text" id="role" name="role" placeholder="Role (Undergraduate, Graduate, Staff)" required>

      <input type="text" id="school-email" name="schoolEmail" placeholder="School Email (@umass.edu)" required>

      <input type="password" id="password" name="password" placeholder="Password" required>

      <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm Password" required>
      
      <button type="submit" id="register-button">Register</button>
    `;

    formElm.addEventListener('submit', event => {
      event.preventDefault();
      const firstName = formElm.querySelector('#first-name').value;
      const lastName = formElm.querySelector('#last-name').value;
      const schoolEmail = formElm.querySelector('#school-email').value;
      const password = formElm.querySelector('#password').value;
      const confirmPassword = formElm.querySelector('#confirm-password').value;

      if (password === confirmPassword) {
        this.#events.publish('register', { firstName, lastName, schoolEmail, password });
      } else {
        alert('Passwords do not match.');
      }
    });

    registerElm.appendChild(titleElm);
    registerElm.appendChild(loginWrapperElm);
    registerElm.appendChild(formElm);

    return registerElm;
  }
}
