export type ApiResponse<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
    success?: boolean;
    message?: string;
    payload?: T;
    status?: string | number;
    timestamp?: string;
};

export type ErrorResponse = {
    status: number;
    message?: unknown;
};
