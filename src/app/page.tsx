"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a landing page
    router.push("/landingPage");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-branco">
      <div className="text-center">
        <div className="text-4xl font-bold text-roxo animate-pulse">
          CodeLingo
        </div>
        <p className="text-preto/70 mt-4">Carregando...</p>
      </div>
    </div>
  );
}