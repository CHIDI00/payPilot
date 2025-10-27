import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email?: string | null;
}

interface Session {
  access_token: string;
  refresh_token: string;
  // Optional fields commonly returned by auth services:
  expires_in?: number;
  token_type?: string;
}

interface WeakPassword {
  password: string;
}

interface LoginResponse {
  user: User | null;
  session: Session | null;
  weak_password?: WeakPassword;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation<
    LoginResponse,
    Error,
    LoginCredentials
  >({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/invoices", { replace: true });
      toast.success("Login successful!");
    },

    onError: () => {
      toast.error(`Login failed. Check your connection. `);
    },
  });

  return { login, isPending };
}
