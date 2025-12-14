import z from "zod"

//Declaração do tipo Pergunta
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

//Dois schemas de pergunta pois a criação não precisa de um id e as outras ações como editar precisam obrigatoriamente
//Usar um tipo opcional não funcionou devido a obrigatoriedade do id em algumas situações
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

export const pergunta_creation_schema = z.object({
    pergunta: z.string().min(1),
    alternativa1: z.string().min(1),
    alternativa2: z.string().min(1),
    alternativa3: z.string().min(1),
    alternativa4: z.string().min(1),
    alt_correta: z.number().min(1).max(4),
    linguagem: z.string().min(1),
    dificuldade: z.number().min(1)
})