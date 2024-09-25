/*
  Warnings:

  - You are about to drop the column `transformationUrl` on the `ImageSchema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImageSchema" DROP COLUMN "transformationUrl",
ADD COLUMN     "transformationURL" TEXT;
