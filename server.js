import Fastify from 'fastify';
import { ApolloServer } from '@apollo/server';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';
import cookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';

dotenv.config();

const prisma = new PrismaClient();

const fastify = Fastify({ logger: true });
await fastify.register(cors, {
  origin: true,
  credentials: true,
});

await fastify.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {},
});

if (process.env.NODE_ENV === 'production') {
  fastify.register(fastifyStatic, { root: `${process.cwd()}/dist` });

  fastify.get('/', (request, reply) => {
    reply.sendFile('index.html');
  });
}

fastify.post('/login', async (request, reply) => {
  const { username, password } = request.body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  const isAuthenticated = await bcrypt.compare(password, user.password);

  if (!isAuthenticated) {
    reply.status(400).send({ message: 'Login failed' });
  }

  const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET);

  const token = jwt.sign({ username: user.username }, process.env.SECRET, {
    expiresIn: '1s',
  });

  reply
    .cookie('refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 7776000,
    })
    .send({ token });
});

fastify.get('/logout', async (request, reply) => {
  reply
    .cookie('refresh-token', '', {
      maxAge: -1,
    })
    .send({ logout: 'ok' });
});

fastify.post('/auth', async (request, reply) => {
  const { token } = request.body;
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (decoded) {
      reply.send({ token });
    }
  } catch {
    try {
      const refreshToken = request.cookies['refresh-token'];
      const decodedRefresh = await jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );
      if (decodedRefresh) {
        console.log(ok);
        const newToken = jwt.sign(
          { username: user.username },
          process.env.SECRET,
          { expiresIn: '1h' }
        );
        reply.send({ token: newToken });
      }
    } catch {
      reply.status(400).send({ message: 'Auth failed' });
    }
  }
});

const sortingMethod = {
  asc: (supplierA, supplierB) => {
    const nameA = supplierA.name.toLowerCase();
    const nameB = supplierB.name.toLowerCase();
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  },
  desc: (supplierA, supplierB) => {
    const nameA = supplierA.name.toLowerCase();
    const nameB = supplierB.name.toLowerCase();
    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    return 0;
  },
};

const typeDefs = await readFile('./schema.graphql', { encoding: 'utf-8' });
const resolvers = {
  Query: {
    getSuppliers: async (_, { sort = 'asc' }) => {
      const suppliers = await prisma.supplier.findMany();
      return [...suppliers].sort(sortingMethod[sort]);
    },

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

    createUser: async (_, { username, password }) => {
      await prisma.user.create({
        data: {
          username,
          password: await bcrypt.hash(password, 10),
        },
      });
    },

    updatePassword: async (_, { username, password }) => {
      await prisma.user.update({
        where: {
          username,
        },
        data: { password: await bcrypt.hash(password, 10) },
      });
    },
  },
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [fastifyApolloDrainPlugin(fastify)],
  introspection: process.env.NODE_ENV === 'development',
});
await apollo.start();

await fastify.register(fastifyApollo(apollo));
const start = async () => {
  try {
    await fastify.listen({ port: 80, host: '0.0.0.0' });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
};

start();
