# Seerah App - replit.md

## Overview

Seerah is a multilingual educational web application about the life of Prophet Muhammad ﷺ (the Prophet's Biography / السيرة النبوية). It presents stories from the Prophet's life with quizzes, gamification (points and levels), daily challenges, text-to-speech, embedded YouTube videos, and support for three languages: Arabic (primary), English, and French.

The app is built as a full-stack React + Express application with PWA support and has been configured for native Android deployment via Capacitor. Story content is stored as a static JSON file (`client/src/data/seerah.json`) rather than fetched from a database, making it primarily a content-driven frontend application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (React + Vite)
- **Framework**: React with TypeScript, built using Vite
- **Routing**: `wouter` for client-side routing (lightweight alternative to React Router)
- **UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS (new-york style)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin, with CSS variables for theming (light/dark mode support)
- **State Management**: TanStack React Query for server state; React hooks with localStorage for local state (gamification, daily challenges)
- **Animations**: Framer Motion for page transitions and interactive elements
- **Internationalization**: `react-i18next` with inline translation resources for Arabic, English, and French
- **Fonts**: Google Fonts — Amiri for Arabic content, Outfit for UI elements
- **Directory**: All frontend code lives in `client/src/`, with the entry point at `client/src/main.tsx`

### Key Frontend Features
- **Story System**: Stories loaded from `client/src/data/seerah.json` with multilingual content (title, content, values, questions in ar/en/fr)
- **Quiz System**: MCQ and boolean questions per story, with point awards for correct answers
- **Gamification**: Points-based leveling system (novice → learner → scholar → expert) persisted in localStorage
- **Daily Challenge**: Deterministic daily quiz question based on date seed, completion tracked in localStorage
- **Text-to-Speech**: Browser SpeechSynthesis API for reading stories aloud
- **PWA**: Service worker (`client/public/sw.js`) with offline caching, web manifest for installability

### Backend (Express)
- **Framework**: Express.js with TypeScript, running on Node.js
- **Entry Point**: `server/index.ts`
- **Routes**: `server/routes.ts` — currently minimal, structured for `/api` prefixed routes
- **Static Serving**: In production, serves the built frontend from `dist/public`
- **Dev Server**: Vite dev server integrated via `server/vite.ts` for HMR in development
- **Storage**: `server/storage.ts` — uses in-memory storage (`MemStorage`) by default with a simple User CRUD interface

### Database
- **ORM**: Drizzle ORM configured for PostgreSQL (`drizzle.config.ts`)
- **Schema**: `shared/schema.ts` — currently only has a `users` table with id, username, password
- **Connection**: Requires `DATABASE_URL` environment variable for PostgreSQL
- **Migrations**: Output to `./migrations` directory, managed via `drizzle-kit push`
- **Note**: The app currently uses in-memory storage and doesn't actively use the database for story content. The database is set up for user management but the storage layer defaults to `MemStorage`.

### Build System
- **Client Build**: Vite builds to `dist/public`
- **Server Build**: esbuild bundles the Express server to `dist/index.cjs`, with key dependencies bundled (listed in `script/build.ts` allowlist) and others externalized
- **Scripts**: `npm run dev` for development, `npm run build` for production build, `npm start` for production server

### Mobile (Capacitor)
- **Platform**: Capacitor wraps the web app as a native Android app
- **App ID**: `com.seerah.app`
- **Config**: `capacitor.config.ts` pointing to `dist/public` as web directory
- **Android**: Pre-configured with signing keystore, targeting SDK 34, min SDK 26
- **Note**: Android builds require a local machine with Android SDK — cannot build APK/AAB in Replit

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Core Libraries
- **React 18** with TypeScript
- **Express.js** for the backend server
- **Vite** for frontend bundling and dev server
- **Drizzle ORM** + `drizzle-kit` for PostgreSQL database management
- **TanStack React Query** for data fetching/caching

### UI Framework
- **shadcn/ui** component library (new-york style)
- **Radix UI** primitives (accordion, dialog, dropdown-menu, tabs, toast, tooltip, etc.)
- **Tailwind CSS v4** with `tw-animate-css`
- **Framer Motion** for animations
- **Lucide React** for icons
- **class-variance-authority** + **clsx** + **tailwind-merge** for className utilities

### Internationalization
- **i18next** + **react-i18next** — translations embedded in `client/src/lib/i18n.ts`

### Database
- **PostgreSQL** via `DATABASE_URL` environment variable
- **drizzle-orm** with `pg` driver
- **drizzle-zod** for schema validation with Zod

### PWA & Mobile
- **Service Worker** for offline caching
- **Web App Manifest** for installability
- **Capacitor** (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`) for Android native wrapper

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` for dev error overlay
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for development (non-production)

### External Services
- **YouTube** — embedded videos for each story (via iframe embeds)
- **Google Fonts** — Amiri and Outfit font families loaded from CDN
- **Browser SpeechSynthesis API** — for text-to-speech functionality (no external service)