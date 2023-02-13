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
    addSupplier: async (
      _,
      { name, url, additionalData, addresses = "[]", contacts = "[]" }
    ) => {
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

      JSON.parse(contacts).forEach(async (contact) => {
        await prisma.contact.create({
          data: {
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            supplierId: supplier.id,
          },
        });
      });

      return supplier;
    },

    updateSupplier: async (
      _,
      { id, name, url, additionalData, addresses = "[]", contacts = "[]" }
    ) => {
      const updatedSupplier = await prisma.supplier.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          url,
          additionalData,
        },
      });

      JSON.parse(addresses).forEach(async (address) => {
        await prisma.address.create({
          data: {
            name: address.name,
            address: address.address,
            supplierId: parseInt(id, 10),
          },
        });
      });

      JSON.parse(contacts).forEach(async (contact) => {
        await prisma.contact.create({
          data: {
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            supplierId: parseInt(id, 10),
          },
        });
      });

      return updatedSupplier;
    },

    updateAddress: async (_, { id, name, address }) => {
      const updatedAddress = await prisma.address.update({
        where: { id },
        data: { name, address },
      });
      return updatedAddress;
    },

    updateContact: async (_, { id, name, phoneNumber }) => {
      const updatedContact = await prisma.contact.update({
        where: { id },
        data: { name, phoneNumber },
      });
      return updatedContact;
    },

    deleteSupplier: async (_, { id }) => {
      await prisma.address.deleteMany({
        where: {
          supplierId: parseInt(id, 10),
        },
      });

      await prisma.contact.deleteMany({
        where: {
          supplierId: parseInt(id, 10),
        },
      });

      await prisma.supplier.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

      return true;
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
