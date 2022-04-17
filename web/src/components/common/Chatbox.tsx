import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useUIStore } from "../../state/ui";

const Chatbox: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const uiStore = useUIStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [uiStore.selectedGuildId]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        console.log("Send message");
        e.preventDefault();
      } else {
        e.preventDefault();
        // Todo: Make input field get bigger due to line breaks
      }
    }
  };

  return (
    <div className="w-full py-6">
      <textarea
        rows={1}
        className="resize-none outline-none rounded-lg bg-[#1e2338] w-full px-6 flex pt-3"
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
