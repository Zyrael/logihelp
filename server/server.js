import Fastify from "fastify";
import { ApolloServer } from "@apollo/server";
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readFile } from "fs/promises";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });
await fastify.register(cors, {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
  ],
});

fastify.post("/login", async (request, reply) => {
  const { username, password } = request.body;
  const isAuthenticated =
    username === "Sbit" &&
    (await bcrypt.compare(password, process.env.HASHED_PASSWORD));

  if (!isAuthenticated) {
    reply.status(400).send({ message: "Login failed" });
  }

  const token = jwt.sign({ username }, process.env.SECRET, {
    expiresIn: "60000",
  });

  reply.send({ token });
});

fastify.post("/auth", async (request, reply) => {
  const { token } = request.body;
  console.log(token);
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    reply.send({ isAuthenticated: "true" });
  } catch {
    console.log("error");
    reply.status(400).send({ message: "Auth failed" });
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
