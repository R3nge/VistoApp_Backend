-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Adm', 'User');

-- CreateEnum
CREATE TYPE "Tipo_Imovel" AS ENUM ('Casa', 'Apartamento', 'Terreno', 'Lote', 'Ponto', 'Rural');

-- CreateEnum
CREATE TYPE "Tipo_Comodo" AS ENUM ('Sala', 'Cozinha', 'Quarto', 'Banheiro', 'Servico', 'Sacada', 'Escada', 'Porao', 'Copa', 'Corredor', 'Garagem', 'Outro');

-- CreateEnum
CREATE TYPE "Tipo_Componente" AS ENUM ('Piso', 'Parede', 'Interruptor', 'Tomada', 'Teto', 'Rodape', 'Base', 'Porta', 'Janela', 'Macaneta', 'Fechadura', 'Item');

-- CreateEnum
CREATE TYPE "Cor" AS ENUM ('Branco', 'Preto', 'Cinza', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Marrom', 'Laranja', 'Roxo', 'Rosa', 'Outro');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('IP', 'IA', 'NP', 'NA', 'UP', 'UA');

-- CreateEnum
CREATE TYPE "Material" AS ENUM ('Madeira', 'Alvenaria', 'Metal', 'Vidro', 'Outro');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "type" "Role" NOT NULL DEFAULT 'User',
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proprietario" (
    "id" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "tel" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,

    CONSTRAINT "Proprietario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vinculo" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "proprietarioId" TEXT NOT NULL,

    CONSTRAINT "Vinculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imovel" (
    "id" TEXT NOT NULL,
    "icm" VARCHAR(20) NOT NULL,
    "tipo" "Tipo_Imovel" NOT NULL,
    "enderecoId" TEXT NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluga" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "inquilinoId" TEXT NOT NULL,

    CONSTRAINT "Aluga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquilino" (
    "id" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "name" TEXT NOT NULL,
    "tel" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,

    CONSTRAINT "Inquilino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vistoriador" (
    "id" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "nome" TEXT NOT NULL,
    "tel" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,

    CONSTRAINT "Vistoriador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comodo" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "tipo" "Tipo_Comodo" NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "Comodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Componente" (
    "id" TEXT NOT NULL,
    "comodoId" TEXT NOT NULL,
    "tipo" "Tipo_Componente" NOT NULL,
    "obs" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "cor" "Cor" NOT NULL,
    "estado" "Estado" NOT NULL,
    "material" "Material" NOT NULL,

    CONSTRAINT "Componente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vistoria" (
    "id" TEXT NOT NULL,
    "vistoriadorId" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "componenteId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vistoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_id_key" ON "Proprietario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_cpf_key" ON "Proprietario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_email_key" ON "Proprietario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vinculo_id_key" ON "Vinculo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Imovel_id_key" ON "Imovel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Imovel_icm_key" ON "Imovel"("icm");

-- CreateIndex
CREATE UNIQUE INDEX "Aluga_id_key" ON "Aluga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inquilino_id_key" ON "Inquilino"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inquilino_cpf_key" ON "Inquilino"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Inquilino_email_key" ON "Inquilino"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vistoriador_id_key" ON "Vistoriador"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vistoriador_cpf_key" ON "Vistoriador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Vistoriador_email_key" ON "Vistoriador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Comodo_id_key" ON "Comodo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Componente_id_key" ON "Componente"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_id_key" ON "Endereco"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vistoria_id_key" ON "Vistoria"("id");

-- AddForeignKey
ALTER TABLE "Proprietario" ADD CONSTRAINT "Proprietario_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vinculo" ADD CONSTRAINT "Vinculo_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "Proprietario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vinculo" ADD CONSTRAINT "Vinculo_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluga" ADD CONSTRAINT "Aluga_inquilinoId_fkey" FOREIGN KEY ("inquilinoId") REFERENCES "Inquilino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluga" ADD CONSTRAINT "Aluga_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquilino" ADD CONSTRAINT "Inquilino_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vistoriador" ADD CONSTRAINT "Vistoriador_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comodo" ADD CONSTRAINT "Comodo_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Componente" ADD CONSTRAINT "Componente_comodoId_fkey" FOREIGN KEY ("comodoId") REFERENCES "Comodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vistoria" ADD CONSTRAINT "Vistoria_vistoriadorId_fkey" FOREIGN KEY ("vistoriadorId") REFERENCES "Vistoriador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vistoria" ADD CONSTRAINT "Vistoria_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vistoria" ADD CONSTRAINT "Vistoria_componenteId_fkey" FOREIGN KEY ("componenteId") REFERENCES "Componente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
