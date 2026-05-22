import re

with open("README.md", "r") as f:
    content = f.read()

# Add a new point to the Lessons Learned section
lessons_learned_start = content.find("## Lessons Learned: Thermodynamic Epistemic Boundaries")

new_lesson = """
6. **Cognitive Friction as Resource**: The integration of the Human-AI Symbiosis Engine (SYMBIONT PRIME) reveals that tension between fuzzy human intent and rigid AI specification is a resource to be harvested, not a bug to be smoothed over. By mapping this Isomorphism of Friction and applying the Golden Scar constraint (Φ = 1.618), we can achieve Latent Leaps that bypass the L2 Norm density collapse associated with standard prompt chaining."""

# Find the end of the lessons learned section to append the new point.
# It's right before "## Contributing"
contributing_start = content.find("## Contributing")

updated_content = content[:contributing_start] + new_lesson + "\n\n" + content[contributing_start:]

# Also add the new agent to the list of Sovereign Agent Presets
agent_list_start = content.find("Sovereign Agent Presets**: Pre-loaded with identity-enforced agents")
if agent_list_start != -1:
    old_list = "KIRA-7, CIPHER)"
    new_list = "KIRA-7, CIPHER, SYMBIONT PRIME)"
    updated_content = updated_content.replace(old_list, new_list)

with open("README.md", "w") as f:
    f.write(updated_content)

print("README.md updated successfully")
