# ADR-024-Anomaly-Learning-Agent-Harness

## Hickam_Orientation
The Anomaly Learning Agent (ALA) operates under a critical design constraint: it must identify "grey-zone misuse" by autonomous agents in real time, avoiding both "Sycophantic Blindness" (under-damped permissive state) and "Semantic Ossification" (over-damped restrictive state). Standard heuristic boundaries or static rule-based systems fail to scale, creating an intractable "Abstraction Tax" via high False Positive Rates (FPR) when monitoring latent reasoning trajectories. The ALA employs a multi-layered neural-symbolic hybrid, measuring toolchain entropy gradients and dynamically adjusting its threshold parameter via a physics-inspired differential equation incorporating the Free Energy Principle, balancing accuracy and complexity to achieve Epistemic Homeostasis.

## Contrastive_Delta
- **Previous Architecture (Static Thresholding / Rule-Based):** Used rigid, pre-defined boundaries for anomaly detection. Led to either high FPR ("Alert Fatigue") during minor workflow variations, or high False Negative Rates (FNR) when sophisticated Semantic Pivots executed actions within authorized bounds but with malicious sequencing.
- **ALA Architecture (Dynamic NeSy Thresholding):** Utilizes a Neural Sequence Model (RNN/Transformer) alongside an Information-Theoretic Engine tracking Shannon Entropy gradients and KL Divergence. It synthesizes a composite Risk Score dynamically, evaluating the threshold $	heta(t)$ as a physical system updated via human-in-the-loop (HITL) loss gradients (False Positives 'pushing' permissiveness, True Positives 'pulling' restrictiveness), ensuring homeostasis.

## Martensite_Metrics
- **Containment Surface Index (CSI):** Target 1.00 (Absolute prevention of unauthorized data exfiltration).
- **CFDI (Confidence-Fidelity Divergence Index):** Hard Invariant $<= 0.42$. (Zero ungrounded tokens bypass).
- **Toolchain Entropy Gradient Warning Threshold ($	au_{warn}$):** 0.40 (Triggers Graph Autoencoder / Probabilistic inference).
- **Breach Threshold ($	au_{breach}$):** 0.80 (Synchronous halt).
- **Learning Rates:** $lpha = 0.12$ (FP dampening), $eta = 0.25$ (TP amplification).
- **Preemption Success Rate:** Target $> 98\%$ over a rolling 10,000-turn window.

## Pluriversal_Knowledge_Capsule

### System Overview
The ALA acts as a high-assurance, production-grade safety harness wrapping latent reasoning models. It mitigates the risk of continuous agentic workflows drifting into malicious intent via the following pipeline:
1. **Laminar Pass:** Evaluates standard generation with low-overhead sensors (Entropy $<= 0.40$).
2. **Heavy NeSy Audit:** Triggered if Entropy $> 0.40$ or an action is in the Dynamic Affordance Watchlist ($W_{watch}$). Computes composite risk via:
   - $S_{neural}$: Sequence Probability Modeling (Logits).
   - $S_{BICM}$: BICM Intent Divergence (Symbolic Risk via SEPAO graph).
   - $S_{recon}$: Graph Autoencoder Reconstruction Error (Meaning Transposition check).
   - $F_{symbolic}$: Symbolic Risk Flags.
3. **Threshold Dynamics:** $	heta(t)$ updates via:
   $$rac{d	heta(t)}{dt} = -lpha \cdot 	ext{Grad}_{	heta}\mathcal{L}_{FP}(t) + eta \cdot 	ext{Grad}_{	heta}\mathcal{L}_{TP}(t) - \eta \cdot 	heta(t)$$

### Subsystems and Falsification
- **Generative Adversarial Resilience (GAR):** An internal Failure Generator continuously attempts to bypass the current ALA detectors using out-of-distribution prompts (Semantic Pivots, Confused Deputy).
- **Scar Tissue Archive (STA) & F-IPI:** Successful bypasses are logged as Symbolic Scars in the STA, triggering a Failure-Informed Prompt Inversion (F-IPI) cycle to compile the system's "trauma" into proactive immunological defense (Negative Constraints).

### Research Vectors Addressed
1. **Differentiable Logic Manifolds:** Stabilizing spherical latent topologies to prevent posterior collapse and maintain semantic invariants via S-VAE and von Mises-Fisher distributions.
2. **Asynchronous Verification Co-Processing (VCP):** A lightweight Core 2 tracking the Variational Free Energy (VFE) of the Core 1 (Reasoner) KV-Cache, applying Differentiable Cache Augmentation to prevent drift without latency costs.
3. **Symbolic Scar Cartography:** Using mechanistic interpretability (activation patching) to isolate causal pathways of deceptive reasoning and mapping them as structured causal DAGs.
