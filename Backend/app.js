import "./env.js";
import express from 'express';
import cors from 'cors'
import { connectToDB } from "./db/db.js";
import { userRouter } from "./routes/user.routes.js";
import { captainRouter } from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

export const app = express();
connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to Uber app');
})

app.use('/users', userRouter)
app.use('/captains', captainRouter);

