import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { AppNav } from '../nav/AppNav';

const ProtectedLayout = () => {
  const { session, userProfile } = useLoaderData();

  if (!session || !userProfile) {
    return <Navigate to="/" />;
  }

  return (
    <div className="content-wrapper selection:bg-lime-100">
      <AppNav user={userProfile} />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;