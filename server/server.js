import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";

const typeDefs = await readFile("./schema.graphql", { encoding: "utf-8" });

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getSuppliers: async () => {
      const suppliers = await prisma.supplier.findMany({
        include: {
          addresses: true,
          contacts: true,
        },
      });
      return suppliers;
    },
  },

  Mutation: {
    addSupplier: async (_, { name, url, additionalData, addresses }) => {
      const supplier = await prisma.supplier.create({
        data: { name, url, additionalData },
      });

      JSON.parse(addresses).forEach(async (address) => {
        await prisma.address.create({
          data: {
            name: address.name,
            address: address.address,
            supplierId: supplier.id,
          },
        });
      });

      return supplier;
    },

    updateSupplier: async (_, { id, url, additionalData }) => {
      const supplier = await prisma.supplier.update({
        where: { id: parseInt(id, 10) },
        data: {
          url,
          additionalData,
        },
      });

      return supplier;
    },

    addAddressToSupplier: async (_, { id, name, address }) => {
      const supplier = await prisma.supplier.update({
        where: { id: parseInt(id, 10) },
        data: {
          addresses: {
            create: {
              name,
              address,
            },
          },
        },
      });

      return supplier;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
