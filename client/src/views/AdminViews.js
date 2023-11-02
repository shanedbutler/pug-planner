import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';
import { GameDetails } from '../game/GameDetails';
import { GameEdit } from '../game/GameEdit';
import { GameForm } from '../game/GameForm';
import { PlayerEdit } from '../profile/PlayerEdit';
import { PlayerManagement } from '../profile/PlayerManagement';
import { PlayerProfile } from '../profile/PlayerProfile';
import { useUserProfileContext } from './ApplicationViews';

export const AdminViews = () => {
   const { userProfile } = useUserProfileContext();

   return (
      <Routes>
         <Route path="/">
            <Route index element={<Dashboard isAdmin={true} />} />
            <Route path="/game/:id" element={<GameDetails isAdmin={true} />} />
            <Route path="/new-game" element={<GameForm />} />
            <Route path="/edit-game/:id" element={<GameEdit />} />
            <Route path="/profile/:id" element={<PlayerProfile isAdmin={true} />} />
            <Route path="/profile/edit" element={<PlayerEdit userId={userProfile.id} />} />
            <Route path="/players" element={<PlayerManagement />} />
         </Route>
      </Routes>
   );
};
