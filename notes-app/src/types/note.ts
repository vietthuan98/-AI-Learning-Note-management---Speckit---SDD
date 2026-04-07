/**
 * Core Note entity.
 * Represents a single note with auto-titling and auto-save capabilities.
 */
export interface Note {
  /** Unique identifier (UUID v4) */
  id: string;
  /** Note title - auto-generated from content or manually set */
  title: string;
  /** Markdown content body */
  content: string;
  /** ISO 8601 creation timestamp */
  createdAt: string;
  /** ISO 8601 last update timestamp */
  updatedAt: string;
  /** Tracks whether the title was auto-generated (enables re-generation) */
  isAutoTitled: boolean;
}

/**
 * Shape of the serialized data in LocalStorage.
 */
export interface NoteStorage {
  notes: Note[];
  version: number;
}

/**
 * Storage key used in LocalStorage.
 */
export const STORAGE_KEY = 'notes-app-storage';

/**
 * Current storage schema version for migration support.
 */
export const STORAGE_VERSION = 1;

/**
 * Maximum title length for auto-generated titles.
 */
export const MAX_TITLE_LENGTH = 70;
