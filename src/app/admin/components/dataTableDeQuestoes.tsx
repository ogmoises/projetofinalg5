"use client"

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type SortingState,
    getSortedRowModel,
    type ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./paginacaoTabelaDeQuestoes"
import React from "react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function TabelaDeQuestoes<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="flex flex-col w-screen px-20">
            <div className="items-center py-4">
                <Input
                    placeholder="Filtrar linguagem..."
                    value={(table.getColumn("linguagem")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("linguagem")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <Separator />
            <div className="flex flex-col items-center pt-4">
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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
                <DataTablePagination table={table} />
            </div>

            {/* <table className="w-19/20 shadow-xl h-fit border-2">
                <thead className="text-2xl text-center">
                    <tr>
                        <th className="py-1">Pergunta</th>
                        <th className="py-1">Opção 1</th>
                        <th className="py-1">Opção 2</th>
                        <th className="py-1">Opção 3</th>
                        <th className="py-1">Opção 4</th>
                        <th className="py-1">Opção 5</th>
                        <th className="py-1">Correta</th>
                        <th className="py-1">Edit</th>
                        <th className="py-1">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    <TabelaElemento pergunta="pergunta exemplo" opcoes={["Opção 1", "Opção 2", "Opção 3", "Opção 4", "Opção 5"]} correta={1} />
                </tbody>
            </table>*/}

        </div>
    )
}