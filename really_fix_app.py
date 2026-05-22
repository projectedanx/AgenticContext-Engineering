import re

with open("App.tsx", "r") as f:
    content = f.read()

# Add state loader function
loader_function = """  const loadViperPreset = () => {
    setInstructions(viperInstructions);
    setKnowledge(viperKnowledge);
    setTools(viperTools);
    setState(viperState);
    setQuery(
      "I want a nostalgic, beautiful portrait of an old woman in a Parisian cafe, very cinematic and emotional, masterpiece quality, 8k",
    );
  };

  const loadSymbiontPrimePreset = () => {
    setInstructions(symbiontPrimeInstructions);
    setKnowledge(symbiontPrimeKnowledge);
    setTools(symbiontPrimeTools);
    setState(symbiontPrimeState);
    setQuery(
      "Calculate the epistemic drift between the marketing team's desire for 'seamless magical experiences' and our rigid microservice JSON-LD specifications.",
    );
  };"""

content = content.replace("""  const loadViperPreset = () => {
    setInstructions(viperInstructions);
    setKnowledge(viperKnowledge);
    setTools(viperTools);
    setState(viperState);
    setQuery(
      "I want a nostalgic, beautiful portrait of an old woman in a Parisian cafe, very cinematic and emotional, masterpiece quality, 8k",
    );
  };""", loader_function)

# Add UI Button
button_ui = """              <button
                onClick={loadViperPreset}
                className="px-4 py-2 bg-red-900/20 text-red-500 border border-red-900/50 rounded hover:bg-red-900/40 hover:text-red-400 font-mono text-sm transition-colors"
              >
                [ LOAD V.I.P.E.R. ]
              </button>

              <button
                onClick={loadSymbiontPrimePreset}
                className="px-4 py-2 bg-yellow-900/20 text-[#FFD700] border border-yellow-900/50 rounded hover:bg-yellow-900/40 hover:text-yellow-400 font-mono text-sm transition-colors"
              >
                [ LOAD SYMBIONT PRIME ]
              </button>"""

content = content.replace("""              <button
                onClick={loadViperPreset}
                className="px-4 py-2 bg-red-900/20 text-red-500 border border-red-900/50 rounded hover:bg-red-900/40 hover:text-red-400 font-mono text-sm transition-colors"
              >
                [ LOAD V.I.P.E.R. ]
              </button>""", button_ui)

with open("App.tsx", "w") as f:
    f.write(content)

print("App.tsx updated again")
