import { Server, Socket } from "socket.io";

export const registerAuthHandler = (io: Server, socket: Socket) => {
  socket.data["authenticated"] = false;

  setTimeout(() => {
    if (!socket.data["authenticated"]) socket.disconnect(true);
  });

  socket.on("authenticate", (payload) => {
    console.log(payload);
  });
};
