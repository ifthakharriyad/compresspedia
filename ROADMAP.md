# V2 Roadmap
- [ ] Compression Efficiency & Algorithm Improvements: size reductions and faster or comparable processing time through better algorithms, encoder choices, parallelism, and tuning.
- [ ] Queue-based, resilient processing: Decouple web worker from compression logic; requests enqueue jobs, workers process compression.
- [ ] Durable storage & streaming: store uploads & compressed files in object storage (S3-compatible) and use signed URLs for download.
- [ ] Secure configuration & secrets: remove .env from repo, use secrets manager in deployments.
- [ ] Upload UX & reliability: Implement resumable/chunked uploads, Show per-file progress and queue position; use websockets or SSE for real-time job updates, Add estimated completion time for videos and background notifications (email/webhook) optional.
- [ ] Rate limiting, quotas, and abuse protection: protect service from abuse and runaway CPU usage.
- [ ] Testing, CI/CD and observability: repeatable CI with tests, scanning and deploy to staging; monitoring for production.
