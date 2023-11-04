import { ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameCard } from '../game/GameCard';
import { fetchPastGames, fetchUpcomingGames } from '../managers/GameManager';

export const Dashboard = ({ isAdmin }) => {
   const [games, setGames] = useState([]);
   const [upcomingGames, setUpcomingGames] = useState([]);
   const [pastGames, setPastGames] = useState([]);
   const [isPast, setIsPast] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const navigate = useNavigate();

   const navToGameForm = () => navigate('/new-game');

   /**
    * Handle fetching of past games
    */
   const togglePast = async () => {
      getSetGames(!isPast);
      setIsPast(!isPast);
   };

   const getSetGames = async (past) => {
      if (!past) {
         if (upcomingGames.length === 0) {
            setIsLoading(true);
            fetchUpcomingGames().then(data => {
               setUpcomingGames(data);
               setGames(data);
               setIsLoading(false);
            });
         }
         else {
            setGames(upcomingGames);
         }
      }
      else {
         if (pastGames.length === 0) {
            setIsLoading(true);
            fetchPastGames().then(data => {
               setPastGames(data);
               setGames(data);
               setIsLoading(false);
            });
         }
         else {
            setGames(pastGames);
         }
      }
   };

   useEffect(() => {
      getSetGames();
   }, []);

   return (
      <div className="last:pb-6">
         <div className="px-5 py-5 mx-auto max-w-lg">
            <div className="flex">
               <button
                  className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-300"
                  onClick={togglePast}
               >
                  <ClockIcon
                     className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                     aria-hidden="true"
                  />
                  {isPast ? 'Show Upcoming' : 'Show Past'}
               </button>
               {isAdmin && (
                  <button
                     className="flex rounded-md border border-transparent bg-lime-200 py-2 pr-4 pl-3 mr-3 text-sm font-medium text-black shadow-sm hover:bg-lime-300"
                     onClick={navToGameForm}
                  >
                     <PlusCircleIcon
                        className="h-5 w-5 mr-1 flex-shrink text-slate-600"
                        aria-hidden="true"
                     />
                     New Game
                  </button>
               )}
            </div>
            {!isLoading &&
               games.map((game) => (
                  <GameCard key={game.id} game={game} isPast={isPast} />
               ))}
         </div>
      </div>
   );
};
