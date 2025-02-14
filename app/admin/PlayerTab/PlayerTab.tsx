"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TeamModal from "@/components/TeamModal/TeamModal";
import { useModalTeam } from "@/hooks/useModalTeam";
import { FiPlus, FiEdit, FiMoreVertical } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMediaQuery } from "react-responsive";
import { replaceHyphensAndSpaces, Team } from "@/utils";
import { useRouter } from "next/navigation";
import { useTeamsOrPlayers } from "@/hooks/useTeamOrPlayer";

const truncateDescription = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
};



const PlayerTab = () => {

    const [user] = useAuthState(auth);
    const [teams, setTeams] = useState<Team[]>([]);
    const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const { onOpen, changeView, changeTeamId } = useModalTeam();
    const { id ,setId ,setTeamsOrPlayers } = useTeamsOrPlayers();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const router = useRouter();
  
    const handleChangeViewAndTeamId = (
      view: "Edit" | "Create" | "Delete",
      teamId?: string
    ) => {
      changeView(view);
      changeTeamId(teamId || "");
      onOpen();
    };

    const handleGetIdTeam = (id: string) => {
      setId(id);
      setTeamsOrPlayers("players");
    };
  
    useEffect(() => {
  
      if(!user?.uid){
        router.push("/");
      }
  
    }, []);
  
    useEffect(() => {
      const teamRef = collection(db, `Teams/users/${user?.uid}`);
  
      const unsubscribe = onSnapshot(teamRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Team[];
        setTeams(data);
        setFilteredTeams(data);
      });
  
      return () => unsubscribe();
    }, [user?.uid]);
  
    useEffect(() => {
      const filtered = teams.filter((team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(filtered);
      setCurrentPage(1); // Réinitialiser à la première page lors d'une recherche
    }, [searchTerm, teams]);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTeams = filteredTeams.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  
    const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  
    return (
      <main className="w-full p-4">
        {id}
   <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
    <Input
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full sm:w-1/2 bg-white border border-gray-300 rounded-lg p-2"
    />
    <Button
      variant="outline"
      className="text-white bg-blue-400 hover:bg-blue-500 hover:brightness-110 border-none p-2 rounded-lg
      w-full sm:w-auto sm:px-4 sm:py-2 lg:w-20"
      onClick={() => handleChangeViewAndTeamId("Create")}
    >
      <FiPlus />
    </Button>
  </div>
  
  
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-lg border-collapse text-gray-800">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-4 text-left uppercase">
                  {isMobile ? "Image" : "Name"}
                </th>
                <th className="p-4 text-left uppercase">
                  {isMobile ? "Name" : "Description"}
                </th>
                <th className="p-4 text-left uppercase hidden sm:table-cell">
                  Image
                </th>
                <th className="p-4 text-left uppercase hidden lg:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTeams.map((team) => (
                <tr
                  key={team.id}
                  className="border-b last:border-none hover:bg-gray-100"
                >
                  <td 
                     className="p-4 hover:text-blue-500 hover:cursor-pointer hover:underline"
                     onClick={() => handleGetIdTeam(team.id)}
                  >
                        {isMobile ? (
                            <img
                                src={team.image}
                                alt={team.name}
                                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                            />
                            ) : (
                            replaceHyphensAndSpaces(team.name)
                        )} 
                  </td>
                  <td className="p-4">
                    {isMobile
                      ? replaceHyphensAndSpaces(team.name)
                      : team.description === ""
                      ? "No description"
                      : truncateDescription(team.description, 10)}
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <img
                      src={team.image}
                      alt={team.name}
                      className="w-10 h-10 object-cover rounded-full cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    {isMobile ? (
                      <div className="relative">
                        <button
                          onClick={() =>
                            setSelectedTeam(
                              selectedTeam === team.id ? null : team.id
                            )
                          }
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <FiMoreVertical />
                        </button>
                        {selectedTeam === team.id && (
                          <div className="absolute top-full right-0 bg-white border shadow-lg rounded-md mt-2 p-2 z-10">
                            <button
                              onClick={() =>
                                handleChangeViewAndTeamId("Edit", team.id)
                              }
                              className="block w-full text-left text-blue-500 hover:text-blue-600 px-2 py-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleChangeViewAndTeamId("Delete", team.id)
                              }
                              className="block w-full text-left text-red-500 hover:text-red-600 px-2 py-1"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <FiEdit
                          className="text-blue-500 hover:text-blue-600 cursor-pointer"
                          onClick={() =>
                            handleChangeViewAndTeamId("Edit", team.id)
                          }
                        />
                        <MdDelete
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                          onClick={() =>
                            handleChangeViewAndTeamId("Delete", team.id)
                          }
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
          >
            Next
          </button>
        </div>
  
        <TeamModal />
      </main>
    );

}

export default PlayerTab