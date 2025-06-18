import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: JSX.Element;
  allowedRole: "ADMIN" | "USER";
}

const RoleGuard = ({ children, allowedRole }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    const fallback = user.role.toLowerCase(); // admin / user
    return <Navigate to={`/${fallback}/profile`} replace />;
  }

  return children;
};

export default RoleGuard;