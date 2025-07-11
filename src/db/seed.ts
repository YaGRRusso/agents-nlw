/** biome-ignore-all lint/suspicious/noConsole: only dev */
import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.ts';
import { schema } from './schema/index.ts';

const { audioChunks: _audioChunks, ...rest } = schema;

await reset(db, rest);
await seed(db, rest).refine(() => {
  return {
    rooms: {
      count: 3,
      with: {
        questions: 3,
      },
    },
  };
});

await sql.end();

console.log('Seeded Successfully!');
