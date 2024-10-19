import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { verifyNgo } from "../controllers/admin.controller.js";
import { adminLogin, adminLogout } from "../controllers/auth.controller.js";

const adminRoutes = new Router();

adminRoutes.route("/adminLogin").post(adminLogin);
adminRoutes.route("/adminLogout").post(verifyAdmin, adminLogout);
adminRoutes.route("/vefify-ngo/:registrationNumber").post(verifyAdmin, verifyNgo);

export default adminRoutes;