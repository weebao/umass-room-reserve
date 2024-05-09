// import PouchDB from "../../../node_modules/pouchdb";
// const PouchDB = require('pouchdb');
const db = new PouchDB('session_db');

const ENCRYPTION_KEY = "timrichardsisthegoat";

/**
 * Saves the session data by encrypting each value and storing it in the database.
 * @async
 * @param {Object} sessionData - The session data to be saved.
 * @returns {Promise<void>} - A promise that resolves when the session data is successfully saved.
 */
export async function createSession(sessionData) {
  for (const key in sessionData) {
    sessionData[key] = encrypt(sessionData[key]);
  }
  await db.put({
    _id: "userSession",
    ...sessionData,
  });
}

/**
 * Retrieves the session data from the database and decrypts it.
 * @async
 * @returns {Object|null} The decrypted session data, or null if an error occurs.
 */
export async function getSession() {
  try {
    const session = await db.get("userSession");
    for (const key in session) {
      if (key === "_id" || key === "_rev") {
        continue;
      }
      session[key] = decrypt(session[key]);
    }
    return session;
  } catch (err) {
    return null;
  }
}

/**
 * Modifies the user session with updated data.
 * @param {Object} sessionData - The updated data to be applied to the user session.
 * @returns {Promise<void>} - A promise that resolves when the user session is successfully modified.
 */
export async function modifySession(sessionData) {
  const session = await db.get("userSession");
  for (const key in sessionData) {
    sessionData[key] = encrypt(sessionData[key]);
  }
  await db.put({
    _id: "userSession",
    _rev: session._rev,
    ...sessionData,
  });
}

/**
 * Clears the session data.
 * @async
 * @function clearSession
 * @throws {Error} If there is an error clearing the session data.
 */
export async function clearSession() {
  const session = await db.get("userSession");
  await db.remove("userSession", session._rev);
}

/**
 * Checks if a user is currently logged in.
 * @async
 * @returns {Promise<boolean>} A promise that resolves to true if the user is logged in, false otherwise.
 */
export async function isLoggedIn() {
  try {
    return (await getSession()) !== null;
  } catch (err) {
    return false;
  }
}
