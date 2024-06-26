import express from "express";
import * as controller from "../controllers/building.controller.js";

const router = express.Router();

router.get("/", controller.getBuilding);

// Catch all other HTTP methods not allowed for existing routes
router.all('*', (req, res, next) => {
  if (res.headersSent) {
    next(); // If a response has already been sent, pass to the next middleware
  } else {
    res.status(405).send({ error: 'Method Not Allowed' });
  }
});

export default router;
