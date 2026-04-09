import { newBookings , getUserBookings, cancelBooking} from "../controllers/booking.controller.js";
import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validate.js";
import {bookingSchema } from '../validation/booking.validation.js'

const bookingRouter = express.Router()

bookingRouter.post("/",verifyJWT,validateBody(bookingSchema),newBookings)
bookingRouter.get("/",verifyJWT , getUserBookings)
bookingRouter.patch("/:id" , verifyJWT,verifyJWT , cancelBooking)

export default bookingRouter
    
