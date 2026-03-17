# CLAUDE.md — @talkspirit/react-gantt

## Essential Commands

```bash
npm run dev          # Start Vite dev server (demo app on :5173)
npm run build        # Library build → dist/
npm run lint         # ESLint (flat config, report unused directives)
npm run prettier     # Prettier on src/, demos/, and stories/
npm run storybook    # Storybook dev server on :6006
npm run build-storybook  # Build static Storybook → storybook-static/
```

## Architecture Overview

- **Vite library build** — outputs ESM (`dist/index.es.js`) + CJS (`dist/index.cjs`) + CSS (`dist/index.css`)
- **React 18** — peer dependency (`>=18`), uses JSX runtime
- **@svar-ui ecosystem** — depends on `@svar-ui/react-core`, `react-grid`, `react-editor`, `react-menu`, `react-toolbar`, plus internal packages (`gantt-store`, `gantt-data-provider`, `lib-dom`, `lib-state`, `lib-react`)
- **JSX only** — no TypeScript in source. Type definitions are handwritten in `types/`
- **Themes** — `Willow` (light) and `WillowDark` — thin wrappers around `@svar-ui/react-core` theme components with gantt-specific CSS

## Project Structure

```
src/              # Library source code
  components/     # Gantt, Toolbar, ContextMenu, Editor, HeaderMenu
  widgets/        # Tooltip
  themes/         # Willow.jsx, WillowDark.jsx + CSS
  index.js        # Public exports
demos/            # Vite demo app (50+ cases)
  data.js         # Shared mock data (getData, getTypedData, etc.)
  cases/          # Individual demo components
  common/         # Demo explorer shell (routing, theme switching)
  custom/         # Custom components used in demos (MyTooltipContent, etc.)
stories/          # Storybook stories
types/            # TypeScript declarations (handwritten)
.storybook/       # Storybook configuration
```

## Storybook

- Stories live in `stories/` and import components from `../src/`
- Reuse `getData()` from `demos/data.js` for mock tasks/links/scales
- Theme switching via Storybook toolbar (paintbrush icon) — no addon needed, uses a custom decorator
- The preview decorator wraps stories in `<Globals>` → `<ThemeComponent>` → `<div data-wx-portal-root>` (same nesting as the demo app)
- `layout: 'fullscreen'` — Gantt needs full viewport height
- **27 story files** organized by feature area:
  - `Gantt/` — Core (Basic, ReadOnly, NoGrid, CellBorders), Grid, Chart, Scales, Duration, Zoom, Sorting, Summaries, Actions, Multiple, Performance, Locale, Form
  - `GanttWith*/` — Tooltip, Toolbar, Editor, ContextMenu (with sub-stories for config variants)
  - `Pro/` — Schedule, Baselines, Calendar, CriticalPath, SplitTasks, UnscheduledTasks, Undo, Markers, Summaries, Export
- CSS files for stories are imported from `../demos/cases/` (shared with demo app)

## Code Conventions

- **ESLint** — flat config (`eslint.config.js`), React + React Hooks plugins
- **Prettier** — single quotes, semicolons, 2-space indent, trailing commas
- **lint-staged + Husky** — pre-commit hook runs `eslint --fix` + `prettier --write` on staged files
- **No direct `console.*`** in library code (`src/`)
- Component files use `.jsx` extension
- Imports from the library use `../../src/` (demos) or `../src/` (stories)

## Pre-commit

The Husky pre-commit hook runs `npx lint-staged`, which:

1. Runs `eslint --fix` on staged `*.{ts,js,svelte}` files
2. Runs `prettier --write` on staged `*.{ts,js,svelte,css,md,json}` files

Always ensure your changes pass lint before committing.
