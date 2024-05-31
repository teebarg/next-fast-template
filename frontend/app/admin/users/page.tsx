import { GET } from "@/lib/http";
import { redirect } from "next/navigation";
import React from "react";
import RowRender from "./Data";

export const metadata = {
    title: "Users | Starter Template",
    description: "Shopit admin starter template built with Tailwind CSS and Next.js.",
};

async function getData(page: string = "1", per_page: string = "10") {
    const { ok, status, data } = await GET(`/users/?page=${page}&per_page=${per_page}`, "users");

    if ([401, 403].includes(status)) {
        redirect("/logout");
    }

    if (!ok) {
        throw new Error("Failed to fetch data");
    }

    return data;
}

export default async function Users({ searchParams }: { searchParams: { page: string; per_page: string } }) {
    const { users, ...pag } = await getData(searchParams.page, searchParams.per_page);

    if (users?.length === 0) {
        return <div className="px-6 py-8 rounded-md">No Users!</div>;
    }

    return (
        <div className="py-2">
            <div>
                <h2 className="text-base font-semibold font-display my-4">Users</h2>
                {users.length > 0 && <RowRender rows={users} pagination={pag}></RowRender>}
            </div>
        </div>
    );
}
