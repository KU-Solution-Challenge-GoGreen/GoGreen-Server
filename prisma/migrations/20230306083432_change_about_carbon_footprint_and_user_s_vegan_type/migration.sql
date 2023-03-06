/*
  Warnings:

  - You are about to drop the column `carbon_footprint` on the `ingredient_category` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `recipe` table. All the data in the column will be lost.
  - You are about to alter the column `carbon_footprint` on the `recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `weight` on the `recipe_ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_type_id_fkey";

-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "carbon_footprint" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ingredient_category" DROP COLUMN "carbon_footprint";

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "photo",
ALTER COLUMN "carbon_footprint" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "recipe_ingredient" DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "type_id";
