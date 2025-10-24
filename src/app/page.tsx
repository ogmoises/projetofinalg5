import { FaStar, FaHeart, FaMobileAlt, FaLaptop } from "react-icons/fa";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Codelingo - Aprenda a Programar",
  description: "Aprenda a programar de um jeito gamificado e divertido!",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start bg-branco relative overflow-hidden">
  
      <nav className="w-full bg-branco shadow-md z-10">
        <div className="container mx-auto flex h-16 items-center"> 
          <div className="flex items-center">
            <Image src="/logoNaybar.png" alt="Logo do Codelingo" width={100} height={100} className="py-0.5" />
            <h1 className="text-verde text-4xl font-jersey tracking-wide">CodeLingo</h1>
          </div>
        </div>
      </nav>

      
      <section className="container mx-auto flex-1 flex items-center py-12 lg:py-24 z-10">
        
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="flex justify-center">
          
            <Image 
              src="/codelingo.png" 
              alt="Mascote Codelingo a programar" 
              width={1920} 
              height={1920} 
              priority
            />
          </div>

          <div className="flex flex-col space-y-6 text-center lg:text-left">
            
            
            <h2 className="text-5xl lg:text-6xl font-bold text-preto leading-tight">
              Aprenda a programar
              <br />
              de um jeito <span className="text-roxo">gamificado</span>
              <br />
              e <span className="text-verde">divertido!</span>
            </h2>

           
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 justify-center lg:justify-start">
              <button className="bg-verde text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform">
                comece GRÁTIS
              </button>
              <button className="bg-roxo text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform">
                já tenho conta
              </button>
            </div>

            
            <div className="flex space-x-4 items-end justify-center lg:justify-start pt-6">
              
              <Image src="/simbolo pyhton.png" alt="Python" width={40} height={40}/>
              <Image src="/simbolo javascript.png" alt="JavaScript" width={70} height={70} className="-translate-y-6"/>
              <Image src="/simbolo C++.png" alt="C++" width={40} height={40} />
              <Image src="/simbolo C.png" alt="C#" width={50} height={50} className="-translate-y-6"/>
              </div>
          </div>
        </div>
      </section>

      
      
      
      <div className="absolute top-0 right-0 z-0">
        <Image 
          src="/4.png" 
          alt=""
          width={500} 
          height={500} 
        />
      </div>
      
      <div className="w-full">
        
        <Image 
          src="/5.png" 
          alt="" 
          width={1920} 
          height={1920} 
          className="w-full"
        />
        </div>

        <section className="w-full bg-branco py-16 lg:py-24 relative overflow-hidden">
        
        
        
        <div className="container mx-auto px-4 relative z-10">

          
          <div className="max-w-3xl"> 
            <p className="text-roxo font-semibold text-lg">O que fazemos</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-preto mt-2 leading-tight">
              Aprenda Programação.
              <br />
              Do Básico ao Avançado.
            </h2>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

           
            <div className="bg-branco border-2 border-roxo rounded-3xl p-6 flex flex-col items-center text-center shadow-lg h-full">
              
              <div className="flex space-x-3 h-10 items-center">
                
                <Image src="/simbolo pyhton.png" alt="Python" width={40} height={40} />
                <Image src="/simbolo C++.png" alt="C++" width={40} height={40} />
              </div>
             
              <h3 className="text-xl font-bold text-preto mt-4">Muitas Linguagens</h3>
              
              <p className="text-preto/80 mt-2 text-sm">
                *Python, JavaScript, C++, C, Java e mais. Descubra trilhas para Front-end, Back-end e Mobile.
              </p>
            </div>

           
            <div className="bg-branco border-2 border-roxo rounded-3xl p-6 flex flex-col items-center text-center shadow-lg h-full">
              
              <div className="flex space-x-2 h-10 items-center text-verde text-3xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaHeart />
              </div>
              
              <h3 className="text-xl font-bold text-preto mt-4">Aprendizado Gamificado</h3>
              
              <p className="text-preto/80 mt-2 text-sm">
                Ganhe XP, suba de nível, complete desafios diários e desbloqueie conquistas. Errar faz parte!
              </p>
            </div>

           
            <div className="bg-branco border-2 border-roxo rounded-3xl p-6 flex flex-col items-center text-center shadow-lg h-full">
              
              <div className="flex space-x-3 h-10 items-center text-verde text-3xl">
                <FaMobileAlt />
                <FaLaptop />
              </div>
              
              <h3 className="text-xl font-bold text-preto mt-4">Pratique Onde de Quiser</h3>
              
              <p className="text-preto/80 mt-2 text-sm">
                Aulas rápidas no carro, celular ou computador. Seu progresso é sincronizado.
              </p>
            </div>

          </div>
        </div>

        
        
       
       
      </section>
     

      <div className="absolute bottom-0 right-0 z-0 w-full">
        <Image
          src="/5.png"
          alt=""
          width={1920}
          height={400}
          className="w-full" 
        />
      </div>
    </main>
  );
}