import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import ngorouter from './routes/ngo.route.js';
import donorrouter from './routes/donor.route.js';

const app = express();

app.use(cors({
    origin: process.env.COR_ORIGIN
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("Public"));

app.use(cookieParser);

app.use('/api/v1/ngo/', ngorouter);
app.use('/api/v1/donor', donorrouter);

export {app};