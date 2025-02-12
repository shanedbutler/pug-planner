import { useLoaderData } from 'react-router-dom';
import { PlayerListItem } from './PlayerListItem';

export const PlayerManagement = () => {
   const { players } = useLoaderData();

   return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
         <div className="w-full max-w-xl space-y-8">
            <div className="mt-10 sm:mt-0">
               <div className="md:col-span-1">
                  <div className="px-4 sm:px-0 text-center">
                     <h3 className="text-3xl font-medium leading-6 text-gray-900">Player Management</h3>
                     <p className="mt-3 text-sm text-gray-600">Disable or enable player accounts</p>
                  </div>
               </div>
               <div className="mt-5 overflow-hidden bg-white shadow-sm rounded-md">
                  <ul>
                     {players.map((player, i) => (
                        <PlayerListItem player={player} i={i} key={player.id} />
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};
