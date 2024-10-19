import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { registerDonor } from "../controllers/donor.controller.js";

const donorRoutes = new Router();

donorRoutes.route('/register-donor').post(
    upload.fields({name: 'profile', maxCount: 1}),
    registerDonor
);

export default donorRoutes;
