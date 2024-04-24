import { Events } from '../Events.js';

export class LoginPage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const container = document.createElement('div');
    container.id = 'login-container';
    container.classList.add('center', 'auth-container');

    const loginElm = document.createElement('div');
    loginElm.id = 'login-page';
    loginElm.classList.add('vstack', 'auth-card');

    const headerElm = document.createElement('div');
    headerElm.classList.add('auth-card-header');

    const titleElm = document.createElement('h1');
    titleElm.innerText = 'Login';

    const registerWrapperelm = document.createElement('div');
    registerWrapperelm.id = 'register-wrapper';
    registerWrapperelm.innerHTML = `New here? `;

    const registerLinkElm = document.createElement('span');
    registerLinkElm.id = 'register-link';
    registerLinkElm.classList.add('auth-link');
    registerLinkElm.innerText = 'Create a new account';
    registerLinkElm.addEventListener('click', () => {
      this.#events.publish('navigateTo', '/register');
    });
    registerWrapperelm.appendChild(registerLinkElm);

    const formElm = document.createElement('form');
    formElm.id = 'login-form';
    formElm.innerHTML = `
      <div class="m-textfield-group auth-input">
        <input type="text" id="school-email" name="schoolEmail" class="m-textfield" placeholder="School Email (@umass.edu)" required>
        <label for="school-email" class="m-textfield-label">School Email</label>
      </div>
      <div class="auth-input">
        <div class="m-textfield-group">
          <input type="password" id="password" name="password" class="m-textfield" placeholder="Password" required>
          <label for="password" class="m-textfield-label">Password</label>
        </div>
        <div class="hstack space-between">
          <label for="remember-me">
            <input type="checkbox" id="remember-me" name="remember_me"> 
            Remember me
          </label>
          <a href="#forgot-password" >Forgot password?</a>
        </div>
      </div>
      <button type="submit" id="sign-in">Sign In</button>
    `;

    const rememberMeDiv = document.createElement("div");
    rememberMeDiv.classList.add("hstack", "space-between");

    const rememberMeLabel = document.createElement("label");
    rememberMeLabel.htmlFor = "remember-me";

    const rememberMeInput = document.createElement("input");
    rememberMeInput.type = "checkbox";
    rememberMeInput.id = "remember-me";
    rememberMeInput.name = "remember_me";

    rememberMeLabel.appendChild(rememberMeInput);
    rememberMeLabel.appendChild(document.createTextNode("Remember me"));

    const forgotPasswordAnchor = document.createElement("a");
    forgotPasswordAnchor.href = "#forgot-password";
    forgotPasswordAnchor.innerText = "Forgot password?";

    rememberMeDiv.appendChild(rememberMeLabel);
    rememberMeDiv.appendChild(forgotPasswordAnchor);

    passwordInputGroup.appendChild(passwordGroup);
    passwordInputGroup.appendChild(rememberMeDiv);

    const signInButton = document.createElement("button");
    signInButton.type = "submit";
    signInButton.id = "sign-in";
    signInButton.innerText = "Sign In";
    // TODO: remove style property and add a class to the anchor tag forgot-password

    formElm.addEventListener('submit', event => {
      event.preventDefault();
      const schoolEmail = formElm.querySelector('#school-email').value;
      const password = formElm.querySelector('#password').value;
      this.#events.publish('login', { username, password }); // TODO: really have to understand where to subscribe this event
    });

    container.appendChild(loginElm);
    headerElm.appendChild(titleElm);
    headerElm.appendChild(registerWrapperelm);
    loginElm.appendChild(headerElm);
    loginElm.appendChild(formElm);

    return container;
  }
}