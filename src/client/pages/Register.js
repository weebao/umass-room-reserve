import { Events } from '../Events.js';

export class RegisterPage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const container = document.createElement('div');
    container.id = 'register-container';
    container.classList.add('center', 'auth-container');

    const registerElm = document.createElement('div');
    registerElm.id = 'register-page';
    registerElm.classList.add('vstack', 'auth-card');

    const titleElm = document.createElement('h1');
    titleElm.innerText = 'Register';

    const loginWrapperElm = document.createElement('div');
    loginWrapperElm.id = 'login-wrapper';
    loginWrapperElm.innerHTML = `Already have an account? <a href="#login">Log in</a>`;

    const formElm = document.createElement('form');
    formElm.id = 'register-form';
    formElm.innerHTML = `
      <div class="m-textfield-group">
        <input type="text" id="first-name" name="firstName" class="m-textfield" placeholder="First name" required>
        <label for="first-name" class="m-textfield-label">First Name</label>
      </div>

      <div class="m-textfield-group">
        <input type="text" id="last-name" name="lastName" class="m-textfield" placeholder="Last name" required>
        <label for="last-name" class="m-textfield-label">Last Name</label>
      </div>

      <div class="m-textfield-group">
        <input type="text" id="major" name="major" class="m-textfield" placeholder="Major/Department" required>
        <label for="major" class="m-textfield-label">Major/Department</label>
      </div>

      <div class="m-textfield-group">
        <input type="text" id="role" name="role" class="m-textfield" placeholder="Role (Undergraduate, Graduate, Staff)" required>
        <label for="role" class="m-textfield-label">Role</label>
      </div>

      <div class="m-textfield-group">
        <input type="text" id="school-email" name="schoolEmail" class="m-textfield" placeholder="School Email (@umass.edu)" required>
        <label for="school-email" class="m-textfield-label">School Email</label>
      </div>

      <div class="m-textfield-group">
        <input type="password" id="password" name="password" class="m-textfield" placeholder="Password" required>
        <label for="password" class="m-textfield-label">Password</label>
      </div>

      <div class="m-textfield-group">
        <input type="password" id="confirm-password" name="confirmPassword" class="m-textfield" placeholder="Confirm Password" required>
        <label for="confirm-password" class="m-textfield-label">Confirm Password</label>
      </div>

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

    container.appendChild(registerElm);
    registerElm.appendChild(titleElm);
    registerElm.appendChild(loginWrapperElm);
    registerElm.appendChild(formElm);

    return container;
  }
}
