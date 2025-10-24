import { useUser } from "@/features/authentication/useUser";
import React, { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ChildrenProp {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ChildrenProp> = ({ children }) => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/auth/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
