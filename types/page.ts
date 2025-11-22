export type PageProps = {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
    params?: Promise<{ [key: string]: string | undefined }>;
};

export type PaginationProps = {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
};

export type PaginatedPayload<T> = {
    items: T[];
    pagination: PaginationProps;
};
