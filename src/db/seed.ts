/** biome-ignore-all lint/suspicious/noConsole: only dev */
import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.ts';
import { schema } from './schema/index.ts';

await reset(db, schema);
await seed(db, schema).refine(() => {
  return {
    rooms: {
      count: 5,
      with: {
        questions: 5,
      },
    },
  };
});

await sql.end();

console.log('Seeded Successfully!');
