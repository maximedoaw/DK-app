"use client";

import {  useTeamsOrPlayers } from "@/hooks/useTeamOrPlayer";
import TeamTab from "./TeamTab/TeamTab";
import PlayerTab from "./PlayerTab/PlayerTab";

function Page() {

  const { teamsOrPlayers } = useTeamsOrPlayers()

 return (
  <>
    {teamsOrPlayers === "teams" && <TeamTab/>}
    {teamsOrPlayers === "players" && <PlayerTab/>}
  </>
 )
}

export default Page;
