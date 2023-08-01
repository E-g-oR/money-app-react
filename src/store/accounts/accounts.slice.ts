import {AccountInList} from "@/types/accounts.ts";
import {createSlice} from "@reduxjs/toolkit";
// import {APISecure} from "@store/api.ts";

interface AccountsSlice {
    accounts: ReadonlyArray<AccountInList> | null
}

const initialState: AccountsSlice = {
    accounts: null
}

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {},
})
export const
    accountsActions = accountsSlice.actions,
    accountsReducer = accountsSlice.reducer
