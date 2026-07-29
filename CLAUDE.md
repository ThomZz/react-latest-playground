# React Playground

A minimal React starter for experimentation.

## Stack

- **React 19** + **TypeScript**, built with **Vite**
- **React Router v7** (`createBrowserRouter`) — routes in [src/router.tsx](src/router.tsx)
- **Jest** + **React Testing Library** for tests

## Commands

```bash
npm run dev      # start dev server
npm run build    # type-check (tsc -b) + production build
npm run lint     # ESLint (fails on any warning, incl. formatting)
npm run format   # Prettier --write
npm test         # Jest (npm run test:watch for watch mode)
```

## Conventions

- **CSS units: always `rem`, never `em`.** Root is `62.5%` so `1rem = 10px`
  (multiply by 10 for px). See [src/index.css](src/index.css).
- **Tests are co-located** with source (`*.test.tsx` next to the file). For
  router-dependent components, wrap in `<MemoryRouter>` — see
  [src/App.test.tsx](src/App.test.tsx).
- **Formatting** is enforced via ESLint (`prettier/prettier` rule), so `npm run
lint` fails on formatting drift. No format-on-save is configured.
- **Prettier style:** no semicolons, single quotes, no trailing commas.

## CI

[.github/workflows/ci.yml](.github/workflows/ci.yml) runs **lint**, **build**,
and **test** as parallel jobs on push to `main` and on every PR.
