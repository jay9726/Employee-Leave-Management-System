import type { ApiResponse } from "@/types";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { addUserAPI, deleteUserAPI, updateUserAPI } from "./api";
import type { UpdateProfilePayload } from "@/modules/auth/schemas/authSchema";

export const useAddUser = (
    options?: UseMutationOptions<ApiResponse<any>, any, { id: number; data: any }>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["addUser"],
        mutationFn: ({ id, data }) => addUserAPI(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        },
        ...options,
    });
};

export const useUpdateUser = (
    options?: UseMutationOptions<ApiResponse<any>, any, UpdateProfilePayload>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateUser"],
        mutationFn: (data: UpdateProfilePayload) => updateUserAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        },
        ...options,
    });
};

export const useDeleteUser = (
    options?: UseMutationOptions<ApiResponse<any>, any, string>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteUser"],
        mutationFn: (id: string) => deleteUserAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        },
        ...options,
    });
};