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
    callbackFunction: (user: any, columnKey: string | number) => ReactNode;
    onSearchChange: (value: string) => void;
    onAddNew?: () => void;
    query: string;
};

export type { User, Pagination, TableProps, Column };
