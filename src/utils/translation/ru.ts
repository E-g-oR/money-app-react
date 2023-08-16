import {Translation} from "@utils/translation/index.ts";
import {format, formatDistanceToNow,} from "date-fns";
import locale from "date-fns/locale/ru"
import {intlFormat} from "date-fns/fp";

const ru: Translation = {
    formatDate: {
        dateRelative: (date) => formatDistanceToNow(date, {locale, addSuffix: true}),
        intlFormat: intlFormat({locale: "ru"})({
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
        login: "Войти",
        logout: "Выйти",
        add: "Добавить",
        pay: "Заплатить",
        close: "Закрыть",
        create: "Создать",
        submit: "Подтвердить",
        register: "Зарегестрироваться",
    },
    common: {
        loading: "Загрузка",
        login: "Логин",
        name: "Название",
        value: "Значение",
        incomes: "Доходы",
        title: "Заголовок",
        password: "Пароль",
        expenses: "Расходы",
        description: "Описание",
        email: "Адрес электронной почты",
    },
    accounts: {
        account: "Аккаунт",
        yourAccounts: "Ваши аккаунты",
        noAccountsFallback: "У вас пока нет никаких счетов."
    },
    navigation: {
        depts: "Долги",
        accounts: "Счета",
        profile: "Профиль",
        settings: "Настройки",
    },
    transactions: {
        transaction: "Транзакция",
        recentTransactions: "Недавние транзакции",
        createTransactionTitle: "Создать транзакцию",
        noTransactionsFallback: "У вас нет никаких транзакций по этому аккаунту."
    },
    depts: {
        yourDepts: "Ваши долги",
        payFor: "Заплатить по",
        needsToCloseDept: (n) => `Нужно еще ${n} чтобы закрыть долг.`,
        createDept: "Создать долг",
        coveredValue: "Покрытое значение",
        noDepthsFallback: "У тебя нет никаких долгов. Поздравляем!"
    },
    savings: {
        title: "Лучшие практики",
        description: `Основываясь на книге "Самый богатый человек в Вавилоне" мы предлагаем вам добавить к счету накопительный счет, на который, согласно лучшим рекомендациям из этой книги, будет зачисляться:`,
        bestPractices: ["10% от каждой транзакции доходов", "Разница округления в большую сторону от каждой операции расходов"],
    },
    notifications: {
        account: {
            created: "Счет успешно создан.",
            updated: "Счет успешно обновлен.",
            deleted: "Счет успешно удален.",
        },
        dept: {
            created: "Долг создан.",
            updated: "Долг обновлен.",
            deleted: "Долг удален.",
            closed: "Долг успешно закрыт."
        },
        transaction: {
            created: "Транзакция создана."
        },
        saving: {
            added: "Накопительный счет успешно добавлен к текущему счету.",
            deleted: "Накопительный счет успешно удален у текущего счета."
        }
    }
}

export default ru
