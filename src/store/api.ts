import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {Account, AccountInList, Operation} from "@/types/accounts.ts";
import {RootState} from "@store/index.ts";
import {Depth} from "@/types/depths.ts";
import {Pageable} from "@types/api.ts";


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
        }),
        getAccount: builder.query<Account, number>({
            query: (accountId) => `accounts/${accountId}`,
        }),
        getTransactionsList: builder.query<Pageable<Operation>, number>({
            query: (accountId) => `transactions/account/${accountId}`,
        }),
        getDepthsList: builder.query<ReadonlyArray<Depth>, undefined>({
            query: () => "depths",
        })
    })
})

export const {
    useGetAccountsListQuery,
    useGetAccountQuery,
    useGetTransactionsListQuery,
    useGetDepthsListQuery
} = APISecure
