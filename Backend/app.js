import "./env.js";
import express from 'express';
import cors from 'cors'

export const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Uber app');
})