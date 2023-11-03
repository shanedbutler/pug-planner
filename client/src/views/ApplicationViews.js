import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProfileWithForeign } from '../managers/UserManager';
import { AdminViews } from './AdminViews';
import { PlayerViews } from './PlayerViews';

const UserProfileContext = createContext();

export const useUserProfileContext = () => useContext(UserProfileContext);

export const ApplicationViews = ({ user }) => {
   const [userProfile, setUserProfile] = useState({});

   useEffect(() => {
      //get profile for current user and set to application context
      fetchProfileWithForeign(user.id).then(data => {
         setUserProfile(data);
      });
   }, []);

   if (userProfile.admin) {
      return (
         <UserProfileContext.Provider value={{ userProfile }}>
            <AdminViews />;
         </UserProfileContext.Provider>
      );
   } else {
      return (
         <UserProfileContext.Provider value={{ userProfile }}>
            <PlayerViews />;
         </UserProfileContext.Provider>
      )
   }
};
