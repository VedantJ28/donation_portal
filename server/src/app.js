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
import {authRoutes} from "./routes/auth.route.js";    

app.use("/api/ngo", ngoRoutes);
app.use("/api/auth", authRoutes);


export { app };