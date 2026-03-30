import type { ForgotPasswordPayload, LoginSchemaPayload, RegisterSchemaPayload, ResetPasswordPayload, UpdateProfilePayload } from "./authSchema";


export const registerDefaultValues : RegisterSchemaPayload = {
  ImagePath: undefined,
  FullName: "",
  Email: "",
  Password: "",
  DepartmentId : ""
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
  ApplicationId: "",
  FullName: "",
  Email: "",
  DepartmentId: "",
};

export const changePasswordDefaultValues = {
  ApplicationId: "",
  CurrentPassword: "",
  NewPassword: "",
  ConfirmPassword: "",
};