import ky from "ky";
import useAuthStore from "@store/auth/auth.slice.ts";
import {Pageable, Tokens} from "@/types/api.ts";
import {Account, AccountInList, CreateAccount, Operation, OperationNew} from "@/types/accounts.ts";
import {Dept, DepthNew, PayDepthPayload} from "@/types/depths.ts";
import useDataStore from "@store/data/data.slice.ts";

const Client = ky.create({
    prefixUrl: "http://localhost:8000"
})

const refreshTokens = (): Promise<Tokens> => Client
    .get(
        "auth/refresh",
        {
            headers: [
                ["Authorization", `Bearer ${useAuthStore.getState().refresh_token}`],
            ]
        }
    )
    .json()

const ClientSecure = Client.extend({
    retry: {
        limit: 5,
        statusCodes: [401],
        methods: ["get", "post", "put", "delete"]
    },
    hooks: {
        beforeRequest: [
            request => {
                const token = useAuthStore.getState().access_token
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`)
                }
            }
        ],
        beforeRetry: [
            async ({request}) => {
                console.log("before retry")
                const tokens = await refreshTokens()
                useAuthStore.getState().setTokens(tokens)
                request.headers.set("Authorization", `Bearer ${tokens.access_token}`)
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

    public getAccountsList = async (): Promise<ReadonlyArray<AccountInList>> => {
        const accountsList = await this.clientSecure.get(this.endpoints.accountsList).json<ReadonlyArray<AccountInList>>()
        const setAccountList = useDataStore.getState().setAccountList
        setAccountList(accountsList)
        return accountsList
    }

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

    public getDepthList = async (): Promise<ReadonlyArray<Dept>> => {
        const deptsList = await this.clientSecure.get("depths").json<ReadonlyArray<Dept>>()
        console.log(deptsList)
        const {setDeptsList} = useDataStore.getState()
        setDeptsList(deptsList)
        return deptsList
    }

    // === Depts ===
    public createDepth = (json: DepthNew): Promise<Dept> =>
        this.clientSecure.post("depths", {json}).json()

    public payDepth = async ({depthId, ...json}: PayDepthPayload): Promise<Dept> => {
        const [updatedDept, updatedAccount] = await this.clientSecure.patch(`depths/pay/${depthId}`, {json}).json<[Dept, Account]>()

        const {updateDeptInList, updateAccount} = useDataStore.getState()

        updateDeptInList(updatedDept)
        updateAccount(updatedAccount)
        this.getAccountsList()
        return updatedDept
    }

    // === ===

    public getChartFilters = (accountId: number) =>
        this.clientSecure.get(`charts/filters/${accountId}`).json()

    public getChartData = (params: { year: number, month: number, view: "month" | "year" }) =>
        this.clientSecure.get("charts", {searchParams: params}).json()
}

const Api = new API()
export default Api
