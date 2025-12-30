import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export interface Usuario {
    id: number;
    email: string;
    nick: string;
    Pontuacao: number;
}

export const usuarioRouter = createTRPCRouter({
    // Criar usuário
    criar: publicProcedure
        .input(z.object({ 
            email: z.string().email(),
            senha: z.string().min(6),
            nick: z.string().min(3).max(20)
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                // Verifica se o nick já existe
                const nickExiste = await ctx.db.usuario.findUnique({
                    where: { nick: input.nick }
                });
                
                if (nickExiste) {
                    throw new TRPCError({ 
                        message: "Este nick já está em uso", 
                        code: "CONFLICT" 
                    });
                }

                // Verifica se o email já existe
                const emailExiste = await ctx.db.usuario.findUnique({
                    where: { email: input.email }
                });
                
                if (emailExiste) {
                    throw new TRPCError({ 
                        message: "Este email já está cadastrado", 
                        code: "CONFLICT" 
                    });
                }

                // Hash da senha (10 rounds é um bom equilíbrio segurança/performance)
                const senhaHash = await bcrypt.hash(input.senha, 10);

                const usuario_criado = await ctx.db.usuario.create({
                    data: {
                        email: input.email,
                        nick: input.nick,
                        senha: senhaHash // Armazena o hash, não a senha original
                    },
                    select: {
                        id: true,
                        email: true,
                        nick: true,
                        Pontuacao: true
                        // NÃO retorna a senha
                    }
                });

                return usuario_criado as Usuario;
            } catch (error) {
                // Se for um TRPCError que já lançamos, repassa
                if (error instanceof TRPCError) {
                    throw error;
                }
                
                // Se for erro do Prisma (P2002 = unique constraint)
                if (error.code === 'P2002') {
                    throw new TRPCError({ 
                        message: "Usuário já existe com estes dados", 
                        code: "CONFLICT" 
                    });
                }
                
                // Qualquer outro erro
                console.error("Erro ao criar usuário:", error);
                throw new TRPCError({ 
                    message: "Erro ao criar usuário", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    // Buscar por ID
    findById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            const usuario = await ctx.db.usuario.findUnique({
                where: { id: input.id },
                select: {
                    id: true,
                    email: true,
                    nick: true,
                    Pontuacao: true,
                    // NÃO retorna senha
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

            if (!usuario) {
                throw new TRPCError({ 
                    message: "Usuário não encontrado", 
                    code: "NOT_FOUND" 
                });
            }

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

            if (!usuario) {
                // Mensagem genérica para não revelar se o email existe
                throw new TRPCError({ 
                    message: "Email ou senha inválidos", 
                    code: "UNAUTHORIZED" 
                });
            }

            // Compara a senha fornecida com o hash armazenado
            const senhaValida = await bcrypt.compare(input.senha, usuario.senha);

            if (!senhaValida) {
                throw new TRPCError({ 
                    message: "Email ou senha inválidos", 
                    code: "UNAUTHORIZED" 
                });
            }

            // Retorna dados do usuário SEM a senha
            return {
                id: usuario.id,
                email: usuario.email,
                nick: usuario.nick,
                Pontuacao: usuario.Pontuacao
            } as Usuario;
        }),

    // Atualizar pontuação
    updatePontuacao: publicProcedure
        .input(z.object({ 
            id: z.number(),
            pontos: z.number().int().min(-100).max(100) // Limita variação de pontos
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const usuario = await ctx.db.usuario.update({
                    where: { id: input.id },
                    data: {
                        Pontuacao: {
                            increment: input.pontos
                        }
                    },
                    select: {
                        id: true,
                        email: true,
                        nick: true,
                        Pontuacao: true
                    }
                });

                return usuario as Usuario;
            } catch (error) {
                if (error.code === 'P2025') {
                    throw new TRPCError({ 
                        message: "Usuário não encontrado", 
                        code: "NOT_FOUND" 
                    });
                }
                console.error("Erro ao atualizar pontuação:", error);
                throw new TRPCError({ 
                    message: "Erro ao atualizar pontuação", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    // Registrar resposta
    registrarResposta: publicProcedure
        .input(z.object({
            usuario_id: z.number(),
            perguntas_id: z.number(),
            alt_selecionado: z.number().min(1).max(4), // Limita alternativas de 1 a 4
            acertou: z.boolean()
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                // Verifica se a resposta já não foi registrada
                const respostaExistente = await ctx.db.respostasDoUsuario.findFirst({
                    where: {
                        usuario_id: input.usuario_id,
                        perguntas_id: input.perguntas_id
                    }
                });

                if (respostaExistente) {
                    throw new TRPCError({
                        message: "Você já respondeu esta pergunta",
                        code: "CONFLICT"
                    });
                }

                // Cria a resposta em uma transação
                const resultado = await ctx.db.$transaction(async (tx) => {
                    // Cria a resposta
                    const resposta = await tx.respostasDoUsuario.create({
                        data: input
                    });
                    
                    // Se acertou, adiciona 10 pontos
                    if (input.acertou) {
                        await tx.usuario.update({
                            where: { id: input.usuario_id },
                            data: {
                                Pontuacao: { increment: 10 }
                            }
                        });
                    }

                    return resposta;
                });
                
                return resultado;
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw error;
                }
                if (error.code === 'P2003') {
                    throw new TRPCError({ 
                        message: "Usuário ou pergunta não encontrados", 
                        code: "NOT_FOUND" 
                    });
                }
                console.error("Erro ao registrar resposta:", error);
                throw new TRPCError({ 
                    message: "Erro ao registrar resposta", 
                    code: "INTERNAL_SERVER_ERROR" 
                });
            }
        }),

    // Estatísticas do usuário
    getStats: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            const usuario = await ctx.db.usuario.findUnique({
                where: { id: input.id },
                select: {
                    id: true,
                    email: true,
                    nick: true,
                    Pontuacao: true,
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

            if (!usuario) {
                throw new TRPCError({ 
                    message: "Usuário não encontrado", 
                    code: "NOT_FOUND" 
                });
            }

            const totalRespostas = usuario.Respostas.length;
            const acertos = usuario.Respostas.filter(r => r.acertou).length;
            const taxaAcerto = totalRespostas > 0 ? (acertos / totalRespostas) * 100 : 0;

            // Progresso por linguagem
            const progressoPorLinguagem = usuario.Respostas.reduce((acc, resposta) => {
                const nomeLinguagem = resposta.perguntas.linguagem.nome;
                
                if (!acc[nomeLinguagem]) {
                    acc[nomeLinguagem] = { 
                        total: 0, 
                        acertos: 0,
                        taxaAcerto: 0 
                    };
                }
                
                acc[nomeLinguagem].total++;
                if (resposta.acertou) {
                    acc[nomeLinguagem].acertos++;
                }
                
                // Calcula taxa de acerto por linguagem
                acc[nomeLinguagem].taxaAcerto = Math.round(
                    (acc[nomeLinguagem].acertos / acc[nomeLinguagem].total) * 100
                );
                
                return acc;
            }, {} as Record<string, { total: number; acertos: number; taxaAcerto: number }>);

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
        }),

    // Alterar senha (novo endpoint para produção)
    alterarSenha: publicProcedure
        .input(z.object({
            id: z.number(),
            senhaAtual: z.string(),
            senhaNova: z.string().min(6)
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const usuario = await ctx.db.usuario.findUnique({
                    where: { id: input.id }
                });

                if (!usuario) {
                    throw new TRPCError({
                        message: "Usuário não encontrado",
                        code: "NOT_FOUND"
                    });
                }

                // Verifica se a senha atual está correta
                const senhaValida = await bcrypt.compare(input.senhaAtual, usuario.senha);

                if (!senhaValida) {
                    throw new TRPCError({
                        message: "Senha atual incorreta",
                        code: "UNAUTHORIZED"
                    });
                }

                // Hash da nova senha
                const novaSenhaHash = await bcrypt.hash(input.senhaNova, 10);

                await ctx.db.usuario.update({
                    where: { id: input.id },
                    data: { senha: novaSenhaHash }
                });

                return { success: true };
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw error;
                }
                console.error("Erro ao alterar senha:", error);
                throw new TRPCError({
                    message: "Erro ao alterar senha",
                    code: "INTERNAL_SERVER_ERROR"
                });
            }
        })
});