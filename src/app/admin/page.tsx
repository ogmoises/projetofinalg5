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

    //Pega a lista de perguntas do backend
    const query = api.pergunta.list.useQuery();

    //Cria um useState para gerenciar a visibilidade do card de edição de perguntas e outro para gerenciar a pergunta sendo editada
    const [isCardVisible, setVisibility] = useState(false)
    const [pergunta, setPergunta] = useState({})

    return (
        <>
            <SimpleNavbar />
            <main className="bg-branco h-full pb-20">
                <InputQuestoes />
                <div className="p-2 flex justify-center pt-10">
                    {/* 
                    A lista retornada pelo backend nunca será vazia mas a checagem faz com que o typo de query.data seja Pergunta[] e não (Pergunta[] ou undefined).
                    Depois passamos as colunas da tabela, a lista de perguntas e a função edit que será passada para os botões de edição dentro da tabela
                    */}
                    {query.data && <TabelaDeQuestoes columns={colunas} data={query.data} edit={(pergunta: Pergunta) => {
                        setPergunta(pergunta)
                        setVisibility(true)
                    }} />}
                    {/* 
                    Checagem inicial de visibilidade para não tentar criar o card quando a pergunta não foi passada pela função edit acima 
                    Passa uma função para on cancel que será chamada quando o botão de cancelar é clicado e modifica a visibilidade do card
                    */}
                    {isCardVisible && <CardEdicaoDePergunta pergunta={pergunta} isVisible={isCardVisible} onCancel={() => setVisibility(false)} />}
                </div>
            </main>
        </>
    )
}
