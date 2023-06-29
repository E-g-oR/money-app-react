import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {Account, AccountInList, Operation} from "@/types/accounts.ts";
import {RootState} from "@store/index.ts";
import {AuthDto, RegisterDto, Tokens} from "@/types/api.ts";
import {Depth} from "@/types/depths.ts";


const staggerBaseQuery = retry(
    fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        prepareHeaders: (headers, {getState}) => {
            const state = getState() as RootState
            if (state.auth.access_token) {
                headers.set('Authorization', `Bearer ${state.auth.access_token}`)
            }
            return headers
        },
    }),
)

export const APISecure = createApi({
    reducerPath: "api",
    baseQuery: staggerBaseQuery,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    tagTypes: ["refresh", "account", "accountsList", "transactionsList", "depthsList"],
    endpoints: builder => ({
        login: builder.mutation<Tokens, AuthDto>({
            query: (body: AuthDto) => ({
                method: "POST",
                url: "auth/login",
                body
            }),
        }),
        register: builder.mutation<Tokens, RegisterDto>({
            query: (body: RegisterDto) => ({
                method: "POST",
                url: "auth/register",
                body
            })
        }),
        refresh: builder.query<Tokens, string>({
            query: (refresh_token) => ({
                url: "auth/refresh",
                headers: {
                    "Authorization": "Bearer " + refresh_token
                },
            }),
        }),
        getAccountsList: builder.query<ReadonlyArray<AccountInList>, undefined>({
            query: () => "accounts",
            providesTags: ["refresh"]
        }),
        getAccount: builder.query<Account, number>({
            query: (accountId) => `accounts/${accountId}`,
            providesTags: ["refresh"]
        }),
        getTransactionsList: builder.query<ReadonlyArray<Operation>, number>({
            query: (accountId) => `transactions/account/${accountId}`,
        }),
        getDepthsList: builder.query<ReadonlyArray<Depth>, undefined>({
            query: () => "depths",
            providesTags: ["refresh"]
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshQuery,
    useGetAccountsListQuery,
    useGetAccountQuery,
    useGetTransactionsListQuery,
    useGetDepthsListQuery
} = APISecure
