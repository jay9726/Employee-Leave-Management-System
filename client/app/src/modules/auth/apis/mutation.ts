import type { ApiResponse } from "@/types";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { changePasswordAPI, forgetPasswordAPI, loginAPI, registerAPI, resetPasswordAPI } from "./api";
import type { LoginSchemaPayload, RegisterSchemaPayload } from "../schemas/authSchema";

export const useLogin = (
    options?: UseMutationOptions<
        ApiResponse<any>, any, LoginSchemaPayload>

) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: any) => loginAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['login'] })
        },
        ...options
    })
}


export const useRegister = (
    options?: UseMutationOptions<
        ApiResponse<any>, any, RegisterSchemaPayload>

) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['register'],
        mutationFn: (data: any) => registerAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['register'] })
        },
        ...options
    })
}




export const useForgetPassword = (
    options?: UseMutationOptions<ApiResponse<any>, any, any>
) => {
    return useMutation({
        mutationKey: ["forgetPassword"],
        mutationFn: (data: any) => forgetPasswordAPI(data),
        ...options,
    });
};

export const useResetPassword = (
    options?: UseMutationOptions<ApiResponse<any>, any, any>
) => {
    return useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: (data: any) => resetPasswordAPI(data),
        ...options,
    });
};

export const useChangePassword = (
    options?: UseMutationOptions<ApiResponse<any>, any, any>
) => {
    return useMutation({
        mutationKey: ["changePassword"],
        mutationFn: (data: any) => changePasswordAPI(data),
        ...options,
    });
};