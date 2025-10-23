# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**EcoBase** is a React-based data visualization dashboard for ecological and migration indicators. The application features both public-facing dashboards and an administrative interface for data management.

**Tech Stack:**
- React 18 with TypeScript
- Vite (build tool)
- React Router (routing)
- TanStack Query (data fetching)
- shadcn/ui (component library)
- Tailwind CSS (styling)

## Development Commands

```bash
# Start development server (runs on http://[::]:8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview

# Install dependencies
npm i
```

## Architecture

### Routing Structure

The application uses React Router with two main route groups:

1. **Public Routes** (`/`):
   - Dashboard, Integration, Diaspora, Circulation, Performance pages
   - Shared Navigation component
   - Login page

2. **Admin Routes** (`/admin/*`):
   - Nested under AdminLayout
   - Contains management interfaces for: Organisations, Programmes, Indicateurs, Donnees, Workflow, Connecteurs, Utilisateurs, Rapports, Parametres, Pays, Structures (Nationales/Internes), Partenaires

### Directory Structure

```
src/
├── components/        # Reusable components
│   ├── ui/           # shadcn/ui components
│   └── admin/        # Admin-specific components (AdminSidebar, AdminTopbar, modals/)
├── contexts/         # React contexts (AuthContext)
├── pages/            # Route pages
│   └── admin/        # Admin pages
├── data/             # Mock data, indicators, seed data, metadata
├── hooks/            # Custom React hooks (use-mobile, use-toast)
├── lib/              # Utilities (utils.ts with cn() helper)
└── main.tsx          # Application entry point
```

### Key Patterns

**Path Aliasing:** Use `@/` prefix for imports (e.g., `@/components/ui/button`)

**Authentication:**
- Managed via `AuthContext` (src/contexts/AuthContext.tsx)
- Uses localStorage for session persistence
- Mock authentication with role-based access control
- Access via `useAuth()` hook
- Roles: defined in `@/data/seedData`

**State Management:**
- TanStack Query for server state
- React Context for auth state
- Local component state with useState

**UI Components:**
- All shadcn/ui components in `src/components/ui/`
- Configured via `components.json`
- Use `cn()` utility from `@/lib/utils` for conditional classNames

**Data:**
- Mock data stored in `src/data/` directory
- `indicators.ts` - indicator definitions
- `mockData.ts` - sample data
- `seedData.ts` - user/role data
- `metadata.ts` - metadata definitions

## TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Strict checks are disabled (`noImplicitAny: false`, `strictNullChecks: false`)
- Unused variables/parameters warnings are disabled

## ESLint Configuration

- TypeScript ESLint enabled
- React Hooks plugin configured
- `@typescript-eslint/no-unused-vars` is disabled
- Ignores `dist/` directory

## Adding shadcn/ui Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Configuration is in `components.json` with base color "slate" and CSS variables enabled.

## Development Notes

- The dev server runs on port 8080 with IPv6 binding (`::`)
- Vite uses SWC for fast React compilation
- `lovable-tagger` plugin is active in development mode
- No test framework is currently configured
- Both npm and bun lock files are present (npm is standard)
