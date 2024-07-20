import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';
import { GameDetails } from '../game/GameDetails';
import { PlayerEdit } from '../profile/PlayerEdit';
import { PlayerProfile } from '../profile/PlayerProfile';
import { useUserProfileContext } from './ApplicationViews';

export const PlayerViews = () => {
   const { userProfile } = useUserProfileContext();

   return (
      <Routes>
         <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/profile/:id" element={<PlayerProfile />} />
            <Route path="/profile/edit" element={<PlayerEdit userId={userProfile.id} />} />
         </Route> 
      </Routes>
   );
};
