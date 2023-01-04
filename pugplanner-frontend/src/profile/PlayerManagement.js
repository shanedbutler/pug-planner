import { useEffect, useState } from 'react';
import { fetchUsers } from '../managers/UserManager';
import { PlayerListItem } from './PlayerListItem';

export const PlayerManagement = () => {

   const [players, setPlayers] = useState([]);

   useEffect(() => {
      fetchUsers().then((players) => setPlayers(players));
   }, []);

   return (
      <div className="px-5 pt-6 last:pb-6">
         <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow rounded-md">
               {players.map((player, i) => <PlayerListItem player={player} i={i} />)}
            </div>
         </div>
      </div>
   );
};
