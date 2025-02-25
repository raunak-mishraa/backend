import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config({
    path: './.env'
});
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({extended: true, limit: '16kb'}));
// app.use(express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cookieParser())

//routes import
import userRouter  from './routes/user.route.js'
import  movieRouter  from './routes/movie.route.js'
app.use("/api/v1/auth", userRouter)
app.use('/api/v1/movies', movieRouter)

export { app }
