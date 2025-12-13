// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Rodando seed...");

  // Limpar dados existentes (opcional)
  await prisma.respostasDoUsuario.deleteMany();
  await prisma.perguntas.deleteMany();
  await prisma.linguagem.deleteMany();
  await prisma.usuario.deleteMany();

  // Criar linguagens
  const python = await prisma.linguagem.create({
    data: { nome: "Python" }
  });

  const typescript = await prisma.linguagem.create({
    data: { nome: "TypeScript" }
  });

  const javascript = await prisma.linguagem.create({
    data: { nome: "JavaScript" }
  });

  // Criar usuário de teste
  const user = await prisma.usuario.create({
    data: {
      email: "aluno@codelingo.com",
      senha: "senha123",
      nick: "CodeLearner",
      Pontuacao: 0
    }
  });

  // Criar perguntas para Python
  await prisma.perguntas.createMany({
    data: [
      {
        linguagem_id: python.id,
        dificuldade: 1,
        pergunta: "Como se faz um dicionário em Python?",
        alternativa: ['{}', "dict()", "new Dict()", "Map()"],
        alt_correta: 1
      },
      {
        linguagem_id: python.id,
        dificuldade: 1,
        pergunta: "Qual função é usada para obter o tamanho de uma lista?",
        alternativa: ['size()', "length()", "len()", "count()"],
        alt_correta: 2
      },
      {
        linguagem_id: python.id,
        dificuldade: 2,
        pergunta: "O que é um decorador em Python?",
        alternativa: [
          "Uma função que modifica outras funções",
          "Um tipo especial de classe",
          "Um método de formatação de strings",
          "Um operador matemático"
        ],
        alt_correta: 0
      }
    ]
  });

  // Criar perguntas para TypeScript
  await prisma.perguntas.createMany({
    data: [
      {
        linguagem_id: typescript.id,
        dificuldade: 1,
        pergunta: "Qual é a extensão de arquivo padrão do TypeScript?",
        alternativa: ['.js', '.ts', '.jsx', '.tsx'],
        alt_correta: 1
      },
      {
        linguagem_id: typescript.id,
        dificuldade: 2,
        pergunta: "O que é uma interface em TypeScript?",
        alternativa: [
          "Um contrato que define a estrutura de um objeto",
          "Um tipo de dado primitivo",
          "Um método de herança",
          "Uma biblioteca externa"
        ],
        alt_correta: 0
      }
    ]
  });

  console.log(" Seed concluído!");
  console.log(` Usuário: ${user.email} (ID: ${user.id})`);
}

main()
  .catch(err => {
    console.error(" Erro no seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });