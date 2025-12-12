"use client"

import ListaDeDificuldades from "./components/ListaDeDificuldades"
import SimpleNavbar from "../../components/ui/SimpleNavbar"


export default function dificuldade() {


    return (
        <div className="flex flex-col h-screen">
            <SimpleNavbar />
            <ListaDeDificuldades />

        </div>
    )
}