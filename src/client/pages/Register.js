import { Events } from "../Events.js";
import { createSession } from "../modules/session.js";
import { registerUser } from "../services/auth.js";

//TODO: Fix regex for email

export class RegisterPage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const container = document.createElement("div");
    container.id = "register-page";
    container.classList.add("center", "auth-container");

    const registerElm = document.createElement("div");
    registerElm.id = "register-card";
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
        <input type="text" id="school-email" name="schoolEmail" title="email@umass.edu" class="m-textfield" placeholder="School Email (@umass.edu)" required pattern=".+@umass\.edu" autocomplete="username">
        <label for="school-email" class="m-textfield-label">School Email</label>
      </div>
      <div class="m-textfield-group auth-input">
        <input type="password" id="password" name="password" class="m-textfield" placeholder="Password" required autocomplete="new-password">
        <label for="password" class="m-textfield-label">Password</label>
      </div>
      <div class="m-textfield-group auth-input">
        <input type="password" id="confirm-password" name="confirmPassword" class="m-textfield" placeholder="Confirm Password" required autocomplete="new-password">
        <label for="confirm-password" class="m-textfield-label">Confirm Password</label>
        <p id="invalid-noti"></p>
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

    const notiDiv = formElm.querySelector("#invalid-noti");

    const inputArr = [
      firstNameInput,
      lastNameInput,
      majorInput,
      roleInput,
      schoolEmailInput,
      passwordInput,
      confirmPasswordInput,
    ];

    // Add event listener to register button
    registerButton.addEventListener("click", (event) => {
      // Validate input fields
      inputArr.forEach((inputElm) => {
        if (inputElm.validity.valid) {
          inputElm.classList.remove("m-textfield-error");
        } else {
          inputElm.classList.add("m-textfield-error");
        }
      });
    });

    // Add event listener to form submit
    formElm.addEventListener("submit", async (event) => {
      event.preventDefault();
      // Get input values
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const major = majorInput.value;
      const role = roleInput.value;
      const email = schoolEmailInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      // Check if passwords match
      if (password === confirmPassword) {
        notiDiv.innerText = "";
        confirmPasswordInput.classList.remove("m-textfield-error");
      } else {
        confirmPasswordInput.classList.add("m-textfield-error");
        notiDiv.innerText = "Passwords do not match";
        return;
      }

      try {
        // Assume registerUser is a function that handles the API request for registration
        const registerResult = await registerUser({
          firstName,
          lastName,
          major,
          role,
          email,
          password,
        });

        // console.log(registerResult)

        if (registerResult.status === "success") {
          // Create session and navigate to home page
          await createSession({ firstName, lastName, major, role, email });
          this.#events.publish("rerenderNav");
          this.#events.publish("navigateTo", "/home");

          firstNameInput.value = "";
          lastNameInput.value = "";
          majorInput.value = "";
          roleInput.value = "";
          schoolEmailInput.value = "";
          passwordInput.value = "";
          confirmPasswordInput.value = "";
        } else {
          // Handle registration error (display message or log error)
          throw new Error(registerResult.message || "Failed to register");
        }
      } catch (error) {
        // Handle registration error (display message or log error)
        notiDiv.innerText = error.message;
        inputArr.forEach((inputElm) => {
          inputElm.classList.add("m-textfield-error");
        });
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
