"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Pergunta } from "../pergutasTypo"
import { api } from "@/trpc/react"
import React from "react"


//linguagem é a unica coluna que modifica o valor da celula já que é preciso pegá-los no backend
//As outras podem usa-los como estão
export const colunas: ColumnDef<Pergunta>[] = [
    {
        accessorKey: "linguagem",
        /* header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === "asc")
                        console.log(`isSorted: ${column.getIsSorted()}\n`)
                        console.log(column.columnDef)
                    }}
                >
                    linguagem
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }, */
        cell: ({ row }) => {
            //Acessa o backend para pegar o nome da linguagem com aquele linguagem_id
            const linguagem = api.linguagens.findUniqueById.useQuery({ id: row.original.linguagem_id }).data?.nome!
            return <div>{linguagem}</div>
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