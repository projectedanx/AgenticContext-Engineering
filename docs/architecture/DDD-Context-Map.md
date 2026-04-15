# DDD Context Map: Agentic Workbench

| Bounded Context | Type | Description |
| :--- | :--- | :--- |
| **Agent Definition Context** | Core Domain | Manages the static persona, rules, and knowledge base. |
| **Tool Execution Context** | Core Domain | Defines external capabilities (schema boundaries). Highly sensitive to structural changes. |
| **Simulation Context** | Supporting | Runs "Chain-of-Code" enactments to validate cognitive contracts. |
| **Collaboration Context** | Generic | Handles the CRDT document synchronization and peer-to-peer networking. |

## Inter-Context Relationships

### Collaboration Context ➔ Agent Definition / Tool Execution
- **Relationship**: Partnership / Customer-Supplier
- **Integration Pattern**: Published Language (CRDT State Updates)
- **Contract**: The Collaboration Context emits generic byte-array deltas. The Tool Execution Context MUST implement an Anti-Corruption Layer (ACL) via `isValidTools` to ensure incoming remote state merges do not violate local schema invariants before updating the React UI.

### Tool Execution Context ➔ Simulation Context
- **Relationship**: Conformist
- **Integration Pattern**: Remote Procedure Call (RPC / Child Process)
- **Contract**: The Tool Execution Context provides the hypothesis strings. The Simulation Context provides boolean validation of the Pluriversal cognitive contract.

### Transitivity Invariants
- The Collaboration Context has ZERO knowledge of what a "Tool" or an "Instruction" is. It only understands a hierarchical document structure.
- The Simulation Context cannot directly access the CRDT document state. It must be provided explicit inputs.
