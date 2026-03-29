// controllers/bus.controller.js
import { getBusesService } from "../services/bus.service.js";
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




