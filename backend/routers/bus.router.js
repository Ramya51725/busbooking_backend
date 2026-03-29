// routes/bus.routes.js
import express from "express";
import { getBuses } from "../controllers/bus.controller.js";

const busRouter = express.Router();

busRouter.get("/search", getBuses);

export default busRouter;