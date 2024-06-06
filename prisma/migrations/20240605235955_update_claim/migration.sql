/*
  Warnings:

  - Added the required column `lostDate` to the `claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "lostDate" TIMESTAMP(3) NOT NULL;
