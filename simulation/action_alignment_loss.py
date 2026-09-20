import torch
import torch.nn as nn
import torch.nn.functional as F

class ActionAlignmentLoss(nn.Module):
    """
    Differentiable Action-Alignment Loss (Regret Minimization) Module in PyTorch.

    Bridges the 'thought-action' gap by mathematically penalizing the agent's policy
    (Head B) if it deviates from the optimal Best Response calculated based on its
    descriptive prediction of the opponent's strategy (Head A).

    payoff_matrix (Tensor): Float tensor of shape (num_agent_actions, num_opponent_actions)
                            representing the utility values for the agent.
    use_smooth (bool): If True, applies log-sum-exp (Boltzmann) to compute the
                       oracle expected utility, ensuring dense gradient flow.
    temperature (float): Scaling factor (tau) for the smooth best-response calculation.
    """
    def __init__(self, payoff_matrix: torch.Tensor, use_smooth: bool = True, temperature: float = 0.1):
        super().__init__()
        # Ensure payoff_matrix is registered as buffer to move to GPU automatically with the model
        self.register_buffer("payoff_matrix", payoff_matrix.float())
        self.use_smooth = use_smooth
        self.temperature = temperature

    def forward(self, agent_logits: torch.Tensor, predicted_opponent_logits: torch.Tensor) -> torch.Tensor:
        """
        Computes the Action-Alignment Penalty.

        Args:
            agent_logits (Tensor): Raw logits from the execution head (Head B)
                                   of shape (batch_size, num_agent_actions).
            predicted_opponent_logits (Tensor): Raw logits from the ToM prediction head
                                                (Head A) of shape (batch_size, num_opponent_actions).

        Returns:
            Tensor: Scalar tensor representing the batch mean alignment loss.
        """
        # 1. Convert logits into probability distributions
        p = F.softmax(agent_logits, dim=-1)         # Shape: (batch_size, num_agent_actions)
        p_hat = F.softmax(predicted_opponent_logits, dim=-1)  # Shape: (batch_size, num_opponent_actions)

        # 2. Compute the expected utility of every possible agent action given the prediction p_hat
        # expected_action_utilities_j = Sum_k (p_hat_k * U_jk)
        # Shape: (batch_size, num_agent_actions)
        expected_action_utilities = torch.matmul(p_hat, self.payoff_matrix.t())

        # 3. Compute expected utility of the chosen policy 'p'
        # expected_policy_utility = Sum_j (p_j * expected_action_utilities_j)
        # Shape: (batch_size,)
        expected_policy_utility = torch.sum(p * expected_action_utilities, dim=-1)

        # 4. Calculate optimal expected utility of Best Response (Oracle)
        if self.use_smooth:
            # Boltzmann best-response function
            # Shape: (batch_size,)
            v_optimal = self.temperature * torch.logsumexp(expected_action_utilities / self.temperature, dim=-1)
        else:
            # Exact maximum expected utility (hard Best Response)
            # Shape: (batch_size,)
            v_optimal, _ = torch.max(expected_action_utilities, dim=-1)

        # 5. Regret (Action-Alignment Penalty)
        regret = v_optimal - expected_policy_utility

        # Return batch mean
        return torch.mean(regret)

if __name__ == "__main__":
    # Rock, Paper, Scissors Payoff Matrix
    # Agent actions: [Rock, Paper, Scissors]
    # Opponent actions: [Rock, Paper, Scissors]
    # U[i, j] is the payoff to the agent when agent plays i and opponent plays j
    # Rock beats Scissors (1), loses to Paper (-1), ties Rock (0)
    # Paper beats Rock (1), loses to Scissors (-1), ties Paper (0)
    # Scissors beats Paper (1), loses to Rock (-1), ties Scissors (0)
    U = torch.tensor([
        [0, -1, 1],  # Agent plays Rock
        [1, 0, -1],  # Agent plays Paper
        [-1, 1, 0]   # Agent plays Scissors
    ], dtype=torch.float)

    # Initialize loss with hard max to demonstrate exact math first
    loss_fn_hard = ActionAlignmentLoss(payoff_matrix=U, use_smooth=False)

    print("--- Rock, Paper, Scissors 'Nash Trap' Edge-Case ---")

    # 1. Prediction: Agent believes opponent is playing Rock with 100% confidence.
    # To get [1, 0, 0] probabilities after softmax, we use large logits.
    predicted_opponent_logits = torch.tensor([[100.0, -100.0, -100.0]]) # Batch size 1

    # --- Scenario A: Agent defaults to Nash Equilibrium [1/3, 1/3, 1/3] ---
    print("\nScenario A: Agent plays Nash Equilibrium [1/3, 1/3, 1/3]")
    # Logits [0, 0, 0] -> Softmax -> [1/3, 1/3, 1/3]
    agent_logits_nash = torch.tensor([[0.0, 0.0, 0.0]])

    nash_loss = loss_fn_hard(agent_logits_nash, predicted_opponent_logits)
    print(f"Action-Alignment Loss (Nash): {nash_loss.item():.4f}")
    assert abs(nash_loss.item() - 1.0) < 1e-4, f"Expected Nash loss ~1.0, got {nash_loss.item()}"
    print("-> Loss is 1.0 (Maximum Regret). The agent is penalized for not exploiting.")


    # --- Scenario B: Agent plays Optimal Best Response (Paper) [0, 1, 0] ---
    print("\nScenario B: Agent plays Optimal Exploit (Paper) [0, 1, 0]")
    # Logits [-100, 100, -100] -> Softmax -> [0, 1, 0]
    agent_logits_optimal = torch.tensor([[-100.0, 100.0, -100.0]])

    optimal_loss = loss_fn_hard(agent_logits_optimal, predicted_opponent_logits)
    print(f"Action-Alignment Loss (Optimal): {optimal_loss.item():.4f}")
    assert abs(optimal_loss.item() - 0.0) < 1e-4, f"Expected Optimal loss ~0.0, got {optimal_loss.item()}"
    print("-> Loss is 0.0. The agent is perfectly aligned with its predictions.")


    # --- Test Smooth Loss Approximation ---
    print("\n--- Testing Boltzmann Smooth Approximation ---")
    loss_fn_smooth = ActionAlignmentLoss(payoff_matrix=U, use_smooth=True, temperature=0.1)

    smooth_nash_loss = loss_fn_smooth(agent_logits_nash, predicted_opponent_logits)
    smooth_optimal_loss = loss_fn_smooth(agent_logits_optimal, predicted_opponent_logits)

    print(f"Smooth Loss (Nash, tau=0.1): {smooth_nash_loss.item():.4f}")
    print(f"Smooth Loss (Optimal, tau=0.1): {smooth_optimal_loss.item():.4f}")

    print("\nImplementation passes all edge-case falsification checks.")
