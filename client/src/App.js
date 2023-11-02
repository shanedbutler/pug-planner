import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseUtils/supabaseClient';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { AppNav } from './nav/AppNav';
import { ApplicationViews } from './views/ApplicationViews';

export const App = () => {
   const [session, setSession] = useState(null)
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Listen for changes to the user authentication state
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session ?? null);
         setLoading(false);
      });

      // Unsubscribe from the listener when the component unmounts
      return () => {
         if (authListener && typeof authListener.unsubscribe === 'function') {
            authListener.unsubscribe();
         }
      };
   }, [supabase.auth]);

   return (
      <BrowserRouter>
         {!loading &&
            <Routes>
               {session ?
                  <Route
                     path="*"
                     element={
                        <>
                           <AppNav user={session?.user} />
                           <div className="content-wrapper selection:bg-lime-100">
                              <ApplicationViews user={session?.user} />
                           </div>
                        </>
                     }
                  />
                  :
                  <>
                     <Route path="*" element={<Login />} />
                     <Route path="/register" element={<Register />} />
                  </>
               }
            </Routes>
         }
      </BrowserRouter>
   );
};
