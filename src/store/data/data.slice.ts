import {Operation} from "@/types/accounts.ts";
import {create} from "zustand";
import {flow} from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray"
import {AccountDto, DeptDto} from "@/types/API/data-contracts.ts";

export interface DataSlice {
    deptsList: ReadonlyArray<DeptDto>,
    activeAccountId: number | null,
    accountsById: Record<number, AccountDto>,
    accountsList: ReadonlyArray<AccountDto>,
    // TODO: add transactions by accountId
    transactionsList: ReadonlyArray<Operation>,
    setTransactionsList: (transactions: ReadonlyArray<Operation>) => void,
    setActiveAccountId: (accountId: string) => void,
    updateDeptInList: (dept: DeptDto) => void,
    updateAccount: (account: AccountDto) => void,
    setAccountById: (account: AccountDto) => void,
    setDeptsList: (deptsList: ReadonlyArray<DeptDto>) => void,
    setAccountList: (accountList: ReadonlyArray<AccountDto>) => void,
    addTransaction: (transactions: Operation) => void,
}

const updateAccountInList = (newAccountInList: AccountDto) => flow(
    A.filter<AccountDto>(a => a.id === newAccountInList.id),
    A.prepend(newAccountInList)
)
export const updateDeptInList_ = (updatedDept: DeptDto): (deptsList: ReadonlyArray<DeptDto>) => ReadonlyArray<DeptDto> => flow(
    A.filter<DeptDto>(a => a.id !== updatedDept.id),
    A.prepend(updatedDept),
)
const addTransaction = (transaction: Operation) => flow(A.prepend(transaction))

const useDataStore = create<DataSlice>((set, get) => ({
    accountsList: [],
    accountsById: {},
    deptsList: [],
    activeAccountId: null,
    transactionsList: [],
    setTransactionsList: (transactionsList) => set({transactionsList}),
    setActiveAccountId: (accountId) => set({activeAccountId: parseInt(accountId)}),
    setAccountById: (account) => set({accountsById: {...get().accountsById, [account.id]: account}}),
    setAccountList: (accountList) => set({accountsList: accountList}),
    updateAccount: ({id, income, expenses, name, value, description}) => set({
        accountsList: updateAccountInList({
            name,
            value,
            expenses,
            income,
            description,
            id
        })(get().accountsList)
    }),
    setDeptsList: (deptsList) => set({deptsList}),
    updateDeptInList: (dept) =>
        set({
            deptsList: updateDeptInList_(dept)(get().deptsList)
        }),
    addTransaction: (transaction) =>
        set({
            transactionsList: addTransaction(transaction)(get().transactionsList)
        }),
}))

export default useDataStore
