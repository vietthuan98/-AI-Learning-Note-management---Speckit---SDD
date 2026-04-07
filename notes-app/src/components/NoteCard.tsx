import type { Note } from '../types/note';
import { extractPreview } from '../lib/markdown';
import { FileText, Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onSelect: () => void;
  onDelete: () => void;
}

export function NoteCard({ note, onSelect, onDelete }: NoteCardProps) {
  const preview = extractPreview(note.content);
  const timeAgo = getRelativeTime(note.updatedAt);

  return (
    <div
      className="group relative bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-2xl hover:shadow-[var(--color-accent-glow)] hover:-translate-y-1 active:scale-[0.98]"
      onClick={onSelect}
      id={`note-card-${note.id}`}
      role="article"
    >
      {/* Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/20 transition-colors">
          <FileText
            size={16}
            className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
          />
        </div>
        <h3 className="font-bold text-[var(--color-text-primary)] text-lg leading-tight line-clamp-2 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {note.title || 'Untitled Thought'}
        </h3>
      </div>

      {/* Preview */}
      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3 mb-6 ml-11 font-medium italic opacity-80">
        {preview || 'No content yet...'}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between ml-11 pt-4 border-t border-[var(--color-border)]">
        <span className="text-[var(--color-text-muted)] text-xs font-bold uppercase tracking-widest">{timeAgo}</span>

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 rounded-lg text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all"
          id={`note-delete-${note.id}`}
          aria-label={`Delete note: ${note.title}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function getRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}
