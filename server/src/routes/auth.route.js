import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes = new Router();

authRoutes.route('/login').post(login);

authRoutes.route('/logout').post(authMiddleware ,logout);