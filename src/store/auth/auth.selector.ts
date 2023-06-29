import {RootState} from "@store";

export const getAccessToken = (state: RootState) => state.auth.access_token
export const getRefreshToken = (state: RootState) => state.auth.refresh_token
export const getTokens = (state: RootState) => state.auth
