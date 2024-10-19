import { Router } from "express";
import { resgisterNGO } from "../controllers/ngo.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const ngoRoutes = new Router();

ngoRoutes.route('/register-ngo').post(
    upload.fields([
        {name: 'profile', maxCount: 1},
        {name: 'cover', maxCount: 1}
    ]),
    resgisterNGO
);

export default ngoRoutes;


