# Premium Note-Taking Application

A professional, local-first note-taking application built with **React 19**, **Tailwind CSS v4**, and **MDXEditor**.

![Notes App Logo](public/favicon.svg)

## Features

- ✨ **Premium UI/UX**: Dark-themed, distraction-free interface with smooth animations and "Outfit" typography.
- 📝 **Markdown Live Preview**: Full WYSIWYG Markdown editing experience using MDXEditor.
- 💾 **Auto-Save**: Background saving to LocalStorage with 500ms debounce.
- 🏷️ **Smart Titling**: Automatic title generation from the first line of content or current timestamp.
- 📱 **Responsive Design**: Fully functional on Mobile, Tablet, and Desktop.
- 🔍 **Search**: Quickly find notes based on title or content.
- 🚨 **Storage Monitoring**: Persistent alerts if LocalStorage quota is exceeded.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Editor**: MDXEditor
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Testing**: Vitest, React Testing Library, JSDOM

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

1. Navigate to the project directory:
   ```bash
   cd notes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Testing

Run unit and integration tests:
```bash
npm test
```

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

## Project Structure

```text
src/
├── components/   # UI components (Dashboard, Editor, Sidebar, etc.)
├── hooks/        # Custom hooks (useNotes, useAutoSave)
├── lib/          # Utilities (persistence, markdown processing)
├── types/        # TypeScript interfaces
└── App.tsx       # Main application logic
```

## License

MIT
