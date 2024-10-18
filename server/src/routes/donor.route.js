import { Router } from "express";
import upload from "../middlewares/multer.middleware.js"
import { registerDonor } from "../controllers/donor.controller.js";

const router = new Router();

router.route('/register-donor').post(
    upload.field({name: 'profile', maxCount: 1}),
    registerDonor
);

export default router;
