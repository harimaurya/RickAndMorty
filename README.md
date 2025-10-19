# Rick and Morty Universe

A Next.js 15 app that browses characters from the public Rick & Morty GraphQL API. Visitors complete a quick profile registration that persists to a cookie before exploring the character catalogue, with both page and modal detail experiences.

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
- Radix UI primitives wrapped with shadcn-inspired components ([components/ui](components/ui))

## Key features

- Root route redirects to the paginated `/information` catalogue via [`Home`](app/page.tsx).
- Character grid with both dedicated page and modal detail routes.
- Cookie-backed profile registration gate enforced by [`middleware`](middleware.ts).
- Reusable form, card, dialog, and pagination components for consistent UI.

## Project layout

| Area                       | Description                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| [app/(main)](<app/(main)>) | Authenticated layouts, information catalogue, and profile pages.       |
| [app/(auth)](<app/(auth)>) | Registration flow shown until the profile cookie is present.           |
| [components](components)   | Shared UI primitives, layout chrome, and feature components.           |
| [lib](lib)                 | Apollo client configuration plus utilities (e.g., pagination helpers). |
| [types](types)             | TypeScript definitions for characters and profile data.                |
| [public](public)           | Static assets, including the Rick & Morty logo.                        |

## Architecture overview

- [`RootLayout`](app/layout.tsx) sets global fonts, mounts [`SiteFooter`](components/layout/SiteFooter.tsx), and seeds context with [`getUserFromCookies`](lib/session.ts).
- Authenticated pages share [`MainLayout`](<app/(main)/layout.tsx>), which fixes the [`SiteHeader`](components/layout/SiteHeader.tsx) above the main content.
- [`Home`](app/page.tsx) immediately redirects to `/information` to centralize onboarding.

## Routing

- Catalogue: [`CharactersPage`](<app/(main)/information/page.tsx>) renders the paginated grid and description.
- Pagination handler: [`CharactersPagination`](components/characters/CharactersPagination.tsx) wraps [`Paginations`](components/shared/Pagination.tsx) to sync query params.
- Character detail (page): [`CharacterDetailsPage`](<app/(main)/information/[id]/page.tsx>) displays [`CharacterDetails`](components/characters/CharacterDetails.tsx).
- Character detail (modal): [`CharacterDetailsModalPage`](<app/(main)/information/@modal/(.)[id]/page.tsx>) opens [`CharacterDetailsModal`](components/characters/CharacterDetailsModal.tsx) alongside the list.
- Registration: [`RegisterPage`](<app/(auth)/register/page.tsx>) completes onboarding then forwards users to `/information`.
- Profile management: [`ProfilePage`](<app/(main)/profile/page.tsx>) lets users review or update stored data.
- Not found: [`NotFoundPage`](app/not-found.tsx) handles unknown routes.

## Data fetching

- Apollo client is configured in [`client`](lib/gql/apolloClient.ts) using `GQL_ENDPOINT`.
- Catalogue queries use [`GET_CHARACTERS_QUERY`](lib/gql/queries.ts); detail views use [`GET_CHARACTER_DETAIL`](lib/gql/queries.ts).
- Errors surface as [`PageError`](components/shared/PageError.tsx) with descriptive messaging.

## Profile & cookies

- `/api/register` POST/GET ([`route`](app/api/register/route.ts)) persists `{ username, jobTitle }` into the `user` cookie.
- [`middleware`](middleware.ts) requires the cookie before allowing `/`, `/information`, and `/profile`.
- Forms reuse [`ProfileForm`](components/shared/ProfileForm.tsx), pulling the initial value from [`UserContext`](store/UserContext.tsx).

## UI components

- Characters: [`CharacterCard`](components/characters/CharacterCard.tsx), [`CharacterDetails`](components/characters/CharacterDetails.tsx), [`CharacterInfo`](components/characters/CharacterInfo.tsx), [`CharacterDetailsModal`](components/characters/CharacterDetailsModal.tsx).
- Pagination: [`Paginations`](components/shared/Pagination.tsx) with [`getPaginationPages`](lib/utils.ts) for compact page sets.
- Shared primitives: [`PageTitle`](components/shared/PageTitle.tsx), [`Button`](components/ui/button.tsx), [`Card`](components/ui/card.tsx), [`Dialog`](components/ui/dialog.tsx), [`Input`](components/ui/input.tsx), [`Field`](components/ui/field.tsx), [`Label`](components/ui/label.tsx), [`Separator`](components/ui/separator.tsx).

## Styling

- Theme tokens and global styles live in [app/globals.css](app/globals.css).
- Tailwind/PostCSS setup is defined in [postcss.config.mjs](postcss.config.mjs); shadcn component registry resides in [components.json](components.json).

## Environment variables

Set in `.env.local` or `.env.production`:

- `GQL_ENDPOINT` – GraphQL API endpoint (defaults to the official API).
- `CHALLENGE_VERSION` – Rendered by [`SiteFooter`](components/layout/SiteFooter.tsx).

## Getting started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the dev server:
   ```sh
   npm run dev
   ```
3. Visit http://localhost:3000 — unauthenticated users are redirected to `/register` until the `user` cookie is set.
4. Build and run production:
   ```sh
   npm run build
   npm start
   ```

## Available scripts

- `npm run dev` – Launch the Turbopack dev server.
- `npm run build` – Produce an optimized production build.
- `npm start` – Serve the production build.
- `npm run lint` – Run ESLint with [eslint.config.mjs](eslint.config.mjs).
