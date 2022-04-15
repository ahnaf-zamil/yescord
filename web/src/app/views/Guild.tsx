import React from "react";
import ChannelsBar from "../../components/ChannelsBar";
import { useCacheStore } from "../../state/cache";
import { useUIStore } from "../../state/ui";
//import FriendsBar from "../../components/FriendsBar";

const Guild: React.FC = () => {
  const uiStore = useUIStore();
  const cacheStore = useCacheStore();

  /* Shows guild when an icon is clicked */
  return (
    <div className="flex">
      <ChannelsBar
        guildName={cacheStore.getGuild(uiStore.selectedGuildId)?.name as string}
      />
      <h1>Selected guild: {uiStore.selectedGuildId}</h1>
    </div>
  );
};

export default Guild;
