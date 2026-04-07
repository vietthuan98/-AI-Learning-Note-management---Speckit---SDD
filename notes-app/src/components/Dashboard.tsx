import type { Note } from '../types/note';
import { NoteCard } from './NoteCard';
import { Plus, FileText, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

interface DashboardProps {
  notes: Note[];
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string, title: string) => void;
}

export function Dashboard({ notes, onSelectNote, onAddNote, onDeleteNote }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const query = searchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  return (
    <div className="flex flex-col h-full overflow-hidden" id="dashboard-view">
      {/* Dashboard header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Your Notes
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>
          <button
            onClick={onAddNote}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-accent)] text-white font-medium text-sm rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-all duration-[var(--transition-fast)] hover:shadow-[var(--shadow-glow)] active:scale-95"
            id="dashboard-add-note"
          >
            <Plus size={16} />
            New Note
          </button>
        </div>

        {/* Search bar */}
        {notes.length > 0 && (
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all duration-[var(--transition-fast)] outline-none"
              id="dashboard-search"
            />
          </div>
        )}
      </div>

      {/* Notes grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {notes.length === 0 ? (
          <EmptyState onAddNote={onAddNote} />
        ) : filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-[var(--color-text-muted)]">
            <Search size={32} className="mb-3 opacity-30" />
            <p className="text-sm">No notes match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onSelect={() => onSelectNote(note.id)}
                onDelete={() => onDeleteNote(note.id, note.title)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onAddNote }: { onAddNote: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] animate-[var(--animate-fade-in)]">
      <div className="p-5 rounded-full bg-[var(--color-accent-glow)] mb-6">
        <FileText size={40} className="text-[var(--color-accent)]" />
      </div>
      <h2
        className="text-xl font-semibold text-[var(--color-text-primary)] mb-2"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        No notes yet
      </h2>
      <p className="text-[var(--color-text-muted)] text-sm mb-6 text-center max-w-xs">
        Start capturing your thoughts. Notes are saved automatically as you type.
      </p>
      <button
        onClick={onAddNote}
        className="flex items-center gap-2 px-5 py-3 bg-[var(--color-accent)] text-white font-medium text-sm rounded-[var(--radius-lg)] hover:bg-[var(--color-accent-hover)] transition-all duration-[var(--transition-fast)] hover:shadow-[var(--shadow-glow)] active:scale-95"
        id="empty-state-add-note"
      >
        <Plus size={18} />
        Create your first note
      </button>
    </div>
  );
}
