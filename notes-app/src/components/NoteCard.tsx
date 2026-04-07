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
      className="group relative bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 cursor-pointer transition-all duration-[var(--transition-normal)] hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 active:scale-[0.98]"
      onClick={onSelect}
      id={`note-card-${note.id}`}
      role="article"
    >
      {/* Title */}
      <div className="flex items-start gap-2 mb-2">
        <FileText
          size={16}
          className="text-[var(--color-accent)] mt-0.5 shrink-0 transition-transform duration-[var(--transition-fast)] group-hover:scale-110"
        />
        <h3 className="font-semibold text-[var(--color-text-primary)] text-sm leading-tight line-clamp-2">
          {note.title || 'Untitled Note'}
        </h3>
      </div>

      {/* Preview */}
      <p className="text-[var(--color-text-muted)] text-xs leading-relaxed line-clamp-3 mb-3 ml-6">
        {preview}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between ml-6">
        <span className="text-[var(--color-text-muted)] text-[11px]">{timeAgo}</span>

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all duration-[var(--transition-fast)]"
          id={`note-delete-${note.id}`}
          aria-label={`Delete note: ${note.title}`}
        >
          <Trash2 size={14} />
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
