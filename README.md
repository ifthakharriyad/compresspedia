# Compresspedia

A full-stack web application to compress images, PDFs, and videos online for free.

## Features

- **Multi-format support** – JPG, PNG, GIF, SVG, PDF, and video compression in one platform
- **Batch processing** – Upload and compress up to 20 images/PDFs or 5 videos simultaneously
- **User-controlled quality** – Adjustable compression ratios with format-specific algorithms
- **Privacy-first** – Automatic file deletion after download; zero data retention
- **Multi-language** – Localization support with localStorage persistence

## Tech Stack

**Frontend:**
- React 17 with Hooks for state management
- Material-UI for responsive, accessible components
- @lingui/macro for compile-time i18n

**Backend:**
- Express.js REST API with Multer for multipart uploads
- ImageMin (PNG/JPEG/GIF/SVG), Ghostscript (PDF), FFmpeg (Video) for compression
- Promise-based async processing for concurrent file handling
- Transient file system with auto-cleanup for resource optimization

## Architecture

**State Management:** React Hooks with state machine pattern for complex upload/compression workflow. Ensures valid state transitions and prevents race conditions.

**API Design:** RESTful endpoints with format-specific compression pipelines. Abstracted compression logic allows independent algorithm tuning per format (e.g., PNG quality vs GIF lossy rate).

**Backend Processing:** Promise.all() for concurrent batch operations; error isolation per file prevents single failure from blocking others.

**Resource Management:** Auto-deletion of temporary files after download window prevents disk bloat in production.

## Getting Started

```bash
# Install
git clone https://github.com/ifthakharriyad/compresspedia.git
cd compresspedia
npm install && cd client && npm install

# Development
npm run server              # Terminal 1: Backend with Babel transpilation
cd client && npm start      # Terminal 2: Frontend (localhost:3000)

# Production
npm run build
npm start
```

## Key Implementation Details

- **State architecture** – Centralized state in DropZoneContainer with conditional rendering based on upload/compression phases
- **Async orchestration** – useEffect hook manages file upload trigger; Promise-based compression endpoints handle concurrent processing
- **Error handling** – Try-catch blocks at API boundaries with user-friendly error UI and retry mechanisms
- **Responsive design** – Mobile-first CSS with Material-UI breakpoints; works across all device sizes
- **Performance** – Batch processing up to 20 files/operation; FFmpeg dynamic bitrate scaling achieves ~70% video compression

## Why These Choices

- **React Hooks** – Sufficient state complexity for this scope; avoided over-engineering with Redux
- **Material-UI** – Pre-built accessible components, responsive grid, active maintenance
- **Promise.all()** – Non-blocking concurrent processing without external queue libraries
- **Multer** – Direct control over multipart handling; simple and battle-tested
- **Format-specific compression** – Different formats have different optimization strategies; abstraction allows independent tuning

## License

ISC
