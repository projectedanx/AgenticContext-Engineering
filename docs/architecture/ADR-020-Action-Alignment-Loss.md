```json
{
  "Hickam_Orientation": {
    "Role": "VULCAN (Vector-Unified Logical Computing Architect Node)",
    "Mandate": "Eliminate predictive-behavioral decoupling and the 'thought-action' gap via mathematically rigorous Action-Alignment Loss.",
    "Scope": "Implementation of a bounding differentiable constraint forcing optimal execution policy derived from descriptive Theory of Mind."
  },
  "Contrastive_Delta": {
    "Previous_State": "Standard policy gradients against non-stationary, sub-optimal opponents default to high-entropy Nash equilibria. Agents decouple descriptive belief (Head A) from strategic action (Head B).",
    "New_State": "Action-Alignment Loss penalizes the deviation between the expected utility of the selected policy and the expected utility of the optimal oracle response, structurally binding prediction to execution."
  },
  "Martensite_Metrics": {
    "Nash_Equilibrium_Regret": "1.0 (Maximum Penalization)",
    "Optimal_Exploit_Regret": "0.0 (Zero Penalty)",
    "Gradient_Smoothness": "Boltzmann LogSumExp relaxation applied (tau = 0.1)."
  }
}
```

---

# Pluriversal_Knowledge_Capsule

## ADR-020: Action-Alignment Loss (Bridging the Thought-Action Gap)

### 1. The Core Invariant
In sequential multi-agent games, neural agents often decouple their internal world model from strategic action. A model might correctly predict an opponent's suboptimal play with 100% confidence (Literal Theory of Mind), yet fail to exploit it, retreating instead to high-entropy, uncooperative Nash equilibria (Functional Theory of Mind).

This happens because standard Cross-Entropy minimizes predictive error on the scene but does not causally constrain the policy gradient to that predicted state.

### 2. Isomorphic Formalization
To resolve this, we map the **thought-action gap** into a bounded regret minimization objective.

Given:
*   $\hat{p}$: Opponent's predicted strategy (Head A).
*   $p$: Focal agent's execution policy (Head B).
*   $U$: The utility payoff matrix.

We calculate:
*   **Expected Action Utility:** $E = U \hat{p}$
*   **Optimal (Oracle) Utility:** $V^*(\hat{p}) = \max(E)$
*   **Policy Utility:** $\mathbb{E}_{p, \hat{p}}[U] = p^T E$

The exact **Action-Alignment Loss** is the bounded regret:
$$ \mathcal{L}_{\text{Align}}(p, \hat{p}) = V^*(\hat{p}) - p^T U \hat{p} $$

### 3. PyTorch Structural Engineering
To prevent sparse gradients caused by the hard `max` operator, the implementation uses a **Boltzmann Best-Response Approximation** via LogSumExp:

$$ V^*_{\tau}(\hat{p}) = \tau \log \sum_{j} \exp\left(\frac{[U \hat{p}]_j}{\tau}\right) $$

This ensures smooth gradient flow across all actions, stabilizing early reinforcement learning.

The implementation is verified against the Rock-Paper-Scissors "Nash Trap", successfully proving that minimizing this loss to 0.0 mathematically eliminates the Nash basin ($[1/3, 1/3, 1/3]$) and forces the optimal exploit policy.

### 4. Harness Falsification Contexts
The principles defined here spawn three targeted research vectors:
*   **Mechanistic Lookback Circuit Alignment**: Distilling the causal belief-tracking "lookback circuit" from teacher to student models to steer vocabulary distribution away from default Nash priors.
*   **Closed-Loop ReCAP via BDI**: Wrapping the inference pipeline in an Epistemic Scaffolding to continuously verify neural `#Intentions` against the optimal response to `#Beliefs`.
*   **Active Bayes Risk Probing**: Using Sequential Inverse Plan Search (SIPS) to evaluate Bayes Risk and trigger programmatic meta-queries when action uncertainty jeopardizes task integrity in POMDPs.
