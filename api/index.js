import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => {console.log("Connected to the database");})
.catch((err) => {console.log(`Error while connecting DB is ${err}`);});

const app = express();




app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });