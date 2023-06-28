import {Tokens} from "@/types/api.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Tokens = {
    access_token: "",
    refresh_token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Tokens>)=>{
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        }
    }
})

export const authActions = authSlice.actions,
    authReducer = authSlice.reducer
