import Image from "next/image";


export default function TabelaElemento() {
    return (
        <>
            <tr className="bg-amber-400 table-row text-center">
                <td className="w-1/2"> Pergunta</td>
                <td>Opção 1</td>
                <td>Opção 2</td>
                <td>Opção 3</td>
                <td>Opção 4</td>
                <td>Opção 5</td>
                <td>Correta</td>
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