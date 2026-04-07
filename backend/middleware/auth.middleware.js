import { verifyToken } from "../utils/auth.js";
import { StatusCodes } from "http-status-codes";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }

  req.user = decoded; 

  next();
};