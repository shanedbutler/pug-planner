import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { supabase } from './supabaseUtils/supabaseClient';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { GameDetails } from './game/GameDetails';
import ProtectedRoute from './views/ProtectedRoute';
import { Dashboard } from './dashboard/Dashboard';
import { PlayerProfile } from './profile/PlayerProfile';
import { PlayerEdit } from './profile/PlayerEdit';
import { GameEdit } from './game/GameEdit';
import { GameForm } from './game/GameForm';
import { PlayerManagement } from './profile/PlayerManagement';
import { fetchProfiles, fetchProfileWithForeign } from './managers/UserManager';
import { fetchGameById } from './managers/GameManager';

export const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
      path: '/',
      element: <ProtectedRoute loading={loading} />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />, // previously passed isAdmin={true}
        },
        {
          path: 'game/:id',
          element: <GameDetails />, // fetchGameById, previously passed isAdmin={true}
        },
        {
          path: 'profile/:id',
          element: <PlayerProfile />, // fetchProfileWithForeign
        },
        {
          path: 'profile/edit',
          element: <PlayerEdit userId={session?.user?.id} />,
        },
        {
          path: '/',
          element: <ProtectedRoute adminOnly loading={loading} />,
          children: [
            {
              path: 'game/:id/edit',
              element: <GameEdit />,
            },
            {
              path: 'new-game',
              element: <GameForm />,
            },
            {
              path: 'players',
              element: <PlayerManagement />,
            },
          ],
        },
      ],
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
};