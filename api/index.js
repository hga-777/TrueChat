import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => {console.log("Connected to the database");})
.catch((err) => {console.log(`Error while connecting DB is ${err}`);});

const app = express();

app.use(express.json());



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });

app.use('/api/auth' , userRoutes);