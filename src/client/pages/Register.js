import { Events } from "../Events.js";

export class RegisterPage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const container = document.createElement("div");
    container.id = "register-container";
    container.classList.add("center", "auth-container");

    const registerElm = document.createElement("div");
    registerElm.id = "register-page";
    registerElm.classList.add("vstack", "auth-card");

    const headerElm = document.createElement("div");
    headerElm.classList.add("auth-card-header");

    const titleElm = document.createElement("h1");
    titleElm.innerText = "Register";

    const loginWrapperElm = document.createElement("div");
    loginWrapperElm.id = "login-wrapper";
    loginWrapperElm.innerHTML = `Already have an account? `;

    const loginLinkElm = document.createElement("span");
    loginLinkElm.id = "login-link";
    loginLinkElm.classList.add("auth-link");
    loginLinkElm.innerText = "Sign in";
    loginLinkElm.addEventListener("click", () => {
      this.#events.publish("navigateTo", "/login");
    });
    loginWrapperElm.appendChild(loginLinkElm);

    const formElm = document.createElement("form");
    formElm.id = "register-form";

    formElm.innerHTML = `
      <div class="auth-input-group">
        <div class="m-textfield-group auth-input">
          <input type="text" id="first-name" name="firstName" class="m-textfield" placeholder="First name" required>
          <label for="first-name" class="m-textfield-label">First Name</label>
        </div>
        <div class="m-textfield-group auth-input">
          <input type="text" id="last-name" name="lastName" class="m-textfield" placeholder="Last name" required>
          <label for="last-name" class="m-textfield-label">Last Name</label>
        </div>
      </div>
      <div class="m-textfield-group auth-input">
        <input type="text" id="major" name="major" class="m-textfield" placeholder="Major/Department" required>
        <label for="major" class="m-textfield-label">Major/Department</label>
      </div>
      <div class="m-textfield-group auth-input">
        <input type="text" id="role" name="role" class="m-textfield" placeholder="Role (Undergraduate, Graduate, Staff)" required>
        <label for="role" class="m-textfield-label">Role</label>
      </div>
      <div class="m-textfield-group auth-input">
        <input type="text" id="school-email" name="schoolEmail" title="email@umass.edu" class="m-textfield" placeholder="School Email (@umass.edu)" required pattern="[^@\s]+@umass\.edu" autocomplete="username">
        <label for="school-email" class="m-textfield-label">School Email</label>
      </div>
      <div class="m-textfield-group auth-input">
        <input type="password" id="password" name="password" class="m-textfield" placeholder="Password" required autocomplete="new-password">
        <label for="password" class="m-textfield-label">Password</label>
      </div>
      <div class="m-textfield-group auth-input">
        <input type="password" id="confirm-password" name="confirmPassword" class="m-textfield" placeholder="Confirm Password" required autocomplete="new-password">
        <label for="confirm-password" class="m-textfield-label">Confirm Password</label>
        <p id="password-match-message"></p>
      </div>
      <button type="submit" id="register-button" class="auth-submit-button">Register</button>
    `;

    const firstNameInput = formElm.querySelector("#first-name");
    const lastNameInput = formElm.querySelector("#last-name");
    const majorInput = formElm.querySelector("#major");
    const roleInput = formElm.querySelector("#role");
    const schoolEmailInput = formElm.querySelector("#school-email");
    const passwordInput = formElm.querySelector("#password");
    const confirmPasswordInput = formElm.querySelector("#confirm-password");
    const registerButton = formElm.querySelector("#register-button");

    const passwordMatchMessage = formElm.querySelector("#password-match-message");

    const inputArr = [
      firstNameInput,
      lastNameInput,
      majorInput,
      roleInput,
      schoolEmailInput,
      passwordInput,
      confirmPasswordInput,
    ];

    registerButton.addEventListener("click", (event) => {
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
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const schoolEmail = schoolEmailInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (password === confirmPassword) {
        passwordMatchMessage.innerText = "";
        confirmPasswordInput.classList.remove("m-textfield-error");
        this.#events.publish("register", {
          firstName,
          lastName,
          schoolEmail,
          password,
        });
      } else {
        confirmPasswordInput.classList.add("m-textfield-error");
        passwordMatchMessage.innerText = "Passwords do not match";
      }
    });

    container.appendChild(registerElm);
    headerElm.appendChild(titleElm);
    headerElm.appendChild(loginWrapperElm);
    registerElm.appendChild(headerElm);
    registerElm.appendChild(formElm);

    return container;
  }
}
