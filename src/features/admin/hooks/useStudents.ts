import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../services/StudentServices";
import { Student } from "../../../types/student";
import { StudentFormData } from "../../../lib/schemas/StudentSchema";
import ErrorService from "../../../utils/ErrorService";
import { useTranslation } from "react-i18next";

export const useStudents = () => {
    return useQuery({
        queryKey: ["students"],
        queryFn: getStudents,
    });
}
export const useStudentById = (id: string) => {
    return useQuery({
        queryKey: ["student", id],
        queryFn: () => getStudentById(id),
    });
}
export const useUpdateStudent = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: StudentFormData | Partial<Student> }) => updateStudent(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            queryClient.invalidateQueries({ queryKey: ["student", variables.id] });
            ErrorService.success(t('studentUpdatedSuccess'));
        }
    });
}
export const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (id: string) => deleteStudent(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            queryClient.invalidateQueries({ queryKey: ["student", id] });
            ErrorService.success(t('studentDeletedSuccess'));
        }
    });
}
export const useCreateStudent = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (data: StudentFormData | Partial<Student>) => createStudent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            ErrorService.success(t('studentAddedSuccess'));
        }
    });
}