import Image from "next/image";

export default function BotaoLinguagem({ nome}: { nome: string }) {
    return (
        <button className="bg-white border-gray-200 border-2 h-50 w-55  m-2.5 rounded-xl shadow- hover:bg-gray-300 cursor-pointer">
            <div className="flex flex-col items-center" >
                <Image src={"/" + nome + ".svg"}
                    alt={nome + " logo"}
                    width={70}
                    height={70}
                    className="">
                </Image>

                <h2 className="text-2xl m-5">{nome}</h2>
            </div>
        </button>
    )
}