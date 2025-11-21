"use client"

import { type ColumnDef } from "@tanstack/react-table"
import type { Pergunta } from "./dataTableDeQuestoes"
import Image from "next/image"

export const colunas: ColumnDef<Pergunta>[] = [
    {
        accessorKey: "pergunta",
        header: "Pergunta",
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
        accessorKey: "edit",
        header: "Editar",
        cell: ({ row }) => {
            return (
                <button className="hover:bg-gray-400 p-1 my-1 rounded-full border-2">
                    <Image src="pencil-icon.svg"
                        alt="Imagem de um lapis"
                        width={20}
                        height={20}>
                    </Image>
                </button>
            )

        }
    },
    {
        accessorKey: "apagar",
        header: "Apagar",
        cell: ({ row }) => {
            return (
                <button className="hover:bg-gray-400 p-1 my-1 rounded-full border-2">
                    <Image src="trash-icon.svg"
                        alt="Imagem de uma lixeira"
                        width={20}
                        height={20}>
                    </Image>
                </button>
            )
        }
    },
]