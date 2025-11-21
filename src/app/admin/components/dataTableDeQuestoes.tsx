"use client"

import TabelaElemento from "./tabelaElemento";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
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

export type Pergunta = {
    pergunta: string
    opcao1: string
    opcao2: string
    opcao3: string
    opcao4: string
    opcao5: string
    correta: number
}

export const perguntas: Pergunta[] = [
    {
        pergunta: "Pergunta 1",
        opcao1: "Opção 1",
        opcao2: "Opção 2",
        opcao3: "Opção 3",
        opcao4: "Opção 4",
        opcao5: "Opção 5",
        correta: 1
    },
    {
        pergunta: "Pergunta 2",
        opcao1: "Opção 1",
        opcao2: "Opção 2",
        opcao3: "Opção 3",
        opcao4: "Opção 4",
        opcao5: "Opção 5",
        correta: 1
    },
    {
        pergunta: "Pergunta 3",
        opcao1: "Opção 1",
        opcao2: "Opção 2",
        opcao3: "Opção 3",
        opcao4: "Opção 4",
        opcao5: "Opção 5",
        correta: 1
    },
    {
        pergunta: "Pergunta 4",
        opcao1: "Opção 1",
        opcao2: "Opção 2",
        opcao3: "Opção 3",
        opcao4: "Opção 4",
        opcao5: "Opção 5",
        correta: 1
    },
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function TabelaDeQuestoes<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>

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

        </>
    )
}