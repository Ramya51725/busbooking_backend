// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// export const generateToken = (payload) => {
//   return jwt.sign(
//     payload,
//     process.env.JWT_SECRET ,
//     { expiresIn: "1d" }
//   );
// };

// export const verifyToken = (token) => {
//   return jwt.verify(
//     token,
//     process.env.JWT_SECRET ,
//   );
// };

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};