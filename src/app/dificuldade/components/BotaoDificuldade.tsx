import { number } from "zod";
import Image from "next/image";

export default function BotaoDificuldade({ texto, id }: { texto: string, id: number }) {
    return (
        <button className="bg-white border-gray-200 border-2 w-3/7 rounded-xl py-1 flex hover:bg-gray-300 cursor-pointer items-center px-3">
            <Image src={"/level " + id + ".svg"}
                alt={"barra nível " + id}
                width={70}
                height={70}
                className="">
            </Image>
            <p className="text-2xl w-full text-left px-8 inline-block align-middle">
                {texto}
            </p>
        </button>
    )
}