import { client, MONGO_DATABASE } from "../index.js";
import { hashPassword, comparePassword , generateToken} from "../utils/auth.js";
import {ObjectId} from 'mongodb'

export const getAllUserService = async () => {

  const users = await client
    .db(MONGO_DATABASE)
    .collection("users")
    .find({})
    .toArray();  

  return users;
};


export const registerUserService = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await client
    .db(MONGO_DATABASE)
    .collection("users")
    .findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
  };

  await client
    .db(MONGO_DATABASE)
    .collection("users")
    .insertOne(newUser);

  return {
    message: "User registered successfully",
  };
};



export const loginUserService = async (email, password) => {

  const user = await client
    .db(MONGO_DATABASE)
    .collection("users")
    .findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role
  });

  return {
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};



export const deleteUserService = async (id) => {

  if (!id) {
    throw new Error("User ID is required");
  }

  const result = await client
    .db(MONGO_DATABASE)
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    throw new Error("User not found");
  }

  return {
    message: "User deleted successfully",
  };
};