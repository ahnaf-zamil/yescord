import create, { GetState, SetState } from "zustand";
import { IChannel, IGuild } from "../app/types";

export interface ICachedGuild extends IGuild {
  channels: Array<IChannel>;
}

export interface CacheStore {
  guilds: Array<ICachedGuild>;
  addGuild: (guild: ICachedGuild) => void;
  getGuild: (guildId: string) => ICachedGuild | undefined;
}

const useStore = create<CacheStore>(
  (set: SetState<CacheStore>, get: GetState<CacheStore>) => ({
    guilds: [],
    addGuild: (guild: ICachedGuild) =>
      set((state) => ({ guilds: [...state.guilds, guild] })),
    getGuild: (guildId: string) =>
      get().guilds.find((guild) => guild.id === guildId),
  })
);

export const useCacheStore = useStore;
