import { users } from "../../server/mockdata.js";
import { saveSession } from "../components/Auth.js";

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