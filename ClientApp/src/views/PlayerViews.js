import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';
import { GameDetails } from '../game/GameDetails';
import { PlayerEdit } from '../profile/PlayerEdit';
import { PlayerProfile } from '../profile/PlayerProfile';

export const PlayerViews = ({ userId }) => {
   //<Route path="/signup/:id" element={<SignUp />} />

   return (
      <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/game/:id" element={<GameDetails />} />
         <Route path="/profile/:id" element={<PlayerProfile />} />
         <Route path="/profile/edit" element={<PlayerEdit userId={userId} />} />
      </Routes>
   );
};
