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
          <input type="text" id="school-email" name="schoolEmail" class="m-textfield" placeholder="School Email (@umass.edu)" required>
          <label for="school-email" class="m-textfield-label">School Email</label>
        </div>
        <div class="auth-input">
          <div class="m-textfield-group">
            <input type="password" id="password" name="password" class="m-textfield" placeholder="Password" required>
            <label for="password" class="m-textfield-label">Password</label>
          </div>
          <div id="password-forgot-noti">Uh oh you forgot your identity 🤣</div>
          <div id="password-forgot-wrapper" class="hstack space-between">
            <label for="remember-me">
              <input type="checkbox" id="remember-me" name="remember_me"> 
              Remember me
            </label>
            <span class="auth-link" href="#forgot-password">Forgot password?</span>
          </div>
        </div>
        <button type="submit" id="sign-in">Sign In</button>
      `;

    // TODO: remove style property and add a class to the anchor tag forgot-password
    const schoolEmail = formElm.querySelector('#school-email');
    const password = formElm.querySelector('#password');

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

// vl = { a: [b, c, d, e] }
// vl = { a: b, c: [d, e, f: { g: h, i: j }, k: l] }
// vl = { a: [b: { c: [d, e, f] }] }

// const DOMTreeConstructor = (kargs, node) => {
//   /**
//    * @param {Object} kargs
//    * @returns {Object} - DOM tree
//    *
//    * A function that passing in an array of containing hierarchy of DOM elements
//    * and return a DOM that is constructed based on the hierarchy.
//    * Assumption: the whole tree content should be contained inside a container div
//    *
//    * It either must be Object, Array, or DOM element
//    *
//    * value = child of key (node)
//    */

//   // if kwargs is a DOM element
//   if (kwargs.nodeType !== undefined) return kwargs
//   if (node == null) {
//     // Handle the root case
//     return Object.keys(kargs).forEach(key => {
//       key.appendChild(DOMTreeConstructor(kargs[value], key))
//     })
//   }

//   // if kwargs is any other type of object
//   return kargs.reduce((parent, children) => {

//     // case of first element should become the root
//     value = kargs[children]
//     if (value instanceof Object && !(value instanceof Array)) {
//       children.appendChild(DOMTreeConstructor(value, children))
//       return children
//     } else if (value instanceof Object && value instanceof Array) {
//       children.forEach(child => {
//         innerValue = value[child]
//         children.appendChild(DOMTreeConstructor(child, children))
//       })
//       return children
//     }
//     return children;
//   }, node)
// }
