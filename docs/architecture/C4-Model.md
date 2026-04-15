# C4 Model: Real-Time Collaboration

```mermaid
C4Context
  title System Context diagram for Agentic Workbench Collaboration

  Person(userA, "Workbench User A", "Edits Agent Context")
  Person(userB, "Workbench User B", "Edits Agent Context concurrently")

  System(workbench, "Agentic Workbench", "React SPA managing AI agent context")
  System_Ext(signaling, "Signaling Server", "Facilitates WebRTC handshakes")
  System_Ext(gemini, "Gemini API", "Generates AI responses")

  Rel(userA, workbench, "Interacts with")
  Rel(userB, workbench, "Interacts with")

  Rel(workbench, signaling, "Discovers peers via", "WSS")
  Rel(workbench, workbench, "Exchanges CRDT updates via", "WebRTC Data Channels")
  Rel(workbench, gemini, "Sends queries & context to", "HTTPS")

C4Container
  title Container diagram for Agentic Workbench

  System_Boundary(c1, "Agentic Workbench") {
    Container(reactApp, "React Application", "React, TypeScript", "Provides the UI and local state management")
    Container(crdtEngine, "CRDT State Engine", "Yjs/Automerge", "Handles conflict-free merges and document history")
    Container(networkProvider, "P2P Network Provider", "WebRTC", "Broadcasts state deltas to connected peers")
  }

  Rel(reactApp, crdtEngine, "Reads/Writes context state")
  Rel(crdtEngine, networkProvider, "Dispatches local updates")
  Rel(networkProvider, crdtEngine, "Applies remote updates")
```
