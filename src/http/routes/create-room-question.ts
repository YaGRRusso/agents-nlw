import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateAnswer, generateEmbeddings } from '../../services/gemini.ts';

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

      const embeddings = await generateEmbeddings(question);
      const embeddingsAsString = `[${embeddings.join(',')}]`;

      const chunks = await db
        .select({
          id: schema.audios.id,
          transcription: schema.audios.transcription,
          similarity: sql<number>`1 - (${schema.audios.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
        .from(schema.audios)
        .where(
          and(
            eq(schema.audios.roomId, id),
            sql`1 - (${schema.audios.embeddings} <=> ${embeddingsAsString}::vector) < 0.7`
          )
        )
        .orderBy(
          sql`(${schema.audios.embeddings} <=> ${embeddingsAsString}::vector)`
        )
        .limit(3);

      let answer: string | null = null;

      if (chunks.length > 0) {
        const transcriptions = chunks.map((chunk) => chunk.transcription);
        answer = await generateAnswer(question, transcriptions);
      }

      const res = await db
        .insert(schema.questions)
        .values({
          roomId: id,
          question,
          answer,
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
