import { useCallback, useEffect, useRef, useState } from 'react';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface UseAutoSaveOptions {
  /** Debounce delay in milliseconds (default: 500) */
  delay?: number;
  /** Callback to execute the save */
  onSave: () => void;
  /** Callback for save errors */
  onError?: (error: Error) => void;
}

/**
 * Custom hook for auto-saving with debounce.
 * Tracks save status for UI feedback.
 */
export function useAutoSave({ delay = 500, onSave, onError }: UseAutoSaveOptions) {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSaveRef = useRef(onSave);
  const onErrorRef = useRef(onError);

  // Keep refs in sync
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const trigger = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setStatus('saving');

    timeoutRef.current = setTimeout(() => {
      try {
        onSaveRef.current();
        setStatus('saved');

        // Reset to idle after 2 seconds
        setTimeout(() => setStatus('idle'), 2000);
      } catch (error) {
        setStatus('error');
        onErrorRef.current?.(error instanceof Error ? error : new Error(String(error)));
      }
    }, delay);
  }, [delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { status, trigger };
}
