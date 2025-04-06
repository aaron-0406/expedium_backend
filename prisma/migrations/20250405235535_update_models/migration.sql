/*
  Warnings:

  - You are about to drop the `type_reaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `POSTS_COMMENTS_REACTIONS` DROP FOREIGN KEY `POSTS_COMMENTS_REACTIONS_type_reaction_id_type_reaction_fkey`;

-- DropIndex
DROP INDEX `POSTS_COMMENTS_REACTIONS_type_reaction_id_type_reaction_fkey` ON `POSTS_COMMENTS_REACTIONS`;

-- DropTable
DROP TABLE `type_reaction`;

-- CreateTable
CREATE TABLE `TYPE_REACTION` (
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

-- AddForeignKey
ALTER TABLE `POSTS_COMMENTS_REACTIONS` ADD CONSTRAINT `POSTS_COMMENTS_REACTIONS_type_reaction_id_type_reaction_fkey` FOREIGN KEY (`type_reaction_id_type_reaction`) REFERENCES `TYPE_REACTION`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
