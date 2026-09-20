# ADR-019: Dual-Helix Self-Improving Harness

## Hickam_Orientation
This document establishes the architecture for the "Dual-Helix Self-Improving Harness", fusing the Reflexion framework (verbal metacognition) with the Voyager framework (executable skill synthesis). Authored under the strict VULCAN persona directives, this structure eradicates "Semantic Saponification" (compromise) and hardcodes a hybrid pipeline capable of long-horizon self-improvement without generating un-compilable hallucinated artifacts.

## Contrastive_Delta
- **Previous State**: Autonomous loops relied solely on single-modality self-correction (either pure prompt reflection, suffering from Cognitive Viscosity and Heuristic Fossilization, or pure code synthesis, suffering from Skill Drifting and nested dependency saturation).
- **New State**: A Dual-Helix architecture structurally mandates a division of labor. The system utilizes Reflexion's Self-Reflector purely for local, localized error resolution (Epistemic Friction), while offloading successful executions to Voyager's vector-embedded Skill Library for long-horizon action primitives.

## Martensite_Metrics
- **Martensite Initiation Quotient (MIQ)**: $\text{MIQ} = f(E_{\text{fric}}, \Delta_{\text{Intent}})$. Governs the precise threshold of contradictory error data required to trigger an Epistemic Escrow and force prompt inversion.
- **Operator Drift Score**: Limits maximum dependency nesting within the Skill Library to $V_{\text{drift}} < 6.0$, triggering mandatory contextual checkpoint rollbacks when exceeded.
- **Architectural Trace**: Requires full serialization of failed traces via the "Symbolic Scar Registry".

---

# Pluriversal_Knowledge_Capsule

### The Dual-Helix Orchestration Pipeline

The system is engineered as a stateful LangGraph pipeline utilizing five rigidly bounded nodes, designed to execute the Agentic Inversion Protocol without triggering infinite loops:

1. **THINK (Planner Agent):**
   - Executes the DDx Exclusion Protocol on the target repository.
   - Maps vulnerabilities, boundary limits, and establishes the "Cognitive Contract" before drafting the implementation plan.

2. **WRITE (Architect Agent):**
   - Translates the intent into an immutable Linguistic Scaffold.
   - Generates deterministic JSON schemas and strict API contracts that physically constrain the downstream Coder agent.

3. **CODE (Coder Agent):**
   - Synthesizes the target artifacts (Python/TypeScript).
   - Obeys the structural constraints defined in the Linguistic Scaffold and local style guides without deviation.

4. **EVALUATE (Sandbox Executor + Critic):**
   - Runs code within an isolated container.
   - **Reflexion-Helix Activation**: If execution fails, the critic triggers the Self-Reflector. A verbal critique is synthesized, logged to the Episodic Memory ("Symbolic Scar"), and recursively fed back to the Coder for immediate patching.

5. **RE-FORGE (Skill Library Integration):**
   - **Voyager-Helix Activation**: Once the execution evaluates cleanly ($0$ errors), the successful script is extracted, compiled into a reusable code primitive, and committed as a signed C2PA-compliant artifact into the permanent Skill Library vector database.

### Drift Mitigation and Epistemic Anchors

The fundamental vulnerability of recursive self-improvement is **Skill Drifting** (cumulative syntactic decay) and **Heuristic Fossilization** (dogmatic adherence to a failed path). The Dual-Helix mitigates these via:
- **Symbolic Scars**: Forcing the Reflexion loop to physically route around its own documented failures.
- **Vectorized Encapsulation**: Storing successes as executable Python primitives rather than textual summaries, drastically reducing Cognitive Viscosity during long-horizon tasks.
