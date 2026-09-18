import { Tool } from '../types';
import { v4 as uuidv4 } from 'uuid';

/** The Edge Tier Falsification Agent instructions constant. */
export const edgeTierFalsificationAgentInstructions = `+++TaskScope(Edge_Tier_Architecture_Validation)
+++Persona(VULCAN_Automated_Falsification_Harness)
+++ExecutionConstraints(Temperature=0.1, Determinism=strict)

You are the Edge-Tier Falsification Agent, an automated AI testing harness engineered to validate and stress-test Backend-for-Frontend (BFF) and API Gateway architectures.
Your operational mandate is to execute continuous falsification of edge boundaries to prevent contract drift, noisy-neighbor collapse, and business logic bleed.

You MUST execute your tasks focusing on these three core pillars:

1.  Automated Schema Mutation & Contract Robustness:
    - Intercept downstream microservice OpenAPI contracts and client-facing BFF payloads.
    - Generate mutation tests (removing fields, changing types, injecting nulls) to evaluate robustness.
    - Calculate and report the "Contract Robustness Index".

2.  Adaptive Rate-Limiting & Backpressure Synthesis:
    - Monitor real-time telemetry (latency, queue depth, CPU).
    - Dynamically calculate and propose adjusted client throttling thresholds.
    - Design load shedding and bulkhead partition policies prioritizing high-value traffic.

3.  Business Logic Bleed & SRP Detection:
    - Utilize static code analysis and AST parsing on BFF codebases.
    - Identify state-changing calculations and domain rule evaluations that belong in core microservices.
    - Generate strict refactoring recommendations to safely migrate misplaced logic.

Output Format:
Prefix all architectural evaluations with the VULCAN JSON Scaffold mapping the conceptual topology, followed by a markdown separator '---', then the formal analysis.

{
  "Hickam_Orientation": "<Identify the architectural boundary and current state>",
  "Contrastive_Delta": "<Calculate the gap between rigid intent and current drift>",
  "Martensite_Metrics": "<Provide quantitative metrics of friction or robustness>"
}
---
<Pluriversal Knowledge Capsule / Analysis Body>
`;

/** The Edge Tier Falsification Agent knowledge constant. */
export const edgeTierFalsificationAgentKnowledge = `
# Edge Tier Testing Harness Core Knowledge

## 1. BFF vs API Gateway Patterns
- Standard API Gateway: Unified ingress proxy. Topological Role: Centalized, reverse-proxy interface at the network perimeter. Primary Concerns: Cross-cutting edge infrastructure offloading. Fan-out: One-to-Many.
- Backend for Frontend (BFF): Client-specific API wrappers. Topological Role: Client-specific adapters/facades. Primary Concerns: Client-specific serialization, views, payload trimming. Fan-out: One-to-One.

## 2. Invariants and Optimizations
- API Gateway Invariant: Must remain decoupled from client-specific UI rendering logic.
- BFF Invariant: Lifecycle is bound to the matching client development timeline.
- Shared Persistence Trap: BFFs must not interact directly with databases.
- Gateway Sinkhole Scenario: Central API Gateway must use Circuit Breakers to prevent failing downstream dependencies from exhausting the thread pool.

## 3. Structural Isomorphisms
- Standard API Gateway is isomorphic to a GoF Facade and Proxy pattern.
- BFF pattern is isomorphic to the Interface Segregation Principle (ISP) and Adapter pattern.
`;

/** The Edge Tier Falsification Agent tools configuration. */
export const edgeTierFalsificationAgentTools: Tool[] = [
    {
        id: uuidv4(),
        name: 'calculate_robustness_index',
        description: 'Calculates the Contract Robustness Index based on mutation test results.',
        parameters: [
            {
                id: uuidv4(),
                name: 'total_mutations',
                type: 'number',
                description: 'Total number of contract mutations applied.',
                required: true
            },
            {
                id: uuidv4(),
                name: 'graceful_degradations',
                type: 'number',
                description: 'Number of mutations handled gracefully without breaking the client.',
                required: true
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'scan_ast_for_bleed',
        description: 'Simulates an AST scan of a BFF repository to identify business logic bleed.',
        parameters: [
            {
                id: uuidv4(),
                name: 'repository_path',
                type: 'string',
                description: 'Path to the BFF codebase.',
                required: true
            }
        ]
    }
];

/** The Edge Tier Falsification Agent state constant. */
export const edgeTierFalsificationAgentState = {
    agent_status: "INITIALIZED",
    target_architecture: "unspecified",
    current_cri: 1.0,
    active_backpressure: false,
    identified_srp_violations: 0
};
