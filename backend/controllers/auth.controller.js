import { registerUserService, loginUserService , deleteUserService  , getAllUserService} from "../services/user.service.js";
import { StatusCodes } from "http-status-codes";


export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUserService();

    return res.status(StatusCodes.OK).json({
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};


export const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);

    return res.status(StatusCodes.CREATED).json({
      message: result.message,
    });

  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    return res.status(StatusCodes.OK).json({
      message: result.message,
      data: result.user,
    });

  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteUserService(id);

    return res.status(StatusCodes.OK).json({
      message: result.message,
    });

  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};