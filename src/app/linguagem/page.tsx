"use client"

import SimpleNavbar from "./components/SimpleNavbar"
import TabelaDeLinguagens from "./components/TabelaDeLinguas"

export default function linguagem() {

    const linguagens = ["Python",
        "C",
        "C++",
        "JavaScript",
        "Java",
        "Go",
        "PHP",
        "Ruby",
        "SQL",
        "Swift",
        "Bash",
        "Kotlin",
        "R",
        "Scala",
        "Rust",
        "Lua"
    ];

    return (
        <div className="flex flex-col h-screen">
            {/* https://ui.shadcn.com/docs/components/pagination# usar paginação para ir ao proximo item */}
            <SimpleNavbar />
            <TabelaDeLinguagens linguagens={linguagens}/>

        </div>
    )
}