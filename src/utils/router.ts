type BuilderFnc = (a: string) => string

interface Route {
    path: string,
    relative: string,
    builder?: BuilderFnc
}

type Router = {
    auth: {
        index: Route,
        login: Route,
        register: Route
    },
    main: Route,
    accounts: {
        index: Route,
        account: Required<Route>
    },
    depths: Route
    profile: Route,
    settings: Route
}

const auth = "auth"
const login = "login"
const register = "register"
const accounts = "accounts"
const profile = "profile"
const depths = "depths"
const settings = "settings"

const paramAccountId = ":accountId"
const createUrl = (...args: string[]): string => "/" + args.join("/")
const createRelativePath = (...args: string[]): string => args.join("/")

export const ROUTES: Router = {
    auth: {
        index: {
            path: createUrl(auth),
            relative: auth,
        },
        login: {
            path: createUrl(auth, login),
            relative: login,
        },
        register: {
            path: createUrl(auth, register),
            relative: register,
        }
    },
    main: {
        path: createUrl(),
        relative: createUrl()
    },
    accounts: {
        index: {
            path: createUrl(accounts),
            relative: accounts
        },
        account: {
            path: createUrl(accounts, paramAccountId),
            relative: createRelativePath(accounts, paramAccountId),
            builder: (accountId: string) => createUrl(accounts, accountId)
        }
    },
    depths: {
        path: createUrl(depths),
        relative: depths,
    },
    profile: {
        path: createUrl(profile),
        relative: profile,
    },
    settings: {
        path: createUrl(settings),
        relative: createRelativePath(settings)
    }
}
