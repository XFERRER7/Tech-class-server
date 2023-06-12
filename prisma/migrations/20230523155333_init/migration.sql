-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "phraseId" TEXT,
    CONSTRAINT "Word_phraseId_fkey" FOREIGN KEY ("phraseId") REFERENCES "Phrase" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Translations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "wordId" TEXT NOT NULL,
    CONSTRAINT "Translations_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Phrase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_phraseId_key" ON "Word"("phraseId");
