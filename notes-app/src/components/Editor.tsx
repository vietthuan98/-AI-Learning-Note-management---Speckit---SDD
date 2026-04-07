import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  CreateLink,
  linkPlugin,
  linkDialogPlugin,
  type MDXEditorMethods,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import type { SaveStatus } from '../hooks/useAutoSave';

interface EditorProps {
  noteId: string;
  content: string;
  title: string;
  isAutoTitled: boolean;
  saveStatus: SaveStatus;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
  onBack: () => void;
}

export function Editor({
  noteId,
  content,
  title,
  isAutoTitled,
  saveStatus,
  onContentChange,
  onTitleChange,
  onBack,
}: EditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null);

  // Sync editor content when switching notes
  useEffect(() => {
    editorRef.current?.setMarkdown(content);
  }, [noteId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = useCallback(
    (markdown: string) => {
      onContentChange(markdown);
    },
    [onContentChange]
  );

  return (
    <div className="flex flex-col h-full animate-[var(--animate-in)] bg-[var(--color-bg-primary)]" id="editor-container">
      {/* Editor header */}
      <div className="flex items-center gap-4 px-6 h-16 shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-md z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-1 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all active:scale-95"
          id="editor-back-btn"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-surface)] flex items-center justify-center border border-[var(--color-border)] shrink-0">
            <FileText size={16} className="text-[var(--color-accent)]" />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder={isAutoTitled ? 'Auto-generated title...' : 'Name your thought...'}
            className="flex-1 bg-transparent text-[var(--color-text-primary)] font-bold text-lg border-none outline-none placeholder:text-[var(--color-text-muted)] placeholder:italic tracking-tight focus:placeholder:opacity-50 transition-all"
            id="editor-title-input"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          />
        </div>

        {/* Save status indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <SaveStatusBadge status={saveStatus} />
        </div>
      </div>

      {/* MDXEditor */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="max-w-[900px] mx-auto py-12 px-6 lg:px-12">
          <MDXEditor
            ref={editorRef}
            markdown={content}
            onChange={handleChange}
            contentEditableClassName="prose prose-invert max-w-none prose-p:text-lg prose-headings:font-outfit prose-headings:tracking-tight prose-a:text-[var(--color-accent)] prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-accent)]/30 prose-blockquote:bg-[var(--color-bg-surface)]/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1"
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <div className="flex items-center gap-1.5 p-1">
                    <BlockTypeSelect />
                    <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
                    <BoldItalicUnderlineToggles />
                    <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
                    <ListsToggle />
                    <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
                    <CreateLink />
                  </div>
                ),
              }),
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function SaveStatusBadge({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null;

  const config = {
    saving: {
      text: 'Syncing',
      className: 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] border-[var(--color-border)]',
      icon: <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-pulse" />,
    },
    saved: {
      text: 'Saved',
      className: 'bg-[var(--color-accent-glow)] text-[var(--color-accent)] border-[var(--color-accent)]/20',
      icon: <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />,
    },
    error: {
      text: 'Sync Error',
      className: 'bg-red-500/10 text-red-500 border-red-500/20',
      icon: <div className="w-2 h-2 rounded-full bg-red-500" />,
    },
  }[status];

  if (!config) return null;

  return (
    <span
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${config.className}`}
      id="save-status-badge"
    >
      {config.icon}
      {config.text}
    </span>
  );
}
