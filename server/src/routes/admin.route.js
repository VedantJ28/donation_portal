import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { verifyNgo } from "../controllers/admin.controller.js";

const adminRoutes = new Router();

adminRoutes.route("/vefify-ngo/:registrationNumber").post(verifyAdmin, verifyNgo);