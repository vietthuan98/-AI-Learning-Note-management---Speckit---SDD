import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteDialogProps {
  noteTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ noteTitle, onConfirm, onCancel }: DeleteDialogProps) {
  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
      id="delete-dialog-overlay"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 w-full max-w-sm shadow-[var(--shadow-lg)] animate-[var(--animate-scale-in)]">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-[var(--transition-fast)]"
          id="delete-dialog-close"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-[var(--radius-md)] bg-[var(--color-danger)]/10">
            <AlertTriangle size={20} className="text-[var(--color-danger)]" />
          </div>
          <h2 className="font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Delete Note
          </h2>
        </div>

        <p className="text-[var(--color-text-secondary)] text-sm mb-6 leading-relaxed">
          Are you sure you want to delete{' '}
          <span className="font-medium text-[var(--color-text-primary)]">
            "{noteTitle || 'Untitled Note'}"
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] rounded-[var(--radius-md)] border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] transition-all duration-[var(--transition-fast)]"
            id="delete-dialog-cancel"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white rounded-[var(--radius-md)] bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] transition-all duration-[var(--transition-fast)] active:scale-95"
            id="delete-dialog-confirm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to manage delete dialog state.
 */
export function useDeleteDialog() {
  const [noteToDelete, setNoteToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const openDialog = (id: string, title: string) => {
    setNoteToDelete({ id, title });
  };

  const closeDialog = () => {
    setNoteToDelete(null);
  };

  return { noteToDelete, openDialog, closeDialog };
}
