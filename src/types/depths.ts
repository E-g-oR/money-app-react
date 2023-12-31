export interface DepthNew {
    "value": number,
    "valueCovered": number,
    "title": string,
    "description"?: string,
    "deadline": string
}

export interface Dept extends DepthNew {
    "id": number,
    "created_at": string,
    "updated_at": string,
    "userId": number,
    // "deadline": string
}

export interface PayDepthPayload {
    depthId: number,
    accountId: number,
    value: number
}
