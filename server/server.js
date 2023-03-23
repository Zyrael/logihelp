import Fastify from "fastify";
import { ApolloServer } from "@apollo/server";
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import { PrismaClient } from "@prisma/client";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();
const fastify = Fastify();
await fastify.register(cors);
await fastify.register(cookie, {
  secret: "my-secret",
  hook: false,
  parseOptions: {},
});

// fastify.get("/login", async (request) => {
//   console.log(request.cookies);
// });

fastify.post("/login", async (request, reply) => {
  const { username, password } = JSON.parse(request.body);
  const loggedIn = username === "admin" && password === "admin";
  if (loggedIn) {
    reply.setCookie("token", "abracadabra").send({ loggedIn });
  } else {
    reply.setCookie("test", "test").send({ loggedIn });
  }
});

const typeDefs = await readFile("./schema.graphql", { encoding: "utf-8" });
const resolvers = {
  Query: {
    getSuppliers: async () => prisma.supplier.findMany(),
  },

  Mutation: {
    addSupplier: async (_, { name, url, additionalData, address, contacts }) =>
      prisma.supplier.create({
        data: { name, url, address, contacts, additionalData },
      }),

    updateSupplier: async (
      _,
      { id, name, url, additionalData, address, contacts }
    ) =>
      prisma.supplier.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          url,
          address,
          contacts,
          additionalData,
        },
      }),

    deleteSupplier: async (_, { id }) => {
      await prisma.supplier.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

      return true;
    },
  },
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [fastifyApolloDrainPlugin(fastify)],
});
await apollo.start();

await fastify.register(fastifyApollo(apollo));

const port = 4000;
const start = async () => {
  try {
    await fastify.listen({ port });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
};

start();
