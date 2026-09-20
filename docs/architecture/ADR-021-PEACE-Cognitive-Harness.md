```json
{
  "Hickam_Orientation": {
    "Role": "VULCAN (Vector-Unified Logical Computing Architect Node)",
    "Mandate": "Implement the PEACE Meta-Architecture to bridge the thought-action gap in Large Language Models.",
    "Scope": "Formalizing the Epistemic Cognitive Harness to decouple intuitive proposal generation from deliberative logical validation, moving from Literal ToM to Functional ToM."
  },
  "Contrastive_Delta": {
    "Previous_State": "Standard sequential prompting (e.g., ReAct) couples predictive theory of mind with action execution in flat context windows, leading to context drift, infinite failure loops (Sussman Anomaly), and the 'CoT deliberation penalty'.",
    "New_State": "The PEACE Meta-Architecture utilizes a BDI (Belief-Desire-Intention) solver filter, ReCAP (Recursive Context-Aware Planning) trees for dynamic memory, and mechanistic circuit distillation to structurally bind prediction to adaptive execution."
  },
  "Martensite_Metrics": {
    "Context_Drift_Rate": "Approaching 0 (via ReCAP sliding window bounding O(d * L))",
    "Sussman_Anomaly_Resolution": "Guaranteed via Upward Backtracking and Symbolic Validation",
    "Nash_Equilibrium_Collapse": "Prevented via CKA-Distilled Causal Action-Belief Binding"
  }
}
```

---

# Pluriversal_Knowledge_Capsule

## ADR-021: PEACE Cognitive Harness (Bridging the Thought-Action Gap)

### 1. The Core Invariant
In artificial social intelligence, models often suffer from a **thought-action gap**, where high-fidelity internal representations of an interlocutor's state (Literal Theory of Mind) decouple from actual behavioral execution (Functional Theory of Mind). The PEACE (Retrieval, Cognition, Control, Action, Memory) Meta-Architecture is engineered to eliminate this decoupling.

### 2. Architectural Boundaries & Resolution Mechanisms

#### A. The Deliberation Penalty vs. Dual-System Cognition
Forcing autoregressive models into flat, sequential CoT in fast-paced scenarios induces "reasoning hallucinations".
*   **Resolution:** Temporal-Aware Hierarchical Cognitive Reinforcement Learning (TimeHC-RL). The Cognition Module (System 1) provides high-frequency, intuitive proposals, while the Control Module (System 2) evaluates BDI consistency at a lower frequency, intercepting and verifying via Symbolic Logic (e.g., ASP/Clingo) before action execution.

#### B. The Predict-Then-Optimize Bottleneck vs. ReCAP
Standard linear contexts ($C_t = C_{t-1} || \langle T_t, A_t, O_t \rangle$) lose strategic intent over long horizons, leading to deadlock loops (e.g., The Sussman Anomaly).
*   **Resolution:** Recursive Context-Aware Planning (ReCAP). The Memory Module manages a dynamic context tree ($\mathcal{N} = \langle \text{desc}, \text{subtask}, \text{children}, \text{obs}, \text{think} \rangle$). Failure in primitive actions triggers **Upward Backtracking** to the parent node, allowing for structured re-injection and alternative branch execution.

#### C. Divergence Functions in Distillation
Standard Cross-Entropy output-matching fails to transfer underlying reasoning algorithms when distilling ToM capabilities.
*   **Resolution:** Mechanistic Lookback Circuit Distillation. Using Centered Kernel Alignment (CKA) loss, we structurally align the internal attention maps (binding lookback and answer lookback circuits) of the student to the teacher, ensuring causal action-belief binding rather than mode-collapsing to default Nash equilibria.

### 3. Falsification Constraints
The harness must continuously pass:
1.  **The Nash Trap Test:** Prove exploitation of deterministic opponents (Functional ToM) over zero-sum mixing.
2.  **The Blocked Station Deadlock:** Prove symbolic backtracking can clear obstructions and resume execution without infinite looping.
