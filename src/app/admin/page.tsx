"use client"

import SimpleNavbar from "@/components/ui/SimpleNavbar"
import InputQuestoes from "./components/inputQuestoes"
import CardEdicaoDePergunta from "./components/cardEdicaoDePergunta"
import { colunas } from "./components/colunaTabelaDeQuestoes"
import { perguntas } from "./ListaDePerguntasTeste"
import TabelaDeQuestoes from "./components/dataTableDeQuestoes"

export default function admin() {
    return (
        <>
            <SimpleNavbar />
            <main className="bg-branco h-full pb-20">
                <InputQuestoes />
                <div className="p-2 flex justify-center pt-10">
                    <TabelaDeQuestoes columns={colunas} data={perguntas}/>
                </div>
            </main>
        </>
    )
}