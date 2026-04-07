// routes/bus.routes.js
import express from "express";
import { getBuses , getBusByIds , addBus , updateSeats } from "../controllers/bus.controller.js";
import {busValidationSchema } from '../validation/bus.validation.js'
import { verifyJWT } from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validate.js";


const busRouter = express.Router();

busRouter.get("/search",verifyJWT ,getBuses);
busRouter.get("/:id", verifyJWT,getBusByIds)
busRouter.post("/",verifyJWT ,validateBody(busValidationSchema), addBus)
busRouter.patch("/", updateSeats);

export default busRouter;

