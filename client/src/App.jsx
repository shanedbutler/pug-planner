import { useEffect, useState } from 'react';
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseUtils/supabaseClient';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { ApplicationViews } from './views/ApplicationViews';
import { GameDetails } from './game/GameDetails';

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

   const router = createBrowserRouter([
      {
         path: '/',
         element: <Login />,
      },
      {
         path: '/register',
         element: <Register />,
      },
      {
         path: '/game/:id',
         element: (
         <ProtectedRoute>
            <GameDetails />
         </ProtectedRoute>
         )
      },
      {
         path: '/profile/:id',
         element: (
         <ProtectedRoute>
            <PlayerProfile />
         </ProtectedRoute>
         )
      },
      {
         path: '/profile/edit',
         element: (
         <ProtectedRoute>
            <PlayerEdit />
         </ProtectedRoute>
         )
      },
      {
         path: '/game/:id/edit',
         element: (
            <ProtectedRoute adminOnly>
               <GameEdit />
            </ProtectedRoute>
         )
      },
      {
         path: '/new-game',
         element: (
            <ProtectedRoute adminOnly>
               <GameForm />
            </ProtectedRoute>
         )
      },
      {
         path: '/players',
         element: (
            <ProtectedRoute adminOnly>
               <PlayerManagement />
            </ProtectedRoute>
         )
      },
   ]);

   return (
      <BrowserRouter>
         {!loading &&
            <Routes>
               {session ?
                  <Route
                     path="*"
                     element={
                        <div className="content-wrapper selection:bg-lime-100">
                           <ApplicationViews user={session?.user} />
                        </div>
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
