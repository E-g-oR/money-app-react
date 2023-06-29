import {Tokens} from "@/types/api.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APIAuth} from "@store/auth/auth.api.ts";


const initialState: Tokens = {
    access_token: "",
    refresh_token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Tokens>) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                APIAuth.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.access_token = action.payload.access_token
                    state.refresh_token = action.payload.refresh_token
                    // state = action.payload
                })
            .addMatcher(
                APIAuth.endpoints.register.matchFulfilled,
                (state, {payload: {access_token, refresh_token}}) => {
                    state.access_token = access_token
                    state.refresh_token = refresh_token
                }
            )
            .addMatcher(
                APIAuth.endpoints.refresh.matchFulfilled,
                (state, {payload: {access_token, refresh_token}}) => {
                    state.access_token = access_token
                    state.refresh_token = refresh_token
                }
            )
    }
})

export const authActions = authSlice.actions,
    authReducer = authSlice.reducer
