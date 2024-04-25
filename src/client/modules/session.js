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
export async function saveSession(sessionData) {
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
      session[key] = decrypt(session[key]);
    }
    return session;
  } catch (err) {
    return null;
  }
}

/**
 * Clears the session data.
 * @async
 * @function clearSession
 * @throws {Error} If there is an error clearing the session data.
 */
export async function clearSession() {
  try {
    await db.remove(session);
  } catch (err) {
    console.error("Error clearing session data:", err);
  }
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

/* Referenced from metatron from StackOverflow */
/**
 * Encrypts the given text using a specified key.
 * 
 * @param {string} text - The text to be encrypted.
 * @param {string} [key=ENCRYPTION_KEY] - The encryption key. Defaults to ENCRYPTION_KEY if not provided.
 * @returns {string} The encrypted text.
 */
const encrypt = (text, key=ENCRYPTION_KEY) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

/**
 * Decrypts an encoded string using a given key.
 * @param {string} encoded - The encoded string to be decrypted.
 * @param {string} [key=ENCRYPTION_KEY] - The key used for decryption. Defaults to ENCRYPTION_KEY.
 * @returns {string} - The decrypted string.
 */
const decrypt = (encoded, key=ENCRYPTION_KEY) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
