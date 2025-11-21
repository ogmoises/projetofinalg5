"use client"

import SimpleNavbar from "@/components/ui/SimpleNavbar"
import InputQuestoes from "./components/inputQuestoes"
import CardEdicaoDePergunta from "./components/cardEdicaoDePergunta"
import TabelaDeQuestoes, { perguntas } from "./components/dataTableDeQuestoes"
import { colunas } from "./components/colunaTabelaDeQuestoes"

export default function admin() {
    return (
        <>
            <SimpleNavbar />
            <main className="bg-branco h-screen">
                <InputQuestoes />
                <div className="p-2 flex justify-center">
                    <TabelaDeQuestoes columns={colunas} data={perguntas}/>
                </div>
            </main>
        </>
    )
}