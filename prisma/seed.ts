import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Usuário
  const usuario = await prisma.usuario.upsert({
    where: { email: "teste@codelingo.com" },
    update: {},
    create: {
      email: "teste@codelingo.com",
      senha: "123456",
      nick: "CodeMaster",
      Pontuacao: 150,
    },
  });
  console.log("✅ Usuário criado:", usuario.nick);

  // Linguagens - Correção implementada
  let python = await prisma.linguagem.findFirst({
    where: { nome: "Python" }
  });
  
  if (!python) {
    python = await prisma.linguagem.create({
      data: { nome: "Python" }
    });
  }

  let javascript = await prisma.linguagem.findFirst({
    where: { nome: "JavaScript" }
  });
  
  if (!javascript) {
    javascript = await prisma.linguagem.create({
      data: { nome: "JavaScript" }
    });
  }
  console.log("✅ Linguagens criadas");

  // Perguntas Python
  const pergunta1 = await prisma.perguntas.upsert({
    where: { id: 1 },
    update: {},
    create: {
      linguagem_id: python.id,
      dificuldade: 1,
      pergunta: "O que é Python?",
      alternativa: [
        "Uma linguagem de programação",
        "Um tipo de cobra",
        "Um framework",
        "Um banco de dados"
      ],
      alt_correta: 0,
    },
  });

  const pergunta2 = await prisma.perguntas.upsert({
    where: { id: 2 },
    update: {},
    create: {
      linguagem_id: javascript.id,
      dificuldade: 1,
      pergunta: "Como declarar uma variável em JavaScript?",
      alternativa: [
        "var x = 5",
        "int x = 5",
        "x := 5",
        "declare x = 5"
      ],
      alt_correta: 0,
    },
  });

  const pergunta3 = await prisma.perguntas.upsert({
    where: { id: 3 },
    update: {},
    create: {
      linguagem_id: python.id,
      dificuldade: 2,
      pergunta: "Qual é a saída de: print(type([]))?",
      alternativa: [
        "<class 'list'>",
        "<class 'array'>",
        "<class 'dict'>",
        "<class 'tuple'>"
      ],
      alt_correta: 0,
    },
  });

  const pergunta4 = await prisma.perguntas.upsert({
    where: { id: 4 },
    update: {},
    create: {
      linguagem_id: javascript.id,
      dificuldade: 2,
      pergunta: "Qual palavra-chave cria uma constante em JS?",
      alternativa: [
        "const",
        "let",
        "var",
        "constant"
      ],
      alt_correta: 0,
    },
  });

  const pergunta5 = await prisma.perguntas.upsert({
    where: { id: 5 },
    update: {},
    create: {
      linguagem_id: python.id,
      dificuldade: 3,
      pergunta: "O que faz o decorador @staticmethod?",
      alternativa: [
        "Define um método estático",
        "Define uma propriedade",
        "Define um método abstrato",
        "Define um método privado"
      ],
      alt_correta: 0,
    },
  });

  console.log("✅ 5 perguntas criadas");

  // Respostas de exemplo
  await prisma.respostasDoUsuario.upsert({
    where: { id: 1 },
    update: {},
    create: {
      usuario_id: usuario.id,
      perguntas_id: pergunta1.id,
      alt_selecionado: 0,
      acertou: true,
    },
  });

  await prisma.respostasDoUsuario.upsert({
    where: { id: 2 },
    update: {},
    create: {
      usuario_id: usuario.id,
      perguntas_id: pergunta2.id,
      alt_selecionado: 0,
      acertou: true,
    },
  });

  console.log("✅ Respostas criadas");
  console.log("🎉 Seed completo!");
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });