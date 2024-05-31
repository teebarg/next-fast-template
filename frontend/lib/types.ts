/* eslint-disable */

import { ReactNode } from "react";

type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    created_at: string;
    updated_at: string;
};

type Pagination = {
    page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
};

type Column = {
    name: string;
    uid: string | number;
    sortable?: boolean;
};

type TableProps = {
    columns: Column[];
    rows?: { [key: string]: any }[];
    pagination?: Pagination;
    statusOptions?: Column[];
    callbackFunction: (user: any, columnKey: string | number) => ReactNode;
};

export type { User, Pagination, TableProps, Column };
