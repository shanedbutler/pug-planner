import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return <>{children}</>
};
