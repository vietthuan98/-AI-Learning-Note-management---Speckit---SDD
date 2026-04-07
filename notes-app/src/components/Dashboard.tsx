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
    <div className="flex-1 flex flex-col h-full overflow-hidden animate-[var(--animate-in)]" id="dashboard-view">
      {/* Dashboard header */}
      <div className="px-8 pt-10 pb-6 w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1
              className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Your Library
            </h1>
            <p className="text-[var(--color-text-secondary)] text-sm font-medium">
              You have {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved locally.
            </p>
          </div>
          <button
            onClick={onAddNote}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white font-bold text-sm rounded-xl hover:bg-[var(--color-accent-hover)] transition-all shadow-lg shadow-[var(--color-accent-glow)] active:scale-95 shrink-0"
            id="dashboard-add-note"
          >
            <Plus size={18} strokeWidth={3} />
            New Note
          </button>
        </div>

        {/* Search bar */}
        {notes.length > 0 && (
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent)] transition-colors"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search through your thoughts..."
              className="w-full pl-12 pr-4 py-4 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-glow)] transition-all outline-none shadow-sm"
              id="dashboard-search"
            />
          </div>
        )}
      </div>

      {/* Notes grid */}
      <div className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar">
        <div className="max-w-[1400px] mx-auto">
          {notes.length === 0 ? (
            <EmptyState onAddNote={onAddNote} />
          ) : filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[var(--color-text-muted)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-surface)] flex items-center justify-center mb-6">
                <Search size={32} className="opacity-20" />
              </div>
              <p className="text-lg font-semibold text-[var(--color-text-secondary)] mb-1">No matches found</p>
              <p className="text-sm">Try using different keywords or clear the search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
    </div>
  );
}

function EmptyState({ onAddNote }: { onAddNote: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
      <div className="w-24 h-24 rounded-[2rem] bg-[var(--color-accent-glow)] flex items-center justify-center mb-8 rotate-3 shadow-xl">
        <FileText size={48} className="text-[var(--color-accent)] -rotate-3" />
      </div>
      <h2
        className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 tracking-tight"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        Capturing ideas starts here
      </h2>
      <p className="text-[var(--color-text-secondary)] text-base mb-10 leading-relaxed font-medium">
        Create your first note and experience a beautiful, distraction-free writing environment.
      </p>
      <button
        onClick={onAddNote}
        className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-xl active:scale-95"
        id="empty-state-add-note"
      >
        <Plus size={22} strokeWidth={3} />
        Start Writing
      </button>
    </div>
  );
}
