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
