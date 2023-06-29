import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthDto, RegisterDto, Tokens} from "@/types/api.ts";


export const APIAuth = createApi({
    reducerPath: "api-auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/auth"
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    endpoints: builder => ({
        login: builder.mutation<Tokens, AuthDto>({
            query: (body: AuthDto) => ({
                method: "POST",
                url: "login",
                body
            }),
        }),
        register: builder.mutation<Tokens, RegisterDto>({
            query: (body: RegisterDto) => ({
                method: "POST",
                url: "register",
                body
            })
        }),
        refresh: builder.query<Tokens, string>({
            query: (refresh_token) => ({
                url: "refresh",
                headers: {
                    "Authorization": "Bearer " + refresh_token
                },
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshQuery,
} = APIAuth
