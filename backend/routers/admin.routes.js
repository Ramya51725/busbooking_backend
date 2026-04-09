import express from "express";
import { getAdminDashboard } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.get("/dashboard", verifyJWT,getAdminDashboard);

export default adminRouter;