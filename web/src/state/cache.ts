import create, { GetState, SetState } from "zustand";
import { IGuild } from "../app/types";

export interface CacheStore {
  guilds: Array<IGuild>;
  addGuild: (guild: IGuild) => void;
  getGuild: (guildId: string) => IGuild | undefined;
}

const useStore = create<CacheStore>(
  (set: SetState<CacheStore>, get: GetState<CacheStore>) => ({
    guilds: [],
    addGuild: (guild: IGuild) =>
      set((state) => ({ guilds: [...state.guilds, guild] })),
    getGuild: (guildId: string) =>
      get().guilds.find((guild) => guild.id === guildId),
  })
);

export const useCacheStore = useStore;
