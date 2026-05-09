import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/appStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): React.ReactElement => {
  const storeUser = useAppSelector((store) => store.user);
  const localUser = localStorage.getItem("tinderUser");

  // If there is no user in store and no user in local storage, they are unauthenticated
  if (!storeUser && !localUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
