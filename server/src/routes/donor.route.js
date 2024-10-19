import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { registerDonor } from "../controllers/donor.controller.js";
import { donate } from "../controllers/donor.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const donorRoutes = new Router();

donorRoutes.route('/register-donor').post(
    upload.fields({name: 'profile', maxCount: 1}),
    registerDonor
);

donorRoutes.route('/:donorId/donate').post(authMiddleware, donate);

export default donorRoutes;
