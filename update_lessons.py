import re

def main():
    with open("docs/LESSONS_LEARNED.md", "r", encoding="utf-8") as f:
        content = f.read()

    new_section = """
## 4. Agentic Inversion & Structural Mapping
- **Mapping over Solving:** We have shifted the AI paradigm from an autonomous "auto-solver" to a **Structural Mapper**. In a complex architecture, an auto-solver attempts to average out constraints (Semantic Saponification). A Structural Mapper, driven by the PM Persona, uses Paraconsistent Mapping to expose and maintain the geometry of these constraints, producing deterministic blueprints (like Zachman Framework specifications).
- **The Value of Paraconsistent Mapping:** By mapping contradictions rather than resolving them prematurely, we preserve high-entropy friction, allowing the human to sculpt constraints effectively.
"""

    if "Agentic Inversion & Structural Mapping" not in content:
        content += "\n" + new_section

        with open("docs/LESSONS_LEARNED.md", "w", encoding="utf-8") as f:
            f.write(content)
        print("Updated docs/LESSONS_LEARNED.md")
    else:
        print("docs/LESSONS_LEARNED.md already updated")

if __name__ == "__main__":
    main()
