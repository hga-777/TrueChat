import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from 'cors';
import { Server } from 'socket.io';
dotenv.config();
const socket = new Server();
mongoose.connect(process.env.MONGO)
.then(() => {console.log("Connected to the database");})
.catch((err) => {console.log(`Error while connecting DB is ${err}`);});

const app = express();

app.use(express.json());
app.use(cors());


const server  = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });

app.use('/api/auth' , userRoutes);
app.use('/api/messages', messageRoutes);

const io =  new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
