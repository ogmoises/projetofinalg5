import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // 1. CRIAR USUÁRIO
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

  // 2. CRIAR LINGUAGENS
  const python = await prisma.linguagem.upsert({
    where: { nome: "Python" },
    update: {},
    create: { nome: "Python" },
  });

  const javascript = await prisma.linguagem.upsert({
    where: { nome: "JavaScript" },
    update: {},
    create: { nome: "JavaScript" },
  });

  const java = await prisma.linguagem.upsert({
    where: { nome: "Java" },
    update: {},
    create: { nome: "Java" },
  });

  console.log("✅ Linguagens criadas");

  // 3. DELETAR DADOS ANTIGOS (ordem importante por causa das foreign keys)
  console.log("🗑️  Removendo dados antigos...");
  await prisma.respostasDoUsuario.deleteMany({});
  console.log("   ✓ Respostas removidas");
  await prisma.perguntas.deleteMany({});
  console.log("   ✓ Perguntas removidas");

  // 4. CRIAR PERGUNTAS
  // ⚠️ IMPORTANTE: Use JSON.stringify() para as alternativas!
  
  const perguntas = [
    // === PYTHON - NÍVEL 1 ===
    {
      linguagem_id: python.id,
      dificuldade: 1,
      tipo: "multipla_escolha",
      categoria: "Sintaxe Básica",
      pergunta: "O que é Python?",
      alternativa: JSON.stringify([
        "Uma linguagem de programação",
        "Um tipo de cobra",
        "Um framework",
        "Um banco de dados"
      ]),
      alt_correta: 0,
      explicacao: "Python é uma linguagem de programação de alto nível."
    },
    {
      linguagem_id: python.id,
      dificuldade: 1,
      tipo: "multipla_escolha",
      categoria: "Sintaxe Básica",
      pergunta: "Como você imprime 'Hello World' em Python?",
      alternativa: JSON.stringify([
        'print("Hello World")',
        'echo "Hello World"',
        'console.log("Hello World")',
        'printf("Hello World")'
      ]),
      alt_correta: 0,
      explicacao: "Em Python, usamos a função print() para exibir texto."
    },
    {
      linguagem_id: python.id,
      dificuldade: 1,
      tipo: "verdadeiro_falso",
      categoria: "Tipos de Dados",
      pergunta: "Python é uma linguagem com tipagem dinâmica?",
      alternativa: JSON.stringify(["Verdadeiro", "Falso"]),
      alt_correta: 0,
      explicacao: "Python determina o tipo da variável automaticamente."
    },
    {
      linguagem_id: python.id,
      dificuldade: 1,
      tipo: "output_codigo",
      categoria: "Operadores",
      pergunta: "Qual será o output deste código?",
      codigo: "x = 5\ny = 2\nprint(x + y)",
      alternativa: JSON.stringify(["7", "52", "5 + 2", "Erro"]),
      alt_correta: 0,
      explicacao: "A operação + com números realiza soma aritmética."
    },
    {
      linguagem_id: python.id,
      dificuldade: 1,
      tipo: "multipla_escolha",
      categoria: "Listas",
      pergunta: "Como criar uma lista vazia em Python?",
      alternativa: JSON.stringify([
        "lista = []",
        "lista = {}",
        "lista = ()",
        "lista = <>"
      ]),
      alt_correta: 0,
      explicacao: "Colchetes [] criam uma lista vazia."
    },

    // === PYTHON - NÍVEL 2 ===
    {
      linguagem_id: python.id,
      dificuldade: 2,
      tipo: "multipla_escolha",
      categoria: "Estruturas de Dados",
      pergunta: "Qual é a saída de: print(type([]))?",
      alternativa: JSON.stringify([
        "<class 'list'>",
        "<class 'array'>",
        "<class 'dict'>",
        "<class 'tuple'>"
      ]),
      alt_correta: 0,
      explicacao: "type([]) retorna o tipo list."
    },
    {
      linguagem_id: python.id,
      dificuldade: 2,
      tipo: "completar_codigo",
      categoria: "Loops",
      pergunta: "Complete o código para imprimir números de 1 a 5:",
      codigo: "___ i in range(1, 6):\n    print(i)",
      alternativa: JSON.stringify(["for", "while", "loop", "foreach"]),
      alt_correta: 0,
      explicacao: "O loop for é usado para iterar sobre uma sequência."
    },
    {
      linguagem_id: python.id,
      dificuldade: 2,
      tipo: "multipla_escolha",
      categoria: "Dicionários",
      pergunta: "Como acessar o valor de uma chave em um dicionário?",
      alternativa: JSON.stringify([
        'd["chave"]',
        'd.chave',
        'd->chave',
        'd(chave)'
      ]),
      alt_correta: 0,
      explicacao: "Usamos colchetes com a chave entre aspas."
    },

    // === PYTHON - NÍVEL 3 ===
    {
      linguagem_id: python.id,
      dificuldade: 3,
      tipo: "multipla_escolha",
      categoria: "Decorators",
      pergunta: "O que faz o decorador @staticmethod?",
      alternativa: JSON.stringify([
        "Define um método estático",
        "Define uma propriedade",
        "Define um método abstrato",
        "Define um método privado"
      ]),
      alt_correta: 0,
      explicacao: "Métodos estáticos não recebem self ou cls."
    },
    {
      linguagem_id: python.id,
      dificuldade: 3,
      tipo: "output_codigo",
      categoria: "Classes",
      pergunta: "Qual o output?",
      codigo: "class A:\n    x = 5\nclass B(A):\n    pass\nprint(B.x)",
      alternativa: JSON.stringify(["5", "Erro", "None", "0"]),
      alt_correta: 0,
      explicacao: "B herda o atributo x da classe A."
    },

    // === JAVASCRIPT - NÍVEL 1 ===
    {
      linguagem_id: javascript.id,
      dificuldade: 1,
      tipo: "multipla_escolha",
      categoria: "Sintaxe Básica",
      pergunta: "Como declarar uma variável em JavaScript?",
      alternativa: JSON.stringify([
        "var x = 5",
        "int x = 5",
        "x := 5",
        "declare x = 5"
      ]),
      alt_correta: 0,
      explicacao: "Usamos var, let ou const para declarar variáveis."
    },
    {
      linguagem_id: javascript.id,
      dificuldade: 1,
      tipo: "output_codigo",
      categoria: "Tipos",
      pergunta: "Qual o resultado?",
      codigo: 'console.log(typeof "Hello")',
      alternativa: JSON.stringify(["string", "text", "String", "char"]),
      alt_correta: 0,
      explicacao: "O operador typeof retorna 'string' para textos."
    },
    {
      linguagem_id: javascript.id,
      dificuldade: 1,
      tipo: "verdadeiro_falso",
      categoria: "Operadores",
      pergunta: "Em JavaScript, === verifica tipo e valor?",
      alternativa: JSON.stringify(["Verdadeiro", "Falso"]),
      alt_correta: 0,
      explicacao: "=== é o operador de igualdade estrita."
    },
    {
      linguagem_id: javascript.id,
      dificuldade: 1,
      tipo: "multipla_escolha",
      categoria: "Arrays",
      pergunta: "Como acessar o primeiro elemento de um array?",
      alternativa: JSON.stringify([
        "arr[0]",
        "arr[1]",
        "arr.first()",
        "arr.get(0)"
      ]),
      alt_correta: 0,
      explicacao: "Arrays em JavaScript começam no índice 0."
    },

    // === JAVASCRIPT - NÍVEL 2 ===
    {
      linguagem_id: javascript.id,
      dificuldade: 2,
      tipo: "multipla_escolha",
      categoria: "Constantes",
      pergunta: "Qual palavra-chave cria uma constante em JS?",
      alternativa: JSON.stringify([
        "const",
        "let",
        "var",
        "constant"
      ]),
      alt_correta: 0,
      explicacao: "const declara uma variável que não pode ser reatribuída."
    },
    {
      linguagem_id: javascript.id,
      dificuldade: 2,
      tipo: "output_codigo",
      categoria: "Arrow Functions",
      pergunta: "Qual o resultado?",
      codigo: "const soma = (a, b) => a + b;\nconsole.log(soma(2, 3))",
      alternativa: JSON.stringify(["5", "23", "undefined", "Erro"]),
      alt_correta: 0,
      explicacao: "Arrow functions com uma expressão retornam implicitamente."
    },
    {
      linguagem_id: javascript.id,
      dificuldade: 2,
      tipo: "multipla_escolha",
      categoria: "Arrays",
      pergunta: "Qual método adiciona um elemento no final de um array?",
      alternativa: JSON.stringify(["push()", "pop()", "shift()", "unshift()"]),
      alt_correta: 0,
      explicacao: "push() adiciona elementos no final do array."
    },

    // === JAVASCRIPT - NÍVEL 3 ===
    {
      linguagem_id: javascript.id,
      dificuldade: 3,
      tipo: "multipla_escolha",
      categoria: "Async/Await",
      pergunta: "O que async/await faz em JavaScript?",
      alternativa: JSON.stringify([
        "Torna código assíncrono mais legível",
        "Acelera o código",
        "Remove callbacks",
        "É apenas sintaxe"
      ]),
      alt_correta: 0,
      explicacao: "Async/await é syntax sugar para Promises."
    },
    {
      linguagem_id: javascript.id,
      dificuldade: 3,
      tipo: "output_codigo",
      categoria: "Closures",
      pergunta: "Qual o resultado?",
      codigo: "function outer() {\n  let x = 10;\n  return function() { return x; }\n}\nconsole.log(outer()())",
      alternativa: JSON.stringify(["10", "undefined", "Erro", "null"]),
      alt_correta: 0,
      explicacao: "A função interna mantém acesso ao escopo externo (closure)."
    },

    // === JAVA - NÍVEL 1 ===
    {
      linguagem_id: java.id,
      dificuldade: 1,
      tipo: "multipla_escolha",
      categoria: "Sintaxe Básica",
      pergunta: "Como você declara o método principal em Java?",
      alternativa: JSON.stringify([
        "public static void main(String[] args)",
        "function main()",
        "def main():",
        "main() {}"
      ]),
      alt_correta: 0,
      explicacao: "O método main é o ponto de entrada de programas Java."
    },
    {
      linguagem_id: java.id,
      dificuldade: 1,
      tipo: "multipla_escolha",
      categoria: "Tipos",
      pergunta: "Qual é o tipo de dado para números inteiros em Java?",
      alternativa: JSON.stringify(["int", "integer", "number", "num"]),
      alt_correta: 0,
      explicacao: "int é o tipo primitivo para números inteiros em Java."
    },
  ];

  // Inserir todas as perguntas
  for (const pergunta of perguntas) {
    await prisma.perguntas.create({ data: pergunta });
  }

  console.log(`✅ ${perguntas.length} perguntas criadas`);

  // 5. CRIAR ALGUMAS RESPOSTAS DE EXEMPLO
  await prisma.respostasDoUsuario.deleteMany({});
  
  const primeirasPerguntasPython = await prisma.perguntas.findMany({
    where: { linguagem_id: python.id },
    take: 2,
  });

  if (primeirasPerguntasPython.length > 0) {
    await prisma.respostasDoUsuario.create({
      data: {
        usuario_id: usuario.id,
        perguntas_id: primeirasPerguntasPython[0].id,
        alt_selecionado: 0,
        acertou: true,
      },
    });
  }

  console.log("✅ Respostas de exemplo criadas");

  // 6. ESTATÍSTICAS
  const totalPerguntas = await prisma.perguntas.count();
  const pythonCount = await prisma.perguntas.count({ where: { linguagem_id: python.id } });
  const jsCount = await prisma.perguntas.count({ where: { linguagem_id: javascript.id } });
  const javaCount = await prisma.perguntas.count({ where: { linguagem_id: java.id } });

  console.log("\n📊 Estatísticas:");
  console.log(`Total de questões: ${totalPerguntas}`);
  console.log(`  - Python: ${pythonCount} questões`);
  console.log(`  - JavaScript: ${jsCount} questões`);
  console.log(`  - Java: ${javaCount} questões`);
  console.log("\n🎉 Seed completo com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });