import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { AppNav } from './nav/AppNav';
import { ApplicationViews } from './views/ApplicationViews';
import { Authorized } from './views/Authorized';
import { onLoginStatusChange, me } from './managers/AuthManager';
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

export const App = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(null);
   const [userProfile, setUserProfile] = useState(null);

   useEffect(() => {
      onLoginStatusChange(setIsLoggedIn);
   }, []);

   useEffect(() => {
      if (isLoggedIn) {
         me().then((res) => setUserProfile(res))
      } else {
         setUserProfile(null);
      }
   }, [isLoggedIn]);

   // The "isLoggedIn" state variable will be null until the app's connection to firebase has been established.
   //  Then it will be set to true or false by the "onLoginStatusChange" function
   if (isLoggedIn === null) {
      // Until we know whether or not the user is logged in or not, we could show a spinner
      // NOTE: To-do, add spinner
      return null;
   }

   return (
      <UserContext.Provider value={ isLoggedIn }>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
               path="*"
               element={
                  isLoggedIn ? (
                     <>
                        <AppNav />
                        <div className="content-wrapper selection:bg-lime-100">
                           <ApplicationViews />
                        </div>
                     </>
                  ) : (
                     <Navigate to="/login" />
                  )
               }
            />
         </Routes>
      </UserContext.Provider>
   );
};
