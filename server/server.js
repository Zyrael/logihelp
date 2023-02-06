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
    addSupplier: async (_, { name, phoneNumber, webSite, additionalData }) => {
      const supplier = await prisma.supplier.create({
        data: { name, phoneNumber, webSite, additionalData },
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
