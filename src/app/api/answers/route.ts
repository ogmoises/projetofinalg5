// app/api/answers/route.ts - API para processar respostas dos usuários

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db"; // Conexão com o banco de dados (Prisma Client)

export async function POST(request: NextRequest) {
  try {
    // Lê o corpo da requisição que contém os dados da resposta
    const body = await request.json();
    
    // Extrai os campos do corpo da requisição
    const { questionId, selectedAlternative, userId } = body;

    // Valida se todos os campos obrigatórios foram enviados
    if (!questionId || selectedAlternative === undefined || !userId) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 } // Bad Request - requisição mal formada
      );
    }

    // Busca a pergunta no banco para obter a resposta correta e dificuldade
    const question = await db.perguntas.findUnique({
      where: { id: questionId }
    });

    // Se a pergunta não existir, retorna erro 404
    if (!question) {
      return NextResponse.json(
        { error: "Pergunta não encontrada" },
        { status: 404 } // Not Found - recurso não existe
      );
    }

    // Verifica se a resposta do usuário está correta
    const isCorrect = selectedAlternative === question.alt_correta;
    
    // Calcula pontos: dificuldade × 10 se acertou, 0 se errou
    const pointsEarned = isCorrect ? question.dificuldade * 10 : 0;

    // Verifica se o usuário já respondeu esta pergunta antes
    const existingAnswer = await db.respostasDoUsuario.findFirst({
      where: {
        usuario_id: userId,
        perguntas_id: questionId
      }
    });

    // Variável para armazenar a resposta salva (nova ou atualizada)
    let savedAnswer;
    
    if (existingAnswer) {
      // Usuário já respondeu antes - ATUALIZA a resposta existente
      savedAnswer = await db.respostasDoUsuario.update({
        where: { id: existingAnswer.id },
        data: {
          alt_selecionado: selectedAlternative, // Nova escolha
          acertou: isCorrect                    // Novo resultado
        }
      });
      
      // Lógica especial: Se antes estava ERRADO e agora ACERTOU, dá os pontos
      // Isso evita dar pontos múltiplos pela mesma pergunta
      if (!existingAnswer.acertou && isCorrect) {
        await db.usuario.update({
          where: { id: userId },
          data: {
            Pontuacao: {
              increment: pointsEarned // Soma pontos à pontuação atual
            }
          }
        });
      }
    } else {
      // Primeira vez que o usuário responde esta pergunta - CRIA novo registro
      savedAnswer = await db.respostasDoUsuario.create({
        data: {
          usuario_id: userId,           // ID do usuário
          perguntas_id: questionId,     // ID da pergunta
          alt_selecionado: selectedAlternative, // Alternativa escolhida (0-3)
          acertou: isCorrect            // Se acertou (true/false)
        }
      });

      // Se acertou na primeira tentativa, adiciona pontos
      if (isCorrect) {
        await db.usuario.update({
          where: { id: userId },
          data: {
            Pontuacao: {
              increment: pointsEarned
            }
          }
        });
      }
    }

    // Retorna o resultado para o frontend
    return NextResponse.json({
      success: true,                 // Operação concluída com sucesso
      isCorrect,                     // Se a resposta estava correta
      correctAlternative: question.alt_correta, // Índice da alternativa correta
      pointsEarned,                  // Pontos ganhos (0 ou dificuldade×10)
      answerId: savedAnswer.id       // ID do registro no histórico
    });

  } catch (error) {
    // Captura qualquer erro inesperado (banco offline, JSON inválido, etc.)
    console.error("Erro ao processar resposta:", error);
    
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 } // Internal Server Error - algo deu errado no servidor
    );
  }
}