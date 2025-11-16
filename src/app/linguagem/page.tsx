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
            <SimpleNavbar />
            <TabelaDeLinguagens linguagens={linguagens} />

        </div>
    )
}