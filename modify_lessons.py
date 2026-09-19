import re

with open('docs/architecture/lessons_learned_docs.md', 'r') as f:
    content = f.read()

injection_str = """
## 7. Decoupled Verification via Differentiable Cache Augmentation
- **Observation:** Relying strictly on token-based guards (Chain-of-Thought) introduces a severe observability gap, allowing continuous latent reasoning models to undergo un-auditable semantic drift. Prompt-based corrections after the fact suffer from high "Projection Tax" and latency.
- **Architectural Enforcement (VCP Guard):** By introducing the Verification Co-Processor (VCP), we decouple heavy epistemic verification (such as Topological Data Analysis and Confidence-Fidelity Divergence checks) from the primary model's feedforward pass. The VCP calculates necessary trajectory corrections as continuous embeddings ("soft tokens") and injects them directly into the primary model's active Key-Value cache. This enforces semantic geodesics and mitigates covert reasoning at runtime without degrading token generation latency.
"""

content += injection_str

with open('docs/architecture/lessons_learned_docs.md', 'w') as f:
    f.write(content)
