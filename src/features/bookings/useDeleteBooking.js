import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess: () => {
      toast.success(`A Booking has been deleted`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.success(`Failed to delete a Booking `);
    },
  });

  return { deleteBooking, isDeletingBooking };
}
