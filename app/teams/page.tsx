"use client";

import Card from '@/components/Card/Card';
import Loader from '@/components/Loader';
import { auth, db } from '@/firebase/clientApp';
import { Team } from '@/utils';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState, Suspense } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdSearch } from 'react-icons/md';

// Skeleton loader pour les cartes
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col items-center justify-center bg-gray-200 rounded-lg h-64 w-64">
      <div className="h-32 w-32 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </div>
  );
};

const Page = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Nombre d'éléments par page

  useEffect(() => {
    const teamRef = collection(db, 'AllTeams');
    const unsubscribe = onSnapshot(teamRef, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Team)
      );
      setTeams(data);
      setFilteredTeams(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    setFilteredTeams(
      teams.filter((team) =>
        team.name.toLowerCase().includes(lowercasedSearch)
      )
    );
    setCurrentPage(1); 
  }, [searchTerm, teams]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);

  return (
    <Suspense fallback={<div className="text-center mt-10"><Loader /></div>}>
      <div className="container mx-auto p-4">
        {/* Barre de recherche */}
        <div className="flex mx-auto w-full max-w-lg rounded-full mt-10 items-center bg-white shadow-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full focus:outline-none rounded-full px-4 py-2 text-gray-700"
            placeholder="Rechercher une équipe"
          />
          <MdSearch className="text-2xl text-gray-500 ml-auto mr-4" />
        </div>

        {/* Cartes des équipes */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonLoader key={index} />)
          ) : currentTeams.length > 0 ? (
            currentTeams.map((team) => (
              <Card
                key={team.id}
                id={team.id}
                imageSrc={team.image}
                title={team.name}
                description={team.description}
                avatarUrls={['/images/Messi.png', '/images/Messi.png', '/images/Messi.png']}
                imgUrl={team.image}
                
              />
            ))
          ) : (
            // Message si aucune équipe ne correspond à la recherche
            <div className="text-gray-500 text-center mt-4">Aucune équipe trouvée</div>
          )}
        </div>

        {/* Pagination */}
        {filteredTeams.length > itemsPerPage && (
          <div className="flex justify-center items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 mx-2 bg-gray-200 rounded ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300 '
              }`}
            >
              Précédent
            </button>
            <span className="text-gray-700">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 mx-2 bg-blue-400 text-white rounded-lg ${
                currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
              }`}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Page;
