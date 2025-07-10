import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';

export const uploadRoomAudio: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:id/audio',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      // const { id } = request.params;

      const audio = await request.file();

      if (!audio) {
        throw new Error('NO_AUDIO_FILE');
      }

      return reply.status(201).send('ok');
    }
  );
};
