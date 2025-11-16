import BotaoDificuldade from "./BotaoDificuldade";

export default function ListaDeDificuldades() {

    const textoDificuldades = [
        "Nunca programei.",
        "Apenas o que vi em vídeos e aulas.",
        "Consigo fazer scripts simples.",
        "Apenas o que vi em vídeos e aulas.",
        "Consigo fazer aplicativos e programas mais complexos.",
    ];

    return (
        <div className="bg-branco h-screen flex flex-col ">
            <h1 className="text-center text-3xl py-10 font-[sans-serif] font-semibold">
                O quão familiar você é com programação?
            </h1>

            <ul className="grid gap-5 place-items-center">

                {textoDificuldades.map((texto, index) =>
                    <BotaoDificuldade texto={texto} key={index} id={index} />)}
            </ul>
        </div>
    )
}