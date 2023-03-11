import { getLocalUser } from '../managers/UserManager';
import { AdminViews } from './AdminViews';
import { PlayerViews } from './PlayerViews';

export const ApplicationViews = () => {
   const localUser = getLocalUser();

   if (localUser.admin) {
      //return admin views
      return <AdminViews userId={localUser.id} />;
   } else {
      //return customer views
      return <PlayerViews userId={localUser.id} />;
   }
};
