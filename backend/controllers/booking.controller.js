import { newBooking , getBookingsByUserId  , cancelBookingService } from "../services/booking.service.js";
import { NOT_FOUND, StatusCodes } from "http-status-codes";


const newBookings = async(req , res) => {
    const body = req.body
    try{
        const data = await newBooking (body)

        if (data){
            res.status(StatusCodes.CREATED).json({
                booking :data,
                message : "bus booked successfully"
            })
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({
                message : "bus booking failed"
            })
        }
    }
    catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : "Internal server error",
            error : err.message
        })
    }
}



const getUserBookings   = async (req, res) => {
    const userId = req.user.id 

    try{
        const result = await getBookingsByUserId(userId)

        if (result){
            res.status(StatusCodes.OK).json({result})
        }
        else{
            res.status(StatusCodes.NOT_FOUND).json({
                message : "User id not found"
            })
        }
    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : "Internal server error",
            error : err.message
        })
    }

}


const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await cancelBookingService(id);

    if (result.modifiedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Booking not found or already cancelled",
      });
    }

    res.json({
      message: "Booking cancelled successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error cancelling booking",
    });
  }
};


export {newBookings , getUserBookings , cancelBooking}