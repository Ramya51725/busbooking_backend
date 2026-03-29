import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// 🔐 Create JWT token
export const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET ,
    { expiresIn: "1d" }
  );
};

// ✅ Verify JWT token
export const verifyToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET ,
  );
};

// 🔒 Hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// 🔑 Compare password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};