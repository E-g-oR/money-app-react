import {Operation} from "@/types/accounts.ts";
import {create} from "zustand";
import {flow, pipe} from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray"
import {AccountDto, ChartFiltersDto, DeptDto, OperationDto} from "@/types/API/data-contracts.ts";

export interface DataSlice {
    deptsList: ReadonlyArray<DeptDto>,
    activeAccountId: number | null,
    accountsById: Record<number, AccountDto>,
    accountsList: ReadonlyArray<AccountDto>,
    chartFiltersByAccountId: Record<number, ChartFiltersDto>,
    // TODO: add transactions by accountId
    transactionsList: ReadonlyArray<OperationDto>,
    setTransactionsList: (transactions: ReadonlyArray<Operation>) => void,
    setActiveAccountId: (accountId: string) => void,
    updateDeptInList: (dept: DeptDto) => void,
    updateAccount: (account: AccountDto) => void,
    setAccountById: (account: AccountDto) => void,
    setDeptsList: (deptsList: ReadonlyArray<DeptDto>) => void,
    setAccountList: (accountList: ReadonlyArray<AccountDto>) => void,
    addTransactions: (transactions: OperationDto[]) => void,
    addDept: (newDept: DeptDto) => void,
    setChartFiltersByAccountId: (accountId: number, chartFilters: ChartFiltersDto) => void
}

const updateAccountInList = (newAccountInList: AccountDto) => flow(
    A.filter<AccountDto>(a => a.id === newAccountInList.id),
    A.prepend(newAccountInList)
)
export const updateDeptInList = (updatedDept: DeptDto): (deptsList: ReadonlyArray<DeptDto>) => ReadonlyArray<DeptDto> => flow(
    A.filter<DeptDto>(a => a.id !== updatedDept.id),
    A.prepend(updatedDept),
)
const addTransactions = (incomingTransactions: ReadonlyArray<OperationDto>) => (transactions: ReadonlyArray<OperationDto>) => pipe(incomingTransactions, A.concat<OperationDto>(transactions))
const addDept = (newDept: DeptDto) => flow(A.prepend(newDept))
const useDataStore = create<DataSlice>((set, get) => ({
    accountsList: [],
    accountsById: {},
    deptsList: [],
    activeAccountId: null,
    transactionsList: [],
    chartFiltersByAccountId: {},
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
            deptsList: updateDeptInList(dept)(get().deptsList)
        }),
    addTransactions: (transactions) =>
        set({
            transactionsList: addTransactions(transactions)(get().transactionsList)
        }),
    addDept: (newDept) =>
        set({
            deptsList: addDept(newDept)(get().deptsList)
        }),
    setChartFiltersByAccountId: (accountId, chartFilters) => set({
        chartFiltersByAccountId: {
            ...get().chartFiltersByAccountId,
            [accountId]: chartFilters
        }
    })
}))

export default useDataStore
