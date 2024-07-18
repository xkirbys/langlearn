"use client"

import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AnkiCard = {
    date: string
    amount: number
}

export const columns: ColumnDef<AnkiCard>[] = [
    {
        accessorKey: "date",
        header: () => <div className={"text-left"}>Date</div>,
        cell: ({ row }) => {
            const date = row.getValue<string>("date");
            const formattedDate = new Date(date).toISOString().split("T")[0];
            return <div className={"text-left"}>{formattedDate}</div>;
        }
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
]
