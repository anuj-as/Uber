import "./env.js";
import express from 'express';
import cors from 'cors'
import { connectToDB } from "./db/db.js";
import { userRouter } from "./routes/user.routes.js";

export const app = express();
connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Welcome to Uber app');
})

app.use('/users', userRouter)