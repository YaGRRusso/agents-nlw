# Agents NLW

This project is a backend service developed during the Next Level Week (NLW) event by Rocketseat. It allows users to create rooms, upload audio files, and ask questions, which are then processed by an AI service (Google Gemini) to generate answers based on the audio content.

## Requirements

- [Node.js](https://nodejs.org/) (v20.x or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/agents-nlw"
GEMINI_KEY="your-google-gemini-api-key"
```

- `PORT`: The port the server will run on.
- `DATABASE_URL`: The connection string for the PostgreSQL database.
- `GEMINI_KEY`: Your API key for the Google Gemini service.

## Available Scripts

- `start:dev`: Starts the server in development mode with hot-reloading.
- `start:prod`: Starts the server in production mode.
- `db:start`: Starts the PostgreSQL database using Docker Compose.
- `db:stop`: Stops the PostgreSQL database container.
- `db:seed`: Seeds the database with initial data.
- `db:studio`: Opens the Drizzle Studio to view and manage the database.
- `db:generate`: Generates database migration files based on schema changes.
- `db:migrate`: Applies pending database migrations.

## Folder Structure

```
.
├── docker/
│   └── setup.sql       # SQL script for initial database setup
├── src/
│   ├── db/
│   │   ├── migrations/ # Database migration files
│   │   ├── schema/     # Drizzle ORM schema definitions
│   │   ├── connection.ts # Database connection setup
│   │   └── seed.ts       # Database seeding script
│   ├── http/
│   │   └── routes/     # API route definitions
│   ├── services/
│   │   └── gemini.ts   # Service for interacting with Google Gemini AI
│   ├── env.ts          # Environment variable validation (Zod)
│   └── server.ts       # Main server file (Fastify)
├── biome.jsonc         # Biome configuration (linter/formatter)
├── drizzle.config.ts   # Drizzle ORM configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

- **docker**: Contains Docker-related files, like the initial database setup script.
- **src**: Contains the main source code of the application.
- **src/db**: Handles all database-related logic, including schemas, migrations, and seeding.
- **src/http**: Defines the API endpoints (routes) for the application.
- **src/services**: Contains services that provide business logic, such as interacting with external APIs like Gemini.

## Libraries

### Main Dependencies

- **[Fastify](https://www.fastify.io/)**: A fast and low overhead web framework for Node.js. Used to build the API.
- **[Drizzle ORM](https://orm.drizzle.team/)**: A TypeScript ORM for SQL databases. Used for database access and schema management.
- **[Postgres.js](https://github.com/porsager/postgres)**: A full-featured PostgreSQL client for Node.js.
- **[@google/genai](https://github.com/google/generative-ai-js)**: The official Google AI JavaScript SDK for interacting with the Gemini API.
- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library. Used for validating environment variables and API request bodies.
- **[@fastify/cors](https://github.com/fastify/fastify-cors)**: A Fastify plugin to enable Cross-Origin Resource Sharing (CORS).
- **[@fastify/multipart](https://github.com/fastify/fastify-multipart)**: A Fastify plugin for handling multipart requests, used for file uploads.

### Development Dependencies

- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Drizzle Kit](https://orm.drizzle.team/kit/overview)**: A CLI tool for Drizzle ORM to manage database migrations.
- **[@biomejs/biome](https://biomejs.dev/)**: A fast formatter and linter for web projects.
- **[Ultracite](https://github.com/ultracite/ultracite)**: A code quality tool.
- **[Husky](https://typicode.github.io/husky/)**: A tool to run scripts on Git hooks.
- **[lint-staged](https://github.com/okonet/lint-staged)**: A tool to run linters on staged files.
