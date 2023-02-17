import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';
import { GameDetails } from '../game/GameDetails';
import { GameEdit } from '../game/GameEdit';
import { GameForm } from '../game/GameForm';
import { PlayerEdit } from '../profile/PlayerEdit';
import { PlayerManagement } from '../profile/PlayerManagement';
import { PlayerProfile } from '../profile/PlayerProfile';

export const AdminViews = ({ userId }) => {

   const isAdmin = true;

   return (
      <Routes>
         <Route path="/" element={<Dashboard isAdmin={isAdmin} />} />
         <Route path="/game/:id" element={<GameDetails isAdmin={isAdmin} />} />
         <Route path="/new-game" element={<GameForm />} />
         <Route path="/edit-game/:id" element={<GameEdit />} />
         <Route
            path="/profile/:id"
            element={<PlayerProfile isAdmin={isAdmin} />}
         />
         <Route path="/profile/edit" element={<PlayerEdit userId={userId} />} />
         <Route path="/players" element={<PlayerManagement />} />
      </Routes>
   );
};
