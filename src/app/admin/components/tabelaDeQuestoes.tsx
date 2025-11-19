"use client"

import TabelaElemento from "./tabelaElemento";

export default function TabelaDeQuestoes() {
    return (
        <>
            <table className="w-19/20 shadow-xl h-fit border-2">
                <thead className="text-2xl text-center">
                    <tr>
                        <th className="py-1">Pergunta</th>
                        <th className="py-1">Opção 1</th>
                        <th className="py-1">Opção 2</th>
                        <th className="py-1">Opção 3</th>
                        <th className="py-1">Opção 4</th>
                        <th className="py-1">Opção 5</th>
                        <th className="py-1">Correta</th>
                        <th className="py-1">Edit</th>
                        <th className="py-1">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    <TabelaElemento pergunta="pergunta exemplo" opcoes={["Opção 1", "Opção 2", "Opção 3", "Opção 4", "Opção 5"]} correta={1}/>
                </tbody>
            </table>

        </>
    )
}