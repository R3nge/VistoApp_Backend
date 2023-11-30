/*
  Warnings:

  - You are about to drop the `manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member_project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member_task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `member_project` DROP FOREIGN KEY `Member_Project_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `member_project` DROP FOREIGN KEY `Member_Project_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `member_task` DROP FOREIGN KEY `Member_Task_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `member_task` DROP FOREIGN KEY `Member_Task_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `member_task` DROP FOREIGN KEY `Member_Task_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_managerId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- DropTable
DROP TABLE `manager`;

-- DropTable
DROP TABLE `member`;

-- DropTable
DROP TABLE `member_project`;

-- DropTable
DROP TABLE `member_task`;

-- DropTable
DROP TABLE `project`;

-- DropTable
DROP TABLE `task`;
