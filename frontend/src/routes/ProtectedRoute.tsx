import { useAuth } from "@/context/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
