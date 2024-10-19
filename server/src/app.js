import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("Public"));
app.use(cookieParser());


//Routes import

import ngoRoutes from "./routes/ngo.route.js";
import donorRoutes from "./routes/donor.route.js";
import {authRoutes} from "./routes/auth.route.js";    

app.use("/api/v1/ngo", ngoRoutes);
app.use("api/v1/donor", donorRoutes);
app.use("/api/v1/auth", authRoutes);

export { app };
