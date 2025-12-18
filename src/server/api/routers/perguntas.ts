import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { pergunta_creation_schema, pergunta_schema, type Pergunta } from "@/app/admin/pergutasTypo";
import type { Prisma } from "@prisma/client";

export const perguntasRouter = createTRPCRouter({
    // ===== SUAS ROTAS ORIGINAIS =====
    
    create: publicProcedure
        .input(pergunta_creation_schema)
        .mutation(async ({ input, ctx }) => {
            const { pergunta, alternativa1, alternativa2, alternativa3, alternativa4, alt_correta, linguagem, dificuldade } = input;
            let linguagem_id = await ctx.db.linguagem.findUnique({
                where: { nome: linguagem }
            })
            if (!linguagem_id) {
                linguagem_id = await ctx.db.linguagem.create({
                    data: { nome: linguagem }
                })
            }
            if (!linguagem_id)
                throw new TRPCError({ message: "Erro ao criar linguagem", code: "INTERNAL_SERVER_ERROR" })
            const pergunta_criada = await ctx.db.perguntas.create({
                data: {
                    pergunta: pergunta,
                    alternativa: [alternativa1, alternativa2, alternativa3, alternativa4],
                    alt_correta: alt_correta,
                    linguagem_id: linguagem_id.id,
                    dificuldade: dificuldade,
                }
            })
            if (!pergunta_criada)
                throw new TRPCError({ message: "Erro ao criar pergunta", code: "INTERNAL_SERVER_ERROR" })
            const pergunta_formatada: Pergunta = {
                id: pergunta_criada.id,
                pergunta: pergunta_criada.pergunta,
                alternativa1: alternativa1,
                alternativa2: alternativa2,
                alternativa3: alternativa3,
                alternativa4: alternativa4,
                alt_correta: alt_correta,
                linguagem_id: linguagem_id.id,
                dificuldade: dificuldade,
            }
            return pergunta_formatada as Pergunta
        }),

    findUniqueById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            const pergunta = await ctx.db.perguntas.findUnique({
                where: { id: input.id }
            })
            if (!pergunta)
                throw new TRPCError({ message: "Erro ao encontrar pergunta", code: "INTERNAL_SERVER_ERROR" })
            const alternativas = pergunta.alternativa as Prisma.JsonArray
            const pergunta_formatada: Pergunta = {
                id: pergunta.id,
                pergunta: pergunta.pergunta,
                alternativa1: alternativas.at(0)?.toString()!,
                alternativa2: alternativas.at(1)?.toString()!,
                alternativa3: alternativas.at(2)?.toString()!,
                alternativa4: alternativas.at(3)?.toString()!,
                alt_correta: pergunta.alt_correta,
                linguagem_id: pergunta.linguagem_id,
                dificuldade: pergunta.dificuldade,
            }
            return pergunta_formatada
        }),

    list: publicProcedure
        .query(async ({ ctx }) => {
            const perguntas = await ctx.db.perguntas.findMany({})
            const perguntas_formatadas: Pergunta[] = [];
            for (const pergunta of perguntas) {
                const alternativas = pergunta.alternativa as Prisma.JsonArray
                const pergunta_formatada: Pergunta = {
                    id: pergunta.id,
                    pergunta: pergunta.pergunta,
                    alternativa1: alternativas.at(0)?.toString()!,
                    alternativa2: alternativas.at(1)?.toString()!,
                    alternativa3: alternativas.at(2)?.toString()!,
                    alternativa4: alternativas.at(3)?.toString()!,
                    alt_correta: pergunta.alt_correta,
                    linguagem_id: pergunta.linguagem_id,
                    dificuldade: pergunta.dificuldade,
                }
                perguntas_formatadas.push(pergunta_formatada)
            }
            return perguntas_formatadas
        }),

    update: publicProcedure
        .input(pergunta_schema)
        .mutation(async ({ input, ctx }) => {
            const { id, pergunta, alternativa1, alternativa2, alternativa3, alternativa4, alt_correta, linguagem, dificuldade } = input;
            let linguagem_id = await ctx.db.linguagem.findUnique({
                where: { nome: linguagem }
            })
            if (!linguagem_id) {
                linguagem_id = await ctx.db.linguagem.create({
                    data: { nome: linguagem }
                })
            }
            if (!linguagem_id)
                throw new TRPCError({ message: "Erro ao criar linguagem", code: "INTERNAL_SERVER_ERROR" })
            const pergunta_editada = await ctx.db.perguntas.update({
                where: { id: id },
                data: {
                    pergunta: pergunta,
                    alternativa: [alternativa1, alternativa2, alternativa3, alternativa4],
                    alt_correta: alt_correta,
                    linguagem_id: linguagem_id.id,
                    dificuldade: dificuldade,
                }
            })
            if (!pergunta_editada)
                throw new TRPCError({ message: "Erro ao atualizar linguagem", code: "INTERNAL_SERVER_ERROR" })
            const alternativas = pergunta_editada.alternativa as Prisma.JsonArray
            const pergunta_editada_formatada: Pergunta = {
                id: pergunta_editada.id,
                pergunta: pergunta_editada.pergunta,
                alternativa1: alternativas.at(0)?.toString()!,
                alternativa2: alternativas.at(1)?.toString()!,
                alternativa3: alternativas.at(2)?.toString()!,
                alternativa4: alternativas.at(3)?.toString()!,
                alt_correta: pergunta_editada.alt_correta,
                linguagem_id: pergunta_editada.linguagem_id,
                dificuldade: pergunta_editada.dificuldade,
            }
            return pergunta_editada_formatada
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const pergunta_apagada = await ctx.db.perguntas.delete({
                where: { id: input.id }
            })
            if (!pergunta_apagada)
                throw new TRPCError({ message: "Erro ao apagar linguagem", code: "INTERNAL_SERVER_ERROR" })
            const alternativas = pergunta_apagada.alternativa as Prisma.JsonArray
            const pergunta_formatada: Pergunta = {
                id: pergunta_apagada.id,
                pergunta: pergunta_apagada.pergunta,
                alternativa1: alternativas.at(0)?.toString()!,
                alternativa2: alternativas.at(1)?.toString()!,
                alternativa3: alternativas.at(2)?.toString()!,
                alternativa4: alternativas.at(3)?.toString()!,
                alt_correta: pergunta_apagada.alt_correta,
                linguagem_id: pergunta_apagada.linguagem_id,
                dificuldade: pergunta_apagada.dificuldade,
            }
            return pergunta_formatada
        }),

    // ===== NOVAS ROTAS ADICIONADAS =====

    // ✅ BUSCAR QUESTÃO ALEATÓRIA (NECESSÁRIA PARA O QUIZ)
    buscarAleatoria: publicProcedure
        .input(z.object({
            linguagem_id: z.number(),
            dificuldade: z.number(),
        }))
        .query(async ({ ctx, input }) => {
            try {
                const todasQuestoes = await ctx.db.perguntas.findMany({
                    where: {
                        linguagem_id: input.linguagem_id,
                        dificuldade: input.dificuldade,
                    },
                    include: {
                        linguagem: true
                    }
                });

                if (todasQuestoes.length === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Nenhuma questão de dificuldade ${input.dificuldade} encontrada para esta linguagem`
                    });
                }

                // Seleciona uma aleatória
                const indiceAleatorio = Math.floor(Math.random() * todasQuestoes.length);
                return todasQuestoes[indiceAleatorio];
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                
                console.error("Erro ao buscar questão:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Erro ao buscar questão"
                });
            }
        }),

    // ✅ BUSCAR QUESTÕES FILTRADAS
    buscar: publicProcedure
        .input(z.object({
            linguagem_id: z.number(),
            dificuldade: z.number().optional(),
            tipo: z.string().optional(),
            categoria: z.string().optional(),
            limite: z.number().default(10),
        }))
        .query(async ({ ctx, input }) => {
            try {
                const questoes = await ctx.db.perguntas.findMany({
                    where: {
                        linguagem_id: input.linguagem_id,
                        ...(input.dificuldade && { dificuldade: input.dificuldade }),
                        ...(input.tipo && { tipo: input.tipo }),
                        ...(input.categoria && { categoria: input.categoria }),
                    },
                    take: input.limite,
                    orderBy: {
                        id: 'asc'
                    },
                    include: {
                        linguagem: true
                    }
                });

                if (questoes.length === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Nenhuma questão encontrada com esses filtros"
                    });
                }

                return questoes;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                
                console.error("Erro ao buscar questões:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Erro ao buscar questões"
                });
            }
        }),

    // ✅ LISTAR CATEGORIAS
    listarCategorias: publicProcedure
        .input(z.object({ linguagem_id: z.number() }))
        .query(async ({ ctx, input }) => {
            try {
                const categorias = await ctx.db.perguntas.findMany({
                    where: { linguagem_id: input.linguagem_id },
                    select: { categoria: true },
                    distinct: ['categoria']
                });

                return categorias
                    .map(c => c.categoria)
                    .filter(Boolean);
            } catch (error) {
                console.error("Erro ao listar categorias:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Erro ao listar categorias"
                });
            }
        }),

    // ✅ CONTAR QUESTÕES
    contar: publicProcedure
        .input(z.object({
            linguagem_id: z.number(),
            dificuldade: z.number().optional(),
        }))
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.db.perguntas.count({
                    where: {
                        linguagem_id: input.linguagem_id,
                        ...(input.dificuldade && { dificuldade: input.dificuldade }),
                    }
                });
            } catch (error) {
                console.error("Erro ao contar questões:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Erro ao contar questões"
                });
            }
        }),
});