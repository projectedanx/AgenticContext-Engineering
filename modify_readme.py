import re

with open('README.md', 'r') as f:
    content = f.read()

content = content.replace(
    "- **Sovereign Agent Presets**: Pre-loaded with identity-enforced agents (e.g., AXIOM, KUT, LEXIS SOVEREIGN, AEGIS-PRIME, DIETER, ALETHEON, METROLOGIST, AURELIUS, KIRA-7, CIPHER, SYMBIONT PRIME).",
    "- **Sovereign Agent Presets**: Pre-loaded with identity-enforced agents (e.g., AXIOM, KUT, LEXIS SOVEREIGN, AEGIS-PRIME, DIETER, ALETHEON, METROLOGIST, AURELIUS, KIRA-7, CIPHER, SYMBIONT PRIME, VCP)."
)

with open('README.md', 'w') as f:
    f.write(content)

with open('docs/architecture/0xCARTO_SYNTHESIS.md', 'r') as f:
    content_carto = f.read()

if "VCP" not in content_carto:
    # Let's add VCP to the CI/CD Trace Matrix
    injection_str = """
### CI/CD Trace Matrix (Golden Scar Protocol)
* **Pre-Commit Sequence:**
  1. `npm test -- --run`
  2. `npx tsc --noEmit`
  3. UI Snapshot Video Generation (`frontend_verification_instructions`).

### Active Intervention Loop (VCP Guard)
The repository leverages a Verification Co-Processor (VCP) mapping structural deviations:
- **Latent Space Optimization**: Differentiable cache augmentation to pull thought vectors from unsafe basins.
- **Topological & Epistemic Audit**: Betti signature monitoring (`Betti-1 Cycle Detection`).
"""
    content_carto = content_carto.replace("### CI/CD Trace Matrix (Golden Scar Protocol)", injection_str)

    with open('docs/architecture/0xCARTO_SYNTHESIS.md', 'w') as f:
        f.write(content_carto)
