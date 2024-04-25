import PouchDB from 'pouchdb';
// const PouchDB = require('pouchdb');
const db = new PouchDB('session_db');

/**
 * Saves session data to the database.
 * @param {Object} sessionData - The user data to save, excluding the password.
 */
export function saveSession(sessionData) {
    sessionData._id = 'session';  // Use a constant ID for the session document
    db.get('session').then(doc => {
        sessionData._rev = doc._rev;  // Ensure the revision is updated for conflict handling
        return db.put(sessionData);
    }).catch(err => {
        if (err.name === 'not_found') {
            // No existing session, create a new one
            db.put(sessionData);
        } else {
            console.error('Error saving session data:', err);
        }
    });
}