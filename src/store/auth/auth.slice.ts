import {create} from "zustand";
import {persist} from "zustand/middleware";

interface Tokens {
    access_token: string,
    refresh_token: string,
}

export interface AuthStore {
    access_token: string | null,
    refresh_token: string | null,
    setTokens: (tokens: Tokens) => void,
    setToken: (type: "access" | "refresh", token: string | null) => void
}

const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            access_token: null,
            refresh_token: null,
            setTokens: ({refresh_token, access_token}) => set({access_token, refresh_token}),
            setToken: (type, token) => set(type === "access" ? {access_token: token} : {refresh_token: token})
        }),
        {name: "auth-store"}
    )
)

export default useAuthStore
