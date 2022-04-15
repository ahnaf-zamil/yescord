import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { Events } from "../events";
import { db } from "../db";

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
      socket.data.id = parseInt(decodedToken.sub as string);
      console.log(
        `Socket ${socket.id} has been identified as user ${decodedToken.sub}`
      );

      // Sending acknowledgement on successful authentication
      socket.emit(Events.AUTHENTICATE_ACK);

      // Sending guilds via gateway to populate client's cache
      sendClientGuilds();

      // Letting the client know that it has all the data and it's now "ready"
      socket.emit(Events.READY);
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

  const sendClientGuilds = () => {
    const userId = socket.data.id;
    const statement =
      "SELECT g.id, g.name, g.owner_id FROM guild as g LEFT JOIN guild_joins as gj ON g.id = gj.guild_id WHERE gj.user_id = " +
      db.escape(userId);

    db.query(statement, (err, results) => {
      if (err) {
        throw err;
      }

      results.forEach(
        (guild: { id: number; name: string; owner_id: number }) => {
          socket.emit(Events.GUILD_AVAILABLE, {
            ...guild,
            owner_id: guild.owner_id.toString(),
            id: guild.id.toString(),
          });
        }
      );
    });
  };
};
