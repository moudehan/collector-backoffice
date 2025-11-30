import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = localStorage.getItem("TOKEN");
  console.log("ProtectedRoute token:", token);
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
