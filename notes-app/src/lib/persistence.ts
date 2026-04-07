import type { Note, NoteStorage } from '../types/note';
import { STORAGE_KEY, STORAGE_VERSION } from '../types/note';

/**
 * Error thrown when storage operations fail.
 */
export class StorageError extends Error {
  public readonly isQuotaExceeded: boolean;

  constructor(
    message: string,
    isQuotaExceeded = false
  ) {
    super(message);
    this.name = 'StorageError';
    this.isQuotaExceeded = isQuotaExceeded;
  }
}

/**
 * Load all notes from LocalStorage.
 * Returns an empty array if no data exists or data is corrupted.
 */
export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: NoteStorage = JSON.parse(raw);

    // Validate structure
    if (!parsed || !Array.isArray(parsed.notes)) {
      return [];
    }

    return parsed.notes;
  } catch {
    // Corrupted data — return empty
    return [];
  }
}

/**
 * Save all notes to LocalStorage.
 * Throws StorageError if the write fails (e.g., quota exceeded).
 */
export function saveNotes(notes: Note[]): void {
  const data: NoteStorage = {
    notes,
    version: STORAGE_VERSION,
  };

  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    const isQuota =
      error instanceof DOMException &&
      (error.code === 22 ||
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED');

    throw new StorageError(
      isQuota
        ? 'Storage quota exceeded. Please delete some notes to free up space.'
        : 'Failed to save notes to storage.',
      isQuota
    );
  }
}

/**
 * Generate a new Note with default values.
 */
export function createNote(): Note {
  return {
    id: crypto.randomUUID(),
    title: '',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isAutoTitled: true,
  };
}

/**
 * Clear all notes from storage (for debugging/reset).
 */
export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}
