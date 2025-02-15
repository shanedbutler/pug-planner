import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { supabase } from './supabaseUtils/supabaseClient';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { GameDetails } from './game/GameDetails';
import { Dashboard } from './dashboard/Dashboard';
import { PlayerProfile } from './profile/PlayerProfile';
import { PlayerEdit } from './profile/PlayerEdit';
import { GameEdit } from './game/GameEdit';
import { GameForm } from './game/GameForm';
import { PlayerManagement } from './profile/PlayerManagement';
import { sessionLoader } from './managers/sessionLoader';
import { gameByIdEditLoader, gameByIdLoader } from './managers/gameLoader';
import { userProfileByIdLoader, userProfilesLoader } from './managers/userProfileLoader';
import Unauthorized from './auth/Unauthorized';
import Fallback from './auth/Fallback';
import ProtectedLayout from './views/ProtectedLayout';
import AdminLayout from './views/AdminLayout';

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
      element: <ProtectedLayout />,
      hydrateFallbackElement: <Fallback />,
      errorElement: <Unauthorized />,
      id: 'protected',
      loader: sessionLoader,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'game/:id',
          element: <GameDetails />,
          loader: gameByIdLoader,
        },
        {
          path: 'profile/:id',
          element: <PlayerProfile />,
          loader: userProfileByIdLoader,
        },
        {
          path: 'profile/edit',
          element: <PlayerEdit />,
        },
        {
          path: 'players',
          element: <PlayerManagement />,
          loader: userProfilesLoader,
        },
        {
          element: <AdminLayout />,
          id: 'protected-admin',
          children: [
            {
              path: 'game/:id/edit',
              element: <GameEdit />,
              loader: gameByIdEditLoader,
            },
            {
              path: 'new-game',
              element: <GameForm />,
            },
            {
              path: 'admin/players',
              element: <PlayerManagement />,
              loader: userProfilesLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/unauthorized',
      element: <Unauthorized />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};