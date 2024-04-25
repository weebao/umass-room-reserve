import PouchDB from 'pouchdb';
// const PouchDB = require('pouchdb');
const db = new PouchDB('session_db');

const HASHKEY = "timrichardsisthegoat";

/**
 * Saves the user session to localStorage.
 * @param {Object} sessionData - The session data to store, typically includes user info and token.
 */
export function saveSession(sessionData) {
  localStorage.setItem("userSession", encrypt(JSON.stringify(sessionData)));
}

/**
 * Retrieves the user session from localStorage.
 * @returns {Object|null} The stored session data, or null if no session is stored.
 */
export function getSession() {
  const sessionData = localStorage.getItem("userSession");
  return sessionData ? decrypt(JSON.parse(sessionData)) : null;
}

/**
 * Clears the user session from localStorage.
 */
export function clearSession() {
  localStorage.removeItem("userSession");
}

/**
 * Check if the user is logged in.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export function isLoggedIn() {
  return getSession() !== null;
}

/* Referenced from metatron from StackOverflow */
/**
 * Encrypts the given text using a specified key.
 * 
 * @param {string} text - The text to be encrypted.
 * @param {string} [key=HASHKEY] - The encryption key. Defaults to HASHKEY if not provided.
 * @returns {string} The encrypted text.
 */
const encrypt = (text, key=HASHKEY) => {
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
 * @param {string} [key=HASHKEY] - The key used for decryption. Defaults to HASHKEY.
 * @returns {string} - The decrypted string.
 */
const decrypt = (encoded, key=HASHKEY) => {
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
