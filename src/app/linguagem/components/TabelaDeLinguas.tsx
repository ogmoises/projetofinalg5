import BotaoLinguagem from "./BotaoLinguagem";
import Image from "next/image";

export default function TabelaDeLinguagens({ linguagens }: { linguagens: Array<string> }) {
    return (
        <main className="bg-branco flex flex-col items-center h-screen pb-20 overflow-scroll">
            <h1 className="py-20 text-4xl font-[sans-serif] font-semibold">
                Eu quero aprender...
            </h1>
            <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {linguagens.map((nome, index) =>
                    <BotaoLinguagem nome={nome} posicao={index}/>)}
            </ul>
        </main>
    )
}