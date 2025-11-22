"use client"

import { type ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Pergunta } from "./pergutasTypo"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CardEdicaoDePergunta from "./cardEdicaoDePergunta"


export const colunas: ColumnDef<Pergunta>[] = [
    {
        accessorKey: "linguagem",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    linguagem
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "dificuldade",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Dificuldade
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "pergunta",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Pergunta
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: "opcao1",
        header: "Opção 1",
    },
    {
        accessorKey: "opcao2",
        header: "Opção 2",
    },
    {
        accessorKey: "opcao3",
        header: "Opção 3",
    },
    {
        accessorKey: "opcao4",
        header: "Opção 4",
    },
    {
        accessorKey: "opcao5",
        header: "Opção 5",
    },
    {
        accessorKey: "correta",
        header: "Correta",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const pergunta = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem >
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Apagar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]