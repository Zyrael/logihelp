/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN "address" TEXT;
ALTER TABLE "Supplier" ADD COLUMN "contacts" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Address";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contact";
PRAGMA foreign_keys=on;
