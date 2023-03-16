import { getLocalUser } from '../managers/UserManager';
import { AdminViews } from './AdminViews';
import { PlayerViews } from './PlayerViews';

export const ApplicationViews = () => {
   const localUser = getLocalUser();

   if (localUser.admin) {
      return <AdminViews userId={localUser.id} />;
   } else {
      return <PlayerViews userId={localUser.id} />;
   }
};
