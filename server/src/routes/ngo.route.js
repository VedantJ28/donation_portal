import { Router } from "express";
import {
    resgisterNGO,
    verifyDonation
} from "../controllers/ngo.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const ngoRoutes = new Router();

ngoRoutes.route('/register-ngo').post(
    upload.fields([
        { name: 'profile', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]),
    resgisterNGO
);

ngoRoutes.route('/:donationId/vefiyDonation').post(authMiddleware, verifyDonation);

export default ngoRoutes;


