import { useState, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { Layout } from './components/Layout';
import { NoteList } from './components/NoteList';
import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';
import { DeleteDialog, useDeleteDialog } from './components/DeleteDialog';
import { StorageErrorBanner } from './components/StorageErrorBanner';
import { useNotes } from './hooks/useNotes';
import { useAutoSave } from './hooks/useAutoSave';

export function App() {
  const {
    notes,
    activeNote,
    activeNoteId,
    view,
    storageError,
    addNote,
    updateNoteContent,
    updateNoteTitle,
    deleteNote,
    selectNote,
    goToDashboard,
    saveAllNotes,
    clearStorageError,
  } = useNotes();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { noteToDelete, openDialog, closeDialog } = useDeleteDialog();

  const { status: saveStatus, trigger: triggerSave } = useAutoSave({
    delay: 500,
    onSave: saveAllNotes,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleContentChange = useCallback(
    (content: string) => {
      if (activeNote) {
        updateNoteContent(activeNote.id, content);
        triggerSave();
      }
    },
    [activeNote, updateNoteContent, triggerSave]
  );

  const handleTitleChange = useCallback(
    (title: string) => {
      if (activeNote) {
        updateNoteTitle(activeNote.id, title);
        triggerSave();
      }
    },
    [activeNote, updateNoteTitle, triggerSave]
  );

  const handleDeleteNote = useCallback(
    (id: string, title: string) => {
      openDialog(id, title);
    },
    [openDialog]
  );

  const confirmDelete = useCallback(() => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      closeDialog();
      toast.success('Note deleted');
    }
  }, [noteToDelete, deleteNote, closeDialog]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Storage error banner */}
      {storageError && (
        <StorageErrorBanner
          message={storageError}
          onDismiss={clearStorageError}
        />
      )}

      <Layout
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        sidebar={
          <NoteList
            notes={notes}
            activeNoteId={activeNoteId}
            onSelectNote={(id) => {
              selectNote(id);
              setIsSidebarOpen(false);
            }}
            onAddNote={() => {
              addNote();
              setIsSidebarOpen(false);
            }}
            onGoToDashboard={() => {
              goToDashboard();
              setIsSidebarOpen(false);
            }}
          />
        }
      >
        {view === 'dashboard' ? (
          <Dashboard
            notes={notes}
            onSelectNote={selectNote}
            onAddNote={addNote}
            onDeleteNote={handleDeleteNote}
          />
        ) : activeNote ? (
          <Editor
            noteId={activeNote.id}
            content={activeNote.content}
            title={activeNote.title}
            isAutoTitled={activeNote.isAutoTitled}
            saveStatus={saveStatus}
            onContentChange={handleContentChange}
            onTitleChange={handleTitleChange}
            onBack={goToDashboard}
          />
        ) : null}
      </Layout>

      {/* Delete confirmation dialog */}
      {noteToDelete && (
        <DeleteDialog
          noteTitle={noteToDelete.title}
          onConfirm={confirmDelete}
          onCancel={closeDialog}
        />
      )}

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            fontSize: '13px',
          },
        }}
      />
    </>
  );
}
