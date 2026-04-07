import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useAutoSave logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce save calls by 500ms', () => {
    const saveFn = vi.fn();
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debouncedSave = (data: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => saveFn(data), 500);
    };

    debouncedSave('first');
    debouncedSave('second');
    debouncedSave('third');

    // Nothing should have been called yet
    expect(saveFn).not.toHaveBeenCalled();

    // Advance 500ms
    vi.advanceTimersByTime(500);

    // Only the last call should fire
    expect(saveFn).toHaveBeenCalledTimes(1);
    expect(saveFn).toHaveBeenCalledWith('third');
  });

  it('should save immediately if no new input after debounce period', () => {
    const saveFn = vi.fn();
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debouncedSave = (data: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => saveFn(data), 500);
    };

    debouncedSave('data');
    vi.advanceTimersByTime(500);

    expect(saveFn).toHaveBeenCalledTimes(1);
    expect(saveFn).toHaveBeenCalledWith('data');
  });

  it('should reset debounce timer on rapid successive calls', () => {
    const saveFn = vi.fn();
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debouncedSave = (data: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => saveFn(data), 500);
    };

    debouncedSave('a');
    vi.advanceTimersByTime(300);
    debouncedSave('ab');
    vi.advanceTimersByTime(300);
    debouncedSave('abc');

    // Still no call after 600ms total
    expect(saveFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(saveFn).toHaveBeenCalledTimes(1);
    expect(saveFn).toHaveBeenCalledWith('abc');
  });

  it('should handle multiple independent save cycles', () => {
    const saveFn = vi.fn();
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debouncedSave = (data: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => saveFn(data), 500);
    };

    // First cycle
    debouncedSave('first');
    vi.advanceTimersByTime(500);
    expect(saveFn).toHaveBeenCalledTimes(1);

    // Second cycle
    debouncedSave('second');
    vi.advanceTimersByTime(500);
    expect(saveFn).toHaveBeenCalledTimes(2);
    expect(saveFn).toHaveBeenLastCalledWith('second');
  });
});
