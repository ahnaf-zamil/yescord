import { Socket } from "socket.io-client";

let client: Socket;

export const setSocketClient = (sock: Socket) => {
  client = sock;
};

export const getSocketClient = () => {
  return client;
};
