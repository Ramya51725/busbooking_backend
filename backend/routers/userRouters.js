import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { userSchema } from "../validations/userValidation.js";

router.post("/register", validate(userSchema), authController.registerUser);
router.post("/login", authController.loginUser);
router.delete("/delete-account", authMiddleware, authController.deleteUser);

export default router;