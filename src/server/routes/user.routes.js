import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", controller.login);
router.get("/register", controller.register);

export default router;
