import { create } from "zustand";

interface ModalTeamState {
    teamId: string;
    isOpen: boolean;
    View: "Edit" | "Create" | "Delete";
    onOpen: () => void;
    onClose: () => void;
    changeView: (view: "Edit" | "Create" | "Delete") => void;
    changeTeamId: (teamId: string) => void;
}

export const useModalTeam = create<ModalTeamState>((set) => ({
    teamId: "",
    isOpen: false,
    View: "Create",
    changeView: (view) => set({ View: view }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    changeTeamId: (teamId) => set({ teamId }),
}));