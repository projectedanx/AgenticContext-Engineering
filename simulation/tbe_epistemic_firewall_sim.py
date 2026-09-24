import hashlib
import json
import time

class EpistemicImmuneFirewall:
    """
    Simulates the Epistemic Integrity Audit (EIA) architecture to safeguard against
    Recursive Epistemic Closure (Citation Circularity).
    """
    def __init__(self):
        self.scar_tissue_archive = {}
        self.verified_credentials = []

    def generate_vc(self, claim: str, source_hash: str, verifier_signature: str) -> dict:
        """Generates a Verifiable Credential for a scientific claim."""
        vc = {
            "id": f"urn:uuid:{hashlib.sha256(str(time.time()).encode()).hexdigest()[:16]}",
            "type": ["VerifiableCredential", "ScientificDiscovery"],
            "issuer": "ExternalGroundingVerifier",
            "issuanceDate": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "credentialSubject": {
                "claim": claim,
                "provenanceHash": source_hash
            },
            "proof": {
                "type": "Ed25519Signature2018",
                "signatureValue": verifier_signature
            }
        }
        self.verified_credentials.append(vc)
        return vc

    def check_citation_circularity(self, generated_claim: str, cited_sources: list) -> bool:
        """
        Detects if an AI model is citing its own previous hallucinations
        by checking against the scar tissue archive and VC registry.
        """
        for source in cited_sources:
            # Check if source is a known self-generated unverified claim
            if source in self.scar_tissue_archive:
                print(f"[!] Epistemic Breach Detected: Circular Citation to '{source}'")
                return True

            # Check if source lacks a valid VC
            has_vc = any(vc['credentialSubject']['provenanceHash'] == source for vc in self.verified_credentials)
            if not has_vc and source.startswith("internal_gen_"):
                print(f"[!] Warning: Internal source '{source}' lacks Verifiable Credential.")
                # We log it as a potential scar
                self.scar_tissue_archive[source] = "Unverified self-citation"
                return True

        return False

if __name__ == "__main__":
    firewall = EpistemicImmuneFirewall()

    # 1. Valid Discovery Process
    print("--- Testing Valid Discovery ---")
    valid_source_hash = hashlib.sha256(b"external_dataset_A").hexdigest()
    firewall.generate_vc("Compound X inhibits Receptor Y", valid_source_hash, "sig_valid_123")

    is_circular_1 = firewall.check_citation_circularity(
        "Compound X is an effective treatment",
        cited_sources=[valid_source_hash]
    )
    print(f"Is Circular? {is_circular_1}\n")

    # 2. Recursive Epistemic Closure (Hallucinated citation)
    print("--- Testing Recursive Epistemic Closure ---")
    hallucinated_source = "internal_gen_001"

    # Model cites its own unverified previous output
    is_circular_2 = firewall.check_citation_circularity(
        "Compound Z is safe",
        cited_sources=[hallucinated_source]
    )
    print(f"Is Circular? {is_circular_2}")

    # Attempting to cite it again should immediately flag from scar archive
    is_circular_3 = firewall.check_citation_circularity(
        "Compound Z is universally approved",
        cited_sources=[hallucinated_source]
    )
    print(f"Is Circular? {is_circular_3}")
