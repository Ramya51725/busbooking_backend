import { client, MONGO_DATABASE } from "../index.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";


// 🔐 REGISTER
export const registerUserService = async (userData) => {
  const { email, password } = userData;

  // 1. Check existing user
  const existingUser = await client
    .db(MONGO_DATABASE)
    .collection("users")
    .findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await hashPassword(password);

  // 3. Create user object
  const newUser = {
    ...userData,
    password: hashedPassword,
    role: "user", 
  };

  // 4. Insert user
  const result = await client
    .db(MONGO_DATABASE)
    .collection("users")
    .insertOne(newUser);

  return result;
};



// 🔐 LOGIN
export const loginUserService = async (email, password) => {
  // 1. Find user
  const user = await client
    .db(MONGO_DATABASE)
    .collection("users")
    .findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. Compare password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. Generate token
  const token = generateToken({
    userId: user._id,
    name: user.name,
    role: user.role,
  });

  return { token, user };
};