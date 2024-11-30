import mongoose from "mongoose";

export const connectToDB = () => {
  mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to DB")
    }).catch(err => console.log(err));
}