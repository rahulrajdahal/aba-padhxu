import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {
  socket.broadcast.emit("a user connected");
  socket.on("hello", (msg) => {
    socket.emit("hello", "world!");
  });
});
