// routes/bus.routes.js
import express from "express";
import { getBuses , getBusByIds , addBus , updateSeats  , getAllBus , deleteAllBuses} from "../controllers/bus.controller.js";
import {busValidationSchema } from '../validation/bus.validation.js'
import { verifyJWT } from "../middleware/auth.middleware.js";

import validateBody from "../middleware/validate.js";


const busRouter = express.Router();


busRouter.get("/",verifyJWT,getAllBus)
busRouter.get("/search",verifyJWT ,getBuses);
busRouter.get("/:id", verifyJWT,getBusByIds)
busRouter.post("/",verifyJWT ,validateBody(busValidationSchema), addBus)
busRouter.delete("/:id", verifyJWT,deleteAllBuses)
busRouter.patch("/", verifyJWT,updateSeats);

export default busRouter;

