# Tasks: Note-Taking Application

**Input**: Design documents from `/specs/001-note-taking-app/`
**Prerequisites**: [plan.md](file:///Users/thuanlv1/MyData/speckit_ssd/battle_snake/specs/001-note-taking-app/plan.md) (required), [spec.md](file:///Users/thuanlv1/MyData/speckit_ssd/battle_snake/specs/001-note-taking-app/spec.md) (required for user stories), [research.md](file:///Users/thuanlv1/MyData/speckit_ssd/battle_snake/specs/001-note-taking-app/research.md), [data-model.md](file:///Users/thuanlv1/MyData/speckit_ssd/battle_snake/specs/001-note-taking-app/data-model.md)

**Tests**: Unit tests for business logic (persistence, title generation, hooks) are REQUIRED. UI component tests are NOT required.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure in `notes-app/`

- [X] T001 Create project structure `notes-app/src/{components,hooks,lib,types}`
- [X] T002 Initialize Vite project with React 19 and TypeScript in `notes-app/`
- [X] T003 [P] Install dependencies: `vite`, `react`, `react-dom`, `@tailwindcss/vite`, `tailwindcss`, `lucide-react`, `shadcn-ui`, `mdx-editor`, `sonner`, `clsx`, `tailwind-merge`
- [X] T004 [P] Configure Tailwind CSS v4 in `notes-app/vite.config.ts` and `notes-app/src/index.css`
- [X] T005 [P] Initialize Vitest configuration and sample test in `notes-app/vite.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Define `Note` and `NoteStorage` types in `notes-app/src/types/note.ts`
- [X] T007 Implement LocalStorage persistence utility in `notes-app/src/lib/persistence.ts`
- [X] T008 [P] Create `titleGenerator` utility in `notes-app/src/lib/markdown.ts`
- [X] T009 [P] Setup basic App layout with Sidebar container in `notes-app/src/components/Layout.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Effortless Note Creation (Priority: P1) 🎯 MVP

**Goal**: Implement the core "distraction-free" editor with automatic title generation and background saving.

**Independent Test**: Create a new note, type "Meeting with team", wait 500ms, and verify the note title becomes "Meeting with team" and persistence is confirmed in LocalStorage.

### Tests for User Story 1 (REQUIRED per Constitution: Tests MUST be written first)

- [X] T010 [US1] Unit tests for `titleGenerator` in `notes-app/tests/unit/markdown.test.ts`
- [X] T011 [US1] Unit tests for `persistence` in `notes-app/tests/unit/persistence.test.ts`
- [X] T012 [US1] Unit tests for `useAutoSave` logic in `notes-app/tests/unit/useAutoSave.test.ts`

### Implementation for User Story 1 (Blocks on Phase 3 Tests)

- [X] T013 [US1] Implement `useAutoSave` custom hook with 500ms debounce in `notes-app/src/hooks/useAutoSave.ts`
- [X] T014 [US1] Implement `useNotes` hook for state management (CRUD) in `notes-app/src/hooks/useNotes.ts`
- [X] T015 [US1] Integrate MDXEditor component with live-preview support in `notes-app/src/components/Editor.tsx`
- [X] T016 [US1] Connect Editor to `useNotes` and `useAutoSave` in `notes-app/src/main.tsx` (via App.tsx)

**Checkpoint**: User Story 1 is functional - notes can be created, auto-titled, and auto-saved.

---

## Phase 4: User Story 2 - Managing and Retrieving Notes (Priority: P1)

**Goal**: Provide a dashboard view to see all saved notes and switch between them easily.

**Independent Test**: Create three distinct notes, navigate to the dashboard, and verify all three appear as cards/list items. Clicking one should re-open it in the editor.

### Implementation for User Story 2

- [X] T017 [P] [US2] Create `NoteList` sidebar component in `notes-app/src/components/NoteList.tsx`
- [X] T018 [P] [US2] Create `NoteCard` component for dashboard grid in `notes-app/src/components/NoteCard.tsx`
- [X] T019 [US2] Implement note selection and navigation logic in `useNotes` hook
- [X] T020 [US2] Implement Delete Note functionality with confirmation in `notes-app/src/components/DeleteDialog.tsx`
- [X] T021 [US2] Assemble Dashboard view (grid or list toggle) in `notes-app/src/components/Dashboard.tsx`

**Checkpoint**: User Stories 1 AND 2 are functional - users can capture and manage multiple notes.

---

## Phase 5: User Story 3 - Premium Aesthetic Experience (Priority: P2)

**Goal**: Apply a premium, responsive design system using Shadcn UI and custom typography.

**Independent Test**: Verify the layout is fully responsive on mobile widths and all interactive elements have smooth hover/click transitions.

### Implementation for User Story 3

- [X] T022 [P] [US3] Import and configure Inter/Outfit font in `notes-app/src/index.css` (and index.html)
- [X] T023 [P] [US3] Add micro-animations (hover effects, transitions) to `NoteCard` and buttons
- [X] T024 [US3] Implement responsive Sidebar navigation for mobile (using Sheet/Drawer)
- [X] T025 [US3] Style scrollbars and editor container for "distraction-free" feel

**Checkpoint**: All user stories are functional and visually polished.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and overall application quality.

- [X] T026 [P] Implement Toast notifications for save/error status using `sonner`
- [X] T027 Add "Empty State" illustration for dashboard and editor
- [X] T028 Performance optimization: Ensure effective debounce and minimize re-renders using `React.memo` where necessary
- [X] T029 [P] Final documentation updates in `README.md`
- [X] T030 Run `quickstart.md` validation and final end-to-end manual test
- [X] T031 [SC-001] Performance Benchmark: Run Lighthouse audit and verify "App Load to Typing" is < 3s.
- [X] T032 [FR-009] Implement `StorageErrorBanner` for persistent critical failures (e.g., Quota Exceeded).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - START IMMEDIATELY.
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Independent of other stories.
- **US2 (P1)**: Depends on US1 (needs notes to manage), but can be developed in parallel once state management (US1) is defined.
- **US3 (P2)**: UI polish, can run in parallel with US1/US2 implementation.

### Parallel Opportunities

- Setup tasks (T003, T004, T005) can run in parallel.
- Foundational logic (T008) can run in parallel with T007.
- US1 Tests (T010, T011, T012) can run in parallel before implementation.
- US2 Components (T017, T018) can be built in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify auto-save/auto-title in browser.

### Incremental Delivery

1. Foundation ready.
2. Add User Story 1 → MVP Ready.
3. Add User Story 2 → Release 1.1.
4. Add User Story 3 → Premium Version.
