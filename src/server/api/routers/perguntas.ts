import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export interface Pergunta {
    pergunta: string
    opcoes: string[]
    correta: number
    linguagem_id: number

}

const pergunta_schema = z.object({
    pergunta: z.string().min(1),
    opcoes: z.array(z.string().min(1)).length(5),
    correta: z.number().min(1).max(4),
    linguagem: z.string().min(1)
})

export const perguntaRouter = createTRPCRouter({
    create: publicProcedure
        .input(pergunta_schema)
        .mutation( async (input, ctx) => {
            const pergunta_criada = await ctx.db.pergunta.create(
                
            )
        }),
});
