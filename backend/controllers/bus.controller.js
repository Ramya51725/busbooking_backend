// controllers/bus.controller.js
import { getBusesService , getBusByIdService } from "../services/bus.service.js";
import {StatusCodes} from 'http-status-codes'
import { ObjectId } from "mongodb";

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






