import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = new Router();

authRoutes.route('/login').post(login);

authRoutes.route('/logout').post(authMiddleware ,logout);

export { authRoutes };