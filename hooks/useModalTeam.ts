import { create } from "zustand";

interface ModalTeamState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useModalTeam = create<ModalTeamState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));