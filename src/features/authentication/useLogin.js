import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


export function useLogin() {
  const navigate = useNavigate();
  const useQuery = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => logIn({ email, password }),
    onSuccess: (user) => {
      useQuery.setQueryData(['user'], user.user)
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isLoading };
}
