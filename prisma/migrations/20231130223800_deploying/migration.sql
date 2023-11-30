-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('Adm', 'User') NOT NULL DEFAULT 'User',
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proprietario` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `tel` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `enderecoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Proprietario_id_key`(`id`),
    UNIQUE INDEX `Proprietario_cpf_key`(`cpf`),
    UNIQUE INDEX `Proprietario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vinculo` (
    `id` VARCHAR(191) NOT NULL,
    `imovelId` VARCHAR(191) NOT NULL,
    `proprietarioId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vinculo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imovel` (
    `id` VARCHAR(191) NOT NULL,
    `icm` VARCHAR(20) NOT NULL,
    `tipo` ENUM('Casa', 'Apartamento', 'Terreno', 'Lote', 'Ponto', 'Rural') NOT NULL,
    `enderecoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Imovel_id_key`(`id`),
    UNIQUE INDEX `Imovel_icm_key`(`icm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluga` (
    `id` VARCHAR(191) NOT NULL,
    `imovelId` VARCHAR(191) NOT NULL,
    `inquilinoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Aluga_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquilino` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tel` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `enderecoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Inquilino_id_key`(`id`),
    UNIQUE INDEX `Inquilino_cpf_key`(`cpf`),
    UNIQUE INDEX `Inquilino_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vistoriador` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tel` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `enderecoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vistoriador_id_key`(`id`),
    UNIQUE INDEX `Vistoriador_cpf_key`(`cpf`),
    UNIQUE INDEX `Vistoriador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comodo` (
    `id` VARCHAR(191) NOT NULL,
    `imovelId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('Sala', 'Cozinha', 'Quarto', 'Banheiro', 'Servico', 'Sacada', 'Escada', 'Porao', 'Copa', 'Corredor', 'Garagem', 'Outro') NOT NULL,
    `numero` INTEGER NOT NULL,

    UNIQUE INDEX `Comodo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Componente` (
    `id` VARCHAR(191) NOT NULL,
    `comodoId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('Piso', 'Parede', 'Interruptor', 'Tomada', 'Teto', 'Rodape', 'Base', 'Porta', 'Janela', 'Macaneta', 'Fechadura', 'Item') NOT NULL,
    `obs` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `cor` ENUM('Branco', 'Preto', 'Cinza', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Marrom', 'Laranja', 'Roxo', 'Rosa', 'Outro') NOT NULL,
    `estado` ENUM('IP', 'IA', 'NP', 'NA', 'UP', 'UA') NOT NULL,
    `material` ENUM('Madeira', 'Alvenaria', 'Metal', 'Vidro', 'Outro') NOT NULL,

    UNIQUE INDEX `Componente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Endereco_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vistoria` (
    `id` VARCHAR(191) NOT NULL,
    `vistoriadorId` VARCHAR(191) NOT NULL,
    `imovelId` VARCHAR(191) NOT NULL,
    `componenteId` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Vistoria_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Proprietario` ADD CONSTRAINT `Proprietario_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculo` ADD CONSTRAINT `Vinculo_proprietarioId_fkey` FOREIGN KEY (`proprietarioId`) REFERENCES `Proprietario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculo` ADD CONSTRAINT `Vinculo_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `Imovel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluga` ADD CONSTRAINT `Aluga_inquilinoId_fkey` FOREIGN KEY (`inquilinoId`) REFERENCES `Inquilino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluga` ADD CONSTRAINT `Aluga_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `Imovel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquilino` ADD CONSTRAINT `Inquilino_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vistoriador` ADD CONSTRAINT `Vistoriador_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comodo` ADD CONSTRAINT `Comodo_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `Imovel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Componente` ADD CONSTRAINT `Componente_comodoId_fkey` FOREIGN KEY (`comodoId`) REFERENCES `Comodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vistoria` ADD CONSTRAINT `Vistoria_vistoriadorId_fkey` FOREIGN KEY (`vistoriadorId`) REFERENCES `Vistoriador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vistoria` ADD CONSTRAINT `Vistoria_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `Imovel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vistoria` ADD CONSTRAINT `Vistoria_componenteId_fkey` FOREIGN KEY (`componenteId`) REFERENCES `Componente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
