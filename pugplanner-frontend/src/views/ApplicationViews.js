import { getCurrentUser } from '../managers/UserManager';
import { AdminViews } from './AdminViews';
import { PlayerViews } from './PlayerViews';

export const ApplicationViews = () => {
   const localUser = getCurrentUser();

   if (localUser.admin) {
      //return admin views
      return <AdminViews />;
   } else {
      //return customer views
      return <PlayerViews />;
   }
};
