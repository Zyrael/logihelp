import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  const suppliers = await prisma.supplier.findMany({
    include: {
      addresses: true,
      contacts: true,
    },
  });

  console.dir(suppliers[0], { depth: null });
})().catch((e) => console.error(e));
