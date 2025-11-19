"use client"

import Image from "next/image";

export default function TabelaElemento({pergunta, opcoes, correta} : {pergunta:string, opcoes:Array<string>, correta:number}) {
    return (
        <>
            <tr className="bg-amber-400 table-row text-center">
                <td className="w-1/2">{pergunta}</td>
                {opcoes.map((opcao_texto, index) => (
                    <td key={index}>{opcao_texto}</td> 
                ))}
                <td>{correta}</td>
                <td>
                    <button className="hover:bg-amber-600 p-2 rounded-full border-2">
                        <Image src="pencil-icon.svg"
                            alt="Imagem de um lapis"
                            width={20}
                            height={20}>
                        </Image>
                    </button>
                </td>
                <td>
                    <button className="hover:bg-amber-600 p-2 my-2 rounded-full border-2">
                        <Image src="trash-icon.svg"
                            alt="Imagem de uma lixeira"
                            width={20}
                            height={20}>
                        </Image>
                    </button>
                </td>
            </tr>
        </>
    )
}