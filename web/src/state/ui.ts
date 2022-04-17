import create, { GetState, SetState } from "zustand";

export type SelectedView = "GUILD" | "DM" | "FRIENDS";

export interface UIStore {
  selectedView: SelectedView;
  setSelectedView: (view: SelectedView) => void;

  selectedGuildId: string;
  setSelectedGuildId: (guildId: string) => void;

  selectedChannels: { [guildId: string]: string };
  getSelectedChannelId: (guildId: string) => undefined | string;
  setSelectedChannel: (guildId: string, channelId: string) => void;
}

const useStore = create<UIStore>(
  (set: SetState<UIStore>, get: GetState<UIStore>) => ({
    selectedView: "FRIENDS",
    setSelectedView: (view: SelectedView) => set({ selectedView: view }),

    selectedGuildId: "",
    setSelectedGuildId: (guildId: string) => set({ selectedGuildId: guildId }),

    selectedChannels: {},
    getSelectedChannelId: (guildId: string) => get().selectedChannels[guildId],
    setSelectedChannel: (guildId: string, channelId: string) =>
      set({
        selectedChannels: {
          ...get().selectedChannels,
          [guildId]: channelId,
        },
      }),
  })
);

export const useUIStore = useStore;
