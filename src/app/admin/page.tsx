"use client"

import SimpleNavbar from "@/components/ui/SimpleNavbar"
import InputQuestoes from "./components/inputQuestoes"
import TabelaDeQuestoes from "./components/tabelaDeQuestoes"
import CardEdicaoDePergunta from "./components/cardEdicaoDePergunta"

export default function admin() {
    return (
        <>
            <SimpleNavbar />
            <main className="bg-branco h-screen">
                <InputQuestoes />
                <div className="p-2 flex justify-center">
                    <TabelaDeQuestoes />
                </div>
            </main>
        </>
    )
}