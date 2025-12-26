/*
  Warnings:

  - You are about to drop the `Linguagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Linguagem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "linguagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Perguntas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linguagem_id" INTEGER NOT NULL,
    "dificuldade" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'multipla_escolha',
    "categoria" TEXT,
    "pergunta" TEXT NOT NULL,
    "alternativa" JSONB NOT NULL,
    "alt_correta" INTEGER NOT NULL,
    "explicacao" TEXT,
    "codigo" TEXT,
    CONSTRAINT "Perguntas_linguagem_id_fkey" FOREIGN KEY ("linguagem_id") REFERENCES "linguagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Perguntas" ("alt_correta", "alternativa", "dificuldade", "id", "linguagem_id", "pergunta") SELECT "alt_correta", "alternativa", "dificuldade", "id", "linguagem_id", "pergunta" FROM "Perguntas";
DROP TABLE "Perguntas";
ALTER TABLE "new_Perguntas" RENAME TO "Perguntas";
CREATE INDEX "Perguntas_linguagem_id_dificuldade_idx" ON "Perguntas"("linguagem_id", "dificuldade");
CREATE INDEX "Perguntas_tipo_idx" ON "Perguntas"("tipo");
CREATE INDEX "Perguntas_categoria_idx" ON "Perguntas"("categoria");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "linguagem_nome_key" ON "linguagem"("nome");
