import {Translation} from "@utils/translation/index.ts";
import {formatDistanceToNow} from "date-fns";
import esLocale from "date-fns/locale/es"

const es: Translation = {
    formatDate: {
        dateRelative: (date) => formatDistanceToNow(date, {locale: esLocale, addSuffix: true})
    },
    actions: {
        login: "Iniciar sesión",
        logout: "Cerrar sesión",
        add: "Agregar",
        pay: "Pagar",
        close: "Cerrar",
        create: "Crear",
        submit: "Enviar",
        register: "Registrarse",
    },
    common: {
        loading: "Carga",
        login: "Login",
        name: "Nombre",
        value: "Valor",
        incomes: "Ingreso",
        title: "Título",
        password: "Contraseña",
        expenses: "Gastos",
        description: "Descripción",
        email: "E-mail",
    },
    accounts: {
        account: "Cuenta",
        yourAccounts: "Sus cuentas",
        noAccountsFallback: "Aún no tiene cuentas."
    },
    navigation: {
        depts: "Deudas",
        accounts: "Cuentas",
        profile: "Perfil",
        settings: "Ajustes",
    },
    transactions: {
        transaction: "Transacción",
        recentTransactions: "Transacciones recientes",
        createTransactionTitle: "Crear transacción",
        noTransactionsFallback: "Usted no tiene ninguna transacción en esta cuenta."
    },
    depts: {
        yourDepts: "Sus deudas",
        payFor: "Pagar por",
        needsToCloseDept: (n) => `Necesito más ${n} para cerrar la deuda.`,
        createDept: "Crear deuda",
        coveredValue: "Valor cubierto",
        noDepthsFallback: "No tienes ninguna deuda. ¡Felicidades!"
    }
}

export default es
