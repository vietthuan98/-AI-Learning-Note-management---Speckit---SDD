# Implementation Plan: Note-Taking Application

**Branch**: `001-note-taking-app` | **Date**: 2026-04-07 | **Spec**: [spec.md](file:///Users/thuanlv1/MyData/speckit_ssd/battle_snake/specs/001-note-taking-app/spec.md)
**Input**: Feature specification from `/specs/001-note-taking-app/spec.md`

## Summary
Build a premium, local-first note-taking application using React 19 and Tailwind CSS v4. The application will feature a "distraction-free" Markdown editor with live preview (WYSIWYG), automatic background saving, and smart title generation. It will be housed in a `notes-app` subdirectory with a focus on UI/UX excellence using Shadcn components.

## Technical Context

**Language/Version**: TypeScript / React 19  
**Primary Dependencies**: Vite, Tailwind CSS v4, @tailwindcss/vite, MDXEditor, Shadcn UI (Radix, Lucide-React, Sonner)  
**Storage**: Browser LocalStorage (v1) with IndexedDB fallback for extensive content if needed.  
**Testing**: Vitest for unit/integration tests (required for logic, optional for UI components).  
**Target Platform**: Modern Web Browsers (Desktop/Mobile)  
**Project Type**: Single Page Web Application (SPA)  
**Performance Goals**: App load to edit < 3s; interaction latency < 100ms.  
**Constraints**: Source code MUST be in `notes-app/`. No folders/tags. Auto-save with 500ms debounce.  
**Scale/Scope**: Local-only, single-user MVP.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] All new features must include comprehensive unit tests for business logic (Constitution 2.1).
- [x] UI component tests are NOT required (Constitution 2.1).
- [x] Minimum 80% coverage for critical functionality (Constitution 2.1).
- [x] Design system adherence (Constitution 3.1).
- [x] Task confirmation protocol (Constitution 5.1).

## Project Structure

### Documentation (this feature)

```text
specs/001-note-taking-app/
├── plan.md              # This file
├── research.md          # Research on tech stack and editor options
├── data-model.md        # Note entity and storage schema
├── quickstart.md        # Setup and dev instructions
├── contracts/           # UI Component and Hook interface definitions
└── tasks.md             # Implementation tasks (to be created next)
```

### Source Code (repository root)

```text
notes-app/
├── src/
│   ├── components/       # Visual components (Layout, Editor, NoteList, Toast)
│   ├── hooks/            # Logic (useNotes, useAutoSave)
│   ├── lib/              # Utilities (persistence.ts, markdown.ts)
│   ├── types/            # TypeScript interfaces
│   ├── main.tsx          # App entry point
│   └── index.css         # Tailwind v4 import
├── tests/                # Vitest test files
│   ├── unit/             # Logic tests
│   └── integration/      # Component interaction tests (optional)
├── vite.config.ts        # Vite + Tailwind v4 plugin configuration
└── tsconfig.json         # TypeScript configuration
```

**Structure Decision**: A flat, feature-focused structure within `notes-app/` to maintain simplicity while ensuring modularity for core logic (hooks/lib).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [N/A] | | |

## User Review Required

> [!IMPORTANT]
> **Tech Stack Confirmation**: Using **Tailwind CSS v4** and **React 19** as requested. Note that v4 has no `tailwind.config.js`; styling configuration is now CSS-first via `@theme`.
> **Markdown Editor**: Proposing **MDXEditor** for a truly "premium" live-preview experience. This provides a more modern feel than traditional split-pane editors.
> **Testing Policy**: As per your request, unit tests for React components are not required, but business logic (storage, auto-title, auto-save) will be fully tested with Vitest.

## Open Questions

1.  **Storage Engine**: Is `LocalStorage` sufficient for the MVP (typically 5MB limit), or should I prioritize `IndexedDB` (higher limit) for long-form notes?
2.  **Visual Theme**: Preference for Light/Dark mode or an automatic system theme toggle?
3.  **UI Feedback**: Should the "Saved" toast notification appear on every successful save, or only show an error if it fails? (Proposal: Only show an error for success-toast persistence to avoid clutter, or a very brief subtle pulse in the UI).

## Verification Plan

### Automated Tests
- Running Vitest (`pnpm test`) for core library logic and hooks.
- Unit tests for `useAutoSave`, `generateTitle`, and `NotePersistence`.

### Manual Verification
- Visual inspection of the premium UI (spacing, typography, responsiveness).
- Verification of auto-title logic after manual edits and clears.
- Verification of persistent storage across page refreshes.
