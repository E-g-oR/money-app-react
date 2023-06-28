export enum OperationType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}


export interface OperationNew {
    accountId: number,
    type: OperationType,
    value: number,
    title: string,
    description?: string
}

export interface Operation extends OperationNew {
    userId: number,
    id: number,
    created_at: string,
    updated_at: string,
}


export interface AccountInList {
    id: number
    name: string
    updated_at: string
    value: number
    expenses: number
    income: number
}

export interface Account extends AccountInList {
    created_at: string
    description?: string
    updated_at: string
    userId: number
}

// export interface AccountWithOperations {
//     id: number,
//     created_at: string,
//     updated_at: string,
//     userId: number,
//     value: number,
//     name: string,
//     description?: string,
//     operations: ReadonlyArray<Operation>
// }

export interface CreateAccount {
    userId: number;
    value: number;
    name: string;
    description?: string;
}
