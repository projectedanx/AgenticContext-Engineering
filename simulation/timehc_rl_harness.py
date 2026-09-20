import random
from typing import Dict, Any

class TimeHCRLHarness:
    """
    Temporal-Aware Hierarchical Cognitive RL (TimeHC-RL).
    Dual-Process Theory simulation:
    - MacroPolicy (System 2): Low frequency, strategic planning.
    - MicroPolicy (System 1): High frequency, intuitive fast responses.
    """
    def __init__(self):
        self.macro_bias: Dict[str, Any] = {}
        self.day_count = 0
        self.turn_count = 0
        self.macro_update_frequency = 10 # update macro every 10 turns

    def execute_macro_policy(self, environment_state: Dict[str, Any]):
        """System 2: Deliberative Planning (Low Frequency)"""
        print(f"\n[System 2] Day {self.day_count} Strategic Planning...")
        # Simulating deliberative RL updating macro biases
        opponent_aggression = environment_state.get("opponent_aggression", 0.5)
        if opponent_aggression > 0.7:
            self.macro_bias = {"stance": "defensive", "trust": "low"}
        else:
            self.macro_bias = {"stance": "cooperative", "trust": "high"}

        print(f"[System 2] Updated Macro Bias: {self.macro_bias}")
        self.day_count += 1

    def execute_micro_policy(self, immediate_stimulus: str) -> str:
        """System 1: Intuitive Execution (High Frequency)"""
        self.turn_count += 1
        stance = self.macro_bias.get("stance", "neutral")

        # Simulating fast associative response conditioned on macro bias
        if stance == "defensive":
            action = "Block/Dodge" if "attack" in immediate_stimulus else "Observe cautiously"
        elif stance == "cooperative":
            action = "Share resource" if "request" in immediate_stimulus else "Engage friendly"
        else:
            action = "Default action"

        return f"[System 1 (Turn {self.turn_count})] Action: {action} (Conditioned on {stance})"

    def simulation_step(self, env_state: Dict, stimulus: str):
        if self.turn_count % self.macro_update_frequency == 0:
            self.execute_macro_policy(env_state)

        action = self.execute_micro_policy(stimulus)
        print(action)
        return action

def run_timehc_simulation():
    harness = TimeHCRLHarness()

    # Phase 1: High opponent aggression
    env_state = {"opponent_aggression": 0.8}
    stimuli = ["attack", "move", "attack"]

    print("--- Phase 1: High Aggression ---")
    for s in stimuli:
        harness.simulation_step(env_state, s)

    # Fast forward turns to trigger macro update
    harness.turn_count = 9

    # Phase 2: Low opponent aggression
    env_state = {"opponent_aggression": 0.3}
    stimuli = ["request", "move", "request"]

    print("\n--- Phase 2: Low Aggression (After Macro Update) ---")
    for s in stimuli:
        harness.simulation_step(env_state, s)

if __name__ == "__main__":
    run_timehc_simulation()
