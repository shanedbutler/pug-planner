import { Navigate, Outlet, useRouteLoaderData } from 'react-router-dom';

const AdminLayout = () => {
    const { userProfile } = useRouteLoaderData('protected');

  if (!userProfile?.admin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminLayout;