import z from "zod"

export interface Pergunta {
    id: number
    pergunta: string
    alternativa1: string
    alternativa2: string
    alternativa3: string
    alternativa4: string
    alt_correta: number
    linguagem_id: number
    dificuldade: number
}

export const pergunta_schema = z.object({
    id: z.number(),
    pergunta: z.string().min(1),
    alternativa1: z.string().min(1),
    alternativa2: z.string().min(1),
    alternativa3: z.string().min(1),
    alternativa4: z.string().min(1),
    alt_correta: z.number().min(1).max(4),
    linguagem: z.string().min(1),
    dificuldade: z.number().min(1)
})