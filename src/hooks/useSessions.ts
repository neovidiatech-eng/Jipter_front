import { useQuery } from "@tanstack/react-query"
import { getUserSessions } from "../services/SessionsServices"

export const useUserSessions = (search: string) => {
    return useQuery({
        queryKey: ["user-sessions", search],
        queryFn: () => getUserSessions(search),
    })
}