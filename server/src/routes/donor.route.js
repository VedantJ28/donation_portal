import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { registerDonor,
    getDonations,
    donate
 } from "../controllers/donor.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const donorRoutes = new Router();

donorRoutes.route('/register-donor').post(
    upload.fields({name: 'profile', maxCount: 1}),
    registerDonor
);

donorRoutes.route('/:donorId/donate').post(authMiddleware,
    upload.fields({name: 'image', maxCount: 1}),
    donate
);

donorRoutes.route('/:donorId/get-donations').get(authMiddleware, getDonations);

export default donorRoutes;
