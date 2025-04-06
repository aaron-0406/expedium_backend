/*
  Warnings:

  - You are about to drop the `state_connections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CONNECTIONS` DROP FOREIGN KEY `CONNECTIONS_state_id_state_fkey`;

-- DropIndex
DROP INDEX `CONNECTIONS_state_id_state_fkey` ON `CONNECTIONS`;

-- DropTable
DROP TABLE `state_connections`;

-- CreateTable
CREATE TABLE `STATE_CONNECTIONS` (
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
ALTER TABLE `CONNECTIONS` ADD CONSTRAINT `CONNECTIONS_state_id_state_fkey` FOREIGN KEY (`state_id_state`) REFERENCES `STATE_CONNECTIONS`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
