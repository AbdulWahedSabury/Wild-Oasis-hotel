import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { PER_PAGE } from "../../utils/constants";
export function useBookings({ filter, sortBy }) {

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  // PreFetching Data
  const pageCount = Math.ceil(count / PER_PAGE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, error, count };
}
