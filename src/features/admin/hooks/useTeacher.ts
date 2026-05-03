import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTeacher, deleteTeacher, getTeacher, getTeacherById, searchTeacher, updateTeacher } from "../services/TeacherServices"
import { CreateTeacherInput, Teacher, TeachersData } from "../../../types/teachers"
import ErrorService from "../../../utils/ErrorService"
import { useTranslation } from "react-i18next"

export const useTeacher = (search?: string) => {
    return useQuery<TeachersData>({
        queryKey: ["teachers", search],
        queryFn: () => search ? searchTeacher(search) : getTeacher(),
    })
}
export const useTeacherById = (id: string) => {
    return useQuery({
        queryKey: ["teachers", id],
        queryFn: () => getTeacherById(id),
        enabled: !!id,
    })
}
export const useUpdateTeacher = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateTeacherInput | Partial<Teacher> }) => updateTeacher(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["teachers", variables.id] });
            ErrorService.success(t('teacher Updated Success'));
        }
    });
}

export const useDeleteTeacher = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (id: string) => deleteTeacher(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["teachers", id] });
            ErrorService.success(t('teacher Deleted Success'));
        }
    });
}

export const useCreateTeacher = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (data: CreateTeacherInput) => createTeacher(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            ErrorService.success(t('teacher Added Success'));
        }
    });
}
