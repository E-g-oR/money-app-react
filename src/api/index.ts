import ky from "ky";
import useAuthStore from "@store/auth/auth.slice.ts";
import useDataStore from "@store/data/data.slice.ts";
import {
    AccountDto,
    ChartDataDto,
    ChartFiltersDto,
    CreateAccountDto,
    CreateDepthDto,
    CreateOperationDto,
    DeptDto,
    OperationDto,
    PayDepthDto,
    Tokens
} from "@/types/API/data-contracts.ts";
import {Pageable} from "@/types/api.ts";
import {Operation} from "@/types/accounts.ts";
import {showSuccess} from "@components/notification/NotificationsContainer.tsx";

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

    public getAccountsList = async (): Promise<ReadonlyArray<AccountDto>> => {
        const accountsList = await this.clientSecure.get(this.endpoints.accountsList).json<ReadonlyArray<AccountDto>>()
        const setAccountList = useDataStore.getState().setAccountList
        setAccountList(accountsList)
        return accountsList
    }

    // === Account ===
    public getAccount = async (accountId: number): Promise<AccountDto> => {
        const account = await this.clientSecure.get(`accounts/${accountId}`).json<AccountDto>()
        const {setAccountById} = useDataStore.getState()
        setAccountById(account)
        return account
    }

    public createAccount = (json: CreateAccountDto): Promise<AccountDto> =>
        this.clientSecure.post("accounts/new", {json}).json()

    // --- ---

    /**
     * Create a new transaction
     * @param accountId
     */
    public getTransactionsList = async (accountId: number): Promise<Pageable<Operation> | undefined>  => {
        if (accountId) {
            const transactionsList = await this.clientSecure.get(`transactions/account/${accountId}`).json<Pageable<Operation>>()
            const {setTransactionsList} = useDataStore.getState()
            setTransactionsList(transactionsList.data)
            return transactionsList
        }
    }

    // === Transaction ===

    public createTransaction = async (json: CreateOperationDto, messageOnSuccess: string) => {
        const operations = await this.clientSecure.post("transactions", {json}).json<[OperationDto]>()
        const {addTransactions} = useDataStore.getState()
        addTransactions(operations)
        this.getAccount(json.accountId)
        showSuccess(messageOnSuccess)
        return operations
    }

    // === ===

    public getDepthList = async (): Promise<ReadonlyArray<DeptDto>> => {
        const deptsList = await this.clientSecure.get("depths").json<ReadonlyArray<DeptDto>>()
        const {setDeptsList} = useDataStore.getState()
        setDeptsList(deptsList)
        return deptsList
    }

    // === Depts ===
    public createDepth = (json: CreateDepthDto): Promise<DeptDto> =>
        this.clientSecure.post("depths", {json}).json()

    public payDepth = async (json: PayDepthDto, depthId: number, message: string): Promise<DeptDto> => {
        const updatedDept = await this.clientSecure.patch(`depths/pay/${depthId}`, {json}).json<DeptDto>()

        const {updateDeptInList} = useDataStore.getState()
        updateDeptInList(updatedDept)
        this.getAccountsList()
        showSuccess(message)
        return updatedDept
    }

    // === ===

    // TODO: save filters to the store
    public getChartFilters = async (accountId: number) => {
        const filters = await this.clientSecure.get(`charts/filters/${accountId}`).json<ChartFiltersDto>()
        const {setChartFiltersByAccountId} = useDataStore.getState()
        setChartFiltersByAccountId(accountId, filters)
        return filters
    }

    // TODO: save chart data to the store
    public getChartData = (accountId: number, params: { year: number, month: number, view: "month" | "year" }) =>
        this.clientSecure.get(`charts/${accountId}`, {searchParams: params}).json<ChartDataDto>()
}

const Api = new API()
export default Api
