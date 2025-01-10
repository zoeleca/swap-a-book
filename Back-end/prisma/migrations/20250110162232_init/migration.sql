/*
  Warnings:

  - The `languages` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BookLanguage" AS ENUM ('English', 'Chinese', 'Hindi', 'Spanish', 'French', 'Arabic', 'Bengali', 'Portuguese', 'Russian', 'Urdu', 'Indonesian', 'German', 'Japanese', 'Swahili', 'Marathi', 'Telugu', 'Turkish', 'Korean', 'Tamil', 'Vietnamese');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "languages",
ADD COLUMN     "languages" "BookLanguage"[];

-- DropEnum
DROP TYPE "Language";
