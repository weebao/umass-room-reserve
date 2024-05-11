import database from "../db.js";
import encrypt from "../utils/crypt.js";

export const authenticate = (req, res, next) => {
  const { email, password } = req.body;
  const encryptedPassword = encrypt(password);
  const user = database.getUser(email);
  if (user.password === encryptedPassword) {
    next();
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
}