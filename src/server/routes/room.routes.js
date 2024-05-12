import express from "express";
import * as controller from "../controllers/room.controller.js";

const router = express.Router();

router.get("/", controller.getRoom);
router.get("/all", controller.getAllRooms);
router.post("/book", controller.book);

// Catch all other HTTP methods not allowed for existing routes
router.all('*', (req, res, next) => {
  if (res.headersSent) {
    next(); // If a response has already been sent, pass to the next middleware
  } else {
    res.status(405).send({ error: 'Method Not Allowed' });
  }
});

export default router;