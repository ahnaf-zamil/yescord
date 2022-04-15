import { Socket } from "socket.io-client";
import create, { SetState } from "zustand";

interface SocketStore {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

const useStore = create<SocketStore>((set: SetState<SocketStore>) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));

export const useSocketStore = useStore;
