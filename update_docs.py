import sys

def replace_in_file(file_path, old_text, new_text):
    with open(file_path, 'r') as file:
        filedata = file.read()

    if old_text not in filedata:
        print(f"Error: Could not find old_text in {file_path}")
        return False

    filedata = filedata.replace(old_text, new_text)

    with open(file_path, 'w') as file:
        file.write(filedata)
    print(f"Successfully updated {file_path}")
    return True

# 1. Update README.md
old_readme = """- **Pluriversal Feature Discovery**: A novel agentic protocol implementing AEW v2.1 SCC to conceptually map paradoxes and structural conflicts to generate novel feature concepts through "Chain-of-Code" enactments.

- **Epistemic Dissonance Engine**:"""

new_readme = """- **Pluriversal Feature Discovery**: A novel agentic protocol implementing AEW v2.1 SCC to conceptually map paradoxes and structural conflicts to generate novel feature concepts through "Chain-of-Code" enactments.

- **V.I.P.E.R. (Visual Intent & Physical Execution Router)**: A Tier 2 Genuine Agency persona ("The Gaffer") enforcing strict physical boundaries on generation requests. VIPER utilizes the Paraconsistent Lens to route around human-defined contradictions and Failure-Informed Prompt Inversion (FIPI) to mathematically bind spatial relationships (RCC-8) and enforce hardware specifications.

- **Epistemic Dissonance Engine**:"""

replace_in_file("README.md", old_readme, new_readme)

# 2. Update docs/LESSONS_LEARNED.md
old_lessons = """### Human-AI Symbiosis Inversion (ADR-008)
- **Declarative Prompting is Structurally Brittle:** Attempting to specify the positive space (the desired solution) via natural language leads to Semantic Saponification and latent defects. The AI averages out intent, losing architectural rigor.
- **The Value of Constraints (Scars):** Maximum emergent utility is achieved when humans provide the negative space: the lived failure modes, the "Scars", and the contradictory constraints (NFRs).
- **Failure-Informed Prompt Inversion (FIPI):** By routing a structural DAG *around* the human-defined failure nodes (using the Paraconsistent Lens), the AI naturally extrudes valid architecture from the remaining latent space. The human's ambiguity becomes the AI's geometric boundary."""

new_lessons = """### Human-AI Symbiosis Inversion (ADR-008 & ADR-009)
- **Declarative Prompting is Structurally Brittle:** Attempting to specify the positive space (the desired solution) via natural language leads to Semantic Saponification and latent defects. The AI averages out intent, losing architectural rigor.
- **The Value of Constraints (Scars):** Maximum emergent utility is achieved when humans provide the negative space: the lived failure modes, the "Scars", and the contradictory constraints (NFRs).
- **Failure-Informed Prompt Inversion (FIPI):** By routing a structural DAG *around* the human-defined failure nodes (using the Paraconsistent Lens), the AI naturally extrudes valid architecture from the remaining latent space. The human's ambiguity becomes the AI's geometric boundary.
- **Emergent Symbiosis via V.I.P.E.R.:** Friction is generative. When the system outright rejects vague adjectival input and mathematically forces strict physical hardware parameters, the human is forced to provide necessary high-entropy structural context, while the AI provides the low-entropy constraint envelope."""

replace_in_file("docs/LESSONS_LEARNED.md", old_lessons, new_lessons)
