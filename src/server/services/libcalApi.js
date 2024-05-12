/**
 * Represents a room.
 * @typedef {Object} Room
 * @property {string} id - The ID of the room.
 * @property {string} name - The label of the room.
 * @property {string} buildingId - The ID of the building.
 * @property {string} buildingName - The name of the building.
 * @property {string[]} availableTimes - The available times for the room. (HH:MM:SS-HH:MM:SS)
 * @property {string} img - The URL of the room's image.
 * @property {string[]} checksumS - Special code for booking the room at each time slot (only for the libcal API)
 */

/**
 * Booking result
 * @typedef {Object} BookingResult
 * @property {string} roomId - The ID of the room.
 * @property {string} roomName - The name of the room.
 * @property {string} date - The date of the booking.
 * @property {string} startTime - The start time of the booking.
 * @property {string} endTime - The end time of the booking.
 * @property {string} bookId - The ID of the booking.
 */

import {
  buildingNameToId,
  buildingIdToName,
  roomTypeToId,
  roomTypeToName,
  roomIdToName,
  roomIdToBuilding,
  roomIdToType,
  roomNameToId,
  shortToFullName
} from "../lib/idDict.js";
import { Headers } from "../lib/apiData.js";

const URL = "https://libcal.library.umass.edu";

/**
 * Checks if the given date is in the format "YYYY-MM-DD".
 *
 * @param {string} date - The date to be checked.
 * @returns {boolean} Returns true if the date is in the correct format, otherwise false.
 */
const checkDateFormat = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

/**
 * Checks if the given time string is in the format HH:MM:SS.
 *
 * @param {string} time - The time string to be checked.
 * @returns {boolean} - Returns true if the time string is in the correct format, otherwise returns false.
 */
const checkTimeFormat = (time) => {
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
  return timeRegex.test(time);
};

/**
 * Get the date range for a given date.
 *
 * @param {Date} date - The input date.
 * @returns {Object} - An object containing the today's date and tomorrow's date in ISO format.
 */
const getDateRange = (date) => {
  const todayDate = new Date(date).toISOString().split("T")[0];
  let tomorrowDate = new Date(date);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  tomorrowDate = tomorrowDate.toISOString().split("T")[0];
  return { todayDate, tomorrowDate };
};

const objectToFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  // console.log(formData)
  return formData;
};

/**
 * Retrieves room availability information for today.
 * @param {string} id - The ID of the room.
 * @returns {Promise<Object>} - A Promise that resolves to an object representing the room.
 */
export const getRoom = async (id) => {
  // Initialize vars
  const path = "/spaces/availability/grid";
  const { todayDate, tomorrowDate } = getDateRange(new Date());
  const buildings = Object.keys(buildingNameToId);
  const room = {
    id,
    name: roomIdToName[id],
    buildingId: roomIdToBuilding[id],
    buildingName: shortToFullName[buildingIdToName[roomIdToBuilding[id]]],
    availableTimes: [],
    img: "https://s3.amazonaws.com/libapps/accounts/77786/images/groupstudyroomsmall.jpg",
    checksums: [],
  };
  
  const result = await fetch(URL + path, {
    method: "POST",
    headers: {
      ...Headers,
      Referer: `https://libcal.library.umass.edu/space/${id}`
    },
    body: objectToFormData({
      lid: roomIdToBuilding[id],
      gid: roomIdToType[id],
      eid: id,
      seat: 0,
      seatId: 0,
      zone: 0,
      start: todayDate,
      end: tomorrowDate,
      pageIndex: 0,
      pageSize: 18,
    }),
  });

  if (!result.ok) {
    throw new Error(`${await result.text()} (${result.status})`);
  }

  const data = await result.json();
  const slots = data["slots"];

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    if (`${slot["itemId"]}` !== id) continue;
    if (slot.className?.includes("checkout")) continue;

    const roomStartTime = slot["start"].split(" ")[1];
    const roomEndTime = slot["end"].split(" ")[1];
    const availableTimes = `${roomStartTime}-${roomEndTime}`;
    const checksum = slot["checksum"];

    room.availableTimes.push(availableTimes);
    room.checksums.push(checksum);
  }

  room.availableTimes.sort()
  return room;
}

