"use client"

import SimpleNavbar from "@/components/ui/SimpleNavbar"
import InputQuestoes from "./components/inputQuestoes"
import CardEdicaoDePergunta from "./components/cardEdicaoDePergunta"
import { colunas } from "./components/colunaTabelaDeQuestoes"
import TabelaDeQuestoes from "./components/dataTableDeQuestoes"
import { api } from "@/trpc/react"
import type { Pergunta } from "./components/pergutasTypo"

export default function admin() {

    const query = api.pergunta.list.useQuery();

    if (query.data) {
        const perguntas = query.data as Pergunta[];
    }

    return (
        <>
            <SimpleNavbar />
            <main className="bg-branco h-full pb-20">
                <InputQuestoes />
                <div className="p-2 flex justify-center pt-10">
                    {query.data && <TabelaDeQuestoes columns={colunas} data={query.data} />}
                </div>
            </main>
        </>
    )
}

//<TabelaDeQuestoes columns={colunas} data={perguntas} />