// routes/bus.routes.js
import express from "express";
import { getBuses , getBusByIds } from "../controllers/bus.controller.js";

const busRouter = express.Router();

busRouter.get("/search", getBuses);
busRouter.get("/:id", getBusByIds)


export default busRouter;

