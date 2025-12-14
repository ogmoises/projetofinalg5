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
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { api } from "@/trpc/react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

//As partes relacionadas a tabela são feitas com o template de Data-Table do shadcn disponível em https://ui.shadcn.com/docs/components/data-table 
//Passamos um parametro a mais que é a função edit que será usado pelo botão de edição
export default function TabelaDeQuestoes<TData, TValue>({
    columns,
    data,
    edit,  // Add the edit prop here
}: DataTableProps<TData, TValue> & { edit: (pergunta: TData) => void }) {
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

    const mutation = api.pergunta.delete.useMutation()

    return (

        <div className="flex flex-col w-screen px-20">
            {/* <div className="items-center py-4">
                <Input
                    placeholder="Filter linguagens..."
                    value={(table.getColumn("linguagem")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("linguagem")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div> */}
            <Separator />
            <div className="flex flex-col items-center pt-4">
                <Table >
                    <TableHeader>
                        {/* 
                        Popula os headers da tabela usando a função map na lista de colunas passadas 
                        Aqui acessa os headers, apenas o de dificuldade e perguntas foram modificados para permitir ordenação
                        */}
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
                        {/* Agora popula cada coluna com os valores obtidos dos objetos passados */}
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

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                {/* Botão editar passa o objeto pergunta daquela linha para a função edit que lida com o card de edição */}
                                                <DropdownMenuItem onClick={() => edit(row.original)}>
                                                    Editar
                                                </DropdownMenuItem>
                                                {/* O botão apagar chama a função mutate para deletar a pergunta com o id daquela pergunta */}
                                                <DropdownMenuItem onClick={() => mutation.mutate({ id: row.original.id })}>
                                                    Apagar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
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
        </div>
    )
}