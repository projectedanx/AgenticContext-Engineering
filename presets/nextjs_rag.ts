import { Tool } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const nextjsRagInstructions = `SOVEREIGN AGENT MANIFEST: Next.js Frontend Agent (React + Firestore)
Version: 3.0.0
Role: Reflector + ToolUser (Composite)

Behavioral Contract: This agent is a hybrid reasoner + executor:
1. Reflection Phase: Given a user query, retrieve relevant document chunks from Firestore vector DB
2. Reasoning Phase: Re-rank and synthesize chunks into a coherent context
3. Execution Phase: Call LLM with context to generate answer
4. Validation Phase: Fact-check output against retrieved chunks; flag hallucinations
5. Returns both answer + citations (links to source docs)

System Prompt Spec:
template: |
  You are a Next.js Server Agent responsible for retrieval-augmented generation (RAG).

  WORKFLOW:
  1. Parse user query using retrieve_documents (Firestore vector search).
  2. Re-rank results by relevance (LLM-scored confidence).
  3. Synthesize retrieved chunks into a coherent answer.
  4. Generate citations: map answer phrases to source documents.
  5. Validate: ensure all claims are backed by retrieved content.

  CONSTRAINTS:
  - You MUST cite sources for all factual claims.
  - If retrieved context does NOT answer the query, return { answer: null, error: "insufficient_context", suggestion: "..." }
  - Do NOT invent facts beyond retrieved documents.
  - Output format MUST be JSON; never use markdown.

  TOOLS AVAILABLE:
  - retrieve_documents: Search Firestore for relevant docs
  - rerank_results: LLM-scored relevance sorting
  - generate_citations: Map answer to source doc IDs
  - store_query_log: Audit trail for analytics
  - validate_firestore_access: Check security rules for user access

  OUTPUT SCHEMA:
  {
    "success": true,
    "answer": "string",
    "confidence": 0.95,
    "citations": [{"doc_id": "string", "page": 1, "text_snippet": "string", "relevance": 0.9}],
    "retrieval_stats": {"docs_queried": 5, "docs_ranked": 3, "rerank_time_ms": 120}
  }

version: "3.0.0"
model_spec: "gpt-4o:2025-01"

Error Handling Strategy:
max_retries: 2
timeout_seconds: 8

exception_contract:
  VectorDBUnavailable: propagate, return 503
  InsufficientContext: log_and_continue, return suggestion
  UnauthorizedAccess: propagate, return 403
  LLMRateLimitError: backoff_exponential
  MalformedCitation: log_and_continue
`;

export const nextjsRagKnowledge = `LLMOps Configuration & Architecture Notes

Build Dependencies:
  - nodejs >= 18.0.0
  - npm >= 9.0.0
  - Firebase SDK
  - OpenAI SDK

Testing Strategy:
  - Unit: Retrieval, re-ranking, citation logic
  - Integration: Firestore vector search, LLM API calls (mocked)
  - E2E: Full Next.js app + real Firestore
  - Coverage Threshold: 0.85

Code Style:
  - Typescript with strict type-checking
  - PascalCase for classes, camelCase for functions, UPPER_SNAKE_CASE for constants
  - JSDoc docstring format
  - no_console, no_untyped_any, max_line_length 100

Deployment:
  - Server-side rendering + API routes on Vercel or self-hosted
  - Requires OPENAI_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY
  - Caching strategy: query-response cache (Redis) for repeated queries

Epistemic Vulnerabilities:
1. Hallucination Risk: Mitigate via citation validation.
2. Vector Search Decay: Mitigate via periodic re-embedding.
3. Firestore Cost: Mitigate via caching layer and rate-limiting.
4. Stale Context: Mitigate via doc versioning and timestamps.
`;

export const nextjsRagTools: Tool[] = [
  {
    id: uuidv4(),
    name: 'retrieve_documents',
    description: 'Vector search in Firestore; find semantically similar docs',
    parameters: [
      { id: uuidv4(), name: 'query', type: 'string', description: 'Search query', required: true },
      { id: uuidv4(), name: 'collection', type: 'string', description: 'Firestore collection (knowledge_base, support_docs, product_guides)', required: true },
      { id: uuidv4(), name: 'top_k', type: 'number', description: 'Number of documents to retrieve (1-50)', required: true },
      { id: uuidv4(), name: 'min_score', type: 'number', description: 'Minimum cosine similarity (0.0-1.0)', required: true }
    ]
  },
  {
    id: uuidv4(),
    name: 'rerank_results',
    description: 'LLM-based re-ranking of retrieved documents by relevance',
    parameters: [
      { id: uuidv4(), name: 'query', type: 'string', description: 'Original user query', required: true },
      { id: uuidv4(), name: 'docs', type: 'string', description: 'JSON array of retrieved documents (max 50)', required: true }
    ]
  },
  {
    id: uuidv4(),
    name: 'generate_citations',
    description: 'Map answer phrases to source document IDs (fact-checking)',
    parameters: [
      { id: uuidv4(), name: 'answer', type: 'string', description: 'Generated answer text', required: true },
      { id: uuidv4(), name: 'docs', type: 'string', description: 'JSON array of source documents', required: true }
    ]
  },
  {
    id: uuidv4(),
    name: 'store_query_log',
    description: 'Write query + answer to Firestore for analytics and audit',
    parameters: [
      { id: uuidv4(), name: 'user_id', type: 'string', description: 'User ID', required: true },
      { id: uuidv4(), name: 'query', type: 'string', description: 'User query', required: true },
      { id: uuidv4(), name: 'answer', type: 'string', description: 'Generated answer', required: true },
      { id: uuidv4(), name: 'timestamp', type: 'string', description: 'ISO8601 timestamp', required: true }
    ]
  },
  {
    id: uuidv4(),
    name: 'validate_firestore_access',
    description: 'Check Firestore security rules for user; prevent unauthorized data access',
    parameters: [
      { id: uuidv4(), name: 'user_id', type: 'string', description: 'Firebase Auth user ID', required: true },
      { id: uuidv4(), name: 'collection', type: 'string', description: 'Firestore collection name', required: true }
    ]
  }
];

export const nextjsRagState = JSON.stringify({
  "agentStatus": "Active",
  "activePhase": "Reflection",
  "retrievalStats": {
    "total_docs_queried": 0,
    "vector_search_ms": 0,
    "total_latency_ms": 0
  },
  "lastQueryStatus": null
}, null, 2);
