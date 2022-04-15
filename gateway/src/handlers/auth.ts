import { Server, Socket } from "socket.io";

export const registerAuthHandler = (io: Server, socket: Socket) => {
  socket.data["authenticated"] = false;

  setTimeout(() => {
    if (!socket.data["authenticated"]) {
      console.log(
        `Socket ${socket.id} has not authenticated within 30 seconds of connection, disconnecting`
      );
      socket.disconnect(true);
    }
  }, 30000);

  socket.on("authenticate", (payload) => {
    console.log(payload);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} has disconnected`);
  });
};
