"use client"

import React, { useState , useEffect} from "react"


import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import TeamModal from "@/components/Modal/AuthModal/TeamModal"
import { useModalTeam } from "@/hooks/useModalTeam"
import { FiPlus } from "react-icons/fi";
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

type Team = {
  id: string,
  name: string,
  image: string,
  description: string,
}

interface PageProps {
  params: {
    uid: string;
  };
}

function Page({ params }: PageProps) {
  // Unwrap du param `uid` en utilisant `React.use()`
  const uid = React.use(params).uid;

  const [teams, setTeams] = useState<Team[]>([]);
  const { onOpen } = useModalTeam();

  useEffect(() => {
    const teamRef = collection(db, `Teams/users/${uid}`);

    // Écoute en temps réel
    const unsubscribe = onSnapshot(teamRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Team[];
      setTeams(data);
    });

    // Nettoyer l'abonnement pour éviter les fuites de mémoire
    return () => unsubscribe();
  }, [uid]);

  return (
    <main className="w-full overflow-x-auto p-4">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Input
          placeholder="Search..."
          className="w-full sm:w-1/2 bg-white border border-gray-300 rounded-lg p-2"
        />
        <Button
          variant="outline"
          className="w-full sm:w-auto text-white bg-blue-400 hover:bg-blue-500 hover:brightness-110 
                   hover:text-white border-none text-center p-2 rounded-lg"
          onClick={onOpen}
        >
          <FiPlus />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white rounded-lg border-collapse text-gray-800">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 text-left uppercase">Name</th>
              <th className="p-4 text-left uppercase">Description</th>
              <th className="p-4 text-left uppercase">Image</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr
                key={team.id}
                className="border-b last:border-none hover:bg-gray-100"
              >
                <td className="p-4">{team.name}</td>
                <td className="p-4">{team.description}</td>
                <td className="p-4">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TeamModal />
    </main>
  );
}

export default Page;
