import React, { useEffect } from "react";
import { IGuild } from "../app/types";
import { useSocketStore } from "../state/socket";
import { GATEWAY_EVENTS } from "../gateway/events";
import { gatewayLogger } from "../gateway/logger";
import { UIStore, useUIStore } from "../state/ui";
import { useCacheStore } from "../state/cache";

const GuildIcon: React.FC<{
  guild: IGuild;
  store: UIStore;
  selectedGuildId: string;
}> = ({ guild, store, selectedGuildId }) => {
  return (
    <li className="w-full flex justify-center relative">
      <div
        onClick={() => {
          store.setSelectedGuildId(guild.id);
          store.setSelectedView("GUILD");
        }}
        className="group transition duration-150 hover:shadow-emerald-500 cursor-pointer w-[70px] hover:bg-emerald-500 flex items-center text-2xl justify-center h-[70px] bg-[#1e2338] rounded-lg"
      >
        <p
          className={
            (selectedGuildId !== guild.id ? "group-hover:" : "") +
            "border-2 absolute left-0 transition duration-300 rounded-lg h-[40px]"
          }
        ></p>
        {guild.name.substring(0, 1)}
      </div>
    </li>
  );
};

const GuildSidebar: React.FC = () => {
  const socket = useSocketStore().socket;
  const uiStore = useUIStore();
  const cacheStore = useCacheStore();

  useEffect(() => {
    if (socket) {
      socket.on(GATEWAY_EVENTS.GUILD_AVAILABLE, (guild) => {
        gatewayLogger(`GUILD_AVAILABLE: ${guild.id}`);
        cacheStore.addGuild(guild);
      });
    }
  }, [socket]);

  return (
    <ul className="bg-[#060c23] h-full w-28 flex flex-col items-center py-6">
      <div>
        <li
          onClick={() => {
            uiStore.setSelectedGuildId("");
            uiStore.setSelectedView("FRIENDS");
          }}
          className={
            (uiStore.selectedView === "GUILD"
              ? "hover:bg-blue-500 bg-[#1e2338]"
              : "bg-blue-500") +
            " transition duration-200 cursor-pointer w-[60px] flex items-center text-2xl justify-center h-[60px] rounded-lg"
          }
        >
          <i className="fas fa-home"></i>
        </li>
        <p className="border-2 border-[#1e2338] rounded-md mt-3 mx-2"></p>
      </div>
      <div className="flex flex-col gap-4 w-full my-6">
        {cacheStore.guilds.map((guild) => (
          <GuildIcon
            selectedGuildId={uiStore.selectedGuildId}
            guild={guild}
            store={uiStore}
          />
        ))}
      </div>
      <div>
        <p className="border-2 border-[#1e2338] rounded-md mb-3 mx-2"></p>
        <li
          onClick={() => {}}
          className={
            "hover:bg-blue-500 hover:text-white text-blue-500 bg-[#1e2338] transition duration-200 cursor-pointer w-[60px] flex items-center text-2xl justify-center h-[60px] rounded-full"
          }
        >
          <i className="fas fa-plus"></i>
        </li>
      </div>
    </ul>
  );
};

export default GuildSidebar;
