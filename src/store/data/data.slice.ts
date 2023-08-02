import {Account, AccountInList} from "@/types/accounts.ts";
import {create} from "zustand";
import {flow} from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray"
import {Dept} from "@/types/depths.ts";

export interface DataSlice {
    accountsList: ReadonlyArray<AccountInList>,
    accountsById: Record<number, Account>,
    setAccountById: (account: Account) => void,
    setAccountList: (accountList: ReadonlyArray<AccountInList>) => void,
    updateAccount: (account: Account) => void,
    deptsList: ReadonlyArray<Dept>,
    setDeptsList: (deptsList: ReadonlyArray<Dept>) => void,
    updateDeptInList: (dept: Dept) => void,
}

const updateAccountInList = (newAccountInList: AccountInList) => flow(
    A.filter<AccountInList>(a => a.id === newAccountInList.id),
    A.prepend(newAccountInList)
)
export const updateDeptInList_ = (updatedDept: Dept): (deptsList: ReadonlyArray<Dept>) => ReadonlyArray<Dept> => flow(
    (depts) => {
        console.log("depts before filter", depts)
        return depts
    },
    A.filter<Dept>(a => a.id !== updatedDept.id),
    (depts) => {
        console.log("depts after filter", depts)
        return depts
    },
    A.prepend(updatedDept),
    (depts)=>{
        console.log("depts after prepend", depts)
        return depts
    }
)

const useDataStore = create<DataSlice>((set, get) => ({
    accountsList: [],
    accountsById: {},
    deptsList: [],
    setAccountById: (account: Account) => set({accountsById: {...get().accountsById, [account.id]: account}}),
    setAccountList: (accountList) => set({accountsList: accountList}),
    updateAccount: ({id, income, expenses, name, value, updated_at}) => set({
        accountsList: updateAccountInList({
            name,
            value,
            expenses,
            updated_at,
            income,
            id
        })(get().accountsList)
    }),
    setDeptsList: (deptsList) => set({deptsList}),
    updateDeptInList: (dept) => set({deptsList: updateDeptInList_(dept)(get().deptsList)})
}))

export default useDataStore
