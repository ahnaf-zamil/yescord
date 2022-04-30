import { IChannel } from "../../app/types";
import { useUIStore } from "../../state/ui";
import { capitalize } from "../../utils";

interface Props {
  channel: IChannel;
  selected?: boolean;
}

const Channel: React.FC<Props> = ({ channel, selected = false }) => {
  const uiStore = useUIStore();

  const selectedGuildId = uiStore.selectedGuildId;

  const changeChannel = () => {
    const selectedChannelId = uiStore.getSelectedChannelId(selectedGuildId)!;
    if (selectedChannelId === channel.id) {
      return;
    }
    uiStore.setSelectedChannel(selectedGuildId, channel.id);
  };

  return (
    <div
      className={
        (selected ? "text-white " : "text-[#969ba5] hover:") +
        "bg-[#2e3759] rounded-md cursor-pointer group px-6 py-2 my-1"
      }
      onClick={changeChannel}
    >
      <p className="flex gap-3 items-center justify-start text-md">
        <i className="fa-solid fa-comment-dots"></i>
        <span className="group-hover:text-white">
          {capitalize(channel.name)}
        </span>
      </p>
    </div>
  );
};

export default Channel;
