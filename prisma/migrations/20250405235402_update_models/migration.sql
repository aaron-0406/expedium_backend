/*
  Warnings:

  - You are about to drop the `STATE_CONNECTIONS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TYPE_REACTION` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PERMISSIONSToROLES` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CONNECTIONS` DROP FOREIGN KEY `CONNECTIONS_state_id_state_fkey`;

-- DropForeignKey
ALTER TABLE `POSTS_COMMENTS_REACTIONS` DROP FOREIGN KEY `POSTS_COMMENTS_REACTIONS_type_reaction_id_type_reaction_fkey`;

-- DropForeignKey
ALTER TABLE `_PERMISSIONSToROLES` DROP FOREIGN KEY `_PERMISSIONSToROLES_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PERMISSIONSToROLES` DROP FOREIGN KEY `_PERMISSIONSToROLES_B_fkey`;

-- DropIndex
DROP INDEX `CONNECTIONS_state_id_state_fkey` ON `CONNECTIONS`;

-- DropIndex
DROP INDEX `POSTS_COMMENTS_REACTIONS_type_reaction_id_type_reaction_fkey` ON `POSTS_COMMENTS_REACTIONS`;

-- AlterTable
ALTER TABLE `COMMUNITIES` ADD COLUMN `privacityId` INTEGER NULL;

-- DropTable
DROP TABLE `STATE_CONNECTIONS`;

-- DropTable
DROP TABLE `TYPE_REACTION`;

-- DropTable
DROP TABLE `_PERMISSIONSToROLES`;

-- CreateTable
CREATE TABLE `state_connections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `color` VARCHAR(45) NOT NULL,
    `icon` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_reaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `color` VARCHAR(45) NOT NULL,
    `icon` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_permissionsToroles` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_permissionsToroles_AB_unique`(`A`, `B`),
    INDEX `_permissionsToroles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CONNECTIONS` ADD CONSTRAINT `CONNECTIONS_state_id_state_fkey` FOREIGN KEY (`state_id_state`) REFERENCES `state_connections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POSTS_COMMENTS_REACTIONS` ADD CONSTRAINT `POSTS_COMMENTS_REACTIONS_type_reaction_id_type_reaction_fkey` FOREIGN KEY (`type_reaction_id_type_reaction`) REFERENCES `type_reaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_permissionsToroles` ADD CONSTRAINT `_permissionsToroles_A_fkey` FOREIGN KEY (`A`) REFERENCES `PERMISSIONS`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_permissionsToroles` ADD CONSTRAINT `_permissionsToroles_B_fkey` FOREIGN KEY (`B`) REFERENCES `ROLES`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
