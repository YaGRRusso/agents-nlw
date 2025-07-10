import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const createRoomQuestion: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:id/questions',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { question } = request.body;

      const res = await db
        .insert(schema.questions)
        .values({
          roomId: id,
          question,
        })
        .returning({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createdAt: schema.questions.createdAt,
        });

      return reply.status(201).send(res);
    }
  );
};
