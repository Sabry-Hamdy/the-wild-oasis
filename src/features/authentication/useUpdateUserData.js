import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserData,

    onSuccess: ({ user }) => {
      toast.success("Updated user data successfully");
      queryClient.invalidateQueries({ queryKey: ["user"], user });
    },

    onError: (err) => {
      console.error(err);
      toast.error("Error while updating user data");
    },
  });

  return { updateUser, isUpdating };
}
