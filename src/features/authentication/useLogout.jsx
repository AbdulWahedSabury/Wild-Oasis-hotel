import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";

export default function useLogout(){
    const navigate = useNavigate();
    const useQuery = useQueryClient();
    const{ mutate : logout , isLoading} = useMutation({
        mutationFn : logoutApi, 
        onSuccess : () => {
            navigate('/login');
            useQuery.removeQueries();
        }
    })
    return {logout , isLoading}
}