import PouchDB from 'pouchdb';

const db = new PouchDB('umass_reserve_rooms');

/**
 * Retrieves user data from the database.
 * @param {string} userId - The ID of the user to retrieve data for.
 * @returns {Promise<Object>} The user's data or a default structure if not found.
 */
async function getUserData(userId) {
  try {
    return await db.get(userId);
  } catch (err) {
    if (err.name === 'not_found') {
      // If no data is found, return a default structure with empty data
      return { _id: userId, data: {} };
    } else {
      console.error('Error retrieving user data:', err);
      throw err;
    }
  }
}

/**
 * Saves or updates user data in the database.
 * @param {Object} userData - The user data to save. Must include _id and may include _rev for updates.
 * @returns {Promise<Object>} The updated user data with the new revision number.
 */
async function saveUserData(userData) {
  try {
    const response = await db.put(userData);
    return { ...userData, _rev: response.rev };
  } catch (err) {
    console.error('Error saving user data:', err);
    throw err;
  }
}

export { getUserData, saveUserData };
