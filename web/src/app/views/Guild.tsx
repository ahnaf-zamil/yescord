import React from "react";
import { useUIStore } from "../../state/ui";
//import FriendsBar from "../../components/FriendsBar";

const Guild: React.FC = () => {
  const uiState = useUIStore();

  /* Shows guild when an icon is clicked */
  return (
    <div className="flex">
      <h1>Selected guild: {uiState.selectedGuildId}</h1>
    </div>
  );
};

export default Guild;
