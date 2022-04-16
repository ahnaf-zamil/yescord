import React from "react";
import ChannelsBar from "../../components/ChannelsBar";
import Chatbox from "../../components/Chatbox";
import { useCacheStore } from "../../state/cache";
import { useUIStore } from "../../state/ui";
//import FriendsBar from "../../components/FriendsBar";

const Guild: React.FC = () => {
  const uiStore = useUIStore();
  const cacheStore = useCacheStore();

  /* Shows guild when an icon is clicked */
  return (
    <div className="flex w-full justify-between">
      <ChannelsBar
        guildName={cacheStore.getGuild(uiStore.selectedGuildId)?.name as string}
      />
      <div className="flex flex-col-reverse w-full">
        <Chatbox />
        <h1>Selected guild: {uiStore.selectedGuildId}</h1>
      </div>
    </div>
  );
};

export default Guild;
