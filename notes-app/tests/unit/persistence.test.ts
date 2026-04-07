import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadNotes, saveNotes, createNote, clearStorage, StorageError } from '../../src/lib/persistence';
import { STORAGE_KEY, STORAGE_VERSION } from '../../src/types/note';
import type { Note } from '../../src/types/note';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

// Mock crypto.randomUUID
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'test-uuid-1234'),
  },
});

describe('loadNotes', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should return empty array when no data exists', () => {
    expect(loadNotes()).toEqual([]);
  });

  it('should return notes from valid stored data', () => {
    const notes: Note[] = [
      {
        id: '1',
        title: 'Test',
        content: 'Content',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        isAutoTitled: true,
      },
    ];

    localStorageMock.setItem(
      STORAGE_KEY,
      JSON.stringify({ notes, version: STORAGE_VERSION })
    );

    expect(loadNotes()).toEqual(notes);
  });

  it('should return empty array for corrupted JSON', () => {
    localStorageMock.setItem(STORAGE_KEY, 'not-valid-json');
    expect(loadNotes()).toEqual([]);
  });

  it('should return empty array for invalid structure (missing notes array)', () => {
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1 }));
    expect(loadNotes()).toEqual([]);
  });
});

describe('saveNotes', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should save notes to localStorage', () => {
    const notes: Note[] = [
      {
        id: '1',
        title: 'Test',
        content: 'Content',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        isAutoTitled: true,
      },
    ];

    saveNotes(notes);

    const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY)!);
    expect(stored.notes).toEqual(notes);
    expect(stored.version).toBe(STORAGE_VERSION);
  });

  it('should throw StorageError with isQuotaExceeded on quota exceeded', () => {
    localStorageMock.setItem.mockImplementationOnce(() => {
      const error = new DOMException('Quota exceeded', 'QuotaExceededError');
      throw error;
    });

    expect(() => saveNotes([])).toThrow(StorageError);

    try {
      saveNotes([]);
    } catch (error) {
      // Reset mock for this catch
    }

    // Re-mock for the specific assertion
    localStorageMock.setItem.mockImplementationOnce(() => {
      const error = new DOMException('Quota exceeded', 'QuotaExceededError');
      throw error;
    });

    try {
      saveNotes([]);
    } catch (error) {
      expect(error).toBeInstanceOf(StorageError);
      expect((error as StorageError).isQuotaExceeded).toBe(true);
    }
  });

  it('should throw StorageError for generic storage errors', () => {
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Some generic error');
    });

    expect(() => saveNotes([])).toThrow(StorageError);
  });
});

describe('createNote', () => {
  it('should create a note with default values', () => {
    const note = createNote();
    expect(note.id).toBe('test-uuid-1234');
    expect(note.title).toBe('');
    expect(note.content).toBe('');
    expect(note.isAutoTitled).toBe(true);
    expect(note.createdAt).toBeTruthy();
    expect(note.updatedAt).toBeTruthy();
  });
});

describe('clearStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should remove notes from localStorage', () => {
    localStorageMock.setItem(STORAGE_KEY, 'some-data');
    clearStorage();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
  });
});
