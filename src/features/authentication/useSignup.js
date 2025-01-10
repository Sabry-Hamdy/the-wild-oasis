import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (credentials) => signupApi(credentials),

    onSuccess: () => {
      toast.success(
        "A new user has been created successfully, please confirm your email to be able to login"
      );
    },

    onError: () => {
      toast.error("Error while creating a user");
    },
  });

  return { signup, isLoading };
}
