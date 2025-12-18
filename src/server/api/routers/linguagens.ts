import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export interface Linguagem {
    nome: string;
    id: number;
}

export const linguagensRouter = createTRPCRouter({
    // ✅ ROTA LIST - ESTAVA FALTANDO!
    list: publicProcedure
        .query(async ({ ctx }) => {
            try {
                const linguagens = await ctx.db.linguagem.findMany({
                    include: {
                        _count: {
                            select: { perguntas: true }
                        }
                    },
                    orderBy: {
                        nome: 'asc'
                    }
                });
                
                return linguagens;
            } catch (error) {
                console.error("Erro ao listar linguagens:", error);
                throw new TRPCError({ 
                    message: "Erro ao buscar linguagens", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    create: publicProcedure
        .input(z.object({ nome: z.string().min(1) }))
        .mutation(async ({ input, ctx }) => {
            try {
                const linguagem_criada = await ctx.db.linguagem.create({
                    data: input
                });
                
                if (!linguagem_criada) {
                    throw new TRPCError({ 
                        message: "Erro ao criar linguagem", 
                        code: "INTERNAL_SERVER_ERROR" 
                    });
                }
                
                return linguagem_criada as Linguagem;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                
                // Erro de duplicata
                if (error.code === 'P2002') {
                    throw new TRPCError({ 
                        message: "Linguagem já existe", 
                        code: "CONFLICT" 
                    });
                }
                
                throw new TRPCError({ 
                    message: "Erro ao criar linguagem", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    findUniqueByName: publicProcedure
        .input(z.object({ nome: z.string().min(1) }))
        .query(async ({ input, ctx }) => {
            try {
                const linguagem = await ctx.db.linguagem.findUnique({
                    where: { nome: input.nome },
                    include: {
                        _count: {
                            select: { perguntas: true }
                        }
                    }
                });
                
                if (!linguagem) {
                    throw new TRPCError({ 
                        message: "Linguagem não encontrada", 
                        code: "NOT_FOUND" 
                    });
                }
                
                return linguagem;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                
                throw new TRPCError({ 
                    message: "Erro ao buscar linguagem", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    findUniqueById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            try {
                const linguagem = await ctx.db.linguagem.findUnique({
                    where: { id: input.id },
                    include: {
                        _count: {
                            select: { perguntas: true }
                        }
                    }
                });
                
                if (!linguagem) {
                    throw new TRPCError({ 
                        message: "Linguagem não encontrada", 
                        code: "NOT_FOUND" 
                    });
                }
                
                return linguagem;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                
                throw new TRPCError({ 
                    message: "Erro ao buscar linguagem", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    update: publicProcedure
        .input(z.object({ nome: z.string().min(1), id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            try {
                const linguagem_modificada = await ctx.db.linguagem.update({
                    where: { id: input.id },
                    data: {
                        nome: input.nome,
                    }
                });
                
                if (!linguagem_modificada) {
                    throw new TRPCError({ 
                        message: "Erro ao modificar linguagem", 
                        code: "INTERNAL_SERVER_ERROR" 
                    });
                }
                
                return linguagem_modificada as Linguagem;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                
                // Linguagem não encontrada
                if (error.code === 'P2025') {
                    throw new TRPCError({ 
                        message: "Linguagem não encontrada", 
                        code: "NOT_FOUND" 
                    });
                }
                
                // Nome duplicado
                if (error.code === 'P2002') {
                    throw new TRPCError({ 
                        message: "Já existe uma linguagem com este nome", 
                        code: "CONFLICT" 
                    });
                }
                
                throw new TRPCError({ 
                    message: "Erro ao modificar linguagem", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            try {
                const linguagem_apagada = await ctx.db.linguagem.delete({
                    where: {
                        id: input.id,
                    }
                });
                
                if (!linguagem_apagada) {
                    throw new TRPCError({ 
                        message: "Erro ao deletar linguagem", 
                        code: "INTERNAL_SERVER_ERROR" 
                    });
                }
                
                return linguagem_apagada as Linguagem;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                
                // Linguagem não encontrada
                if (error.code === 'P2025') {
                    throw new TRPCError({ 
                        message: "Linguagem não encontrada", 
                        code: "NOT_FOUND" 
                    });
                }
                
                // Tem perguntas relacionadas
                if (error.code === 'P2003') {
                    throw new TRPCError({ 
                        message: "Não é possível deletar. Esta linguagem possui perguntas cadastradas.", 
                        code: "CONFLICT" 
                    });
                }
                
                throw new TRPCError({ 
                    message: "Erro ao deletar linguagem", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),
});