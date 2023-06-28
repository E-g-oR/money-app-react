export interface DepthNew {
    "value": number,
    "valueCovered": number,
    "title": string,
    "description"?: string,
    "deadline": string
}

export interface Depth extends DepthNew {
    "id": number,
    "created_at": string,
    "updated_at": string,
    "userId": number,
    // "deadline": string
}
