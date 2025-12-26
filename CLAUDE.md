# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React 19 with TypeScript
- **SPA Framework:** Inertia.js v2 (server-driven SPA)
- **Styling:** Tailwind CSS v4, shadcn/ui (new-york style)
- **Authentication:** Laravel Fortify (with 2FA support)
- **Routing:** Laravel Wayfinder (type-safe routes)
- **Build Tool:** Vite
- **Testing:** Pest (PHP)
- **Database:** SQLite (default), configurable to MySQL/PostgreSQL

## Development Commands

### Initial Setup
```bash
composer setup  # Installs dependencies, creates .env, generates key, migrates DB, builds frontend
```

### Development Server
```bash
composer dev  # Runs Laravel server, queue worker, and Vite dev server concurrently
```

### Testing
```bash
composer test          # Run all Pest tests
php artisan test       # Alternative test command
php artisan test --filter=TestName  # Run specific test
```

### Frontend
```bash
npm run dev            # Start Vite dev server (standalone)
npm run build          # Build for production
npm run build:ssr      # Build with SSR support
npm run lint           # ESLint with auto-fix
npm run types          # TypeScript type checking
npm run format         # Format with Prettier
npm run format:check   # Check formatting without changes
```

### Laravel Commands
```bash
php artisan serve      # Start development server (port 8000)
php artisan migrate    # Run database migrations
php artisan pail       # Tail Laravel logs
php artisan queue:listen  # Listen to queue jobs
```

## Architecture Overview

### Inertia.js Pattern
This application uses Inertia.js, which bridges Laravel and React:
- Laravel controllers return Inertia responses using `Inertia::render('PageName', $props)`
- Routes are defined in `routes/web.php` and `routes/settings.php`
- React pages in `resources/js/pages/` receive props from Laravel controllers
- No separate API layer needed - controllers pass data directly to React components

### Laravel Wayfinder (Type-Safe Routing)
Wayfinder generates TypeScript route helpers from Laravel routes:
- **Route definitions:** Auto-generated in `resources/js/routes/index.ts`
- **Controller actions:** Auto-generated in `resources/js/actions/` (mirrors Laravel controller structure)
- **Usage:** Import from `@/routes` or `@/actions`
  ```typescript
  import { dashboard } from '@/routes'
  import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController'

  // Navigate to dashboard
  router.visit(dashboard.url())

  // Form submission with type-safe action
  <form {...PasswordController.update.form()}>
  ```
- **Regeneration:** Routes are regenerated when Vite detects route changes

### Directory Structure

**Backend (Laravel):**
- `app/Actions/Fortify/` - Custom Fortify actions (user registration, password reset)
- `app/Http/Controllers/` - Controllers (Settings/PasswordController, Settings/ProfileController, etc.)
- `app/Models/` - Eloquent models
- `routes/web.php` - Main application routes
- `routes/settings.php` - User settings routes (profile, password, 2FA, appearance)

**Frontend (React/TypeScript):**
- `resources/js/pages/` - Inertia page components (welcome.tsx, dashboard.tsx, auth/*, settings/*)
- `resources/js/layouts/` - Layout components (app-layout.tsx, auth-layout.tsx, settings/*)
- `resources/js/components/` - Reusable React components
- `resources/js/components/ui/` - shadcn/ui components
- `resources/js/routes/` - Auto-generated Wayfinder route definitions (DO NOT EDIT)
- `resources/js/actions/` - Auto-generated Wayfinder controller actions (DO NOT EDIT)
- `resources/js/wayfinder/` - Wayfinder type definitions (DO NOT EDIT)
- `resources/js/hooks/` - Custom React hooks (use-appearance.ts, etc.)
- `resources/js/lib/` - Utility functions
- `resources/js/types/` - TypeScript type definitions

**Key Files:**
- `resources/js/app.tsx` - React app entry point
- `resources/js/ssr.tsx` - SSR entry point
- `vite.config.ts` - Vite configuration with React, Tailwind, and Wayfinder plugins
- `components.json` - shadcn/ui configuration

### Path Aliases
TypeScript imports use `@/*` to reference `resources/js/*`:
```typescript
import { Button } from '@/components/ui/button'
import { dashboard } from '@/routes'
```

### Authentication Flow
- Laravel Fortify handles authentication routes (`/login`, `/register`, `/logout`, `/two-factor-challenge`)
- Custom Fortify actions in `app/Actions/Fortify/` customize user creation and password resets
- Settings pages (`/settings/*`) allow users to manage profile, password, 2FA, and appearance
- Middleware `auth` and `verified` protect authenticated routes

### Styling Patterns
- Tailwind CSS v4 with utility-first approach
- shadcn/ui components provide accessible, customizable primitives
- Component variants use `class-variance-authority` (cva)
- Dark mode support via `use-appearance` hook
- Theme initialized on page load in `app.tsx`

### React Patterns
- React 19 with React Compiler enabled (via babel-plugin-react-compiler)
- Strict mode enabled
- Functional components with hooks
- Inertia router for navigation (no React Router)

## Important Notes

### When Creating New Routes
1. Define route in Laravel (`routes/web.php` or `routes/settings.php`)
2. Wayfinder automatically generates TypeScript helpers on next Vite build
3. Import from `@/routes` or `@/actions` in React components
4. Never manually edit files in `resources/js/routes/`, `resources/js/actions/`, or `resources/js/wayfinder/`

### When Adding UI Components
- Use shadcn/ui CLI for new components: `npx shadcn@latest add <component-name>`
- Components install to `resources/js/components/ui/`
- Follows "new-york" style variant with neutral base color

### Database
- Default connection is SQLite (`database/database.sqlite`)
- Update `.env` `DB_CONNECTION` to use MySQL or PostgreSQL
- Migrations in `database/migrations/`

### Testing
- Feature tests in `tests/Feature/`
- Unit tests in `tests/Unit/`
- Uses Pest syntax: `test()`, `it()`, `expect()`

### Code Quality
- ESLint with React and TypeScript plugins
- Prettier with Tailwind CSS plugin for class sorting
- TypeScript strict mode enabled
- Import organization via prettier-plugin-organize-imports
