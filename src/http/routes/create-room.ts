import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const createRoom: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body;

      const res = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning({
          id: schema.rooms.id,
          name: schema.rooms.name,
          description: schema.rooms.description,
        });

      return reply.status(201).send(res);
    }
  );
};
