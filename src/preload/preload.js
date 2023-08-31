import { ipcMain } from 'electron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: '../prisma/dev.db',
    },
  },
});

const getSuppliers = async () => await prisma.supplier.findMany();

ipcMain.handle('getsuppliers', getSuppliers);
