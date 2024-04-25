import { Events } from "../Events.js";

import { getSession, modifySession } from "../modules/session.js";

export class ProfilePage {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    const elm = document.createElement("div");
    elm.id = "profile-page";
    elm.innerHTML = `
      <div id="banner" class="banner">
        <h1>Profile</h1>
      </div>
      <div id="user-profile">
        <div id="user-info">
          <div id="user-name-group">
            <div>
              <label for="first-name" class="textfield-label">First Name</label>
              <input type="text" id="first-name" class="textfield" name="first-name">
            </div>
            <div>
              <label for="last-name" class="textfield-label">Last Name</label>
              <input type="text" id="last-name" class="textfield" name="last-name">
            </div>
          </div>
          <div>
            <label for="major" class="textfield-label">Major/Department</label>
            <input type="text" id="major" class="textfield" name="major">
          </div>
          <div>
            <label for="role" class="textfield-label">Role</label>
            <input type="text" id="role" class="textfield" name="role">
          </div>
          <div>
            <label for="email" class="textfield-label">Email</label>
            <input type="text" id="email" class="textfield" name="email">
          </div>
          <button id="update-profile" class="custom-button">Update Profile</button>
        </div>
        <div id="change-password">
          <h5>Change password</h5>
          <div id="password">
            <input type="password" id="current-password" name="current-password" class="textfield" placeholder="Current password">
            <input type="password" id="new-password" name="new-password" class="textfield" placeholder="New password">
            <input type="password" id="confirm-password" name="confirm-password" class="textfield" placeholder="Confirm new password">
            <p id="password-tooltip"></p>
          </div>
          <button id="update-password" class="custom-button">Update Password</button>
        </div>
      </div>
      `;

    const userData = await getSession();

    const firstNameInput = elm.querySelector("#first-name");
    const lastNameInput = elm.querySelector("#last-name");
    const majorInput = elm.querySelector("#major");
    const roleInput = elm.querySelector("#role");
    const emailInput = elm.querySelector("#email");
    
    firstNameInput.value = userData.firstName ?? "";
    lastNameInput.value = userData.lastName ?? "";
    majorInput.value = userData.major ?? "";
    roleInput.value = userData.role ?? "";
    emailInput.value = userData.email ?? "";
    
    const updateProfile = elm.querySelector("#update-profile");
    updateProfile.addEventListener("click", async () => {
      const updatedUserData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        major: majorInput.value,
        role: roleInput.value,
        email: emailInput.value,
      };

      await modifySession(updatedUserData);
    });

    const currentPasswordInput = elm.querySelector("#current-password");
    const newPasswordInput = elm.querySelector("#new-password");
    const confirmPasswordInput = elm.querySelector("#confirm-password");
    const updatePassword = elm.querySelector("#update-password");
    const passwordTooltip = elm.querySelector("#password-tooltip");

    updatePassword.addEventListener("click", async () => {
      if (currentPasswordInput.value !== userData.password) {
        currentPasswordInput.classList.add("textfield-error");
        passwordTooltip.innerText = "Incorrect password";
        return;
      }
      currentPasswordInput.classList.remove("textfield-error");
      if (newPasswordInput.value === confirmPasswordInput.value) {
        confirmPasswordInput.classList.remove("textfield-error");
        const updatedUserData = {
          ...userData,
          password: newPasswordInput.value,
        };
        await modifySession(updatedUserData);
        passwordTooltip.innerText = "Password updated successfully";
      } else {
        confirmPasswordInput.classList.add("textfield-error");
        passwordTooltip.innerText = "Passwords do not match";
      }
    });

    return elm;
  }
}
