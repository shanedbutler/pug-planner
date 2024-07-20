import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProfileWithForeign } from '../managers/UserManager';
import { AdminViews } from './AdminViews';
import { PlayerViews } from './PlayerViews';
import { AppNav } from '../nav/AppNav';

const UserProfileContext = createContext();

export const useUserProfileContext = () => useContext(UserProfileContext);

export const ApplicationViews = ({ user }) => {
   const [userProfile, setUserProfile] = useState({});

   useEffect(() => {
      //get profile for current user and set to application context
      fetchProfileWithForeign(user.id).then(data => {
         setUserProfile(data);
      });
   }, [user.id]);

   return (
      <>
         <AppNav user={userProfile} />
         <UserProfileContext.Provider value={{ userProfile }}>
            {userProfile.admin ? <AdminViews userId={user.id} /> : <PlayerViews userId={user.id} />}
         </UserProfileContext.Provider>
      </>
   );
};
