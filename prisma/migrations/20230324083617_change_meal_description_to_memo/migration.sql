/*
  Warnings:

  - You are about to drop the column `description` on the `meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meal" ADD COLUMN "memo" TEXT;

/* copy data from description to memo */
UPDATE "meal" SET "memo" = "description";

/* drop description column */
ALTER TABLE "meal" DROP COLUMN "description";


