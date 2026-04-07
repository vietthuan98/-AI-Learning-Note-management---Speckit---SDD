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
    <div className="flex flex-col h-full select-none" id="note-list-sidebar">
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-[var(--color-border)]">
        <button
          onClick={onGoToDashboard}
          className="flex items-center gap-2.5 text-[var(--color-text-primary)] hover:opacity-80 transition-opacity"
          id="sidebar-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center shadow-lg shadow-[var(--color-accent-glow)]">
            <Notebook size={18} className="text-white" />
          </div>
          <span className="font-bold text-base tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Notes
          </span>
        </button>
        <button
          onClick={onAddNote}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all active:scale-95"
          id="sidebar-add-note"
          aria-label="Create new note"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-bg-surface)] flex items-center justify-center mb-4 opacity-50">
              <FileText size={20} className="text-[var(--color-text-muted)]" />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium leading-relaxed">
              Your thought library is empty
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={`
                w-full text-left px-3.5 py-3 rounded-[var(--radius-md)]
                transition-all duration-200 group
                ${
                  activeNoteId === note.id
                    ? 'bg-[var(--color-accent-glow)] border-transparent'
                    : 'hover:bg-[var(--color-bg-hover)] border-transparent'
                }
              `}
              id={`sidebar-note-${note.id}`}
            >
              <div className="flex items-center gap-3 mb-1">
                <FileText
                  size={14}
                  className={
                    activeNoteId === note.id
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]'
                  }
                />
                <span
                  className={`text-sm font-semibold truncate tracking-tight ${
                    activeNoteId === note.id
                      ? 'text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {note.title || 'Untitled Note'}
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1 ml-[26px] font-medium">
                {extractPreview(note.content, 60) || 'Empty note'}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
