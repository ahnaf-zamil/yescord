import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { sendMessage } from "../../http/channel";
import { useUIStore } from "../../state/ui";

const Chatbox: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const uiStore = useUIStore();
  const textAreaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [uiStore.selectedGuildId]);

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        const selectedGuildId = uiStore.selectedGuildId;
        const selectedChannelId = uiStore.getSelectedChannelId(selectedGuildId);

        if (content && content.trim()) {
          setContent("");
          await sendMessage(selectedChannelId!, content);
        }
      } else {
        // Todo: Make input field get bigger due to line breaks
      }
      e.preventDefault();
    }
  };

  return (
    <div className="w-full py-6">
      <input
        className="resize-none outline-none rounded-lg bg-[#1e2338] w-full px-6 flex py-3"
        placeholder="Type something..."
        autoFocus={true}
        onBlur={({ target }) => target.focus()}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={textAreaRef}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Chatbox;
