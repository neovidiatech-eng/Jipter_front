import api from "../lib/axios"
import { GetUserSchedulesResponse } from "../types/scheduales"

export const getUserSessions = async (search: string): Promise<GetUserSchedulesResponse> => {
    const response = await api.get<GetUserSchedulesResponse>(`/schedules/user/schedules?search=${search}`)
    return response.data
}