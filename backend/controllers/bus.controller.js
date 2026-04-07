// controllers/bus.controller.js
import { getBusesService , getBusByIdService , createBus , updateSeatsService } from "../services/bus.service.js";
import {StatusCodes} from 'http-status-codes'

export const getBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const buses = await getBusesService(from, to, date);

    res.status(StatusCodes.OK).json({
      data: buses,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message : "Internal server error",
      error: error.message,
    });
  }
};

export const getBusByIds = async (req , res) => {
    const {id } = req.params
     try{
        const result = await getBusByIdService(id)
        if (result) {
            return res.status(StatusCodes.OK).json (result)
        }
        else{
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "Bus not found"
            })
        }
     }
     catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message :"Internal server error",
            error : err.message
        })
     }
}



export const addBus = async(req , res) => {
  const body  = req.body
  try{
    const result = await createBus(body)

    if (result){
        return  res.status(StatusCodes.CREATED).json({
          message : "bus created successfully"
        })
    }
    else{
      return res.status(StatusCodes.BAD_REQUEST).json({
        message : "bad request can not create bus"
      })
    }
  }
  catch(err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:"internal server error",
      error : err.message
    })
  }
}



export const updateSeats = async (req, res) => {
  try {
    const { busId, seats, action } = req.body;
    const result = await updateSeatsService(busId, seats, action);

    if (result) {
      return res.status(StatusCodes.OK).json({
        message : `Seats ${action}ed successfully`,
        result 
      })
    }
    else{
      return res.status(StatusCodes.NOT_FOUND).json({
        message : "not found"
      })
    }

  } catch (er) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message : "internal server error",
      error  : err.message 
      });
  }
};



