/*
  Warnings:

  - You are about to drop the column `time` on the `meal` table. All the data in the column will be lost.
  - Added the required column `date` to the `meal` table without a default value. This is not possible if the table is not empty.

*/
-- add date column
ALTER TABLE "meal"
ADD COLUMN     "date" DATE;

-- copy time to date
UPDATE "meal" SET "date" = "time"::DATE;


-- set not null
ALTER TABLE "meal"
ALTER COLUMN "date" SET NOT NULL;

-- drop time column
ALTER TABLE "meal"
DROP COLUMN "time";

-- CreateIndex
CREATE INDEX "meal_user_id_idx" ON "meal"("user_id");
