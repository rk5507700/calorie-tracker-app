import express from "express";
import { register } from "../controllers/auth.controller.js";
const usersRouter = express.Router();

usersRouter.post("/register", register);

export default usersRouter;
