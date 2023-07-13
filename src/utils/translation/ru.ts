import {defaultIntlConf, Translation} from "@utils/translation/index.ts";
import {formatDistanceToNow,} from "date-fns";
import ruLocale from "date-fns/locale/ru"
import {intlFormat} from "date-fns/fp";

const ru: Translation = {
    formatDate: {
        dateRelative: (date) => formatDistanceToNow(date, {locale: ruLocale, addSuffix: true}),
        intlFormat: intlFormat({locale: "ru"})({year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"})
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
    }
}

export default ru
