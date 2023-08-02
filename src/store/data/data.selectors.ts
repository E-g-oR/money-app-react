import {DataSlice} from "./data.slice.ts";

export const getAccountsList = (store: DataSlice) => store.accountsList
export const getAccountsById = (store: DataSlice) => store.accountsById
export const getDeptsList = (store: DataSlice) => store.deptsList
export const getSetAccount = (store: DataSlice) => store.setAccountById
export const getSetAccountsList = (store: DataSlice) => store.setAccountList
