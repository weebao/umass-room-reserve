import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
