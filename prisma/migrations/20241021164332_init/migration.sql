-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `nickName` VARCHAR(255) NOT NULL,
    `birthDay` DATETIME(3) NOT NULL,
    `genderId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gender` (
    `id` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Gender_gender_key`(`gender`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `Gender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
