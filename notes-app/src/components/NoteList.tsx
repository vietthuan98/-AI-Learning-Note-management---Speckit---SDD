import type { Note } from '../types/note';
import { FileText, Plus, Notebook } from 'lucide-react';
import { extractPreview } from '../lib/markdown';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onGoToDashboard: () => void;
}

export function NoteList({
  notes,
  activeNoteId,
  onSelectNote,
  onAddNote,
  onGoToDashboard,
}: NoteListProps) {
  return (
    <div className="flex flex-col h-full" id="note-list-sidebar">
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
        <button
          onClick={onGoToDashboard}
          className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-[var(--transition-fast)]"
          id="sidebar-logo"
        >
          <Notebook size={20} className="text-[var(--color-accent)]" />
          <span className="font-semibold text-sm tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Notes
          </span>
        </button>
        <button
          onClick={onAddNote}
          className="p-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-all duration-[var(--transition-fast)] hover:shadow-[var(--shadow-glow)] active:scale-95"
          id="sidebar-add-note"
          aria-label="Create new note"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-[var(--color-text-muted)] text-xs">
            <FileText size={24} className="mb-2 opacity-30" />
            <p>No notes yet</p>
          </div>
        ) : (
          notes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={`
                w-full text-left px-3 py-2.5 rounded-[var(--radius-md)]
                transition-all duration-[var(--transition-fast)]
                ${
                  activeNoteId === note.id
                    ? 'bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/20'
                    : 'hover:bg-[var(--color-bg-hover)] border border-transparent'
                }
              `}
              id={`sidebar-note-${note.id}`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <FileText
                  size={13}
                  className={
                    activeNoteId === note.id
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text-muted)]'
                  }
                />
                <span
                  className={`text-sm font-medium truncate ${
                    activeNoteId === note.id
                      ? 'text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {note.title || 'Untitled Note'}
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] truncate ml-[21px]">
                {extractPreview(note.content, 60)}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
