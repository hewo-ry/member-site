export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    properties: unknown;
}

export interface ProblemDetailsWithTimestamp extends ProblemDetails {
    timestamp: number;
}

export type ApiResponse<T> = { data: T; error: undefined } | { data: undefined; error: ProblemDetails };
