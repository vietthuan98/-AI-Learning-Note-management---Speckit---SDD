import { MAX_TITLE_LENGTH } from '../types/note';

/**
 * Generate a title from the first meaningful line of markdown content.
 *
 * Rules:
 * 1. Strip markdown heading markers (# ## ### etc.)
 * 2. Use the first non-empty line
 * 3. Strip leading/trailing whitespace
 * 4. Truncate at MAX_TITLE_LENGTH with ellipsis
 * 5. If content is empty or only whitespace, return a date-based title
 */
export function generateTitle(content: string): string {
  if (!content || !content.trim()) {
    return formatDateTitle(new Date());
  }

  const lines = content.split('\n');

  for (const line of lines) {
    // Strip markdown heading markers
    const stripped = line.replace(/^#{1,6}\s+/, '').trim();

    // Skip empty lines
    if (!stripped) continue;

    // Strip other common markdown syntax from the beginning
    const cleaned = stripped
      .replace(/^[>\-*+]\s+/, '') // blockquotes, list markers
      .replace(/^\d+\.\s+/, '') // ordered list markers
      .replace(/\*\*(.+?)\*\*/g, '$1') // bold
      .replace(/\*(.+?)\*/g, '$1') // italic
      .replace(/__(.+?)__/g, '$1') // bold alt
      .replace(/_(.+?)_/g, '$1') // italic alt
      .replace(/`(.+?)`/g, '$1') // inline code
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
      .replace(/!\[.*?\]\(.+?\)/g, '') // images
      .trim();

    if (!cleaned) continue;

    // Truncate if too long
    if (cleaned.length > MAX_TITLE_LENGTH) {
      return cleaned.substring(0, MAX_TITLE_LENGTH).trimEnd() + '…';
    }

    return cleaned;
  }

  // Fallback: all lines were empty after cleaning
  return formatDateTitle(new Date());
}

/**
 * Format a date as a human-readable title.
 * Format: "MMM d, yyyy h:mm a" (e.g., "Oct 30, 2025 10:30 AM")
 */
export function formatDateTitle(date: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');

  return `${month} ${day}, ${year} ${displayHour}:${displayMinutes} ${ampm}`;
}

/**
 * Extract a short preview snippet from content.
 * Used for note cards in the dashboard.
 */
export function extractPreview(content: string, maxLength = 120): string {
  if (!content || !content.trim()) return 'No content';

  const cleaned = content
    .replace(/```[^`]*```/gs, '') // fenced code blocks (must be before inline code)
    .replace(/^#{1,6}\s+/gm, '') // headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/`(.+?)`/g, '$1') // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/!\[.*?\]\(.+?\)/g, '') // images
    .replace(/^[>\-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (!cleaned) return 'No content';

  if (cleaned.length > maxLength) {
    return cleaned.substring(0, maxLength).trimEnd() + '…';
  }

  return cleaned;
}
