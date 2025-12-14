import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export interface Linguagem {
    nome: string
    id: number
}

export const linguagensRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ nome: z.string().min(1) }))
        .mutation(async ({ input, ctx }) => {
            const linguagem_criada = await ctx.db.linguagem.create({
                data: input
            })

            if (!linguagem_criada)
                throw new TRPCError({ message: "Erro ao criar linguagem", code: "INTERNAL_SERVER_ERROR" })

            return linguagem_criada as Linguagem
        }),

    findUniqueByName: publicProcedure
        .input(z.object({ nome: z.string().min(1) }))
        .query(async ({ input, ctx }) => {
            const linguagem = await ctx.db.linguagem.findUnique({
                where: { nome: input.nome },
            })
            return linguagem as Linguagem

        }),

    findUniqueById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            const linguagem = await ctx.db.linguagem.findUnique({
                where: { id: input.id },
            })
            return linguagem as Linguagem
        }),

    update: publicProcedure
        .input(z.object({ nome: z.string().min(1), id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const linguagem_modificada = await ctx.db.linguagem.update({
                where: { id: input.id },
                data: {
                    nome: input.nome,
                }
            })

            if (!linguagem_modificada)
                throw new TRPCError({ message: "Erro ao modificar linguagem", code: "INTERNAL_SERVER_ERROR" })

            return linguagem_modificada as Linguagem
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const linguagem_apagada = await ctx.db.linguagem.delete({
                where: {
                    id: input.id,
                }
            })

            if (!linguagem_apagada)
                throw new TRPCError({ message: "Erro ao deletar linguagem", code: "INTERNAL_SERVER_ERROR" })

            return linguagem_apagada as Linguagem
        }),
});