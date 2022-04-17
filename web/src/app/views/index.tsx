import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GatewayCredentials, getGatewayCredentials } from "../../http/gateway";
import { useAuthStore } from "../../state/auth";
import { GATEWAY_EVENTS } from "../../gateway/events";
import { onConnect, onDisconnect } from "../../gateway/handlers/connection";
import LoadingAnimation from "../../assets/img/loader.svg";
import Copyright from "../../components/Copyright";
import GuildSidebar from "../../components/GuildBar";
import { useSocketStore } from "../../state/socket";
import { webLogger } from "../../utils";
import { gatewayLogger } from "../../gateway/logger";
import { SelectedView, useUIStore } from "../../state/ui";
import Friends from "./Friends";
import Guild from "./Guild";
import "../../styles/views.css";

const MainView: React.FC = () => {
  const authState = useAuthStore();
  const socketState = useSocketStore();
  const uiState = useUIStore();

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const initWebSocket = async () => {
      const user = authState.user;

      let hasCredentials = false;
      let credentials: GatewayCredentials;

      while (!hasCredentials) {
        try {
          credentials = await getGatewayCredentials();
          hasCredentials = true;
        } catch (e) {
          // Either gateway instance is down or it could not fetch the credentials
          webLogger(
            "Gateway instance couldn't be retreived, retrying after 5 seconds"
          );
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }

      authState.setGatewayToken(credentials!.token);

      const socket = io(`http://${credentials!.endpoint}`);
      socketState.setSocket(socket);

      socket.on("connect", () => onConnect(credentials));

      socket.on(GATEWAY_EVENTS.AUTHENTICATE_ACK, () => {
        gatewayLogger(
          `Authenticated as ${user?.username}#${user?.discriminator}`
        );
      });

      socket.on("disconnect", onDisconnect);

      socket.on(GATEWAY_EVENTS.READY, () => setReady(true));
    };

    initWebSocket();
  }, []);

  const getViewComponent = (view: SelectedView) => {
    switch (view) {
      case "FRIENDS":
        return <Friends />;
      case "DM":
        return <h1>DM</h1>;
      case "GUILD":
        return <Guild />;
    }
  };

  return (
    <main className="h-screen w-full bg-[#262c40]">
      {!ready && (
        <div className="bg-[#060c23] h-full z-10 w-full flex items-center justify-center flex-col">
          <img src={LoadingAnimation} alt="Loading..." />
          <h1 className="text-3xl font-semibold">Loading...</h1>
          <Copyright />
        </div>
      )}
      <div className="w-full h-full flex">
        <GuildSidebar />
        {getViewComponent(uiState.selectedView)}
      </div>
    </main>
  );
};

export default MainView;
