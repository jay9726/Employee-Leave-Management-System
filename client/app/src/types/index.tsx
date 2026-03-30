import type { Role } from "@/modules/auth/guards/protectedRoute"

export type AuthUser = {
    employeeId: string,
    email: string,
    departmentId: string,
    fullName: string,
    role: Role
    expiresAt: string,
    imagePath: string
}


export type LoginResponse = {
    token: string,
    user: AuthUser
}


export interface ApiResponse<T> {
    message?: string,
    data: T,
    count?: number
}