# Research: Note-Taking Application

## Decision: Technology Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (using the new CSS-first configuration)
- **UI Components**: Shadcn UI (latest version, using `@theme` in CSS for v4 compatibility)
- **State Management**: React Context + `useReducer` (or simple `useState` with custom hooks) for note state.
- **Storage**: `LocalStorage` for persistent storage of notes.
- **Testing**: Vitest for unit and integration testing.

**Rationale**: React 19 and Tailwind v4 are the latest industry standards, providing the best performance and developer experience. Shadcn UI offers premium, accessible components that align with the user's "best UI/UX" requirement.

**Alternatives Considered**:
- Next.js: Rejected for a "basic features" app to avoid unnecessary SSR complexity.
- Lucide-React: Included as part of Shadcn for consistent iconography.

## Decision: Markdown Editor
- **Chosen Library**: `MDXEditor`
- **Rationale**: Provides a modern, "Notion-like" WYSIWYG experience where users see formatting in-place. This directly supports the "Premium Aesthetic Experience" (User Story 3) and "Distraction-free Markdown editor" (FR-001) requirements.
- **Alternatives Considered**: `@uiw/react-md-editor` (Rejected as it's more traditional/split-pane which feels less "premium").

## Decision: Auto-Save Strategy
- **Implementation**: Custom `useAutoSave` hook using a 500ms debounce.
- **Notification**: `Sonner` (standard with Shadcn) for subtle toast notifications for "Saved" (optional/brief) and "Error" (persistent) states.
- **Rationale**: Sonner provides highly aesthetic, non-intrusive notifications that fit the premium design goal.

## Decision: Directory Structure
- **Path**: `notes-app`
- **Structure**: Modular React structure within the `notes-app` directory.

```text
notes-app/
├── src/
│   ├── components/       # Visual components (Editor, NoteList, Toast)
│   ├── hooks/            # Logic (useNotes, useAutoSave)
│   ├── lib/              # Utilities (utils, markdown processing)
│   ├── types/            # TypeScript definitions
│   └── main.tsx
└── tests/                # Vitest test files
```
