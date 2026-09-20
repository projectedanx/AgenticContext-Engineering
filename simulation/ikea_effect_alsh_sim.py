import math
import json
import time

class IKEAEffectSimulator:
    def __init__(self, name, alpha, gamma, delta, e_user, c_sys, l_ext, xi):
        self.name = name
        self.alpha = alpha  # Coupling coefficient of the IKEA effect
        self.gamma = gamma  # Dampening force applied by extraneous cognitive load
        self.delta = delta  # Rate of Semantic Drift governed by intent curvature
        self.e_user = e_user # User physical/creative effort
        self.c_sys = c_sys  # Underlying structural constraints
        self.l_ext = l_ext  # Extraneous cognitive load
        self.xi = xi        # Intent curvature

    def self_creation(self):
        # High constraint limits creation, high effort boosts it
        if self.c_sys == 0:
            return self.e_user
        return self.e_user / (1 + self.c_sys)

    def cognitive_load(self):
        return self.l_ext

    def drift(self):
        return self.xi

    def simulate(self, steps=10, initial_m=1.0):
        print(f"\n--- Simulating {self.name} ---")
        print(f"Parameters: Alpha={self.alpha}, Gamma={self.gamma}, Delta={self.delta}, E_user={self.e_user}, C_sys={self.c_sys}, L_ext={self.l_ext}, Xi={self.xi}")

        m_t = initial_m
        trajectory = []
        for t in range(steps):
            dM_dt = (self.alpha * self.self_creation()) - (self.gamma * self.cognitive_load()) - (self.delta * self.drift())
            m_t += dM_dt

            # Bound the mental model state to make it somewhat realistic
            if m_t > 10.0: m_t = 10.0
            if m_t < 0.0: m_t = 0.0

            trajectory.append(round(m_t, 2))

        print(f"Final M(t) trajectory: {trajectory}")

        if m_t == 0.0:
            print("Result: Semantic Ossification / Information Foraging Decay")
        elif m_t >= 10.0:
            print("Result: Unchecked Drift / Fragmentation")
        elif trajectory[-1] == trajectory[-2]:
            print("Result: Optimal Cooperative Equilibrium (Affective Latent Space Homeostasis)")
        else:
            print("Result: Stabilizing in Goldilocks Zone")

        return trajectory

def main():
    print("Initializing Shared Mental Model Stability Phase Portrait...")
    time.sleep(0.1)

    # 1. Under-Damped (Low Alpha)
    # The workflow is generated completely by the machine or handed down rigidly by management without participatory design, the IKEA Effect is absent.
    # Human operators experience zero ownership. The system suffers from "Information Foraging Decay" and a rapid accumulation of Cognitive Debt.
    under_damped = IKEAEffectSimulator(
        name="Under-Damped (Low Alpha, a -> 0)",
        alpha=0.01, gamma=0.8, delta=0.5, e_user=1.0, c_sys=0.1, l_ext=0.9, xi=0.5
    )
    under_damped.simulate(steps=15, initial_m=5.0)

    # 2. Over-Damped (Excessive Constraint)
    # If the system's "brand constitution" and validation layers are too rigid, they strangle the user's agency entirely.
    # The system transitions into a state of Semantic Ossification or Bureaucratic Paralysis. All creative plasticity is crushed.
    over_damped = IKEAEffectSimulator(
        name="Over-Damped (Excessive Constraint, C_sys -> inf)",
        alpha=0.9, gamma=0.1, delta=0.1, e_user=1.0, c_sys=10.0, l_ext=0.1, xi=0.1
    )
    over_damped.simulate(steps=15, initial_m=5.0)

    # 3. Critically Damped (The Goldilocks Zone)
    # By optimizing the balance between user-led co-creation (maximizing a) and machine-enforced constraints (calibrating C_sys),
    # the system achieves Affective Latent Space Homeostasis (ALSH).
    critically_damped = IKEAEffectSimulator(
        name="Critically Damped (The Goldilocks Zone)",
        alpha=0.8, gamma=0.2, delta=0.2, e_user=0.8, c_sys=1.2, l_ext=0.3, xi=0.2
    )
    critically_damped.simulate(steps=15, initial_m=5.0)

if __name__ == "__main__":
    main()
