import mongoose from "mongoose";

// export const connectToDB = () => {
//   mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//       console.log("Connected to DB")
//     }).catch(err => console.log(err));
// }
export const connectToDB = async () => {
  try {
    const cnct = await mongoose.connect(process.env.DB_CONNECT)
    console.log(`MongoDB Connected: ${cnct.connection.host}`);
  } catch (err) {
    console.log(`MongoDB connection error: ${error.message}`);
  }
}