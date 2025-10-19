# Rick and Morty Explorer

A Next.js 15 app for browsing characters from the public Rick & Morty GraphQL API. The app requires a quick profile registration before accessing content, stores user info in a cookie, and supports both full-page and modal character detail views.

## Table of contents

- [Tech stack](#tech-stack)
- [Key features](#key-features)
- [Project layout](#project-layout)
- [Architecture overview](#architecture-overview)
- [Routing](#routing)
- [Data fetching](#data-fetching)
- [Profile & cookies](#profile--cookies)
- [UI components](#ui-components)
- [Styling](#styling)
- [Environment variables](#environment-variables)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)

## Tech stack

- Next.js App Router ([app/layout.tsx](app/layout.tsx), [app/page.tsx](app/page.tsx))
- React 19
- Apollo Client + GraphQL ([lib/gql/apolloClient.ts](lib/gql/apolloClient.ts), [lib/gql/queries.ts](lib/gql/queries.ts))
- Tailwind CSS v4 ([app/globals.css](app/globals.css), [postcss.config.mjs](postcss.config.mjs))
- Radix UI primitives wrapped in custom components via Shadcn/ui ([components/ui](components/ui))

## Key features

- Paginated character catalogue with optional modal detail overlay.
- Cookie-backed profile registration gate enforced by [`middleware`](middleware.ts).
- Responsive UI composed of reusable form, card, dialog, and pagination components.

## Project layout

| Area                       | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| [app/(main)](<app/(main)>) | Authenticated layouts, characters catalogue, and profile pages.       |
| [app/(auth)](<app/(auth)>) | Registration flow displayed until the profile cookie exists.          |
| [components](components)   | Shared UI primitives, layout chrome, and feature-specific components. |
| [lib](lib)                 | Apollo client configuration plus shared utilities.                    |
| [types](types)             | TypeScript definitions for characters and profile data.               |
| [public](public)           | Static assets (e.g., `ricky-morty-logo.png`).                         |

## Architecture overview

- Application shell lives in [`RootLayout`](app/layout.tsx) and layers the global fonts, content container, and [`SiteFooter`](components/layout/SiteFooter.tsx).
- Authenticated pages reuse [`MainLayout`](<app/(main)/layout.tsx>), which injects the fixed [`SiteHeader`](components/layout/SiteHeader.tsx) navigation and offsets page content.
- The home entry-point [`Home`](app/page.tsx) performs an immediate redirect to the characters list to centralize onboarding.

## Routing

- Characters catalogue: [`CharactersPage`](<app/(main)/characters/page.tsx>) displays the paginated grid, while [`CharactersPagination`](components/characters/CharactersPagination.tsx) keeps the `page` search param in sync.
- Character detail (page): [`CharacterDetailsPage`](<app/(main)/characters/[id]/page.tsx>) renders the standalone view with [`CharacterDetails`](components/characters/CharacterDetails.tsx).
- Character detail (modal): [`CharacterDetailsModalPage`](<app/(main)/characters/@modal/(.)[id]/page.tsx>) overlays [`CharacterDetailsModal`](components/characters/CharacterDetailsModal.tsx) above the list via the parallel route defined in [app/(main)/characters/layout.tsx](<app/(main)/characters/layout.tsx>).
- Registration: [`RegisterPage`](<app/(auth)/register/page.tsx>) hosts the onboarding form and forwards users back to `/characters` when complete.
- Profile management: [`ProfilePage`](<app/(main)/profile/page.tsx>) lets users review or update their stored cookie data.
- Not found: [`NotFoundPage`](app/not-found.tsx) is served for unmatched routes.

## Data fetching

- GraphQL transport is configured through [`client`](lib/gql/apolloClient.ts) with the `GQL_ENDPOINT` environment variable (defaulting to the public API).
- Character list queries rely on [`GET_CHARACTERS_QUERY`](lib/gql/queries.ts), while detail routes use [`GET_CHARACTER_DETAIL`](lib/gql/queries.ts).
- The catalogue and detail pages execute server-side queries, returning graceful fallbacks with [`PageError`](components/shared/PageError.tsx) when requests fail.

## Profile & cookies

- Profile persistence is handled by the `/api/register` endpoint at [`POST/GET app/api/register/route.ts`](app/api/register/route.ts), which serializes `username` and `jobTitle` into the `user` cookie.
- Access control is applied in [`middleware`](middleware.ts), redirecting unauthenticated visitors to `/register` for `/`, `/characters`, and `/profile`.
- Both registration and profile pages reuse [`ProfileForm`](components/shared/ProfileForm.tsx), which reads existing cookie state and posts updates with optimistic messaging.

## UI components

- Catalogue cards and detail views: [`CharacterCard`](components/characters/CharacterCard.tsx), [`CharacterDetails`](components/characters/CharacterDetails.tsx), [`CharacterInfo`](components/characters/CharacterInfo.tsx), and [`CharacterDetailsModal`](components/characters/CharacterDetailsModal.tsx).
- Pagination: [`Paginations`](components/shared/Pagination.tsx) consumes [`getPaginationPages`](lib/utils.ts) to render compact, ellipsed controls.
- Shared primitives: [`PageTitle`](components/shared/PageTitle.tsx), [`PageError`](components/shared/PageError.tsx), plus Shadcn-inspired elements like [`Button`](components/ui/button.tsx), [`Card`](components/ui/card.tsx), [`Dialog`](components/ui/dialog.tsx), [`Input`](components/ui/input.tsx), [`Field`](components/ui/field.tsx), [`Label`](components/ui/label.tsx), and [`Separator`](components/ui/separator.tsx).

## Styling

- Global styles and design tokens are defined in [app/globals.css](app/globals.css), enabling light/dark theming with Tailwind CSS v4.
- PostCSS tooling is configured via [postcss.config.mjs](postcss.config.mjs), and the Shadcn component registry is captured in [components.json](components.json).

## Environment variables

Configure the following in `.env.local` or `.env.production`:

- `GQL_ENDPOINT` – GraphQL API URL (defaults to the official Rick & Morty endpoint).
- `CHALLENGE_VERSION` – Surface version string rendered by [`SiteFooter`](components/layout/SiteFooter.tsx).

## Getting started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the development server:
   ```sh
   npm run dev
   ```
3. Visit http://localhost:3000 — unauthenticated users will be redirected to `/register` until the `user` cookie is set.
4. Build and serve production output:
   ```sh
   npm run build
   npm start
   ```

## Available scripts

- `npm run dev` – Start the dev server with Turbopack.
- `npm run build` – Create an optimized production build.
- `npm start` – Launch the production server.
- `npm run lint` – Execute ESLint using [eslint.config.mjs](eslint.config.mjs).
