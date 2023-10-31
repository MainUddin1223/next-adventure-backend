export interface IPaginationPayload {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string
}

export interface IPaginationValue {
    skip: number;
    take: number;
    orderBy: unknown;
    page: number
}