import { type ReactNode } from 'react';

interface LayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Layout({ sidebar, children, isSidebarOpen, onToggleSidebar }: LayoutProps) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-[var(--color-bg-primary)]" id="app-layout">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[var(--z-overlay)] lg:hidden transition-opacity duration-300"
          onClick={onToggleSidebar}
          id="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-[var(--z-sidebar)]
          inset-y-0 left-0
          h-full w-72 shrink-0
          bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)]
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        id="app-sidebar"
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <main
        className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative"
        id="app-main"
      >
        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center h-14 px-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            id="sidebar-toggle-mobile"
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-2 font-semibold text-[var(--color-text-primary)] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Notes
          </span>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
    </div>
  );
}
