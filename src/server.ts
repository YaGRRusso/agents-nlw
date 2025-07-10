/** biome-ignore-all lint/suspicious/noConsole: server file */
import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { createRoom } from './http/routes/create-room.ts';
import { getRooms } from './http/routes/get-rooms.ts';
import { getRoomQuestions } from './http/routes/get-room-questions.ts';
import { createRoomQuestion } from './http/routes/create-room-question.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Total-Count'],
  credentials: true,
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', async (_request, reply) => {
  return await reply.status(200).send({ status: 'OK' });
});

app.register(getRooms);
app.register(createRoom);
app.register(getRoomQuestions);
app.register(createRoomQuestion);

app.listen({ port: env.PORT }, (err, address) => {
  console.log(`HTTP Server Running\n${address}`);
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
