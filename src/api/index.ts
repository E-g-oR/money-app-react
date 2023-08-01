import ky from "ky";
import useAuthStore from "@store/auth/auth-zustand.slice.ts";
import {Tokens} from "@types/api.ts";

const Client = ky.create({
    prefixUrl: "http://localhost:8000"
})

const ClientSecure = Client.extend({
    hooks: {
        beforeRequest: [
            request => {
                const token = useAuthStore.getState().refresh_token
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`)
                }
            }
        ]
    }
})

class API {
    private client = Client
    private clientSecure = ClientSecure

    private endpoints = {
        auth: {
            login: "auth/login"
        }
    }

    public login = (body: { password: string, email: string }): Promise<Tokens> => {
        return this.client
            .post(
                this.endpoints.auth.login,
                {json: body}
            )
            .json()
    }
}

const Api = new API()
export default Api
