
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
    const applyKeyToChar = (code) =>
      textToChars(key).reduce((a, b) => a ^ b, code);
     return text
      .split("")
      .map(textToChars)
      .map(applyKeyToChar)
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
    const applyKeyToChar = (code) =>
      textToChars(key).reduce((a, b) => a ^ b, code);
    return encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applyKeyToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };

export default {
    encrypt,
    decrypt
}