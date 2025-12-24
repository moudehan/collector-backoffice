import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexte/UseAuth";
import type { User } from "../types/user.type";

type ProtectedRouteProps = {
  children: JSX.Element;
  requiredRoles?: User["role"][];
};

export default function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const { user, loading, isLoggingOut } = useAuth();

  if (loading || isLoggingOut) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role);

    if (!hasRequiredRole) {
      return (
        <div style={{ padding: "1rem", fontSize: "0.9rem", color: "#b91c1c" }}>
          Vous n&apos;avez pas les droits nécessaires pour accéder à cette page.
        </div>
      );
    }
  }

  return children;
}
