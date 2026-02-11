# replit.md

## Overview

This is a marketing website for **D&C Motor It Gate Automation**, a gate and access automation company based in Cape Town, South Africa. The site is designed as a premium, ultra-modern landing page with a dark theme, glassmorphism effects, and smooth animations — inspired by Tesla/Stripe/Linear aesthetics. It includes a contact inquiry form that submits to a backend API. The project uses a full-stack TypeScript architecture with React on the frontend and Express on the backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure

The project follows a three-directory monorepo pattern:

- **`client/`** — React frontend (Vite-powered SPA)
- **`server/`** — Express backend API
- **`shared/`** — Shared types, schemas, and route definitions used by both client and server

### Frontend (`client/src/`)

- **Framework**: React with TypeScript
- **Bundler**: Vite (config in `vite.config.ts`)
- **Routing**: Wouter (lightweight React router) — currently has Home and 404 pages
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui component library (New York style), class-variance-authority for component variants
- **State/Data**: TanStack React Query for server state, React Hook Form with Zod resolvers for form handling
- **Animations**: Framer Motion
- **UI Components**: Full shadcn/ui component library installed in `client/src/components/ui/`
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend (`server/`)

- **Framework**: Express 5 running on Node.js via tsx
- **Entry point**: `server/index.ts` creates HTTP server, registers routes, and serves static files in production or sets up Vite dev middleware in development
- **API Routes**: Defined in `server/routes.ts` — currently one endpoint: `POST /api/inquiries` for contact form submissions, plus a health check at `GET /api/health`
- **Storage**: Currently uses in-memory storage (`MemStorage` class in `server/storage.ts`) with a `IStorage` interface. This can be swapped to a database-backed implementation.
- **Static serving**: In production, serves built frontend from `dist/public/`

### Shared Layer (`shared/`)

- **`schema.ts`**: Drizzle ORM schema definitions and Zod validation schemas (via `drizzle-zod`). Defines `inquiries` table with fields: id, name, email, phone, message, createdAt.
- **`routes.ts`**: Type-safe API route definitions with input/output schemas. Acts as a contract between frontend and backend.

### Database

- **ORM**: Drizzle ORM configured for PostgreSQL
- **Config**: `drizzle.config.ts` points to `shared/schema.ts`, outputs migrations to `./migrations/`
- **Connection**: Uses `DATABASE_URL` environment variable with `pg` Pool in `server/db.ts`
- **Schema push**: Run `npm run db:push` to sync schema to database
- **Current state**: The storage layer currently uses in-memory storage (`MemStorage`), not the database. The Drizzle/Postgres setup is wired but the routes use `MemStorage`.

### Build Process

- **Development**: `npm run dev` — runs tsx with Vite dev server middleware for HMR
- **Production build**: `npm run build` — runs `script/build.ts` which builds the client with Vite and bundles the server with esbuild into `dist/index.cjs`
- **Production start**: `npm run start` — runs `node dist/index.cjs`

### Key Design Decisions

1. **Shared schema as single source of truth**: The Drizzle schema generates both database types and Zod validation schemas, ensuring frontend form validation matches backend expectations.
2. **In-memory storage with interface abstraction**: The `IStorage` interface in `server/storage.ts` allows easy swapping from `MemStorage` to a database-backed implementation without changing route handlers.
3. **Type-safe API contract**: `shared/routes.ts` defines API paths, methods, and input/output schemas in one place, used by both client and server.

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable. Used with Drizzle ORM and `pg` driver.
- **Google Fonts**: Loads Architects Daughter, DM Sans, Fira Code, and Geist Mono fonts from Google Fonts CDN.
- **No authentication**: The app has no auth system currently.
- **No external API integrations**: No third-party service APIs (email, payment, etc.) are currently integrated.
- **Replit plugins**: Uses `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, and `@replit/vite-plugin-dev-banner` in development.