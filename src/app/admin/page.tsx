"use client"

import SimpleNavbar from "@/components/ui/SimpleNavbar"
import InputQuestoes from "./components/inputQuestoes"
import { colunas } from "./components/colunaTabelaDeQuestoes"
import TabelaDeQuestoes from "./components/dataTableDeQuestoes"
import { api } from "@/trpc/react"
import CardEdicaoDePergunta from "./components/cardEdicaoDePergunta"
import { useState } from "react"
import type { Pergunta } from "./pergutasTypo"

export default function admin() {

    const query = api.pergunta.list.useQuery();

    const [isCardVisible, setVisibility] = useState(false)
    const [pergunta, setPergunta] = useState({})

    return (
        <>
            <SimpleNavbar />
            <main className="bg-branco h-full pb-20">
                <InputQuestoes />
                <div className="p-2 flex justify-center pt-10">
                    {query.data && <TabelaDeQuestoes columns={colunas} data={query.data} edit={(pergunta: Pergunta) => {
                        setPergunta(pergunta)
                        setVisibility(true)
                    }} />}
                    {isCardVisible && <CardEdicaoDePergunta pergunta={pergunta} isVisible={isCardVisible} onCancel={() => setVisibility(false)} />}
                </div>
            </main>
        </>
    )
}
//