"use client"

import ListaDeDificuldades from "./components/ListaDeDificuldades"
import SimpleNavbar from "./components/SimpleNavbar"


export default function linguagem() {


    return (
        <div className="flex flex-col h-screen">
            <SimpleNavbar />
            <ListaDeDificuldades />

        </div>
    )
}