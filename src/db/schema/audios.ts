import { pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.ts';

export const audios = pgTable('audios', {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  transcription: text().notNull(),
  embeddings: vector({ dimensions: 768 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
