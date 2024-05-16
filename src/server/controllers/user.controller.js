import database from "../db.js";
import { encrypt } from "../utils/crypt.js";

export const getUser = async (req, res) => {
  const { email } = req.query;
  try {
    const userData = await database.getUser(email);
    if (userData.status === "success") {
      res.status(200).json(userData);
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

export const updateUser = async (req, res) => {
  const { email } = req.query;
  const userData = req.body;
  try {
    const result = await database.updateUser(email, userData);
    if (result.status === "success") {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const deleteUser = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await database.deleteUser(email);
    if (result.status === "success") {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}

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
          data: userData.data,
        });
      } else {
        res
          .status(401)
          .json({ status: "error", message: "Incorrect email or password" });
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
  const { email, password, firstName, lastName, role , major} = req.body
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
      if (result.status === "error") {
        res.status(500).json(result);
        return;
      }
      res.status(201).json({
        status: "success",
        message: "Registration successful",
        data: { email, firstName, lastName, role , major}
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
