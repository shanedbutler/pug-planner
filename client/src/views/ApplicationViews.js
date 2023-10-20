import { AdminViews } from './AdminViews';
import { PlayerViews } from './PlayerViews';

export const ApplicationViews = ({ user }) => {

   if (user.admin) {
      return <AdminViews user={user} />;
   } else {
      return <PlayerViews user={user} />;
   }
};
