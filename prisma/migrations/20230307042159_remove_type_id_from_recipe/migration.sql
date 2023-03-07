/*
  Warnings:

  - You are about to drop the column `type_id` on the `recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_type_id_fkey";

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "type_id";
