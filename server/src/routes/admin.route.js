import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { verifyNgo } from "../controllers/admin.controller.js";
import { adminLogin, adminLogout, getDonors, getNGOs, getDonations } from "../controllers/auth.controller.js";

const adminRoutes = new Router();

adminRoutes.route("/adminLogin").post(adminLogin);
adminRoutes.route("/adminLogout").post(verifyAdmin, adminLogout);
adminRoutes.route("/vefify-ngo/:registrationNumber").post(verifyAdmin, verifyNgo);
adminRoutes.route("/get-donors").get(verifyAdmin, getDonors);
adminRoutes.route("/get-ngos").get(verifyAdmin, getNGOs);
adminRoutes.route("/get-donations").get(verifyAdmin, getDonations);

export default adminRoutes;