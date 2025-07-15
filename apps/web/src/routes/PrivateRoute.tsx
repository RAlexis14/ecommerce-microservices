import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";


interface Props {
  children: JSX.Element;
  requiredRole?: string;
}

export default function PrivateRoute({ children, requiredRole }: Props) {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />;

  return children;
}
