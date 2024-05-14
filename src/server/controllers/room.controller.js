import * as libcal from "../services/libcalApi.js";
import { roomIdToName } from "../lib/idDict.js";

/**
 * Retrieves a room and its current availability based on the provided ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the room is retrieved.
 */
export const getRoom = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({
        status: "error",
        message: "Room ID is required",
        error: "Bad Request"
      });
      return;
    }
    if (!roomIdToName[id]) {
      res.status(404).json({
        status: "error",
        message: "Room not found",
        error: "Not Found"
      });
    }

    const room = await libcal.getRoom(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}

/**
 * Retrieves all available rooms based on the specified date, start time, and end time.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the available rooms.
 */
export const getAllRooms = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;
    if (!date || !startTime || !endTime) {
      const date = new Date().toISOString().split("T")[0];
      const rooms = await libcal.getAvailableRooms(date)
      res.status(200).json(rooms);
      return;
    }

    if (!date) {
      res.status(400).json({
        status: "error",
        message: "Date is required",
        error: "Bad Request",
      });
      return;
    }

    const rooms = await libcal.getAvailableRooms(date, startTime, endTime);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Book a room.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the room is booked.
 */
export const book = async (req, res) => {
  try {
    const { date, startTime, endTime, roomId } = req.body;
    const formData = req.body;
    if (await isAvailable(date, startTime, endTime, roomId)) {
      const result = await libcal.bookRoom(date, startTime, endTime, roomId, formData);
      res.status(200).json(result);
    } else {
      res.status(400).json({
        status: "error",
        message: "Room is not available",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