/**
 * Retrieves the available rooms based on the specified date, start time, and end time.
 * @param {string} date - The date for which to retrieve available rooms. (Format: YYYY-MM-DD)
 * @param {string | undefined} startTime - The start time of the range. (Format: HH:MM:SS in 24-hour format)
 * @param {string | undefined} endTime - The end time of the range. (Format: HH:MM:SS in 24-hour format)
 * @returns {Promise<Room[]>} A promise that resolves to the result of the fetch request. If startTime and endTime are not provided, the result will contain all available rooms for the given date.
 * @throws {Error} If the date, start time, or end time has an invalid format.
 */
export const getAvailableRooms = async (date, startTime, endTime) => {
  // Check format
  if (!checkDateFormat(date)) throw new Error("Invalid date format");
  if (startTime && !checkTimeFormat(startTime))
    throw new Error("Invalid start time format");
  if (endTime && !checkTimeFormat(endTime))
    throw new Error("Invalid end time format");

  // Initialize vars
  const path = "/spaces/availability/grid";
  const { todayDate, tomorrowDate } = getDateRange(date);
  const buildings = Object.keys(buildingNameToId);
  const rooms = {};

  // Go through all the buildings in our list (dubois and lederle for now)
  for (const building of buildings) {
    // Fetch from the external API
    const result = await fetch(URL + path, {
      method: "POST",
      headers: {
        ...Headers,
        Referer: "https://libcal.library.umass.edu/reserve/groupstudyrooms",
      },
      body: objectToFormData({
        lid: buildingNameToId[building],
        gid: roomTypeToId[building]["groupStudy"],
        eid: -1,
        seat: 0,
        seatId: 0,
        zone: 0,
        start: todayDate,
        end: tomorrowDate,
        pageIndex: 0,
        pageSize: 18,
      }),
    });

    if (!result.ok) {
      throw new Error(`${await result.text()} (${result.status})`);
    }

    // Process returnin data
    const data = await result.json();
    const slots = data["slots"];

    // Go through each slot and add to the result
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (slot.className?.includes("checkout")) continue;

      const roomId = slot["itemId"];
      const roomStartTime = slot["start"].split(" ")[1];
      const roomEndTime = slot["end"].split(" ")[1];
      const availableTimes = `${roomStartTime}-${roomEndTime}`;
      const img =
        "https://s3.amazonaws.com/libapps/accounts/77786/images/groupstudyroomsmall.jpg";
      const checksum = slot["checksum"];

      if (
        startTime &&
        endTime &&
        roomStartTime !== startTime &&
        roomEndTime !== endTime
      )
        continue;

      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          name: roomIdToName[roomId],
          buildingId: buildingNameToId[building],
          buildingName: shortToFullName[building],
          availableTimes: [],
          img,
          checksums: [],
        };
      }

      rooms[roomId].availableTimes.push(availableTimes);
      rooms[roomId].checksums.push(checksum);

      // console.log(rooms[name])
    }
  }
  return Object.values(rooms);
};

/**
 * Checks if a room is available for a given date and time range.
 * @param {string} date - The date for which to check room availability. (Format: YYYY-MM-DD)
 * @param {string} startTime - The start time of the range. (Format: HH:MM:SS in 24-hour format)
 * @param {string} endTime - The end time of the range. (Format: HH:MM:SS in 24-hour format)
 * @param {string} roomId - The ID of the room to check availability for.
 * @returns {Promise<boolean>} True if the room is available, false otherwise.
 */
export const isAvailable = async (date, startTime, endTime, roomId) => {
  // TODO
  throw new Error("Not implemented");
};

/**
 * Books a room using the LibCal API.
 *
 * @param {string} date - The date of the booking.
 * @param {string} startTime - The start time of the booking. (Format: HH:MM:SS in 24-hour format)
 * @param {string} endTime - The end time of the booking. (Format: HH:MM:SS in 24-hour format)
 * @param {string} roomId - The ID of the room to be booked.
 * @param {Object} formData - Additional form data for the booking.
 * @returns {Promise<BookingResult>} A promise that resolves when the room is successfully booked.
 */
export const bookRoom = async (date, startTime, endTime, roomId, formData) => {
  // TODO
  throw new Error("Not implemented");
};
