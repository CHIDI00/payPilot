import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

// Define the expected signup input type
interface SignupInput {
  email: string;
  fullName: string;
  password: string;
}

interface SignupResponse {
  user: {
    id: string;
    email?: string;
    user_metadata?: {
      fullName?: string;
      avatar?: string;
    };
  } | null;
  session: unknown | null;
}

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation<
    SignupResponse,
    Error,
    SignupInput
  >({
    mutationFn: ({ email, fullName, password }) =>
      signupApi({ email, fullName, password }),
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(["user"], data.user);
        navigate("auth/login", { replace: true });
      }
    },
    onError: () => {
      toast.error(`Signup failed`);
    },
  });

  return { signup, isPending };
}
