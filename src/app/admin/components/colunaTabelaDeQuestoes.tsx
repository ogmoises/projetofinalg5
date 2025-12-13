"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Pergunta } from "../pergutasTypo"
import { api } from "@/trpc/react"
import React, { createContext, useContext, useState } from "react"
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
        cell: ({ row }) => {
            const linguagem = api.linguagens.findUniqueById.useQuery({ id: row.original.linguagem_id }).data?.nome!
            return <>{linguagem}</>

        }
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
        accessorKey: "alternativa1",
        header: "Alt 1",
    },
    {
        accessorKey: "alternativa2",
        header: "Alt 2",
    },
    {
        accessorKey: "alternativa3",
        header: "Alt 3",
    },
    {
        accessorKey: "alternativa4",
        header: "Alt 4",
    },
    {
        accessorKey: "alt_correta",
        header: "Correta",
    },
]