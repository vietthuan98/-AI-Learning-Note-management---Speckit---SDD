import { type ReactNode } from 'react';

interface LayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Layout({ sidebar, children, isSidebarOpen, onToggleSidebar }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden" id="app-layout">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-overlay)] lg:hidden"
          onClick={onToggleSidebar}
          id="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-[var(--z-sidebar)]
          h-full w-72
          bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)]
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        id="app-sidebar"
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <main
        className="flex-1 flex flex-col h-full overflow-hidden"
        id="app-main"
      >
        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center h-12 px-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors duration-[var(--transition-fast)]"
            id="sidebar-toggle-mobile"
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          </button>
          <span className="ml-3 font-medium text-[var(--color-text-primary)] text-sm">Notes</span>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
