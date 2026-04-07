import express from "express";
import { registerUser , loginUser , deleteUser , getAllUsers} from "../controllers/auth.controller.js";
import validateBody from "../middleware/validate.js";
import { loginSchema,registerSchema } from "../validation/user.validation.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/",verifyJWT, getAllUsers);
userRouter.post("/register",validateBody(registerSchema), registerUser);
userRouter.post("/login", validateBody(loginSchema),loginUser);
userRouter.delete("/:id",verifyJWT, deleteUser);

export default userRouter;