import {RootState} from "@store";
import {AuthStore} from "@store/auth/auth-zustand.slice.ts";

export const getAccessToken = (state: AuthStore) => state.access_token
export const getRefreshToken = (state: RootState) => state.auth.refresh_token
export const getTokens = (state: RootState) => state.auth
