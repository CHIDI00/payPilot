import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Type for credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Type of returned user/session from Supabase
interface LoginResponse {
  user: {
    id: string;
    email?: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
  };
  weakPassword?: {
    password: string;
  };
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

    onError: (err) => {
      toast.error(`Login failed: ${err.message}`);
    },
  });

  return { login, isPending };
}
