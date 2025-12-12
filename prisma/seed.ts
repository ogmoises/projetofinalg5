import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Rodando seed");
    const py = await prisma.linguagem.create({
        data:{nome:"Python"}
    });

    const ts = await prisma.linguagem.create({
        data:{nome:"TypeScript"}
    });

    const user1 = await prisma.usuario.create({
        data:{
            email:"email@gmail.com",
            senha:"abc",
            nick:"usuer1",
            Pontuacao:200,
        }
    });

    const perguntas = await prisma.perguntas.create({
        data:{
            linguagem_id:1,
            dificuldade:1,
            pergunta:"Como se faz um dicionario em python",
            alternativa:['{}', "dicionario()", "create dict", "fazer dicionario"],
            alt_correta:1
        }
    });

    const respostaUsuario = await prisma.respostasDoUsuario.create({
        data:{
            usuario_id:user1.id,
            perguntas_id:perguntas.id,
            alt_selecionado:0,
            acertou:true
        }
    });
}

main()
    .catch(err => console.error(err))
    .finally( async () => await prisma.$disconnect());