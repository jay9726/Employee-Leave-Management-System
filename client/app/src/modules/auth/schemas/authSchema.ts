import z from "zod";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password cannot exceed 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");


export const registerSchema = z.object({
  ImagePath: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, "Max 2MB allowed")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPG, PNG images allowed"
    )
    .optional(),
  FullName: z.string().min(3),
  Email: z.email(),
  Password: passwordSchema.optional(),
  DepartmentId: z.number().min(1, "Minimum one department is required"),
});


export const loginSchema = z.object({
  Email: z.email(),
  Password: passwordSchema,
});


export const forgotPasswordSchema = z.object({
  Email: z.email("Please enter a valid email address")
});


export const resetPasswordSchema = z.object({
  Email: z.email().optional(),
  Token: z.string(),
  NewPassword: passwordSchema,
});


export const updateProfileSchema = z.object({
  ImagePath: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, "Max 2MB allowed")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPG, PNG images allowed"
    )
    .optional(),
  ApplicationId: z.number().optional(),
  FullName: z.string().min(3),
  Email: z.string().email(),
  DepartmentId: z.number().optional(),
})


export const changePasswordSchema = z.object({
  ApplicationId: z.number(),
  CurrentPassword: passwordSchema,
  NewPassword: passwordSchema,
  ConfirmPassword: passwordSchema.optional()
}).refine((data) => data.NewPassword === data.ConfirmPassword, {
  message: "Passwords do not match to the new password",
  path: ["ConfirmPassword"],
});




export type RegisterSchemaPayload = z.infer<typeof registerSchema>;
export type LoginSchemaPayload = z.infer<typeof loginSchema>;
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;