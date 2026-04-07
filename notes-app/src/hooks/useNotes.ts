import { useCallback, useEffect, useState } from 'react';
import type { Note } from '../types/note';
import { loadNotes, saveNotes, createNote, StorageError } from '../lib/persistence';
import { generateTitle } from '../lib/markdown';

export type AppView = 'dashboard' | 'editor';

interface UseNotesReturn {
  notes: Note[];
  activeNote: Note | null;
  activeNoteId: string | null;
  view: AppView;
  storageError: string | null;
  addNote: () => void;
  updateNoteContent: (id: string, content: string) => void;
  updateNoteTitle: (id: string, title: string) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string) => void;
  goToDashboard: () => void;
  saveAllNotes: () => void;
  clearStorageError: () => void;
}

/**
 * Central state management hook for all note operations.
 * Handles CRUD, auto-titling, persistence, and view switching.
 */
export function useNotes(): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [view, setView] = useState<AppView>('dashboard');
  const [storageError, setStorageError] = useState<string | null>(null);

  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

  // Save notes to storage
  const saveAllNotes = useCallback(() => {
    try {
      saveNotes(notes);
      setStorageError(null);
    } catch (error) {
      if (error instanceof StorageError) {
        setStorageError(error.message);
      }
    }
  }, [notes]);

  // Persist on every notes change
  useEffect(() => {
    saveAllNotes();
  }, [saveAllNotes]);

  const addNote = useCallback(() => {
    const newNote = createNote();
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    setView('editor');
  }, []);

  const updateNoteContent = useCallback((id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id !== id) return note;

        const updatedNote: Note = {
          ...note,
          content,
          updatedAt: new Date().toISOString(),
        };

        // Auto-generate title if the note is auto-titled
        if (note.isAutoTitled) {
          updatedNote.title = generateTitle(content);
        }

        return updatedNote;
      })
    );
  }, []);

  const updateNoteTitle = useCallback((id: string, title: string) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id !== id) return note;

        // If title is cleared, resume auto-titling
        if (!title.trim()) {
          return {
            ...note,
            title: generateTitle(note.content),
            isAutoTitled: true,
            updatedAt: new Date().toISOString(),
          };
        }

        // Manual title — stop auto-titling
        return {
          ...note,
          title,
          isAutoTitled: false,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (activeNoteId === id) {
        setActiveNoteId(null);
        setView('dashboard');
      }
    },
    [activeNoteId]
  );

  const selectNote = useCallback((id: string) => {
    setActiveNoteId(id);
    setView('editor');
  }, []);

  const goToDashboard = useCallback(() => {
    setView('dashboard');
    setActiveNoteId(null);
  }, []);

  const clearStorageError = useCallback(() => {
    setStorageError(null);
  }, []);

  return {
    notes,
    activeNote,
    activeNoteId,
    view,
    storageError,
    addNote,
    updateNoteContent,
    updateNoteTitle,
    deleteNote,
    selectNote,
    goToDashboard,
    saveAllNotes,
    clearStorageError,
  };
}
