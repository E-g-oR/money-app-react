import {AuthStore} from "@store/auth/auth.slice.ts";

export const getAccessToken = (state: AuthStore) => state.access_token
export const getRefreshToken = (state: AuthStore) => state.refresh_token
