import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseUtils/supabaseClient';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { AppNav } from './nav/AppNav';
import { ApplicationViews } from './views/ApplicationViews';
import { ProtectedRoute } from './views/ProtectedRoute';

export const App = () => {
   const [session, setSession] = useState(null)
   const [user, setUser] = useState(null);

   useEffect(() => {
    // Listen for changes to the user authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
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
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
               path="*"
               element={
                  <ProtectedRoute user={user}>
                     <AppNav user={user}/>
                     <div className="content-wrapper selection:bg-lime-100">
                        <ApplicationViews user={user} />
                     </div>
                  </ProtectedRoute>
               }
            />
         </Routes>
      </BrowserRouter>
   );
};
