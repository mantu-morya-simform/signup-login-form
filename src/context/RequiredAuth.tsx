import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const RequiredAuth = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};

export default RequiredAuth;
