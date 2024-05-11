/**
 * Represents a room.
 * @typedef {Object} Room
 * @property {string} id - The ID of the room.
 * @property {string} label - The label of the room.
 * @property {string} buildingId - The ID of the building.
 * @property {string} buildingName - The name of the building.
 * @property {string[]} availableTimes - The available times for the room.
 * @property {string} img - The URL of the room's image.
 */

const URL = "https://libcal.library.umass.edu";

/**
 * Retrieves the available rooms for a given date and time range.
 * @param {string} date - The date for which to retrieve available rooms.
 * @param {string} startTime - The start time of the range.
 * @param {string} endTime - The end time of the range.
 * @returns {Room[]} An array of available rooms.
 */
export const getAvailableRooms = (date, startTime, endTime) => {

}

/**
 * Checks if a room is available for a given date and time range.
 * @param {string} date - The date for which to check room availability.
 * @param {string} startTime - The start time of the range.
 * @param {string} endTime - The end time of the range.
 * @param {string} roomId - The ID of the room to check availability for.
 * @returns {boolean} True if the room is available, false otherwise.
 */
export const checkAvailable = (date, startTime, endTime, roomId) => { }

/**
 * Books a room for a given date and time range.
 * @param {string} date - The date for which to book the room.
 * @param {string} startTime - The start time of the range.
 * @param {string} endTime - The end time of the range.
 * @param {string} roomId - The ID of the room to book.
 * @param {Object} formData - The form data for the booking.
 * @returns {boolean} True if the room was successfully booked, false otherwise.
 */
export const bookRoom = (date, startTime, endTime, roomId, formData) => { }