import Image from "next/image";

export default function SimpleNavbar() {
    return (
        <header className="flex justify-center py-0.5 bg-branco">
            <Image
                src="/logoNaybar.png"
                alt="Logo do Codelingo"
                width={80}
                height={80}
                className="py-0.5 -ml-20 lg:-ml-12"
            />
            <h1 className="text-verde text-5xl font-jersey tracking-wide -ml-4">
                CodeLingo
            </h1>
        </header>
    )
}