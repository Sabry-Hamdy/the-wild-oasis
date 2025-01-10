import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });

      toast.success("A setting has been Updated");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Failed to Update a setting ");
    },
  });

  return { isUpdating, updateSetting };
}
