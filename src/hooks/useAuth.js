import { useQuery, useQueryClient } from "@tanstack/react-query"
import { validateUser } from "../api/AuthApi";

export const useAuth = () => {
    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem("tokenJwt")
        queryClient.invalidateQueries({ queryKey: ["user"] })
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["user"],
        queryFn: validateUser,
        retry: 1,
        refetchOnWindowFocus: false,
    })
    
    return { isPending, isError, data, error, logout };
}