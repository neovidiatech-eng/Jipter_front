import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateSchedule, createSchedule, createRecurringSchedule, deleteSchedule, deleteRecurringScheduale } from "../services/SchedulesServices";
import { UpdateSchedulePayload, CreateSchedulePayload, CreateRecurringSchedulePayload } from "../../../types/scheduales";
import { getAllSchedules, searchSchedules, getSchedulesForTeacher } from "../services/SessionsServices";
import ErrorService from "../../../utils/ErrorService";
import { useTranslation } from "react-i18next";

export const useGetSchedules = () => {
    return useQuery({
        queryKey: ["schedules"],
        queryFn: () => getAllSchedules(),
    });
};

export const useSearchSchedules = (searchTerm: string) => {
    return useQuery({
        queryKey: ["schedules", searchTerm],
        queryFn: () => searchTerm ? searchSchedules(searchTerm) : getAllSchedules(),
    });
};

export const useGetSchedulesByTeacher = (teacherId: string) => {
    return useQuery({
        queryKey: ["schedules", "teacher", teacherId],
        queryFn: () => getSchedulesForTeacher(teacherId),
        enabled: !!teacherId,
    });
};

export const useCreateSchedule = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (data: CreateSchedulePayload) => createSchedule(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
            ErrorService.success(t('sessionAddedSuccess'));
        }
    });
};

export const useCreateRecurringSchedule = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (data: CreateRecurringSchedulePayload) => createRecurringSchedule(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
            ErrorService.success(t('sessionsAddedSuccess'));
        }
    });
};

export const useDeleteSchedule = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (id: string) => deleteSchedule(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
            ErrorService.success(t('sessionDeletedSuccess'));
        }
    });
};

export const useDeleteGroupedSchedule = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (id: string) => deleteRecurringScheduale(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
            ErrorService.success(t('sessionDeletedSuccess'));
        }
    });
};


export const useUpdateSchedule = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSchedulePayload }) =>
            updateSchedule(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
            ErrorService.success(t('sessionUpdatedSuccess'));
        }
    });
};
