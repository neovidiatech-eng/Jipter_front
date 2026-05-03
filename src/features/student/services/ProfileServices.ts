import api from "../../../lib/axios"
import { StudentProfileResponse } from "../../../types/profile"

export const getStudentProfile = async (): Promise<StudentProfileResponse> => {
    const response = await api.get("/student/profile");
    return response.data;
}
