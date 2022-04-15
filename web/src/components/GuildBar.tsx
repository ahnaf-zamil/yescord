import React, { useEffect, useState } from "react";
import { IGuild } from "../app/types";
import { useSocketStore } from "../state/socket";
import { GATEWAY_EVENTS } from "../gateway/events";
import { gatewayLogger } from "../gateway/logger";
import { UIStore, useUIStore } from "../state/ui";

const GuildIcon: React.FC<{ guild: IGuild; store: UIStore }> = ({
  guild,
  store,
}) => {
  return (
    <li className="w-full flex justify-center relative">
      <div
        onClick={() => {
          store.setSelectedGuildId(guild.id);
          store.setSelectedView("GUILD");
        }}
        className="group transition duration-150 hover:shadow-emerald-500 cursor-pointer w-[70px] hover:bg-emerald-500 flex items-center text-2xl justify-center h-[70px] bg-[#1e2338] rounded-lg"
      >
        <p className="absolute left-0 transition duration-300 group-hover:border-2 rounded-lg h-[40px]"></p>
        {guild.name.substring(0, 1)}
      </div>
    </li>
  );
};

const GuildSidebar: React.FC = () => {
  const socket = useSocketStore().socket;
  const uiStore = useUIStore();
  const [guilds, setGuilds] = useState<Array<IGuild>>([]);

  useEffect(() => {
    if (socket) {
      socket.on(GATEWAY_EVENTS.GUILD_AVAILABLE, (guild) => {
        gatewayLogger(`GUILD_AVAILABLE: ${guild.id}`);
        setGuilds((prevState) => [...prevState, guild]);
      });
    }
  }, [socket]);

  return (
    <ul className="bg-[#060c23] h-full w-28 flex flex-col items-center py-6">
      <div className="mb-2">
        <li
          onClick={() => uiStore.setSelectedView("FRIENDS")}
          className={
            (uiStore.selectedView === "GUILD"
              ? "hover:bg-blue-500 bg-[#1e2338]"
              : "bg-blue-500") +
            " transition duration-200 cursor-pointer w-[60px] flex items-center text-2xl justify-center h-[60px] rounded-full"
          }
        >
          <i className="fas fa-home"></i>
        </li>
        <p className="border-2 border-[#1e2338] rounded-md my-3 mx-2"></p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {guilds.map((guild) => (
          <GuildIcon guild={guild} store={uiStore} />
        ))}
      </div>
    </ul>
  );
};

export default GuildSidebar;
