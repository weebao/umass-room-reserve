import { Events } from '../Events.js';

export class LoginPage {
  #events = null;
  #user = null;
  constructor() {
    this.#events = Events.events();
    this.#user = { "laufey": "123456" }
  }

  async render() {
    const container = document.createElement('div');
    container.id = 'login-container';
    container.classList.add('center', 'auth-container');

    // Create container for login form
    const loginElm = document.createElement('div');
    loginElm.id = 'login-page';
    loginElm.classList.add('vstack', 'auth-card');

    // Header
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
    const schoolEmail = formElm.querySelector('#school-email');
    const password = formElm.querySelector('#password');

    const inputArr = [schoolEmail, password];
    const loginButton = formElm.querySelector('#login-button');
    loginButton.addEventListener('click', () => {
      inputArr.forEach((inputElm) => {
        if (inputElm.validity.valid) {
          inputElm.classList.remove("m-textfield-error");
        } else {
          inputElm.classList.add("m-textfield-error");
        }
      });
    });


    formElm.addEventListener('submit', event => {
      event.preventDefault();
      [schoolEmail, password].forEach((inputElm) => {
        if (inputElm.validity.valid) {
          inputElm.classList.remove("m-textfield-error");
        } else {
          inputElm.classList.add("m-textfield-error");
        }
      });

      if (schoolEmail.value in this.#user && this.#user[schoolEmail.value] === password.value) {
        formElm.querySelector('#password-forgot-noti').style.display = 'none';

        [schoolEmail, password].forEach((inputElm) => {
          inputElm.classList.remove("m-textfield-error");
        });

        this.#events.publish('navigateTo', '/home');
      } else {
        formElm.querySelector('#password-forgot-noti').style.display = 'block';

        [schoolEmail, password].forEach((inputElm) => {
          inputElm.classList.add("m-textfield-error");
        });
      }
    });

    formElm.querySelector('#password-forgot-noti').style.display = 'none';

    container.appendChild(loginElm);
    headerElm.appendChild(titleElm);
    headerElm.appendChild(registerWrapperelm);
    loginElm.appendChild(headerElm);
    loginElm.appendChild(formElm);

    return container;
  }
}

// mock data for user authentication
const users = [
  {
      user_id: 1,
      email: 'lionelmessi@gmail.com',
      password: 'iamgoat',
      first_name: 'Lionel',
      last_name: 'Messi',
  },
  {
      user_id: 2,
      email: 'cristianoronaldo@gmail.com',
      password: 'messiisbetterthanme',
      first_name: 'Cristiano',
      last_name: 'Ronaldo',
  }
]

// /**
// * Attaches a click event listener to the login button on the page. Once the page content is fully loaded,
// * this script checks if the login button exists. If it does, it sets up a listener that triggers the login
// * process when the button is clicked. The login process involves capturing the user's email and password
// * from input fields and passing these values to the `loginUser` function.
// *
// * @listens document#DOMContentLoaded - Waits for the content of the document to be fully loaded before attaching event handlers.
// */
// document.addEventListener('DOMContentLoaded', () => {
//   const loginButton = document.getElementById('login-button');
//   if (loginButton) {
//       loginButton.addEventListener('click', () => {
//           const email = document.getElementById('email').value;
//           const password = document.getElementById('password').value;
//           loginUser(email, password);
//       });
//   }
// });

// /**
// * Simulates a login by checking user credentials and storing session data.
// * @param {string} email - User's email.
// * @param {string} password - User's password.
// */
// function loginUser(email, password) {
//   const user = users.find(u => u.email === email && u.password === password);
//   if (user) {
//       console.log('Login successful:', user);
//       // Remove sensitive data before saving to local storage
//       const { password, ...sessionData } = user;
//       saveSession(sessionData);
//       return true;
//   } else {
//       console.log('Login failed: Incorrect email or password.');
//       return false;
//   }
// }
