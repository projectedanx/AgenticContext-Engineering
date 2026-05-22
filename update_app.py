import re

with open("App.tsx", "r") as f:
    content = f.read()

# Add imports
import_statement = """} from "./presets/viper";
import {
  symbiontPrimeInstructions,
  symbiontPrimeKnowledge,
  symbiontPrimeTools,
  symbiontPrimeState,
} from "./presets/symbiont_prime";"""

content = content.replace('} from "./presets/viper";', import_statement)

# Add state loader function
loader_function = """  const loadViperPreset = () => {
    setLocalInstructions(viperInstructions);
    setLocalKnowledge(viperKnowledge);
    setLocalTools(viperTools);
    setLocalState(viperState);
  };

  const loadSymbiontPrimePreset = () => {
    setLocalInstructions(symbiontPrimeInstructions);
    setLocalKnowledge(symbiontPrimeKnowledge);
    setLocalTools(symbiontPrimeTools);
    setLocalState(symbiontPrimeState);
  };"""

content = content.replace("""  const loadViperPreset = () => {
    setLocalInstructions(viperInstructions);
    setLocalKnowledge(viperKnowledge);
    setLocalTools(viperTools);
    setLocalState(viperState);
  };""", loader_function)

# Add UI Button
button_ui = """                <button
                  onClick={loadViperPreset}
                  className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 rounded transition-colors"
                >
                  <div className="font-bold text-red-400">VIPER</div>
                  <div className="text-xs text-red-500/70">Visual Intent & Physical Execution Router</div>
                </button>
                <button
                  onClick={loadSymbiontPrimePreset}
                  className="w-full text-left px-4 py-3 bg-yellow-900/20 hover:bg-yellow-900/40 border border-yellow-500/30 rounded transition-colors"
                >
                  <div className="font-bold text-yellow-400">SYMBIONT PRIME</div>
                  <div className="text-xs text-yellow-500/70">The Paraconsistent Weaver</div>
                </button>"""

content = content.replace("""                <button
                  onClick={loadViperPreset}
                  className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 rounded transition-colors"
                >
                  <div className="font-bold text-red-400">VIPER</div>
                  <div className="text-xs text-red-500/70">Visual Intent & Physical Execution Router</div>
                </button>""", button_ui)

with open("App.tsx", "w") as f:
    f.write(content)

print("App.tsx updated successfully")
