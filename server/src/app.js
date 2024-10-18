import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.COR_ORIGIN
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("Public"));

app.use(cookieParser)

export {app};