import { create } from "zustand";

type TeamsOrPlayersState = {
    id: string,
    teamsOrPlayers: "teams" | "players",
    setId: (id: string) => void,
    setTeamsOrPlayers: (teamsOrPlayers: "teams" | "players") => void,
}

export const useTeamsOrPlayers = create<TeamsOrPlayersState>((set) => ({
    id: "",
    teamsOrPlayers: "teams",
    setId: (id: string) => set({ id }),
    setTeamsOrPlayers: (teamsOrPlayers: "teams" | "players") => set({ teamsOrPlayers }),
})) 