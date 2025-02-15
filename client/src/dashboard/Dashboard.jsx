import { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { GameCard } from '../game/GameCard';
import { fetchPastGames, fetchUpcomingGames } from '../managers/GameManager';

export const dashboardLoader = async () => {
  const upcomingGames = await fetchUpcomingGames();
  return { upcomingGames };
};

export const Dashboard = ({ isAdmin }) => {
   const { upcomingGames } = useLoaderData();
   const [isPast, setIsPast] = useState(false);
   const [pastGames, setPastGames] = useState(null);
   const [loadingPast, setLoadingPast] = useState(false);
   const navigate = useNavigate();
 
   const togglePast = async () => {
     // When switching to "past" and not already fetched, load past games
     if (!isPast && !pastGames) {
       setLoadingPast(true);
       const loadedPastGames = await fetchPastGames();
       setPastGames(loadedPastGames);
       setLoadingPast(false);
     }
     setIsPast(prev => !prev);
   };
 
   const navToGameForm = () => navigate('/new-game');
   
   const games = isPast ? (pastGames || []) : upcomingGames;
 
   return (
     <div className="last:pb-6">
       <div className="px-5 py-5 mx-auto max-w-lg">
         <div className="flex">
           <button
             className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-xs hover:bg-lime-300"
             onClick={togglePast}
           >
             <ClockIcon
               className="h-5 w-5 mr-1 shrink text-slate-600"
               aria-hidden="true"
             />
             {loadingPast ? 'Loading...' : isPast ? 'Show Upcoming' : 'Show Past'}
           </button>
           {isAdmin && (
             <button
               className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-xs hover:bg-lime-300"
               onClick={navToGameForm}
             >
               <PlusCircleIcon
                 className="h-5 w-5 mr-1 shrink text-slate-600"
                 aria-hidden="true"
               />
               New Game
             </button>
           )}
         </div>
         {games.map(game => (
           <GameCard key={game.id} game={game} isPast={isPast} />
         ))}
       </div>
     </div>
   );
 };