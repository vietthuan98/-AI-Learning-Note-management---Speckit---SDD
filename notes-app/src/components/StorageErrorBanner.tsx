import { AlertTriangle, X } from 'lucide-react';

interface StorageErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function StorageErrorBanner({ message, onDismiss }: StorageErrorBannerProps) {
  return (
    <div
      className="sticky top-0 z-[var(--z-toast)] flex items-center gap-3 px-4 py-3 bg-[var(--color-danger)]/10 border-b border-[var(--color-danger)]/20 animate-[var(--animate-slide-in)]"
      id="storage-error-banner"
      role="alert"
    >
      <AlertTriangle size={16} className="text-[var(--color-danger)] shrink-0" />
      <p className="flex-1 text-sm text-[var(--color-danger)] font-medium">
        {message}
      </p>
      <button
        onClick={onDismiss}
        className="p-1 rounded-[var(--radius-sm)] text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all duration-[var(--transition-fast)]"
        id="storage-error-dismiss"
        aria-label="Dismiss error"
      >
        <X size={14} />
      </button>
    </div>
  );
}
