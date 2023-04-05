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
import cookie from "@fastify/cookie";

dotenv.config();

const prisma = new PrismaClient();

const user = await prisma.user.findUnique({
  where: { username: "Sbit" },
});

const fastify = Fastify({ logger: true });
await fastify.register(cors, {
  origin: true,
  credentials: true,
});

await fastify.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {},
});

fastify.post("/login", async (request, reply) => {
  const { username, password } = request.body;
  const isAuthenticated =
    username === user.username &&
    (await bcrypt.compare(password, user.password));

  if (!isAuthenticated) {
    reply.status(400).send({ message: "Login failed" });
  }

  const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET);

  const token = jwt.sign({ username: user.username }, process.env.SECRET, {
    expiresIn: "1h",
  });

  reply
    .cookie("refresh-token", refreshToken, {
      httpOnly: true,
    })
    .send({ token });
});

fastify.post("/auth", async (request, reply) => {
  const { token } = request.body;
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (decoded) {
      reply.send({ token });
    }
  } catch {
    try {
      const refreshToken = request.cookies["refresh-token"];
      const refreshDecoded = await jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );
      if (refreshDecoded) {
        const newToken = jwt.sign(
          { username: user.username },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        reply.send({ token: newToken });
      }
    } catch {
      reply.status(400).send({ message: "Auth failed" });
    }
  }
});

const typeDefs = await readFile("./schema.graphql", { encoding: "utf-8" });
const resolvers = {
  Query: {
    getSuppliers: async () => prisma.supplier.findMany(),

    getUserByName: async (_, { username }) =>
      prisma.user.findUnique({
        where: {
          username,
        },
      }),
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

    updatePassword: async (_, { username, password }) => {
      await prisma.user.update({
        where: {
          username,
        },
        data: { password },
      });
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
