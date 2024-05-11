import { authenticate } from "../middleware/auth.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await database.getUser(email);
    if (userData.status === "success") {
      const encryptedPassword = password;
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
      const result = await database.createUser(email, password);
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}
