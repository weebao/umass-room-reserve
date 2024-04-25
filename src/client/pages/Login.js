import { Events } from "../Events.js";

import { loginUser } from "../services/auth.js";
import { saveSession } from "../modules/session.js";

export class LoginPage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const container = document.createElement("div");
    container.id = "login-container";
    container.classList.add("center", "auth-container");

    // Create container for login form
    const loginElm = document.createElement("div");
    loginElm.id = "login-page";
    loginElm.classList.add("vstack", "auth-card");

    // Header
    const headerElm = document.createElement("div");
    headerElm.classList.add("auth-card-header");

    const titleElm = document.createElement("h1");
    titleElm.innerText = "Login";

    const registerWrapperelm = document.createElement("div");
    registerWrapperelm.id = "register-wrapper";
    registerWrapperelm.innerHTML = `New here? `;

    const registerLinkElm = document.createElement("span");
    registerLinkElm.id = "register-link";
    registerLinkElm.classList.add("auth-link");
    registerLinkElm.innerText = "Create a new account";
    registerLinkElm.addEventListener("click", () => {
      this.#events.publish("navigateTo", "/register");
    });
    registerWrapperelm.appendChild(registerLinkElm);

    const formElm = document.createElement("form");
    formElm.id = "login-form";
    formElm.innerHTML = `
        <div class="m-textfield-group auth-input">
          <input type="text" id="school-email" name="schoolEmail" class="m-textfield" placeholder="School Email (@umass.edu)" title="email@umass.edu" pattern="[^@\s]+@umass\.edu" required>
          <label for="school-email" class="m-textfield-label">School Email (@umass.edu)</label>
        </div>
        <div class="auth-input">
          <div class="m-textfield-group">
            <input type="password" id="password" name="password" class="m-textfield" placeholder="Password" required>
            <label for="password" class="m-textfield-label">Password</label>
          </div>
          <div id="password-forgot-noti">Uh oh you forgot your identity 🤣</div>
          <div id="password-forgot-wrapper" class="hstack space-between">
            <label for="remember-me" class="checkbox">
              <input type="checkbox" id="remember-me" name="remember_me" checked> 
              Remember me
            </label>
            <span class="auth-link" href="#forgot-password">Forgot password?</span>
          </div>
        </div>
        <button type="submit" id="login-button" class="auth-submit-button">Sign In</button>
      `;

    // TODO: remove style property and add a class to the anchor tag forgot-password
    const schoolEmail = formElm.querySelector("#school-email");
    const password = formElm.querySelector("#password");

    const inputArr = [schoolEmail, password];
    const loginButton = formElm.querySelector("#login-button");
    loginButton.addEventListener("click", () => {
      inputArr.forEach((inputElm) => {
        if (inputElm.validity.valid) {
          inputElm.classList.remove("m-textfield-error");
        } else {
          inputElm.classList.add("m-textfield-error");
        }
      });
    });

    formElm.addEventListener("submit", (event) => {
      event.preventDefault();
      inputArr.forEach((inputElm) => {
        if (inputElm.validity.valid) {
          inputElm.classList.remove("m-textfield-error");
        } else {
          inputElm.classList.add("m-textfield-error");
        }
      });

      try {
        const email = schoolEmail.value;
        const password = password.value;
        // const user = loginUser(email, password);
        if (email && password) {
          formElm.querySelector("#password-forgot-noti").style.display = "none";
          inputArr.forEach((inputElm) => {
            inputElm.classList.remove("m-textfield-error");
          });
          saveSession({ email, password });
          this.#events.publish("rerenderNav");
          this.#events.publish("navigateTo", "/home");
        } else {
          formElm.querySelector("#password-forgot-noti").style.display =
            "block";
          inputArr.forEach((inputElm) => {
            inputElm.classList.add("m-textfield-error");
          });
        }
      } catch {
        formElm.querySelector("#password-forgot-noti").style.display = "block";
        inputArr.forEach((inputElm) => {
          inputElm.classList.add("m-textfield-error");
        });
      }

      // if (schoolEmail.value in this.#user && this.#user[schoolEmail.value] === password.value) {
      //   formElm.querySelector('#password-forgot-noti').style.display = 'none';

      //   inputArr.forEach((inputElm) => {
      //     inputElm.classList.remove("m-textfield-error");
      //   });

      //   this.#events.publish('navigateTo', '/home');
      // } else {
      //   formElm.querySelector('#password-forgot-noti').style.display = 'block';

      //   inputArr.forEach((inputElm) => {
      //     inputElm.classList.add("m-textfield-error");
      //   });
      // }
    });

    formElm.querySelector("#password-forgot-noti").style.display = "none";

    container.appendChild(loginElm);
    headerElm.appendChild(titleElm);
    headerElm.appendChild(registerWrapperelm);
    loginElm.appendChild(headerElm);
    loginElm.appendChild(formElm);

    return container;
  }
}
