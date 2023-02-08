/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `additionalData` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `webSite` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Address` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "phone_number" TEXT NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    CONSTRAINT "Contact_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("id", "name") SELECT "id", "name" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE TABLE "new_Supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "additional_data" TEXT
);
INSERT INTO "new_Supplier" ("id", "name") SELECT "id", "name" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    CONSTRAINT "Address_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("address", "id", "name") SELECT "address", "id", "name" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
