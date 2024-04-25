import { saveSession } from "../module/Auth.js";

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

/**
 * Attaches a click event listener to the login button on the page. Once the page content is fully loaded,
 * this script checks if the login button exists. If it does, it sets up a listener that triggers the login
 * process when the button is clicked. The login process involves capturing the user's email and password
 * from input fields and passing these values to the `loginUser` function.
 *
 * @listens document#DOMContentLoaded - Waits for the content of the document to be fully loaded before attaching event handlers.
 */
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            loginUser(email, password);
        });
    }
});

/**
 * Simulates a login by checking user credentials and storing session data.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 */
function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        console.log('Login successful:', user);
        // Remove sensitive data before saving to local storage
        const { password, ...sessionData } = user;
        saveSession(sessionData);
        return true;
    } else {
        console.log('Login failed: Incorrect email or password.');
        return false;
    }
}

export { loginUser };