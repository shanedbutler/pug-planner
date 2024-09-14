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
import { fetchProfileWithForeign } from './managers/UserManager';

const UserProfileContext = createContext();

export const useUserProfileContext = () => useContext(UserProfileContext);

export const App = () => {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      // Get profile for current session user and set to application context
      fetchProfileWithForeign(session.user.id).then(data => {
        setUserProfile(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    // Listen for changes to the user authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
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
    <UserProfileContext.Provider value={{ userProfile }}>
      <RouterProvider router={router} />
    </UserProfileContext.Provider>
  );
};