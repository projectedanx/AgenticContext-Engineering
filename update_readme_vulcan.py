import re

with open("README.md", "r") as f:
    content = f.read()

new_feature = """
- **Scar-Driven Topological Extruder (SDTE)**: An architectural synthesis protocol implementing the VULCAN persona. It inverts standard human-AI flow: Humans dictate structural contradictions and failure 'Scars'; the AI uses Failure-Informed Prompt Inversion (FIPI) and FuzzyRCC-8 to route around these failure nodes, strictly enforcing the Mereological Mandate to produce C4-compliant architectural DAGs."""

lessons_learned = """
## Lessons Learned: Thermodynamic Epistemic Boundaries

1. **The Necessity of Friction**: High-entropy organizational contradictions (Human input) are structurally necessary to generate non-trivial, low-entropy architectural topologies (AI output). Premature conflict resolution yields anemic microservices.
2. **The Mereological Mandate**: A rigid bounding of context is not merely conceptual but a physical boundary. Permitting shared data states across bounded contexts inevitably causes Semantic Saponification and tight deployment coupling.
3. **AI as Structural Extruder**: The highest value of AI in architecture is not generative expansion, but constraint enforcement and failure routing (FIPI).
"""

# Insert feature
if "- **Epistemic Dissonance Engine**" in content:
    # Find the end of that feature bullet
    match = re.search(r"(- \*\*Epistemic Dissonance Engine\*\*:.*?)\n\n", content, re.DOTALL)
    if match:
         updated_content = content[:match.end()] + new_feature + "\n\n" + content[match.end():]
    else:
        # If it's at the end of the section without double newline
        updated_content = content.replace("without premature compromise.", "without premature compromise.\n" + new_feature)
else:
    print("Could not find insertion point for SDTE feature.")
    updated_content = content

# Insert lessons learned before "Getting Started"
updated_content = updated_content.replace("## Getting Started", lessons_learned + "\n## Getting Started")

with open("README.md", "w") as f:
    f.write(updated_content)
    print("README.md updated successfully with VULCAN features and lessons learned.")
