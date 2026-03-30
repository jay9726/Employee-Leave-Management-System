
import { SessionAuthentication } from "@/modules/auth/guards/sessionAuthentication";
import type { AuthUser } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface authState {
  token: string | null;
  authUser: AuthUser | null;
  isAuthenticated: boolean;
}

const session = SessionAuthentication.getSession();

const initialState: authState = {
  token: session?.token ?? null,
  authUser: session?.authUser ?? null,
  isAuthenticated: !!(session?.token && session?.authUser),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ token: string; authUser: AuthUser }>) => {
      state.token = action.payload.token;
      state.authUser = action.payload.authUser;
      state.isAuthenticated = true;

      SessionAuthentication.setSession({
        token: action.payload.token,
        user: action.payload.authUser,
      });
    },
    logoutUser: (state) => {
      state.token = null;
      state.authUser = null;
      state.isAuthenticated = false;
      SessionAuthentication.clearSession();
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
