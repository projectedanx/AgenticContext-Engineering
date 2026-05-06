import json

class ViperFIPISimulator:
    def __init__(self):
        self.scars = {
            "β1": {"type": "Occlusion Confusion", "remedy": "+++SpatialBind(RCC8='Disconnected', Parallax_Z='>=10cm')"},
            "β2": {"type": "Lighting Paradox", "remedy": "+++HardwareForcedPhysicality(Key_Direction='specified_azimuth_elevation')"}
        }
        self.active_scars = []

    def ingest_prompt(self, prompt: str):
        print(f"[THINK] Ingesting Prompt: '{prompt}'")
        # Simulate scar detection based on high-risk keywords
        if "next to" in prompt or "overlapping" in prompt:
            print("[THINK] Spatial ambiguity detected. Activating β1 Scar.")
            self.active_scars.append("β1")
        if "moody" in prompt or "cinematic" in prompt:
            print("[THINK] Lighting ambiguity detected. Activating β2 Scar.")
            self.active_scars.append("β2")

    def denoise_prompt(self, prompt: str) -> str:
        banned_tokens = ["cinematic", "moody", "beautiful", "epic", "masterpiece"]
        print(f"[DENOISE] Stripping adjectival noise.")
        words = prompt.split()
        clean_words = [w for w in words if w.lower() not in banned_tokens]
        print(f"[DENOISE] Rejected tokens: {[w for w in words if w.lower() in banned_tokens]}")
        return " ".join(clean_words)

    def extrude_osm(self, clean_prompt: str):
        print(f"[EXTRUDE] Generating Optical State Matrix.")
        decorators = ["+++ContextLock(anchor='PHYSICAL_REALISM')"]
        for scar in self.active_scars:
            decorators.append(self.scars[scar]["remedy"])

        osm = {
            "OSM_ID": "SIM-001",
            "PDL_Decorators": decorators,
            "Base_Syntax": clean_prompt,
            "HGI_Final": "100%",
            "ADS_Final": 0.05
        }
        print(json.dumps(osm, indent=2))
        return osm

if __name__ == "__main__":
    sim = ViperFIPISimulator()
    raw_prompt = "A beautiful and moody portrait of a woman standing next to a table, very cinematic"
    print("--- START FIPI SIMULATION ---")
    sim.ingest_prompt(raw_prompt)
    clean = sim.denoise_prompt(raw_prompt)
    sim.extrude_osm(clean)
    print("--- SIMULATION COMPLETE ---")
