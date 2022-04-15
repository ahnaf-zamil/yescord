import { GatewayCredentials } from "../../http/gateway";
import { useAuthStore } from "../../state/auth";
import { getSocketClient } from "../client";
import { GATEWAY_EVENTS } from "../events";

export const onConnect = (credentials: GatewayCredentials) => {
  const socket = getSocketClient();
  console.log(`Established connection with gateway`);
  console.log(`Socket identified by ID ${socket.id}`);

  // Sending authentication payload
  socket.emit(
    GATEWAY_EVENTS.AUTHENTICATE,
    useAuthStore.getState().gatewayToken!
  );
};

export const onDisconnect = () => {
  console.log("Disconnected from gateway");
};
