import Image from "next/image";

export default function SimpleNavbar() {
    return (
        <header className="flex justify-center py-5 max-w-screen bg-branco border-b-3 border-gray-200">
            <Image
                src="/logoNaybar.png"
                alt="Logo do Codelingo"
                width={80}
                height={80}
                className="py-0.5"
            />
            <h1 className="text-verde text-5xl font-jersey tracking-wide4">
                CodeLingo
            </h1>
        </header>
    )
}

