import { NextRequest, NextResponse } from "next/server";//Caixa de tudo que o Cliente envia e oque é enviado de volta
import { db } from "@/server/db";//Abre os arquivos do Banco de dados

export async function GET(request: NextRequest) {
  try {
    //pega os parametros da pergunta
    const searchParams = request.nextUrl.searchParams;
    const languageId = searchParams.get('languageId');
    const difficulty = searchParams.get('difficulty');
    //Valida os parametros
    if (!languageId || !difficulty) {
      return NextResponse.json(
        { error: "languageId e difficulty são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar uma pergunta aleatória com os filtros
    const perguntas = await db.perguntas.findMany({
      where: {
        linguagem_id: parseInt(languageId),
        dificuldade: parseInt(difficulty)
      },
      include: {
        linguagem: {
          select: { nome: true }
        }
      }
    });

    if (perguntas.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma pergunta encontrada" },
        { status: 404 }
      );
    }

    // Selecionar uma pergunta aleatória
    const randomIndex = Math.floor(Math.random() * perguntas.length);
    const pergunta = perguntas[randomIndex];

    if (!pergunta) {
      return NextResponse.json(
        { error: "Erro ao selecionar pergunta" },
        { status: 404 }
      );
    }

    // Converter alternativa de JSON para array se necessário
    const alternativas = Array.isArray(pergunta.alternativa) 
      ? pergunta.alternativa 
      : JSON.parse(String(pergunta.alternativa));

    return NextResponse.json({
      id: pergunta.id,
      pergunta: pergunta.pergunta,
      alternativa: alternativas,
      dificuldade: pergunta.dificuldade,
      linguagem: pergunta.linguagem
    });

  } catch (error) {
    console.error("Erro ao buscar pergunta:", error);
    
    // Fallback para não quebrar o frontend
    const mockQuestion = {
      id: 1,
      pergunta: "Como se faz um dicionário em Python?",
      alternativa: ["Usando {}", "Usando dict()", "Usando new Dict()", "Usando Map()"],
      dificuldade: 1,
      linguagem: { nome: "Python" }
    };
    
    return NextResponse.json(mockQuestion);
  }
}