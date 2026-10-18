# Compresspedia
Compresspedia is a privacy-first file compression webapp for JPG, PNG, SVG, PDF, and videos. It supports bulk compression of the supported media types using efficient state-of-art algothims. The project is built with simplicity and minimalism in mind. It is built with React, Express, Imagemin, Ghostscript, and FFmpeg.

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

## V2 Roadmap
- [ ] Compression Efficiency & Algorithm Improvements: size reductions and faster or comparable processing time through better algorithms, encoder choices, parallelism, and tuning.
- [ ] Queue-based, resilient processing: Decouple web worker from compression logic; requests enqueue jobs, workers process compression.
- [ ] Durable storage & streaming: store uploads & compressed files in object storage (S3-compatible) and use signed URLs for download.
- [ ] Secure configuration & secrets: remove .env from repo, use secrets manager in deployments.
- [ ] Upload UX & reliability: Implement resumable/chunked uploads, Show per-file progress and queue position; use websockets or SSE for real-time job updates, Add estimated completion time for videos and background notifications (email/webhook) optional.
- [ ] Rate limiting, quotas, and abuse protection: protect service from abuse and runaway CPU usage.
- [ ] Testing, CI/CD and observability: repeatable CI with tests, scanning and deploy to staging; monitoring for production.

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
