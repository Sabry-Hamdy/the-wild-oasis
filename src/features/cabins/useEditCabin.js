import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as editCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  // Editing Cabin
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success("A Cabin has been Edited");

      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
