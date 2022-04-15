import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getGatewayCredentials } from "../../http/gateway";
import { useAuthStore } from "../../state/auth";
import { setSocketClient } from "../../websocket/client";
import { GATEWAY_EVENTS } from "../../websocket/events";
import { onConnect } from "../../websocket/handlers/connection";
import LoadingAnimation from "../../assets/img/loader.svg";

const MainView: React.FC = () => {
  const authState = useAuthStore();

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const initWebSocket = async () => {
      const user = authState.user;
      const credentials = await getGatewayCredentials();
      authState.setGatewayToken(credentials.token);

      const socketIO = io(`http://${credentials.endpoint}`);
      setSocketClient(socketIO);

      socketIO.on("connect", () => onConnect(credentials));

      socketIO.on(GATEWAY_EVENTS.AUTHENTICATE_ACK, () => {
        console.log(
          `Gateway: Authenticated as ${user?.username}#${user?.discriminator}`
        );
        setReady(true);
      });

      socketIO.on("disconnect", () => {
        console.log("Disconnected from gateway");
      });
    };

    initWebSocket();
  }, []);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <img src={LoadingAnimation} alt="Loading..." />
        <h1 className="text-3xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return <div>Ready</div>;
};

export default MainView;
