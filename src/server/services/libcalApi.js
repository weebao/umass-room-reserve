/**
 * Represents a room.
 * @typedef {Object} Room
 * @property {string} id - The ID of the room.
 * @property {string} name - The label of the room.
 * @property {string} buildingId - The ID of the building.
 * @property {string} buildingName - The name of the building.
 * @property {string[]} availableTimes - The available times for the room. (HH:MM:SS-HH:MM:SS)
 * @property {string} img - The URL of the room's image.
 * @property {string[]} checksums - Special code for booking the room at each time slot (only for the libcal API)
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
  shortToFullName,
} from "../lib/idDict.js";
import { Headers } from "../lib/apiData.js";
import {
  checkDateFormat,
  checkTimeFormat,
  getDateRange,
  canBookInTimeRange,
} from "../utils/datetime.js";
import { objectToFormData } from "../utils/dataFormat.js";

const URL = "https://libcal.library.umass.edu";

/**
 * Retrieves room availability information for the specified date.
 * @param {string} id - The ID of the room.
 * @param {string | undefined} date - Current date (if undefined then return today) (Format: YYYY-MM-DD)
 * @returns {Promise<Object>} - A Promise that resolves to an object representing the room.
 */
export const getRoom = async (id, date) => {
  // Initialize vars
  const path = "/spaces/availability/grid";
  const { todayDate, tomorrowDate } = getDateRange(date ? new Date(date) : new Date());
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
      Referer: `https://libcal.library.umass.edu/space/${id}`,
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

  room.availableTimes.sort();
  return room;
};

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

    // Process returning data
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
    }
  }

  // Filter out rooms that are not available for the specified time range
  if (startTime && endTime) {
    const canBook = canBookInTimeRange(startTime, endTime);
    for (const roomId in rooms) {
      const room = rooms[roomId];
      room.checksums = room.checksums.filter((_, i) =>
        canBook(room.availableTimes[i])
      );
      room.availableTimes = room.availableTimes.filter(canBook);
    }
  }

  return Object.values(rooms);
};

/**
 * Checks if a room is available for a given date and time range.
 * @param {string} id - The ID of the room to check availability for.
 * @param {string} date - The date for which to check room availability. (Format: YYYY-MM-DD)
 * @param {string} startTime - The start time of the range. (Format: HH:MM:SS in 24-hour format)
 * @param {string} endTime - The end time of the range. (Format: HH:MM:SS in 24-hour format)
 * @returns {Promise<boolean>} True if the room is available, false otherwise.
 */
