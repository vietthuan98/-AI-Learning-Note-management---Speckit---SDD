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
import { ArrowLeft, Save, FileText } from 'lucide-react';
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
    <div className="flex flex-col h-full" id="editor-container">
      {/* Editor header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <button
          onClick={onBack}
          className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-[var(--transition-fast)]"
          id="editor-back-btn"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FileText size={16} className="text-[var(--color-text-muted)] shrink-0" />
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder={isAutoTitled ? 'Auto-generated title...' : 'Enter a title...'}
            className="flex-1 bg-transparent text-[var(--color-text-primary)] font-medium text-sm border-none outline-none placeholder:text-[var(--color-text-muted)] placeholder:italic"
            id="editor-title-input"
          />
        </div>

        {/* Save status indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <SaveStatusBadge status={saveStatus} />
        </div>
      </div>

      {/* MDXEditor */}
      <div className="flex-1 overflow-auto">
        <MDXEditor
          ref={editorRef}
          markdown={content}
          onChange={handleChange}
          contentEditableClassName="prose prose-invert max-w-none"
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
                <>
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <CreateLink />
                </>
              ),
            }),
          ]}
        />
      </div>
    </div>
  );
}

function SaveStatusBadge({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null;

  const config = {
    saving: {
      text: 'Saving...',
      className: 'text-[var(--color-text-muted)] animate-[var(--animate-pulse-subtle)]',
      icon: <Save size={12} className="animate-pulse" />,
    },
    saved: {
      text: 'Saved',
      className: 'text-[var(--color-success)]',
      icon: <Save size={12} />,
    },
    error: {
      text: 'Error',
      className: 'text-[var(--color-danger)]',
      icon: <Save size={12} />,
    },
  }[status];

  if (!config) return null;

  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-medium ${config.className} transition-all duration-[var(--transition-normal)]`}
      id="save-status-badge"
    >
      {config.icon}
      {config.text}
    </span>
  );
}
