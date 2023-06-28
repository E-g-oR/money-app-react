export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export interface AuthDto {
    email: string;
    password: string;
}

export interface RegisterDto extends AuthDto {
    firstName?: string;
    lastName?: string;
}

export interface PageableMeta {
    page: number;
    limit: number;
    pageCount: number;
    count: number;
}
// export interface PageableRequest {
//     page: number;
//     limit: number;
//     pageCount: number;
//     count: number;
// }

export interface Pageable<D> {
    data: ReadonlyArray<D>;
    meta: PageableMeta;
}
