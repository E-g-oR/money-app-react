import ky from "ky";
import useAuthStore from "@store/auth/auth-zustand.slice.ts";
import {Pageable, Tokens} from "@types/api.ts";
import {Account, AccountInList, CreateAccount, Operation, OperationNew} from "@types/accounts.ts";
import {Dept, DepthNew, PayDepthPayload} from "@types/depths.ts";

const Client = ky.create({
    prefixUrl: "http://localhost:8000"
})

const ClientSecure = Client.extend({
    hooks: {
        beforeRequest: [
            request => {
                const token = useAuthStore.getState().access_token
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
        },
        accountsList: "accounts"
    }

    public login = (body: { password: string, email: string }): Promise<Tokens> => {
        return this.client
            .post(
                this.endpoints.auth.login,
                {json: body}
            )
            .json()
    }

    public getAccountsList = (): Promise<ReadonlyArray<AccountInList>> =>
        this.clientSecure.get(this.endpoints.accountsList).json()

    // === Account ===
    public getAccount = (accountId: number): Promise<Account> =>
        this.clientSecure.get(`accounts/${accountId}`).json()

    public createAccount = (json: CreateAccount): Promise<Account> =>
        this.clientSecure.post("accounts/new", {json}).json()

    // --- ---

    /**
     * Create a new transaction
     * @param accountId
     */
    public getTransactionsList = (accountId: number): Promise<Pageable<Operation>> =>
        this.clientSecure.get(`transactions/account/${accountId}`).json()

    // === Transaction ===

    public createTransaction = (json: OperationNew) =>
        this.clientSecure.post("transactions", {json}).json()

    // === ===

    public getDepthList = (): Promise<ReadonlyArray<Dept>> =>
        this.clientSecure.get("depths").json()

    // === Depts ===
    public createDepth = (json: DepthNew): Promise<Dept> =>
        this.clientSecure.post("depths", {json}).json()

    public payDepth = ({depthId, ...json}: PayDepthPayload): Promise<Dept> =>
        this.clientSecure.patch(`depths/pay/${depthId}`, {json}).json()

    // === ===

    public getChartFilters = (accountId: number) =>
        this.clientSecure.get(`charts/filters/${accountId}`).json()

    public getChartData = (params: { year: number, month: number, view: "month" | "year" }) =>
        this.clientSecure.get("charts", {searchParams: params}).json()
}

const Api = new API()
export default Api
