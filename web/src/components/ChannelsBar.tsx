import React from "react";

interface Props {
  guildName: string;
}

const ChannelsBar: React.FC<Props> = ({ guildName }) => {
  return (
    <section className="h-full bg-[#1e2338] w-[300px] shadow-xl">
      <div className="group gap-4 text-center flex items-center flex-col py-4 bg-[#262c40] cursor-pointer transition duration-400">
        <div className="cursor-pointer w-[70px] bg-emerald-500 group-hover:bg-emerald-600 flex items-center text-2xl justify-center h-[70px] rounded-lg">
          {guildName.substring(0, 1)}
        </div>
        <h1 className="font-semibold text-lg">{guildName}</h1>
      </div>
    </section>
  );
};

export default ChannelsBar;
