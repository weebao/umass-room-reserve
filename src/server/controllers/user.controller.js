import database from "../db.js";
import { encrypt } from "../utils/crypt.js";

/**
 * Handles user login.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await database.getUser(email);
    if (userData.status === "success") {
      const encryptedPassword = encrypt(password);
      if (userData.data.password === encryptedPassword) {
        res.status(200).json({
          status: "success",
          message: "Login successful",
          data: { email: userData.email },
        });
      } else {
        res
          .status(401)
          .json({ status: "error", message: "Invalid credentials" });
      }
    } else {
      res.status(404).json(userData);
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the registration is complete.
 */
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await database.getUser(email);
    if (userData.status === "success") {
      res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    } else {
      // TODO: Check if all fields are available
      const encryptedPassword = encrypt(password);
      const userData = { ...req.body, password: encryptedPassword };
      const result = await database.createUser(userData);
      console.log(result)
      if (result.status === "error") {
        res.status(500).json(result);
        return;
      }
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
