import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateTitle, formatDateTitle, extractPreview } from '../../src/lib/markdown';

describe('generateTitle', () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date('2025-10-30T10:30:00');
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should generate title from the first line of content', () => {
    expect(generateTitle('Meeting with team')).toBe('Meeting with team');
  });

  it('should strip markdown heading markers', () => {
    expect(generateTitle('# My Heading')).toBe('My Heading');
    expect(generateTitle('## Second Level')).toBe('Second Level');
    expect(generateTitle('### Third Level')).toBe('Third Level');
  });

  it('should skip empty lines and use first non-empty line', () => {
    expect(generateTitle('\n\n\nActual content')).toBe('Actual content');
  });

  it('should strip bold and italic markdown', () => {
    expect(generateTitle('**Bold title**')).toBe('Bold title');
    expect(generateTitle('*Italic title*')).toBe('Italic title');
    expect(generateTitle('__Also bold__')).toBe('Also bold');
  });

  it('should strip inline code', () => {
    expect(generateTitle('Using `code` here')).toBe('Using code here');
  });

  it('should strip link syntax and use link text', () => {
    expect(generateTitle('[Click here](https://example.com)')).toBe('Click here');
  });

  it('should truncate long titles at 70 chars with ellipsis', () => {
    const longText = 'A'.repeat(100);
    const result = generateTitle(longText);
    expect(result.length).toBe(71); // 70 + ellipsis
    expect(result.endsWith('…')).toBe(true);
  });

  it('should return date-based title for empty content', () => {
    const result = generateTitle('');
    expect(result).toBe('Oct 30, 2025 10:30 AM');
  });

  it('should return date-based title for whitespace-only content', () => {
    const result = generateTitle('   \n\n  \n  ');
    expect(result).toBe('Oct 30, 2025 10:30 AM');
  });

  it('should handle content with only markdown syntax that strips to empty', () => {
    const result = generateTitle('![](image.png)');
    expect(result).toBe('Oct 30, 2025 10:30 AM');
  });

  it('should strip list markers', () => {
    expect(generateTitle('- List item')).toBe('List item');
    expect(generateTitle('* Star item')).toBe('Star item');
    expect(generateTitle('1. Ordered item')).toBe('Ordered item');
  });

  it('should strip blockquote markers', () => {
    expect(generateTitle('> Quoted text')).toBe('Quoted text');
  });

  it('should handle special characters in content', () => {
    expect(generateTitle('Hello 🎉 World!')).toBe('Hello 🎉 World!');
  });

  it('should use first line and ignore subsequent content', () => {
    expect(generateTitle('First line\nSecond line\nThird line')).toBe('First line');
  });
});

describe('formatDateTitle', () => {
  it('should format date as "MMM d, yyyy h:mm AM/PM"', () => {
    const date = new Date('2025-10-30T10:30:00');
    expect(formatDateTitle(date)).toBe('Oct 30, 2025 10:30 AM');
  });

  it('should handle PM times', () => {
    const date = new Date('2025-10-30T14:05:00');
    expect(formatDateTitle(date)).toBe('Oct 30, 2025 2:05 PM');
  });

  it('should handle midnight as 12:00 AM', () => {
    const date = new Date('2025-10-30T00:00:00');
    expect(formatDateTitle(date)).toBe('Oct 30, 2025 12:00 AM');
  });

  it('should handle noon as 12:00 PM', () => {
    const date = new Date('2025-10-30T12:00:00');
    expect(formatDateTitle(date)).toBe('Oct 30, 2025 12:00 PM');
  });

  it('should pad single-digit minutes', () => {
    const date = new Date('2025-10-30T09:05:00');
    expect(formatDateTitle(date)).toBe('Oct 30, 2025 9:05 AM');
  });
});

describe('extractPreview', () => {
  it('should return cleaned text preview', () => {
    expect(extractPreview('# Heading\nSome content here')).toBe('Heading Some content here');
  });

  it('should return "No content" for empty string', () => {
    expect(extractPreview('')).toBe('No content');
  });

  it('should truncate at maxLength', () => {
    const long = 'A'.repeat(200);
    const result = extractPreview(long, 120);
    expect(result.length).toBe(121); // 120 + ellipsis
    expect(result.endsWith('…')).toBe(true);
  });

  it('should strip markdown formatting', () => {
    expect(extractPreview('**bold** and *italic*')).toBe('bold and italic');
  });

  it('should strip code blocks', () => {
    const content = 'Before\n```\ncode block\n```\nAfter';
    expect(extractPreview(content)).toBe('Before After');
  });
});
