/**
 * Saves the user session to localStorage.
 * @param {Object} sessionData - The session data to store, typically includes user info and token.
 */
export function saveSession(sessionData) {
    localStorage.setItem('userSession', JSON.stringify(sessionData));
}

/**
 * Retrieves the user session from localStorage.
 * @returns {Object|null} The stored session data, or null if no session is stored.
 */
export function getSession() {
    const sessionData = localStorage.getItem('userSession');
    return sessionData ? JSON.parse(sessionData) : null;
}

/**
 * Clears the user session from localStorage.
 */
export function clearSession() {
    localStorage.removeItem('userSession');
}

/**
 * Check if the user is logged in.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export function isLoggedIn() {
    return getSession() !== null;
}