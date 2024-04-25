import PouchDB from 'pouchdb';
// const PouchDB = require('pouchdb');
const db = new PouchDB('session_db');

/**
 * Saves session data to the database. This function updates an existing session or creates a new one if it doesn't exist.
 * @param {Object} sessionData - The user data to save, excluding the password.
 */
export async function saveSession(sessionData) {
    try {
        const doc = await db.get('session');
        sessionData._id = 'session';
        sessionData._rev = doc._rev; // Use the latest revision to avoid conflicts.
        await db.put(sessionData);
    } catch (err) {
        if (err.name === 'not_found') {
            // No existing session, create a new one.
            sessionData._id = 'session';
            await db.put(sessionData);
        } else {
            console.error('Error saving session data:', err);
        }
    }
}

/**
 * Retrieves the current session data from the database.
 * @returns {Promise<Object|null>} A promise that resolves with the session data if found, otherwise null.
 */
export async function getSession() {
    try {
        const doc = await db.get('session');
        return doc; // Return the document representing the session.
    } catch (err) {
        if (err.name === 'not_found') {
            // No session exists.
            return null;
        } else {
            console.error('Error retrieving session data:', err);
            throw err;
        }
    }
}

/**
 * Clears the current session from the database.
 * @returns {Promise<void>} A promise that resolves when the session is deleted or if no session was found.
 */
export async function clearSession() {
    try {
        const doc = await db.get('session');
        await db.remove(doc);
    } catch (err) {
        if (err.name === 'not_found') {
            // No session to clear.
            console.log('No session to clear.');
        } else {
            console.error('Error clearing session data:', err);
            throw err;
        }
    }
}

/**
 * Checks if there is an active session, indicating that the user is logged in.
 * @returns {Promise<boolean>} A promise that resolves with true if a user is logged in, otherwise false.
 */
export async function isLoggedIn() {
    try {
        await db.get('session');
        return true; // Session exists, user is logged in.
    } catch (err) {
        if (err.name === 'not_found') {
            return false; // No active session, user is not logged in.
        } else {
            console.error('Error checking login status:', err);
            throw err;
        }
    }
}