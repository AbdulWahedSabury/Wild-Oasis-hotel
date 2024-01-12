import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as ApiDeleteBooking } from "../../services/apiBookings";

export function useDeleteBooking(){
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate : deleteBooking } = useMutation({
      mutationFn : ApiDeleteBooking ,
      onSuccess: () => {
        toast.success("Booking has been deleted");
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    return { isDeleting, deleteBooking}
}