export const isAvailable = async (id, date, startTime, endTime) => {
  // Check format
  if (!checkDateFormat(date)) throw new Error("Invalid date format");
  if (!checkTimeFormat(startTime)) throw new Error("Invalid start time format");
  if (!checkTimeFormat(endTime)) throw new Error("Invalid end time format");

  
  // Initialize vars
  const path = "/spaces/availability/grid";
  const { todayDate, tomorrowDate } = getDateRange(date);
  
  // Fetch from the external API
  const result = await fetch(URL + path, {
    method: "POST",
    headers: {
      ...Headers,
      Referer: `https://libcal.library.umass.edu/space/${id}`,
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
  const canBook = canBookInTimeRange(startTime, endTime);
  
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    if (slot.className?.includes("checkout")) continue;
    
    const roomStartTime = slot["start"].split(" ")[1];
    const roomEndTime = slot["end"].split(" ")[1];

    if (canBook(`${roomStartTime}-${roomEndTime}`)) {
      return true;
    }
  }

  return false;
};

/**
 * Books a room using the LibCal API.
 *
 * @param {string} date - The date of the booking.
 * @param {string} startTime - The start time of the booking. (Format: HH:MM:SS in 24-hour format)
 * @param {string} endTime - The end time of the booking. (Format: HH:MM:SS in 24-hour format)
 * @param {number} roomId - The ID of the room to be booked.
 * @param {Object} formData - Additional form data for the booking. Format: { firstName, lastName, email, studentRole, numPeople, useComputer, major }
 * @returns {Promise<BookingResult>} A promise that resolves when the room is successfully booked.
 * Use path: "spaces/availability/booking/add" - POST
   * FormData: {
      add[eid]: 107642
      add[gid]: 28495
      add[lid]: 11076
      add[start]: 2024-05-12 11:00
      add[checksum]: 189f4c5b27b3943d84d764ffcf927e6d
      lid: 11076
      gid: 28495
      start: 2024-05-12
      end: 2024-05-13
    }
   * Save the checksum for the response
   * Use path: "ajax/space/book" - POST
   * FormData: {
      session: 51343052
      fname: first name
      lname: last name
      email: email@umass.edu
      q12479: "Undergraduate" | "Graduate" | "Other" -> student role
      q12481: "3-5" | "More than 5" -> how many people
      q12482: "Yes" | "No" | "Maybe" -> will use computer?
      q12477: CS -> major
      bookings: [{"id":1,"eid":<ROOM ID>,"seat_id":0,"gid":<ROOM TYPE ID>,"lid":<BUILDING ID>,"start":"2024-05-12 11:00","end":"2024-05-12 12:00","checksum":"<THE NEW CHECKSUM JUST GOT FROM ABOVE>"}]
      returnUrl: /space/<ROOM ID>
      method: 12
    }
   * And then you save the book_id for cancelling later
 */
export const bookRoom = async (roomId, date, startTime, endTime, formData) => {
  // Check format
  if (!checkDateFormat(date)) throw new Error("Invalid date format");
  if (!checkTimeFormat(startTime)) throw new Error("Invalid start time format");
  if (!checkTimeFormat(endTime)) throw new Error("Invalid end time format");

  const roomData = await getRoom(roomId, date);

  const getChecksumURL = "/spaces/availability/booking/add";
  const bookingURL = "/ajax/space/book";
  
  const { todayDate, tomorrowDate } = getDateRange(date);
  const canBook = canBookInTimeRange(startTime, endTime);
  const { availableTimes, checksums } = roomData;
  const newChecksums = {}

  for (let i = 0; i < availableTimes.length; i++) {
    const bookingTime = availableTimes[i];
    if (!canBook(bookingTime)) continue;

    const startBookingTime = bookingTime.split("-")[0].slice(0, 5);
    const checksum = checksums[i];
    const result = await fetch(URL + getChecksumURL, {
      method: "POST",
      headers: {
        ...Headers,
        Referer: `https://libcal.library.umass.edu/space/${roomData.id}`,
      },
      body: objectToFormData({
        "add[eid]": roomData.id,
        "add[gid]": roomIdToType[roomData.id],
        "add[lid]": roomIdToBuilding[roomData.id],
        "add[start]": `${todayDate} ${startBookingTime}`,
        "add[checksum]": checksum,
        lid: roomIdToBuilding[roomData.id],
        gid: roomIdToType[roomData.id],
        start: todayDate,
        end: tomorrowDate,
      }),
    });

    if (!result.ok) {
      throw new Error(`${await result.text()} (${result.status})`);
    }

    const data = await result.json();
    newChecksums[i] = data["bookings"][0]["checksum"];
  }

  const bookingList = [];
  let id = 0;
  for (const [idx, checksum] of Object.entries(newChecksums)) {
    const [start, end] = availableTimes[idx].split("-");
    bookingList.push({
      id: id++,
      eid: roomData.id,
      seat_id: 0,
      gid: roomIdToType[roomData.id],
      lid: roomIdToBuilding[roomData.id],
      start: `${todayDate} ${start.slice(0, 5)}`,
      end: `${todayDate} ${end.slice(0, 5)}`,
      checksum,
    });
  }

  const bookingBody = new FormData();
  bookingBody.append("fname", formData.firstName);
  bookingBody.append("lname", formData.lastName);
  bookingBody.append("email", formData.email);
  bookingBody.append("q12479", formData.studentRole);
  bookingBody.append("q12481", formData.numPeople);
  bookingBody.append("q12482", formData.useComputer);
  bookingBody.append("q12477", formData.major);
  bookingBody.append("bookings", JSON.stringify(bookingList));
  bookingBody.append("returnUrl", `/space/${roomData.id}`);
  bookingBody.append("method", 11);

  const bookingResult = await fetch(URL + bookingURL, {
    method: "POST",
    headers: {
      ...Headers,
      Referer: `https://libcal.library.umass.edu/space/${roomData.id}`,
    },
    body: bookingBody
  });

  if (!bookingResult.ok) {
    throw new Error(`${await bookingResult.text()} (${bookingResult.status})`);
  }

  const bookingData = await bookingResult.json();
  return { roomId: roomData.id, roomName: roomData.name, date, startTime, endTime, bookId: bookingData["bookId"] };
};
