import React, { useEffect } from "react";
import ChannelsBar from "../../components/channel/ChannelsBar";
import MembersBar from "../../components/guild/MembersBar";
import { useCacheStore } from "../../state/cache";
import { useUIStore } from "../../state/ui";
import Chat from "../../components/common/Chat";
//import FriendsBar from "../../components/FriendsBar";

const Guild: React.FC = () => {
  const uiStore = useUIStore();
  const cacheStore = useCacheStore();

  const guild = cacheStore.getGuild(uiStore.selectedGuildId)!;

  /* Shows guild when an icon is clicked */
  return (
    <div id="guild-view" className=" w-full justify-between">
      <ChannelsBar guild={guild} />
      <Chat />
      <MembersBar />
    </div>
  );
};

export default Guild;
