"use client";

import { TableProps } from "@/lib/types";
import NextTable from "@/components/core/NextTable";
import React from "react";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, Badge, Avatar, Tooltip } from "@nextui-org/react";
import { VerticalDotsIcon, CheckIcon, EyeIcon, EditIcon, DeleteIcon } from "@/components/icons";

export default function RowRender({ rows = [], pagination }: { rows: TableProps["rows"]; pagination: TableProps["pagination"] }) {
    const columns = [
        { name: "AVATAR", uid: "avatar" },
        { name: "NAME", uid: "name", sortable: true },
        { name: "EMAIL", uid: "email", sortable: true },
        { name: "STATUS", uid: "status", sortable: true },
        { name: "LAST UPDATED", uid: "update" },
        { name: "CREATED_AT", uid: "create" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const rowRender = (user: any, columnKey: string | number) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "avatar":
                return (
                    <Badge key={"avatar"} isOneChar content={<CheckIcon />} color={user.is_active ? "success" : "danger"} placement="bottom-right">
                        <Avatar
                            isBordered
                            color={user.is_active ? "success" : "danger"}
                            radius="md"
                            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
                        />
                    </Badge>
                );
            case "name":
                return (
                    <div className="flex items-center space-x-3">
                        <div className="font-bold">
                            {user?.firstname} {user?.lastname}
                        </div>
                    </div>
                );
            case "email":
                return <p>{user.email}</p>;
            case "status":
                return (
                    <Chip color={user.is_superuser ? "warning" : "secondary"} variant="bordered">
                        {user.is_superuser ? "Admin" : "Member"}
                    </Chip>
                );
            case "create":
                return <time dateTime={user.created_at}>{user.created_at}</time>;
            case "update":
                return <time dateTime={user.updated_at}>{user.updated_at}</time>;
            case "actions2":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return <NextTable callbackFunction={rowRender} columns={columns} rows={rows} pagination={pagination}></NextTable>;
}
