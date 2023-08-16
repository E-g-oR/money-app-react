import es from "./es.ts"
import en from "./en.ts"
import ru from "./ru.ts"
import {Lang} from "@utils/constants.ts";

export type BottomNavigationKey = "accounts" | "depts" | "settings" | "profile"

export interface Translation {
    formatDate: {
        dateRelative: (date: Date | number) => string,
        intlFormat: (date: Date | number) => string
        chartDateInMonthView: (date: Date | number) => string
        chartDateInYearView: (date: Date | number) => string
        chartAxisInMonthView: (date: Date | number) => string
        chartAxisInYearView: (date: Date | number) => string
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
    },
    savings: {
        title: string,
        description: string,
        bestPractices: ReadonlyArray<string>,
    },
    notifications: {
        account: {
            created: string,
            updated: string,
            deleted: string,
        },
        dept: {
            created: string,
            updated: string,
            deleted: string,
            closed: string
        },
        transaction: {
            created: string
        },
        saving: {
            added: string,
            deleted: string
        }
    }
}

export const DICTIONARY: Readonly<Record<Lang, Translation>> = {es, en, ru}
