import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const usuarioRouter = createTRPCRouter({
  criar: publicProcedure
    .input(z.object({
      email: z.string().email("Email inválido"),
      nick: z.string().min(3, "Nick deve ter pelo menos 3 caracteres"),
      senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        
        const emailExistente = await ctx.db.usuario.findUnique({
          where: { email: input.email }
        });
        
        if (emailExistente) {
          throw new TRPCError({code: 'CONFLICT', message: "Email já está em uso"});
        }

        
        const nickExistente = await ctx.db.usuario.findUnique({
          where: { nick: input.nick }
        });
        
        if (nickExistente) {
          throw new TRPCError({code: 'CONFLICT', message: "Nick já está em uso"});
        }

        
        const senhaHash = await bcrypt.hash(input.senha, 12);

        
        const usuario = await ctx.db.usuario.create({
          data: {
            email: input.email,
            nick: input.nick,
            senha: senhaHash,
            Pontuacao: 0,
          },
          select: {
            id: true,
            email: true,
            nick: true,
            Pontuacao: true,
          }
        });

        return {
          success: true,
          message: "Usuário criado com sucesso!",
          usuario
        };
      } catch (error) {
        console.error("Erro ao criar usuário:", error);

        if (error instanceof TRPCError) {
        throw error;
      }
        throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Ocorreu um erro inesperado ao criar o usuário.",
      cause: error,
      });
    }
  }),

  verificarNickDisponivel: publicProcedure
    .input(z.object({ nick: z.string() }))
    .query(async ({ input, ctx }) => {
      const usuario = await ctx.db.usuario.findUnique({
        where: { nick: input.nick }
      });
      return { disponivel: !usuario };
    }),

  verificarEmailDisponivel: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input, ctx }) => {
      const usuario = await ctx.db.usuario.findUnique({
        where: { email: input.email }
      });
      return { disponivel: !usuario };
    }),

});