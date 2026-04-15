# ADR-001: Real-Time Collaboration Topology via CRDTs

## Context
The Agentic Context Engineering Workbench requires Real-Time Collaboration capabilities (per `TODO.md`). The current architecture is a monolithic frontend relying on `localStorage`. Directly syncing this monolithic state via a shared central database violates the Shared Database Anathema and introduces severe transitivity risks, coupling discrete bounded contexts (e.g., Tool Definitions vs. Knowledge Base) into a synchronous lock state.

## Decision
We will implement an Event-Driven Architecture (EDA) utilizing Conflict-free Replicated Data Types (CRDTs), specifically Yjs or Automerge, distributed via a WebRTC mesh network with a fallback WebSocket signaling server.

## Status
Accepted

## Consequences

### Positive Trade-offs
- **Decoupling**: Bounded contexts remain isolated. State merges mathematically without a central arbiter.
- **Topological Novelty**: Provides robust offline capabilities and local-first development.
- **Transitivity Defense**: Microservices/Clients do not inherit broad database access; they only subscribe to specific CRDT document updates.

### Negative Trade-offs
- **Projection Tax**: High cognitive load for developers transitioning from CRUD to eventual consistency. Complex conflict resolution for complex nested schema arrays (like the `tools` state).
- **Network Overhead**: Event broadcast payloads (deltas) can become massive if history pruning is not aggressively enforced.

## Mitigations
- Implement aggressive garbage collection/tombstone pruning on the CRDT graph.
- Enforce strict `isValidTools` schema validation *before* applying local edits to the CRDT document to prevent poison-pill state corruption from propagating across the mesh.
