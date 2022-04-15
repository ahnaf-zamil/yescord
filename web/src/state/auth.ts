import create, { SetState } from "zustand";
import { IUser } from "../app/types";

interface AuthStore {
  user: null | IUser;
  setUser: (user: IUser) => void;

  gatewayToken: null | string;
  setGatewayToken: (token: string) => void;
}

const useStore = create<AuthStore>((set: SetState<AuthStore>) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),

  gatewayToken: null,
  setGatewayToken: (token: string) => set({ gatewayToken: token }),
}));

export const useAuthStore = useStore;
