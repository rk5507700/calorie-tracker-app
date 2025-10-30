import express from "express";
import { register, login } from "../controllers/auth.controller.js";
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

export default usersRouter;
