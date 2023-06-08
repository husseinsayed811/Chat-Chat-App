const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./Network/DB');

const userR = require ("./Routes/userR")
const messageR = require ("./Routes/messageR")
const chatR = require ("./Routes/chatR")

const { notFound } = require("./Middlewares/notfoundMW");


dotenv.config();
connectDB()
const app = express();

app.use(express.json());

app.use("/api/user", userR);
app.use("/api/message", messageR);
app.use("/api/chat", chatR);


app.use(notFound);






  

const port = process.env
const server = app.listen(process.env.PORT || 5051, () => {
    console.log(`server listen on ${process.env.PORT}`)
})


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });