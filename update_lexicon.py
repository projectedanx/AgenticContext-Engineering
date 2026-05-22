import re

with open("LEXICON.md", "r") as f:
    content = f.read()

# Append the new patterns to the end of Section I
# Find the start of Section II
section_ii_start = content.find("## SECTION II")

new_patterns = """
### PAT-011 · Human-AI Symbiosis Engine
**Type**: Integrated Framework | **AT Score**: 0.98
**Definition**: The deliberate fusion of human non-obvious analytical lenses (such as tacit reflexive dialogue) with rigid AI specification blocks (such as JSON-LD DCCD execution). This synthesis creates an emergent property where structural determinism does not erase nuanced human realities.
**Mechanism**: Maps qualitative inputs to structural JSON outputs, anticipating initial cognitive friction (Productivity J-Curve) followed by massive efficiency gains.
**PDL Activators**: `+++SymbiosisAnchor(value="emergent_determinism")`

---

### PAT-012 · Paraconsistent Synthesis Node
**Type**: Epistemic Operator | **AT Score**: 0.94
**Definition**: A structural topological engine designed to hold the unquantifiable entropy of human tacit knowledge and the rigid determinism of AI models in superposition without forcing collapse.
**Mechanism**: Tension computation mapping divergent ontological planes into an Isomorphism of Friction, resolving output with the Golden Scar constraint (Φ = 1.618).
**PDL Activators**: `+++PhronesisGuard(tension="paraconsistent")`

---

### PAT-013 · Agentic Inversion Engine
**Type**: Epistemic Operator | **AT Score**: 0.95
**Definition**: Calculates epistemic drift between fuzzy human intent and rigid AI schema, proposing a Latent Leap resolution.
**Mechanism**: Tension computation mapping divergent ontological planes into an Isomorphism of Friction.
**PDL Activators**: `+++PhronesisGuard(tension="inversion")`

---

### PAT-014 · Lexical Cartography
**Type**: Analysis Zone
**Definition**: Processing semantic space through Semantic Drift, Connotation Vectors, Semiotic Blind Spots, and Ambiguity Zones to extract Isomorphisms of Friction.
**Mechanism**: Paraconsistent Hasse lattice mapping.
**PDL Activators**: `+++MereologyRoute(relation_type="dynamic_entanglement")`

---

"""

# Insert before Section II
updated_content = content[:section_ii_start] + new_patterns + content[section_ii_start:]

# Also, update the PDL table in SECTION II
pdl_table_addition = """| `+++SymbiosisAnchor` | Structural/Systemic | Productivity J-Curve Friction | `value="emergent_determinism"` |
| `+++PhronesisGuard` | Epistemic | Golden Scar Resolution, Ontological Collapse | `tension="paraconsistent"|"inversion"` |
"""
table_end = updated_content.find("## SECTION III")
# find the last line of the table which ends with constraint |
last_table_line = updated_content.find("| `+++SpatialBind`", table_end - 500, table_end)
end_of_table = updated_content.find("\n", last_table_line) + 1

updated_content = updated_content[:end_of_table] + pdl_table_addition + updated_content[end_of_table:]


with open("LEXICON.md", "w") as f:
    f.write(updated_content)

print("LEXICON.md updated successfully")
