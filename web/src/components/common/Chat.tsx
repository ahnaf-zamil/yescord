import React from "react";
import { useUIStore } from "../../state/ui";
import Chatbox from "./Chatbox";

const Chat: React.FC = () => {
  const uiStore = useUIStore();

  return (
    <div id="chat" className="flex flex-col-reverse w-full px-6">
      <Chatbox />
      <h1>Selected guild: {uiStore.selectedGuildId}</h1>
    </div>
  );
};

export default Chat;
