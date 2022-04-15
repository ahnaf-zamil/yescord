import { GatewayCredentials } from "../../http/gateway";
import { useAuthStore } from "../../state/auth";
import { useSocketStore } from "../../state/socket";
import { GATEWAY_EVENTS } from "../events";
import { gatewayLogger } from "../logger";

export const onConnect = (credentials: GatewayCredentials) => {
  const socket = useSocketStore.getState().socket!;

  gatewayLogger(`Established connection`);
  gatewayLogger(`Socket identified by ID ${socket.id}`);

  // Sending authentication payload
  socket.emit(
    GATEWAY_EVENTS.AUTHENTICATE,
    useAuthStore.getState().gatewayToken!
  );
};

export const onDisconnect = () => {
  gatewayLogger("Disconnected");
};
