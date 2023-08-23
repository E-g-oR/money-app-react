import {Translation} from "@utils/translation/index.ts";
import {format, formatDistanceToNow} from "date-fns";
import locale from "date-fns/locale/en-IE"
import {intlFormat} from "date-fns/fp";

const en: Translation = {
    formatDate: {
        dateRelative: (date) => formatDistanceToNow(date, {locale, addSuffix: true}),
        intlFormat: intlFormat({locale: "en"})({
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }),
        chartDateInYearView: date => format(date, "MMMM", {locale}),
        chartAxisInYearView: date => format(date, "MMM", {locale}),
        chartDateInMonthView: date => format(date, "d MMMM", {locale}),
        chartAxisInMonthView: date => format(date, "d", {locale}),
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
        tabs: {
            transactions: "Transactions",
            chart: "Chart"
        },
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
    },
    savings: {
        title: "Лучшие практики",
        description: `Основываясь на книге "Самый богатый человек в Вавилоне" мы предлагаем вам добавить к счету накопительный счет, на который, согласно лучшим рекомендациям из этой книги, будет зачисляться:`,
        bestPractices: ["10% от каждой транзакции доходов", "Разница округления в большую сторону от каждой операции расходов"],
    },
    notifications: {
        account: {
            created: "Account successfully created",
            updated: "Account successfully updated",
            deleted: "Account successfully deleted",
        },
        dept: {
            created: "Dept successfully created",
            updated: "Dept successfully updated",
            deleted: "Dept successfully deleted",
            closed: "Dept successfully closed"
        },
        transaction: {
            created: "Transaction successfully created"
        },
        saving: {
            added: "Накопительный счет успешно добавлен к текущему счету.",
            deleted: "Накопительный счет успешно удален у текущего счета."
        }
    }
}

export default en
