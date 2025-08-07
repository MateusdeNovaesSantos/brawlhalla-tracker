-- CreateTable
CREATE TABLE `Legend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Legend_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Weapon_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Color_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LegendColorOwnership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `legendId` INTEGER NOT NULL,
    `colorId` INTEGER NOT NULL,
    `hasColor` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `LegendColorOwnership_legendId_colorId_key`(`legendId`, `colorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gold` INTEGER NOT NULL,
    `xp` INTEGER NOT NULL,
    `victory` BOOLEAN NOT NULL,
    `legendId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LegendWeapons` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LegendWeapons_AB_unique`(`A`, `B`),
    INDEX `_LegendWeapons_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LegendColorOwnership` ADD CONSTRAINT `LegendColorOwnership_legendId_fkey` FOREIGN KEY (`legendId`) REFERENCES `Legend`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LegendColorOwnership` ADD CONSTRAINT `LegendColorOwnership_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_legendId_fkey` FOREIGN KEY (`legendId`) REFERENCES `Legend`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LegendWeapons` ADD CONSTRAINT `_LegendWeapons_A_fkey` FOREIGN KEY (`A`) REFERENCES `Legend`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LegendWeapons` ADD CONSTRAINT `_LegendWeapons_B_fkey` FOREIGN KEY (`B`) REFERENCES `Weapon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
