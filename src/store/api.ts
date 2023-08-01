import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {Pageable} from "@/types/api.ts";
import {RootState} from "@store/index.ts";
import {Dept, DepthNew, PayDepthPayload} from "@/types/depths.ts";
import {Account, AccountInList, CreateAccount, Operation, OperationNew} from "@/types/accounts.ts";

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
        getDepthsList: builder.query<ReadonlyArray<Dept>, undefined>({
            query: () => "depths",
            providesTags: ["depthsList"]
        }),
        createDepth: builder.mutation<Dept, DepthNew>({
            query: (body) => ({
                url: "depths",
                method: "POST",
                body
            }),
            invalidatesTags: ["depthsList"]
        }),
        payDepth: builder.mutation<Dept, PayDepthPayload>({
            query: ({depthId, ...body}) => ({
                url: `depths/pay/${depthId}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["depthsList"]
        }),
        getChartFilters: builder.query({
            query: (accountId: number)=> ({
                url: `charts/filters/${accountId}`
            })
        }),
        getChartData: builder.query({
            query: (params: {year: number, month: number, view: "month" | "year"})=> ({
                url: "charts",
                params
            })
        })
    })
})

export const {
    useGetAccountQuery,
    usePayDepthMutation,
    useGetChartDataQuery,
    useGetDepthsListQuery,
    useCreateDepthMutation,
    useGetAccountsListQuery,
    useGetChartFiltersQuery,
    useCreateAccountMutation,
    useGetTransactionsListQuery,
    useCreateTransactionMutation,
} = APISecure
