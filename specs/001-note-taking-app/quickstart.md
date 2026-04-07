# Quickstart: Note-Taking Application

## Getting Started

1.  **Repository Setup**:
    - Project Root: `/notes-app`
    - Main Codebase: `/notes-app/src`

2.  **Environment Setup**:
    ```bash
    cd notes-app
    pnpm install
    ```

3.  **Local Development**:
    ```bash
    pnpm dev
    ```

4.  **Running Tests**:
    ```bash
    pnpm test
    ```

## Project Structure Overview
- `/notes-app/src/components`: UI components (Shadcn, custom editor).
- `/notes-app/src/hooks`: Custom hooks for state and auto-save.
- `/notes-app/src/lib`: Logic for note processing and persistence.
- `/notes-app/src/types`: TypeScript interfaces for the Note model.

## Troubleshooting
- If storage is full, the app will notify via toast notification.
- To reset (clear all data), clear `notes-app-storage` key in browser developer tools (Application -> Local Storage).
