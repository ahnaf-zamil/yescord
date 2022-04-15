import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { getGatewayCredentials } from "../../http/gateway";
import { setSocketClient } from "../../websocket/client";

const AppView: React.FC = () => {
  useEffect(() => {
    const initWebSocket = async () => {
      const credentials = await getGatewayCredentials();

      const socketIO = io(`http://${credentials.endpoint}`);
      setSocketClient(socketIO);

      socketIO.on("connect", () => {
        console.log(
          `Established connection with gateway on \`${credentials.endpoint}\``
        );
      });

      socketIO.on("disconnect", () => {
        console.log("Disconnected from gateway");
      });
    };

    initWebSocket();
  }, []);

  return <div>App View</div>;
};

export default AppView;
