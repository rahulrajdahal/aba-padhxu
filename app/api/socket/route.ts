"use server";

import { Server } from "socket.io";

export async function GET(req: Request, res: Response) {
  if (!(res as any).socket?.server?.io) {
    console.log("*First use, starting socket.io");

    const io = new Server();

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");
      socket.on("hello", (msg) => {
        socket.emit("hello", "world!");
      });
    });
  } else {
    console.log("socket.io already running");
  }
}
