import { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[]; // roles permitidos
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const rawUser = localStorage.getItem("user");

  if (!token || !rawUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(rawUser);

  // Si tiene restricciones de rol → verificar
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
