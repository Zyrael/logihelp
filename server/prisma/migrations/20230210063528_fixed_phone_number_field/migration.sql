/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    CONSTRAINT "Contact_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("id", "name", "supplierId") SELECT "id", "name", "supplierId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
