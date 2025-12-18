// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // 1. CRIAR LINGUAGENS
  const linguagens = await Promise.all([
    prisma.linguagem.upsert({
      where: { nome: 'Python' },
      update: {},
      create: { nome: 'Python' },
    }),
    prisma.linguagem.upsert({
      where: { nome: 'JavaScript' },
      update: {},
      create: { nome: 'JavaScript' },
    }),
    prisma.linguagem.upsert({
      where: { nome: 'Java' },
      update: {},
      create: { nome: 'Java' },
    }),
    prisma.linguagem.upsert({
      where: { nome: 'C++' },
      update: {},
      create: { nome: 'C++' },
    }),
    prisma.linguagem.upsert({
      where: { nome: 'C' },
      update: {},
      create: { nome: 'C' },
    }),
    prisma.linguagem.upsert({
      where: { nome: 'Go' },
      update: {},
      create: { nome: 'Go' },
    }),
    prisma.linguagem.upsert({
      where: { nome: 'PHP' },
      update: {},
      create: { nome: 'PHP' },
    }),
    prisma.linguagem.upsert({
      where: { nome: 'Ruby' },
      update: {},
      create: { nome: 'Ruby' },
    }),
  ]);

  console.log('✅ Linguagens criadas!');

  // 2. QUESTÕES PYTHON
  const pythonId = linguagens[0].id;

  const questoesPython = [
    // === NÍVEL 1 - FÁCIL ===
    {
      linguagem_id: pythonId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Sintaxe Básica',
      pergunta: 'Como você imprime "Hello World" em Python?',
      alternativa: JSON.stringify([
        'print("Hello World")',
        'echo "Hello World"',
        'console.log("Hello World")',
        'printf("Hello World")'
      ]),
      alt_correta: 0,
      explicacao: 'Em Python, usamos a função print() para exibir texto.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Variáveis',
      pergunta: 'Qual é a forma correta de criar uma variável em Python?',
      alternativa: JSON.stringify([
        'x = 10',
        'var x = 10',
        'int x = 10',
        'let x = 10'
      ]),
      alt_correta: 0,
      explicacao: 'Python não requer declaração de tipo explícita.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 1,
      tipo: 'verdadeiro_falso',
      categoria: 'Tipos de Dados',
      pergunta: 'Python é uma linguagem com tipagem dinâmica?',
      alternativa: JSON.stringify(['Verdadeiro', 'Falso']),
      alt_correta: 0,
      explicacao: 'Python determina o tipo da variável automaticamente em tempo de execução.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 1,
      tipo: 'output_codigo',
      categoria: 'Operadores',
      pergunta: 'Qual será o output deste código?',
      codigo: 'x = 5\ny = 2\nprint(x + y)',
      alternativa: JSON.stringify(['7', '52', '5 + 2', 'Erro']),
      alt_correta: 0,
      explicacao: 'A operação + com números realiza soma aritmética.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Strings',
      pergunta: 'Como concatenar duas strings em Python?',
      alternativa: JSON.stringify([
        '"Hello" + " World"',
        '"Hello" & " World"',
        'concat("Hello", " World")',
        '"Hello".append(" World")'
      ]),
      alt_correta: 0,
      explicacao: 'O operador + concatena strings em Python.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Listas',
      pergunta: 'Como criar uma lista vazia em Python?',
      alternativa: JSON.stringify([
        'lista = []',
        'lista = {}',
        'lista = ()',
        'lista = <>'
      ]),
      alt_correta: 0,
      explicacao: 'Colchetes [] criam uma lista vazia.'
    },

    // === NÍVEL 2 - MÉDIO ===
    {
      linguagem_id: pythonId,
      dificuldade: 2,
      tipo: 'multipla_escolha',
      categoria: 'Estruturas de Dados',
      pergunta: 'Qual estrutura de dados Python não permite elementos duplicados?',
      alternativa: JSON.stringify(['Set', 'List', 'Tuple', 'Dictionary']),
      alt_correta: 0,
      explicacao: 'Sets em Python automaticamente removem duplicatas.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 2,
      tipo: 'completar_codigo',
      categoria: 'Loops',
      pergunta: 'Complete o código para imprimir números de 1 a 5:',
      codigo: '___ i in range(1, 6):\n    print(i)',
      alternativa: JSON.stringify(['for', 'while', 'loop', 'foreach']),
      alt_correta: 0,
      explicacao: 'O loop for é usado para iterar sobre uma sequência.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 2,
      tipo: 'encontrar_erro',
      categoria: 'Funções',
      pergunta: 'Qual linha tem erro?',
      codigo: 'def soma(a, b)\n    resultado = a + b\n    return resultado',
      alternativa: JSON.stringify(['Linha 1', 'Linha 2', 'Linha 3', 'Nenhuma']),
      alt_correta: 0,
      explicacao: 'Falta dois pontos (:) após a definição da função.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 2,
      tipo: 'multipla_escolha',
      categoria: 'List Comprehension',
      pergunta: 'O que faz esta list comprehension?',
      codigo: '[x**2 for x in range(5)]',
      alternativa: JSON.stringify([
        'Cria uma lista com quadrados de 0 a 4',
        'Eleva 2 ao cubo 5 vezes',
        'Multiplica todos os números por 2',
        'Causa um erro'
      ]),
      alt_correta: 0,
      explicacao: 'List comprehension cria [0, 1, 4, 9, 16].'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 2,
      tipo: 'output_codigo',
      categoria: 'Dicionários',
      pergunta: 'Qual o output?',
      codigo: 'd = {"a": 1, "b": 2}\nprint(d.get("c", 0))',
      alternativa: JSON.stringify(['0', 'None', 'Erro', 'c']),
      alt_correta: 0,
      explicacao: 'get() retorna o valor padrão (0) quando a chave não existe.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 2,
      tipo: 'multipla_escolha',
      categoria: 'Slicing',
      pergunta: 'O que retorna lista[1:4] se lista = [0, 1, 2, 3, 4, 5]?',
      alternativa: JSON.stringify([
        '[1, 2, 3]',
        '[1, 2, 3, 4]',
        '[0, 1, 2, 3]',
        '[2, 3, 4]'
      ]),
      alt_correta: 0,
      explicacao: 'Slicing em Python é [início:fim), não incluindo o fim.'
    },

    // === NÍVEL 3 - DIFÍCIL ===
    {
      linguagem_id: pythonId,
      dificuldade: 3,
      tipo: 'output_codigo',
      categoria: 'Classes e Objetos',
      pergunta: 'Qual o output?',
      codigo: 'class A:\n    x = 5\nclass B(A):\n    pass\nprint(B.x)',
      alternativa: JSON.stringify(['5', 'Erro', 'None', '0']),
      alt_correta: 0,
      explicacao: 'B herda o atributo x da classe A.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 3,
      tipo: 'multipla_escolha',
      categoria: 'Decorators',
      pergunta: 'O que são decorators em Python?',
      alternativa: JSON.stringify([
        'Funções que modificam outras funções',
        'Comentários especiais',
        'Tipos de variáveis',
        'Operadores matemáticos'
      ]),
      alt_correta: 0,
      explicacao: 'Decorators permitem modificar o comportamento de funções.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 3,
      tipo: 'output_codigo',
      categoria: 'Generators',
      pergunta: 'Qual o output?',
      codigo: 'def gen():\n    yield 1\n    yield 2\ng = gen()\nprint(next(g))',
      alternativa: JSON.stringify(['1', '2', '[1, 2]', 'Erro']),
      alt_correta: 0,
      explicacao: 'next() retorna o próximo valor do generator, que é 1.'
    },
    {
      linguagem_id: pythonId,
      dificuldade: 3,
      tipo: 'multipla_escolha',
      categoria: 'Lambda',
      pergunta: 'O que faz: sorted([3,1,2], key=lambda x: -x)?',
      alternativa: JSON.stringify([
        'Ordena em ordem decrescente',
        'Ordena em ordem crescente',
        'Inverte a lista',
        'Causa erro'
      ]),
      alt_correta: 0,
      explicacao: 'Lambda retorna valores negativos, invertendo a ordem.'
    },
  ];

  // 3. QUESTÕES JAVASCRIPT
  const jsId = linguagens[1].id;

  const questoesJS = [
    // === NÍVEL 1 - FÁCIL ===
    {
      linguagem_id: jsId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Sintaxe Básica',
      pergunta: 'Como você declara uma variável constante em JavaScript?',
      alternativa: JSON.stringify(['const x = 5', 'var x = 5', 'let x = 5', 'constant x = 5']),
      alt_correta: 0,
      explicacao: 'const declara uma variável que não pode ser reatribuída.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 1,
      tipo: 'output_codigo',
      categoria: 'Tipos de Dados',
      pergunta: 'Qual é o resultado?',
      codigo: 'console.log(typeof "Hello")',
      alternativa: JSON.stringify(['string', 'text', 'String', 'char']),
      alt_correta: 0,
      explicacao: 'O operador typeof retorna "string" para textos.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 1,
      tipo: 'verdadeiro_falso',
      categoria: 'Operadores',
      pergunta: 'Em JavaScript, === verifica tipo e valor?',
      alternativa: JSON.stringify(['Verdadeiro', 'Falso']),
      alt_correta: 0,
      explicacao: '=== é o operador de igualdade estrita.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Funções',
      pergunta: 'Como declarar uma função em JavaScript?',
      alternativa: JSON.stringify([
        'function nome() {}',
        'def nome():',
        'func nome() {}',
        'function nome():'
      ]),
      alt_correta: 0,
      explicacao: 'Usamos a palavra-chave function seguida de parênteses e chaves.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 1,
      tipo: 'output_codigo',
      categoria: 'Concatenação',
      pergunta: 'Qual o resultado?',
      codigo: 'console.log("5" + 3)',
      alternativa: JSON.stringify(['53', '8', '5 3', 'Erro']),
      alt_correta: 0,
      explicacao: 'JavaScript converte o número para string e concatena.'
    },

    // === NÍVEL 2 - MÉDIO ===
    {
      linguagem_id: jsId,
      dificuldade: 2,
      tipo: 'multipla_escolha',
      categoria: 'Arrays',
      pergunta: 'Qual método adiciona um elemento no final de um array?',
      alternativa: JSON.stringify(['push()', 'pop()', 'shift()', 'unshift()']),
      alt_correta: 0,
      explicacao: 'push() adiciona elementos no final do array.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 2,
      tipo: 'output_codigo',
      categoria: 'Arrow Functions',
      pergunta: 'Qual o resultado?',
      codigo: 'const soma = (a, b) => a + b;\nconsole.log(soma(2, 3))',
      alternativa: JSON.stringify(['5', '23', 'undefined', 'Erro']),
      alt_correta: 0,
      explicacao: 'Arrow functions com uma expressão retornam implicitamente.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 2,
      tipo: 'encontrar_erro',
      categoria: 'Objetos',
      pergunta: 'Onde está o erro?',
      codigo: 'const obj = {\n    nome: "João"\n    idade: 25\n}',
      alternativa: JSON.stringify(['Falta vírgula após "João"', 'Sintaxe do objeto', 'Palavra reservada', 'Sem erro']),
      alt_correta: 0,
      explicacao: 'Objetos JavaScript precisam de vírgulas entre propriedades.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 2,
      tipo: 'multipla_escolha',
      categoria: 'Template Literals',
      pergunta: 'Como interpolar variáveis em strings ES6?',
      alternativa: JSON.stringify([
        '`Olá ${nome}`',
        '"Olá " + nome',
        '"Olá {nome}"',
        '\'Olá ${nome}\''
      ]),
      alt_correta: 0,
      explicacao: 'Template literals usam backticks e ${} para interpolação.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 2,
      tipo: 'output_codigo',
      categoria: 'Spread Operator',
      pergunta: 'Qual o resultado?',
      codigo: 'const arr = [1, 2];\nconst arr2 = [...arr, 3];\nconsole.log(arr2)',
      alternativa: JSON.stringify(['[1, 2, 3]', '[1, 2, [3]]', '[[1, 2], 3]', 'Erro']),
      alt_correta: 0,
      explicacao: 'Spread operator (...) expande os elementos do array.'
    },

    // === NÍVEL 3 - DIFÍCIL ===
    {
      linguagem_id: jsId,
      dificuldade: 3,
      tipo: 'multipla_escolha',
      categoria: 'Async/Await',
      pergunta: 'O que async/await faz em JavaScript?',
      alternativa: JSON.stringify([
        'Torna código assíncrono mais legível',
        'Acelera o código',
        'Remove callbacks',
        'É apenas sintaxe'
      ]),
      alt_correta: 0,
      explicacao: 'Async/await é syntax sugar para Promises.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 3,
      tipo: 'output_codigo',
      categoria: 'Closures',
      pergunta: 'Qual o resultado?',
      codigo: 'function outer() {\n  let x = 10;\n  return function() { return x; }\n}\nconsole.log(outer()())',
      alternativa: JSON.stringify(['10', 'undefined', 'Erro', 'null']),
      alt_correta: 0,
      explicacao: 'A função interna mantém acesso ao escopo externo (closure).'
    },
    {
      linguagem_id: jsId,
      dificuldade: 3,
      tipo: 'multipla_escolha',
      categoria: 'Event Loop',
      pergunta: 'O que é o Event Loop no JavaScript?',
      alternativa: JSON.stringify([
        'Mecanismo que gerencia execução assíncrona',
        'Um tipo de loop for',
        'Uma função de callback',
        'Um erro comum'
      ]),
      alt_correta: 0,
      explicacao: 'Event Loop coordena a execução de código, eventos e callbacks.'
    },
    {
      linguagem_id: jsId,
      dificuldade: 3,
      tipo: 'output_codigo',
      categoria: 'Destructuring',
      pergunta: 'Qual o resultado?',
      codigo: 'const {a, b = 2} = {a: 1};\nconsole.log(b)',
      alternativa: JSON.stringify(['2', 'undefined', '1', 'Erro']),
      alt_correta: 0,
      explicacao: 'Destructuring com valor padrão: b = 2 quando não existe no objeto.'
    },
  ];

  // 4. QUESTÕES JAVA
  const javaId = linguagens[2].id;

  const questoesJava = [
    {
      linguagem_id: javaId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Sintaxe Básica',
      pergunta: 'Como você declara o método principal em Java?',
      alternativa: JSON.stringify([
        'public static void main(String[] args)',
        'function main()',
        'def main():',
        'main() {}'
      ]),
      alt_correta: 0,
      explicacao: 'O método main é o ponto de entrada de programas Java.'
    },
    {
      linguagem_id: javaId,
      dificuldade: 1,
      tipo: 'multipla_escolha',
      categoria: 'Tipos de Dados',
      pergunta: 'Qual é o tipo de dado para números inteiros em Java?',
      alternativa: JSON.stringify(['int', 'integer', 'number', 'num']),
      alt_correta: 0,
      explicacao: 'int é o tipo primitivo para números inteiros em Java.'
    },
    {
      linguagem_id: javaId,
      dificuldade: 2,
      tipo: 'multipla_escolha',
      categoria: 'POO',
      pergunta: 'Qual palavra-chave é usada para herança em Java?',
      alternativa: JSON.stringify(['extends', 'inherits', 'implements', 'super']),
      alt_correta: 0,
      explicacao: 'extends é usado para herança de classes.'
    },
    {
      linguagem_id: javaId,
      dificuldade: 2,
      tipo: 'verdadeiro_falso',
      categoria: 'Modificadores',
      pergunta: 'Em Java, variáveis podem ser declaradas como final?',
      alternativa: JSON.stringify(['Verdadeiro', 'Falso']),
      alt_correta: 0,
      explicacao: 'final torna a variável constante (imutável).'
    },
    {
      linguagem_id: javaId,
      dificuldade: 3,
      tipo: 'multipla_escolha',
      categoria: 'Interfaces',
      pergunta: 'Qual a diferença entre interface e classe abstrata?',
      alternativa: JSON.stringify([
        'Interface não pode ter implementação de métodos (antes do Java 8)',
        'São exatamente iguais',
        'Interface é mais lenta',
        'Classe abstrata não pode ter métodos'
      ]),
      alt_correta: 0,
      explicacao: 'Interfaces definem contratos, classes abstratas podem ter implementação.'
    },
    {
      linguagem_id: javaId,
      dificuldade: 3,
      tipo: 'multipla_escolha',
      categoria: 'Exceções',
      pergunta: 'Qual bloco é SEMPRE executado em try-catch-finally?',
      alternativa: JSON.stringify(['finally', 'try', 'catch', 'Nenhum']),
      alt_correta: 0,
      explicacao: 'O bloco finally sempre executa, mesmo com exceções.'
    },
  ];

  // 5. INSERIR TODAS AS QUESTÕES
  console.log('📝 Criando questões...');

  // Deletar questões antigas (opcional - apenas em desenvolvimento)
  // await prisma.perguntas.deleteMany({});

  await prisma.perguntas.createMany({
    data: [...questoesPython, ...questoesJS, ...questoesJava],
  });

  console.log('✅ Seed concluído com sucesso!');
  
  // Estatísticas
  const total = await prisma.perguntas.count();
  const porLinguagem = await Promise.all(
    linguagens.map(async (lang) => ({
      nome: lang.nome,
      total: await prisma.perguntas.count({ where: { linguagem_id: lang.id } })
    }))
  );

  console.log(`\n📊 Estatísticas:`);
  console.log(`Total de questões: ${total}`);
  porLinguagem.forEach(lang => {
    if (lang.total > 0) {
      console.log(`  - ${lang.nome}: ${lang.total} questões`);
    }
  });
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });