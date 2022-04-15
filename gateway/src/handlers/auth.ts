import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { Events } from "../events";

export const registerAuthHandler = (io: Server, socket: Socket) => {
  socket.data["authenticated"] = false;

  setTimeout(() => {
    if (!socket.data["authenticated"]) {
      console.log(
        `Socket ${socket.id} has not authenticated within 30 seconds of connection, disconnecting...`
      );
      socket.disconnect(true);
    }
  }, 30000);

  socket.on(Events.AUTHENTICATE, (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY!);
      socket.data.authenticated = true;
      socket.data.id = decodedToken.sub;
      console.log(
        `Socket ${socket.id} has been identified as user ${decodedToken.sub}`
      );

      // Sending acknowledgement on successful authentication
      socket.emit(Events.AUTHENTICATE_ACK);
    } catch (e) {
      // Invalid/expired JWT
      handleInvalidAuth();
    }
  });

  socket.on(Events.DISCONNECT, () => {
    console.log(`Socket ${socket.id} has disconnected`);
  });

  const handleInvalidAuth = () => {
    console.log(
      `Socket ${socket.id} has send invalid auth credentials, disconnecting...`
    );
    socket.send("Unauthorized");
    socket.disconnect();
  };
};
