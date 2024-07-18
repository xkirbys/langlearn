import React, { useEffect, useRef, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const [columnWidths, setColumnWidths] = useState<number[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        if (tableRef.current) {
            const widths: number[] = [];
            const rows = tableRef.current.querySelectorAll('tr');
            rows.forEach((row) => {
                row.querySelectorAll('th, td').forEach((cell, index) => {
                    const cellWidth = cell.scrollWidth;
                    widths[index] = Math.max(widths[index] ?? 0, cellWidth);
                });
            });
            setColumnWidths(prevWidths =>
                widths.map((width, index) => Math.max(width, prevWidths[index] ?? 0))
            );
        }
    }, [data]);

    const pageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();


    return (
        <div>
            <div className="rounded-md border">
                <Table ref={tableRef}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    <TableHead
                                        key={header.id}
                                        style={{ width: columnWidths[index] }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() ? "selected" : undefined}
                                >
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell key={cell.id} style={{ width: columnWidths[index] }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between py-4">
                <div className={"flex-1 text-sm text-muted-foreground"}>
                    Page {pageIndex + 1} of {pageCount} ({data.length} results)
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                    <Select onValueChange = {e => table.setPageIndex(Number(e))}>
                        <SelectTrigger className={"w-[180px]"}>
                            <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: pageCount }, (_, i) => (
                                <SelectItem key={i} value={String(i)}>
                                    {i + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

            </div>
        </div>
    );
}
