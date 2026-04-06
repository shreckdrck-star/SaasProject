# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ContentAI is a SaaS platform for AI-powered content generation (Instagram posts, website copy, ad campaigns). Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint check
- No test framework is configured yet

## Architecture

**Auth**: Clerk (`@clerk/nextjs`) handles authentication. The root layout wraps everything in `<ClerkProvider>`. Middleware (`src/middleware.ts`) protects all routes except `/` — unauthenticated users are redirected to sign-in.

**AI Generation**: The `/api/generate` route uses the Groq SDK with `llama-3.3-70b-versatile` model. It streams responses back to the client as plain text. The generate page (`src/app/dashboard/generate/page.tsx`) consumes this stream with `ReadableStream` + `TextDecoder`.

**UI Components**: Minimal set of shadcn/ui-style components in `src/components/ui/` (button, card, input, textarea) using `class-variance-authority` and the `cn()` utility from `src/lib/utils.ts`.

**Routing**:
- `/` — Landing page (public)
- `/dashboard` — Main dashboard (protected)
- `/dashboard/generate` — Content generation form + streaming results
- `/dashboard/history` — Generation history (currently static/placeholder)
- `/dashboard/settings` — Account settings (currently static/placeholder)

**Dashboard layout** (`src/app/dashboard/layout.tsx`): Sidebar navigation on desktop, hidden on mobile with a simplified header.

## Key Notes

- The technical architecture docs (`.trae/documents/`) reference Supabase for database/storage, but the current implementation uses Clerk for auth instead. Supabase integration (users, content_generations, subscriptions tables) is not yet wired up — history and settings pages show hardcoded placeholder data.
- Path alias `@/*` maps to `./src/*` (configured in tsconfig.json).
- Environment variables: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `GROQ_API_KEY`, and Clerk redirect URLs are in `.env.local`.
- Design uses a dark purple gradient theme (`#1a103c` / `#2d1b69`) for landing page and sidebar, light gray (`bg-gray-50`) for dashboard content areas.
