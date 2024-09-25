/*
  Warnings:

  - You are about to drop the column `secureUrl` on the `ImageSchema` table. All the data in the column will be lost.
  - Added the required column `secureURL` to the `ImageSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageSchema" DROP COLUMN "secureUrl",
ADD COLUMN     "secureURL" TEXT NOT NULL;
