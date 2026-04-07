# Data Model: Note-Taking Application

## Entities

### Note
- **id**: `string` (UUID, primary key)
- **title**: `string` (auto-generated from first line OR manually provided)
- **content**: `string` (Markdown text body)
- **createdAt**: `Date` (ISO string)
- **updatedAt**: `Date` (ISO string, updated on every save)
- **isAutoTitled**: `boolean` (Internal flag to track if title was auto-generated)

## Storage Schema (LocalStorage)
- **Key**: `notes-app-storage`
- **Value**: `Note[]` (JSON serialized array of Note objects)

## State Lifecycle
1.  **Load**: On app start, load `Note[]` from `LocalStorage`.
2.  **Create**: Generate new `Note` with `id`, `createdAt`, `updatedAt`, and empty `title`/`content`.
3.  **Update**: On input, trigger `useAutoSave` hook after 500ms debounce.
    - If `content` changes and `isAutoTitled` is true, regenerate `title`.
    - If `title` is manually edited, set `isAutoTitled = false`.
    - If `title` is cleared, set `isAutoTitled = true` and regenerate from `content`.
4.  **Save**: Update `updatedAt` and write array to `LocalStorage`.
5.  **Delete**: Remove object from array by `id` and update `LocalStorage`.

## Validation
- `content` must be a string.
- `id` must be a unique non-empty string.
- `title` must be a string (max 100 characters recommended for UI, truncated if auto-generated).
