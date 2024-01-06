import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
export function useBookings({filter, sortBy}) {
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  });

  return { isLoading, bookings, error };
}
