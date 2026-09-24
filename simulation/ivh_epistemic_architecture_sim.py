import numpy as np

def simulate_scenario_1_ptolemaic_vs_keplerian():
    print("--- SCENARIO 1: Ptolemaic Over-Fitting vs. Keplerian Parsimony ---")
    n = 1000
    k_A = 25
    mse_A = 0.05
    k_B = 6
    mse_B = 0.055

    def calculate_bic(n, mse, k):
        return n * np.log(mse) + k * np.log(n)

    bic_A = calculate_bic(n, mse_A, k_A)
    bic_B = calculate_bic(n, mse_B, k_B)

    print(f"Model A (Ptolemaic) - Parameters: {k_A}, MSE: {mse_A}")
    print(f"Model A BIC: {bic_A:.2f}")
    print(f"Model B (Keplerian) - Parameters: {k_B}, MSE: {mse_B}")
    print(f"Model B BIC: {bic_B:.2f}")

    print("\nOccam-Loss Compiler Evaluation:")
    if bic_B < bic_A:
        print("RESULT: Keplerian Model selected. Epicyclic over-fitting rejected via BIC differential.")
    else:
        print("RESULT: Ptolemaic Model selected.")

    print("\nSimulating 'Model Breaking' via Venusian Phase-Angle Constraints...")
    venus_phases_observed = True
    geocentric_allows_full_phases = False

    if venus_phases_observed and not geocentric_allows_full_phases:
         print("CRITICAL ANOMALY: Modus Tollens Falsification triggered.")
         print("Geocentric coordinate frame structurally rejected. Forcing abductive transition to Heliocentric system.\n")

def simulate_scenario_2_factive_vs_nonfactive():
    print("--- SCENARIO 2: Factive Knowledge vs. Non-Factive Understanding ---")

    fictive_principles = {
        "point_mass": {"strict_truth": False, "explanatory_utility": 0.95, "computational_cost": 0.1},
        "frictionless_surface": {"strict_truth": False, "explanatory_utility": 0.85, "computational_cost": 0.15},
        "rigid_body": {"strict_truth": False, "explanatory_utility": 0.90, "computational_cost": 0.2}
    }

    factive_truth_score = 0.0
    variable_manipulation_score = 0.95
    causal_dependency_identification = 0.98
    domain_transfer_capacity = 0.85

    def calculate_grasping_metric(v_manip, c_dep, d_trans, fictive_utility):
        return (v_manip * 0.3) + (c_dep * 0.4) + (d_trans * 0.2) + (fictive_utility * 0.1)

    utility_used = fictive_principles["point_mass"]["explanatory_utility"]
    understanding_score = calculate_grasping_metric(
        variable_manipulation_score,
        causal_dependency_identification,
        domain_transfer_capacity,
        utility_used
    )

    print("Agent Task: Solve standard astrophysical trajectory.")
    print("Framework Used: strictly Newtonian (contains General Relativistic defeaters).")
    print(f"Propositional Factive Truth Score: {factive_truth_score:.2f} (Strictly False at fundamental scales)")
    print(f"Calculated Non-Factive 'Understanding Score': {understanding_score:.2f} / 1.00")

    if understanding_score > 0.8:
        print("RESULT: Agent possesses genuine scientific understanding despite using 'Fictive Principles'.\n")

def simulate_scenario_3_de_idealization():
    print("--- SCENARIO 3: Automating the De-Idealization Loop ---")

    class SystemModel:
        def __init__(self, name, assumptions):
            self.name = name
            self.assumptions = assumptions

        def predict(self, external_force):
            base = external_force * 2.5
            if "zero_flexibility" in self.assumptions:
                return base
            else:
                return base * 0.85

    idealized_model = SystemModel("Rigid_Rod_Polymer", ["zero_flexibility", "zero_friction"])

    external_force_applied = 100.0
    experimental_observation = 210.0
    sigma = 5.0

    ideal_prediction = idealized_model.predict(external_force_applied)
    divergence = abs(ideal_prediction - experimental_observation)

    print(f"Model: {idealized_model.name} | Assumptions: {idealized_model.assumptions}")
    print(f"Prediction: {ideal_prediction} | Experimental Observation: {experimental_observation}")
    print(f"Divergence: {divergence} | Allowed 3-sigma bound: {3 * sigma}")

    if divergence > 3 * sigma:
        print("\nCRITICAL ALERT: 3-sigma divergence detected by Boundary Auditor.")
        print("Initiating De-Idealization Routine...")
        print("Targeting faulty assumption: 'zero_flexibility'")

        refined_assumptions = [a for a in idealized_model.assumptions if a != "zero_flexibility"]
        refined_model = SystemModel("Flexible_Chain_Polymer", refined_assumptions)

        refined_prediction = refined_model.predict(external_force_applied)
        new_divergence = abs(refined_prediction - experimental_observation)

        print(f"\nRefined Model: {refined_model.name} | Assumptions: {refined_model.assumptions}")
        print(f"Refined Prediction: {refined_prediction} | Experimental Observation: {experimental_observation}")
        print(f"New Divergence: {new_divergence}")

        if new_divergence <= 3 * sigma:
            print("RESULT: De-Idealization successful. Higher-dimensional representation achieved.\n")
        else:
            print("RESULT: De-Idealization failed. Further structural revision required.\n")

if __name__ == "__main__":
    simulate_scenario_1_ptolemaic_vs_keplerian()
    simulate_scenario_2_factive_vs_nonfactive()
    simulate_scenario_3_de_idealization()
