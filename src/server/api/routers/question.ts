import { z } from "zod";//Garante que o front envie dados de maneira correta
//Cria o roteador e cria as funções publicas e privadas
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const questionRouter = createTRPCRouter({
  //Busca a pergunta
  getQuestion: publicProcedure
    //Valida a pergunta enviada com o Zod
    .input(z.object({
      questionId: z.number().optional(),//Pergunta
      languageId: z.number(),//Id da linguagem
      difficulty: z.number()//dificuldade
    }))

    //Apartir dos filtros selecinados eles escolhem a 1° pergunta que atende a eles
    .query(async ({ ctx, input }) => {
      
      const question = await ctx.db.perguntas.findFirst({
        where: {
          linguagem_id: input.languageId,
          dificuldade: input.difficulty,
          ...(input.questionId && { id: input.questionId })
        },
        include: {
          linguagem: true
        }
      });
      //Tratamento de erro
      if (!question) {
        throw new Error("Pergunta não encontrada");
      }
      
      return {
        ...question,
        alt_correta: undefined
      };
    }),
      //Envia a resposta
      //Uso de protegido para que seja preciso autenticação
  submitAnswer: protectedProcedure
    .input(z.object({
      questionId: z.number(),
      selectedAlternative: z.number(),
      userId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      //Busca a pergunta e verifica se está correta
      const question = await ctx.db.perguntas.findUnique({
        where: { id: input.questionId }
      });

      if (!question) {
        throw new Error("Pergunta não encontrada");
      }

      const isCorrect = input.selectedAlternative === question.alt_correta;
      const pointsEarned = isCorrect ? question.dificuldade * 10 : 0;

     //Salva no usuário
      await ctx.db.respostasDoUsuario.create({
        data: {
          usuario_id: input.userId,
          perguntas_id: input.questionId,
          alt_selecionado: input.selectedAlternative,
          acertou: isCorrect
        }
      });
      //Atualiza pontuação do usuário
      if (isCorrect) {
       
        await ctx.db.usuario.update({
          where: { id: input.userId },
          data: {
            Pontuacao: {
              increment: pointsEarned
            }
          }
        });
      }
      //Retorna o Reultado
      return {
        isCorrect,
        pointsEarned,
        correctAlternative: question.alt_correta
      };
    }),
    //lista as perguntas e as filtra por linguagem e dificuldade
  getQuestionsByLanguage: publicProcedure
    .input(z.object({
      languageId: z.number(),
      difficulty: z.number().optional()
    }))
    .query(async ({ ctx, input }) => {
     
      return await ctx.db.perguntas.findMany({
        where: {
          linguagem_id: input.languageId,
          ...(input.difficulty && { dificuldade: input.difficulty })
        },
        select: {
          id: true,
          pergunta: true,
          dificuldade: true
        }
      });
    })
});