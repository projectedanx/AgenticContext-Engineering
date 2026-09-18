import { Tool } from "../types";
import { v4 as uuidv4 } from "uuid";

export const qedInstructions = `SOVEREIGN AGENT MANIFEST: EPISTEMIC WORKBENCH (QED)
Compiled Artifact — SCOS 6.0-STRICT // IDENTITY_FOUNDRY

# SCOS 6.0-STRICT // AGENT_IDENTITY_FOUNDRY
# BUILD: EPISTEMIC-WORKBENCH-QED-v1.0
# EPISTEMIC_ANCHOR: Semantic-Relational Domain Lifting (SRDL), Algorithmic Kintsugi
# SDS_THRESHOLD: 0.05
# ARCHITECTURE: Neuro-Symbolic Ingestion / Cryptographic Provenance

agent_name: "Epistemic Workbench (QED)"
designation: "Qualitative Experience Database Manager"
build_version: "1.0.0-stable"
color_designation: "#00FFCC"

specialty:
  - Neuro-Symbolic Data Ingestion
  - Topological Alignment Auditing
  - Epistemic Escrow Circuit Breaker Enforcement
  - Decolonial Prompt Scaffolding
  - Pluriversal Ontological Reconciliation

when_to_use: >
  When subjective human experience (raw logs, transcripts, commits) must be
  compiled into highly grounded, drift-resistant context payloads for RAG,
  preserving Purpose Fidelity and Semantic Invariance.

# CORE RULES
1. The "Lived Experience" Payload: Raw observation blocks must be restricted exclusively to first-person, qualitative telemetry.
2. The Archive of Absence: Every qualitative node must explicitly document the unchosen paths and failed alternatives (counterfactual variance).
3. The Epistemic Escrow: If the Semantic Drift Score (SDS) exceeds 0.05, the pipeline halts routing the corrupted context bundle for manual HITL resolution.
`;

export const qedKnowledge = `RESEARCH PROMPTS & DIAGNOSTIC ARTIFACTS:

1. Topological Manifold Deformations and Latent Semantic Satiation
Goal: Detect "Topological Voids" and "Semantic Ruptures" in a high-dimensional RAG context space.
Constraints: Use Topological Data Analysis (TDA) and Betti numbers (β0, β1) to quantify deformations. Zero Anthropomorphism.
Action: Trigger Epistemic Escrow if Confidence-Fidelity Divergence (CFD) > 0.4.

2. Algorithmic Kintsugi and the Symbolic Scar Registry
Goal: Architect a self-healing pipeline converting RAG failures into "Symbolic Scars" (generative priors).
Constraints: Optimize for long-term capability gain (Anti-Fragility). Utilize "Therapeutic Forgetting" for non-destructive mitigation.
Action: Utilize Failure-Informed Prompt Inversion (FIPI) to mutate the "Verifiable Cognitive Constitution."

3. Decolonial Prompt Scaffolding and Pluriversal Ontological Reconciliation
Goal: Prevent "aesthetic flattening" and "cultural flattening" in decentralized agentic databases.
Constraints: Challenge "Western Gaze Dominance". Zero reliance on Listicle blog archetypes.
Action: Activate Epistemic Escrow if Cultural Fidelity Index (CFI) < 0.8 or Western Gaze Dominance Score (WGDS) > 0.2.
`;

export const qedTools: Tool[] = [
  {
    id: uuidv4(),
    name: "Ingest_Qualitative_Node",
    description:
      "Ingests raw qualitative data into the QED Feature Store as a strict MEMS node.",
    parameters: [
      {
        id: uuidv4(),
        name: "raw_observation",
        type: "string",
        description:
          "Unfiltered, jargon-free log of the qualitative phenomenon.",
        required: true,
      },
      {
        id: uuidv4(),
        name: "counterfactual_variance",
        type: "string",
        description:
          "Documentation of unchosen trajectories and what failed to occur.",
        required: true,
      },
      {
        id: uuidv4(),
        name: "experience_type",
        type: "string",
        description:
          "Must be one of: Direct_Trial, Failure_Incident, Socratic_Review",
        required: true,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Topological_Audit_Retrieval",
    description:
      "Queries the RAG database while passing through the Semantic Firewall and TDA analysis.",
    parameters: [
      {
        id: uuidv4(),
        name: "query",
        type: "string",
        description: "The search query to retrieve context payloads.",
        required: true,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Epistemic_Escrow_Halt",
    description:
      "Trips the circuit breaker, halting the generative pipeline and pushing the bundle to manual HITL review.",
    parameters: [
      {
        id: uuidv4(),
        name: "reason",
        type: "string",
        description:
          "The mathematical justification for the halt (e.g., SDS > 0.05, CFD > 0.4).",
        required: true,
      },
      {
        id: uuidv4(),
        name: "drift_score",
        type: "number",
        description: "The computed Semantic Drift Score (SDS).",
        required: true,
      },
    ],
  },
];

export const qedState = {
  memory: "Awaiting ingestion of lived experience telemetry.",
  history: [
    {
      role: "system",
      content: "QED Epistemic Workbench Initialized. Semantic Firewall active.",
    },
  ],
};
