import ru from "./ru.ts"

export type BottomNavigationKey = "accounts" | "depths" | "settings" | "profile"

export interface Translation {
    formatDate: {
        dateRelative: (date: number) => string,
    },
    actions: {
        add: string,
        pay: string,
        close: string,
        login: string,
        logout: string,
        submit: string,
        create: string,
        register: string,
    },
    common: {
        loading: string,
        title: string,
        name: string,
        description: string,
        password: string,
        login: string,
        email: string,
        incomes: string,
        expenses: string,
        value: string,
    },
    accounts: {
        account: string,
        yourAccounts: string,
        noAccountsFallback: string,
    },
    navigation: Record<BottomNavigationKey, string>,
    transactions: {
        transaction: string,
        recentTransactions: string,
        createTransactionTitle: string,
        noTransactionsFallback: string,
    },
    depts: {
        yourDepts: string,
        createDept: string,
        payFor: string,
        needsToCloseDept: (n: number) => string,
        coveredValue: string,
        noDepthsFallback: string,
    }
}

export {ru}
