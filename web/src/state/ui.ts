import create, { SetState } from "zustand";

export type SelectedView = "GUILD" | "DM" | "FRIENDS";

export interface UIStore {
  selectedView: SelectedView;
  setSelectedView: (view: SelectedView) => void;

  selectedGuildId: string;
  setSelectedGuildId: (guildId: string) => void;
}

const useStore = create<UIStore>((set: SetState<UIStore>) => ({
  selectedView: "FRIENDS",
  setSelectedView: (view: SelectedView) => set({ selectedView: view }),

  selectedGuildId: "",
  setSelectedGuildId: (guildId: string) => set({ selectedGuildId: guildId }),
}));

export const useUIStore = useStore;
