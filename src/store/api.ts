import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {Pageable} from "@/types/api.ts";
import {RootState} from "@store/index.ts";
import {Depth, DepthNew} from "@/types/depths.ts";
import {Account, AccountInList, CreateAccount, Operation, OperationNew} from "@/types/accounts.ts";

interface PayDepthPayload {
    depthId: number,
    accountId: number,
    value: number
}

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
    tagTypes: ["account", "accountsList", "transactionsList", "depthsList"],
    endpoints: builder => ({
        getAccountsList: builder.query<ReadonlyArray<AccountInList>, "">({
            query: () => "accounts",
            providesTags: ["accountsList"]
        }),
        getAccount: builder.query<Account, number>({
            query: (accountId) => `accounts/${accountId}`,
            providesTags: ["account"]
        }),
        createAccount: builder.mutation<Account, CreateAccount>({
            query: (body) => ({
                url: "accounts/new",
                method: "POST",
                body
            }),
            invalidatesTags: ["accountsList"]
        }),
        getTransactionsList: builder.query<Pageable<Operation>, number>({
            query: (accountId) => `transactions/account/${accountId}`,
            providesTags: ["transactionsList"]
        }),
        createTransaction: builder.mutation<Operation, OperationNew>({
            query: (body) => ({
                url: "transactions",
                method: "POST",
                body
            }),
            invalidatesTags: ["transactionsList", "account"]
        }),
        getDepthsList: builder.query<ReadonlyArray<Depth>, undefined>({
            query: () => "depths",
            providesTags: ["depthsList"]
        }),
        createDepth: builder.mutation<Depth, DepthNew>({
            query: (body) => ({
                url: "depths",
                method: "POST",
                body
            }),
            invalidatesTags: ["depthsList"]
        }),
        payDepth: builder.mutation<Depth, PayDepthPayload>({
            query: ({depthId, ...body}) => ({
                url: `depths/pay/${depthId}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["depthsList"]
        }),
    })
})

export const {
    useGetAccountQuery,
    usePayDepthMutation,
    useGetDepthsListQuery,
    useCreateDepthMutation,
    useGetAccountsListQuery,
    useCreateAccountMutation,
    useGetTransactionsListQuery,
    useCreateTransactionMutation,
} = APISecure
