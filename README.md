# Rick and Morty Explorer

A Next.js 15 app for browsing characters from the public Rick & Morty GraphQL API. The app requires a quick profile registration before accessing content, stores user info in a cookie, and supports both full-page and modal character detail views.

## Table of contents

- [Tech stack](#tech-stack)
- [Key features](#key-features)
- [Project layout](#project-layout)
- [Environment variables](#environment-variables)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Character data flow](#character-data-flow)
- [Profile flow](#profile-flow)
- [UI components](#ui-components)

## Tech stack

- Next.js App Router ([app/layout.tsx](app/layout.tsx), [app/page.tsx](app/page.tsx))
- React 19
- Apollo Client + GraphQL ([lib/gql/apolloClient.ts](lib/gql/apolloClient.ts), [lib/gql/queries.ts](lib/gql/queries.ts))
- Tailwind CSS v4 ([app/globals.css](app/globals.css), [postcss.config.mjs](postcss.config.mjs))
- Radix UI primitives wrapped in custom components via Shadcn/ui ([components/ui](components/ui))

## Key features

- Character browsing with server-rendered pages and a modal detail route ([app/(main)/characters](<app/(main)/characters>)).
- Cookie-backed profile registration gate enforced via middleware ([middleware.ts](middleware.ts), [app/api/register/route.ts](app/api/register/route.ts)).
- Responsive UI with reusable form, card, dialog, and pagination components.

## Project layout

| Area                       | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| [app/(main)](<app/(main)>) | Authenticated pages, layouts, and character routes.         |
| [app/(auth)](<app/(auth)>) | Registration flow shown before cookies are set.             |
| [components](components)   | Shared UI, layout pieces, and character-related components. |
| [lib](lib)                 | Apollo client setup and shared utilities.                   |
| [types](types)             | TypeScript definitions for profile and character data.      |
| [public](public)           | Static assets (e.g., `ricky-morty-logo.png`).               |

## Environment variables

Set the following in `.env.local` or `.env.production`:

- `GQL_ENDPOINT` – GraphQL API URL (defaults to the official Rick & Morty endpoint).
- `CHALLENGE_VERSION` – Displayed in the footer ([components/layout/SiteFooter.tsx](components/layout/SiteFooter.tsx)).

## Getting started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run the development server:

   ```sh
   npm run dev
   ```

3. Open http://localhost:3000. You will be redirected to the registration form until the `user` cookie is stored.

4. To build and serve production output:

   ```sh
   npm run build
   npm start
   ```

## Available scripts

- `npm run dev` – Start the dev server with Turbopack.
- `npm run build` – Create an optimized production build.
- `npm start` – Run the production server.
- `npm run lint` – Execute ESLint using the flat config ([eslint.config.mjs](eslint.config.mjs)).

## Character data flow

- Characters page: [app/(main)/characters/page.tsx](<app/(main)/characters/page.tsx>)
- Pagination UI: [components/shared/Pagination.tsx](components/shared/Pagination.tsx) with helpers in [lib/utils.ts](lib/utils.ts)
- Character cards and detail views: [components/characters/CharacterCard.tsx](components/characters/CharacterCard.tsx), [components/characters/CharacterDetails.tsx](components/characters/CharacterDetails.tsx)
- Modal detail route: [app/(main)/characters/@modal/(.)[id]/page.tsx](<app/(main)/characters/@modal/(.)[id]/page.tsx>)

## Profile flow

- Registration page: [app/(auth)/register/page.tsx](<app/(auth)/register/page.tsx>)
- Profile settings page: [app/(main)/profile/page.tsx](<app/(main)/profile/page.tsx>)
- Shared profile form component: [components/shared/ProfileForm.tsx](components/shared/ProfileForm.tsx)
- Middleware redirect logic: [middleware.ts](middleware.ts)

## UI components

Reusable UI primitives are exported from [components/ui](components/ui), including buttons, dialogs, cards, alerts, and form helpers that power the shared experience across pages.
