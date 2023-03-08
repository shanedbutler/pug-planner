import { Route, Routes } from 'react-router-dom';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { AppNav } from './nav/AppNav';
import { ApplicationViews } from './views/ApplicationViews';
import { Authorized } from './views/Authorized';
import { onLoginStatusChange, me } from './managers/AuthManager';
import { useEffect, useState } from 'react';

export const App = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(null);
   const [userProfile, setUserProfile] = useState(null);
 
   useEffect(() => {
     onLoginStatusChange(setIsLoggedIn);
   }, []);
 
   useEffect(() => {
     if (isLoggedIn) {
       me().then(setUserProfile);
     } else {
       setUserProfile(null);
     }
   }, [isLoggedIn]);
 
   // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
   //  Then it will be set to true or false by the "onLoginStatusChange" function
   if (isLoggedIn === null) {
     // Until we know whether or not the user is logged in or not, just show a spinner
     // NOTE: To-do, add spinner
     return null;
   }

   return (
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />

         <Route
            path="*"
            element={
               <Authorized isLoggedIn={isLoggedIn} userProfile={userProfile} >
                  <>
                     <AppNav />
                     <div className="content-wrapper selection:bg-lime-100">
                        <ApplicationViews />
                     </div>
                  </>
               </Authorized>
            }
         />
      </Routes>
   );
};
