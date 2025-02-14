"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";



const AboutPage = ({ params }: { params: { id: string } }) => {

  const { id } = params;
  const [team, setTeam] = useState<{ name: string; phone: string; description: string; image: string } | null>(null);

  // Responsive breakpoints
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamRef = doc(db, "AllTeams", id);
        const teamDoc = await getDoc(teamRef);
        if (teamDoc.exists()) {
          const { name, phone, description, image } = teamDoc.data();
          setTeam({ name, phone, description, image });
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeam();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {team ? (
        <div
          className={`${
            isDesktop
              ? "flex-row"
              : isTablet
              ? "flex-col md:flex-row mx-auto"
              : "flex-col"
          } flex shadow-lg rounded-lg overflow-hidden w-full max-w-3xl mx-auto`}
        >
          <div className={`${isDesktop ? "h-64 w-1/2" : "h-64 w-full"} relative`}>
            <img
              src={team.image}
              alt={team.name}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="p-6 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center mx-auto">
              {team.name}
            </h1>
            <p className="text-gray-400  font-semibold text-justify leading-relaxed">
              {team.description}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Chargement des informations...</p>
      )}
      <Link href={`https://wa.me/${team?.phone}`}>
        <Button className="mt-4 bg-blue-500 text-white
        hover:bg-blue-600 px-6 py-2 rounded-md">
          Contactez-nous
        </Button>
      </Link>
    </div>
  );
};

export default AboutPage;
