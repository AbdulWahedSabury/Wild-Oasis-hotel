import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin(){
  const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate : CreateCabin } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
          toast.success("Cabin has been created");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
      });

      return {isCreating, CreateCabin}
}