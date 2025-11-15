import BotaoLinguagem from "./BotaoLinguagem";
import Image from "next/image";

export default function TabelaDeLinguagens() {
    return (
        <main className="bg-branco flex flex-col items-center h-screen pb-20 overflow-scroll">
            <h1 className="py-20 text-4xl font-[sans-serif] font-semibold">
                Eu quero aprender...
            </h1>
            <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                <BotaoLinguagem nome="Python">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                        alt="Python logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="C">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
                        alt="C logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="C++">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
                        alt="C++ logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="JavaScript">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
                        alt="JavaScript logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="Java">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                        alt="Java logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="Go">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg"
                        alt="Go logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="PHP">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
                        alt="PHP logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="Ruby">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg"
                        alt="Ruby logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="SQL">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
                        alt="SQL logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>


                <BotaoLinguagem nome="Swift">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg"
                        alt="Swift logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="Bash">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg"
                        alt="Bash logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="Kotlin">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
                        alt="Kotlin logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="R">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-plain.svg"
                        alt="R logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>


                <BotaoLinguagem nome="Scala">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg"
                        alt="Scala logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="Rust">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
                        alt="Rust logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>

                <BotaoLinguagem nome="Lua">
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg"
                        alt="Lua logo"
                        width={70}
                        height={70}
                        className="">
                    </Image>
                </BotaoLinguagem>
            </ul>
        </main>
    )
}