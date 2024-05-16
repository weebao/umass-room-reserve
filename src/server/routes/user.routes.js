import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", controller.getUser);
router.put("/", controller.updateUser);
router.delete("/", controller.deleteUser);
router.post("/login", controller.login);
router.post("/register", controller.register);

// Catch all other HTTP methods not allowed for existing routes
router.all('*', (req, res, next) => {
  if (res.headersSent) {
    next(); // If a response has already been sent, pass to the next middleware
  } else {
    res.status(405).send({ error: 'Method Not Allowed' });
  }
});

export default router;
