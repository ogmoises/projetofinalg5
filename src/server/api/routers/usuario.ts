import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export interface Usuario {
    id: number;
    email: string;
    nick: string;
    Pontuacao: number;
}

export const usuarioRouter = createTRPCRouter({
    // Criar usuário
    create: publicProcedure
        .input(z.object({ 
            email: z.string().email(),
            senha: z.string().min(6),
            nick: z.string().min(3)
        }))
        .mutation(async ({ input, ctx }) => {
            const usuario_criado = await ctx.db.usuario.create({
                data: input
            });
            if (!usuario_criado)
                throw new TRPCError({ message: "Erro ao criar usuário", code: "INTERNAL_SERVER_ERROR" });
            return usuario_criado as Usuario;
        }),

    // Buscar por ID
    findById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            const usuario = await ctx.db.usuario.findUnique({
                where: { id: input.id },
                include: {
                    Respostas: {
                        include: {
                            perguntas: {
                                include: {
                                    linguagem: true
                                }
                            }
                        }
                    }
                }
            });
            if (!usuario)
                throw new TRPCError({ message: "Usuário não encontrado", code: "NOT_FOUND" });
            return usuario;
        }),

    // Login
    login: publicProcedure
        .input(z.object({ 
            email: z.string().email(),
            senha: z.string()
        }))
        .query(async ({ input, ctx }) => {
            const usuario = await ctx.db.usuario.findUnique({
                where: { email: input.email }
            });
            if (!usuario || usuario.senha !== input.senha)
                throw new TRPCError({ message: "Credenciais inválidas", code: "UNAUTHORIZED" });
            return usuario as Usuario;
        }),

    // Atualizar pontuação
    updatePontuacao: publicProcedure
        .input(z.object({ 
            id: z.number(),
            pontos: z.number()
        }))
        .mutation(async ({ input, ctx }) => {
            const usuario = await ctx.db.usuario.update({
                where: { id: input.id },
                data: {
                    Pontuacao: {
                        increment: input.pontos
                    }
                }
            });
            return usuario as Usuario;
        }),

    // Registrar resposta
    registrarResposta: publicProcedure
        .input(z.object({
            usuario_id: z.number(),
            perguntas_id: z.number(),
            alt_selecionado: z.number(),
            acertou: z.boolean()
        }))
        .mutation(async ({ input, ctx }) => {
            const resposta = await ctx.db.respostasDoUsuario.create({
                data: input
            });
            
            // Se acertou, adiciona 10 pontos
            if (input.acertou) {
                await ctx.db.usuario.update({
                    where: { id: input.usuario_id },
                    data: {
                        Pontuacao: { increment: 10 }
                    }
                });
            }
            
            return resposta;
        }),

    // Estatísticas do usuário
    getStats: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            const usuario = await ctx.db.usuario.findUnique({
                where: { id: input.id },
                include: {
                    Respostas: {
                        include: {
                            perguntas: {
                                include: {
                                    linguagem: true
                                }
                            }
                        }
                    }
                }
            });

            if (!usuario) throw new TRPCError({ message: "Usuário não encontrado", code: "NOT_FOUND" });

            const totalRespostas = usuario.Respostas.length;
            const acertos = usuario.Respostas.filter(r => r.acertou).length;
            const taxaAcerto = totalRespostas > 0 ? (acertos / totalRespostas) * 100 : 0;

            // Progresso por linguagem
            const progressoPorLinguagem = usuario.Respostas.reduce((acc, resposta) => {
                const nomeLinguagem = resposta.perguntas.linguagem.nome;
                if (!acc[nomeLinguagem]) {
                    acc[nomeLinguagem] = { total: 0, acertos: 0 };
                }
                acc[nomeLinguagem].total++;
                if (resposta.acertou) acc[nomeLinguagem].acertos++;
                return acc;
            }, {} as Record<string, { total: number; acertos: number }>);

            return {
                usuario: {
                    id: usuario.id,
                    nick: usuario.nick,
                    email: usuario.email,
                    pontuacao: usuario.Pontuacao
                },
                totalRespostas,
                acertos,
                erros: totalRespostas - acertos,
                taxaAcerto: Math.round(taxaAcerto),
                progressoPorLinguagem
            };
        })
});