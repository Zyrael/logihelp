/*
  Warnings:

  - You are about to drop the column `supplier_id` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `additional_data` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `supplierId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "phone_number" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    CONSTRAINT "Contact_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("id", "name", "phone_number") SELECT "id", "name", "phone_number" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    CONSTRAINT "Address_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("address", "id", "name") SELECT "address", "id", "name" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE TABLE "new_Supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "additionalData" TEXT
);
INSERT INTO "new_Supplier" ("id", "name", "url") SELECT "id", "name", "url" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
