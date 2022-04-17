import React, { useEffect } from "react";
import { ICachedGuild } from "../../state/cache";
import { useUIStore } from "../../state/ui";
import Channel from "./Channel";

interface Props {
  guild: ICachedGuild;
}

const ChannelsBar: React.FC<Props> = ({ guild }) => {
  const uiStore = useUIStore();
  const selectedChannelId = uiStore.getSelectedChannelId(guild.id);

  useEffect(() => {
    if (!selectedChannelId) {
      uiStore.setSelectedChannel(guild.id, guild.channels[0].id);
    }
  }, []);

  return (
    <section id="channels" className="h-full bg-[#1e2338] w-[270px] shadow-xl">
      <div className="border-b border-[#060c23] group gap-4 text-center flex items-center flex-col py-4 hover:bg-[#262c40] cursor-pointer transition duration-400">
        <div className="cursor-pointer w-[70px] bg-emerald-500 group-hover:bg-emerald-600 flex items-center text-2xl justify-center h-[70px] rounded-lg">
          {guild.name.substring(0, 1)}
        </div>
        <h1 className="font-semibold text-lg">{guild.name}</h1>
      </div>
      <div className="w-full px-2 mt-4">
        {guild.channels.map((channel) => (
          <Channel
            channel={channel}
            selected={selectedChannelId === channel.id}
          />
        ))}
      </div>
    </section>
  );
};

export default ChannelsBar;
