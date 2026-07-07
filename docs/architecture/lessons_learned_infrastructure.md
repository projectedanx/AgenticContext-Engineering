# Infrastructure Lessons Learned: Root Hygiene

- **Root is a Hallway**: The repository root must strictly remain a configuration plane. Application code, including backend Express servers (`server.js`), must not reside in the root to prevent architectural drift.
- **Strict Bounding**: Isolating the local server to `server/` explicitly bounds its workflow, eliminating ambiguity about its role versus frontend core application files (which exceptionally reside at the root per this project's bespoke Vite configuration).
- **Manifest Synchronization**: Whenever sweeping misplaced assets, associated manifests (e.g., `package.json` scripts) must be immediately atomically synchronized to prevent broken execution paths (e.g., updating `"node server.js"` to `"node server/server.js"`).
