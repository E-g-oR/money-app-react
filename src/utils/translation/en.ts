import {Translation} from "@utils/translation/index.ts";
import {formatDistanceToNow} from "date-fns";
import enLocale from "date-fns/locale/en-IE"
import {intlFormat} from "date-fns/fp";

const en: Translation = {
    formatDate: {
        dateRelative: (date) => formatDistanceToNow(date, {locale: enLocale, addSuffix: true}),
        intlFormat: intlFormat({locale: "en"})({year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"})
    },
    actions: {
        login: "Log in",
        logout: "Log out",
        add: "Add",
        pay: "Pay",
        close: "Close",
        create: "Create",
        submit: "Submit",
        register: "Register",
    },
    common: {
        loading: "Loading",
        login: "Login",
        name: "Name",
        value: "Value",
        incomes: "Incomes",
        title: "Title",
        password: "Password",
        expenses: "Expenses",
        description: "Description",
        email: "Email",
    },
    accounts: {
        account: "Account",
        yourAccounts: "Your accounts",
        noAccountsFallback: "You don't have any accounts yet."
    },
    navigation: {
        depts: "Depts",
        accounts: "Accounts",
        profile: "Profile",
        settings: "Settings",
    },
    transactions: {
        transaction: "Transaction",
        recentTransactions: "Recent transaction",
        createTransactionTitle: "Create transaction",
        noTransactionsFallback: "You don't have any transactions on this account."
    },
    depts: {
        yourDepts: "Your depts",
        payFor: "Pay for",
        needsToCloseDept: (n) => `You need ${n} to close this dept.`,
        createDept: "Create dept",
        coveredValue: "Covered value",
        noDepthsFallback: "You don't have any debts. Congratulations!"
    }
}

export default en
