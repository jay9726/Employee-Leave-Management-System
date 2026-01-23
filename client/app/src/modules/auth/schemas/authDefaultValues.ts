import type { ForgotPasswordPayload, LoginSchemaPayload, RegisterSchemaPayload, ResetPasswordPayload, UpdateProfilePayload } from "./authSchema";


export const registerDefaultValues : RegisterSchemaPayload = {
  ImagePath: undefined,
  FullName: "",
  Email: "",
  Password: "",
  DepartmentId : 0
};

export const loginDefaultValues: LoginSchemaPayload = {
  Email: "",
  Password: "",
};

export const forgotPasswordDefaultValues: ForgotPasswordPayload = {
  Email: "",
};

export const resetPasswordDefaultValues:ResetPasswordPayload = {
  Email: "",
  Token: "",
  NewPassword: "",
};

export const updateProfileDefaultValues:UpdateProfilePayload = {
  ImagePath: undefined,
  ApplicationId: 0,
  FullName: "",
  Email: "",
  DepartmentId: 0,
};

export const changePasswordDefaultValues = {
  ApplicationId: 0,
  CurrentPassword: "",
  NewPassword: "",
  ConfirmPassword: "",
};