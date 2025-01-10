import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueriesData({ queryKey: ["user"] }, user);
      toast.success("Welcome Back");
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log("Error" + err);
      toast.error("Provided Email or Password are incorrect ");
    },
  });

  return { login, isLoading };
}
