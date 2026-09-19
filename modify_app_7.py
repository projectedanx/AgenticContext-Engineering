import re

with open('App.tsx', 'r') as f:
    content = f.read()

button_str = """                  <button
                    onClick={loadQedPreset}
                    className="px-4 py-2 bg-emerald-900/50 text-emerald-400 font-mono text-sm border border-emerald-700/50 rounded hover:bg-emerald-800/50 hover:border-emerald-500 transition-colors shadow-sm"
                  >
                    [ LOAD EPISTEMIC WORKBENCH QED ]
                  </button>
                  <button
                    onClick={loadVcpPreset}
                    className="px-4 py-2 bg-cyan-900/50 text-cyan-400 font-mono text-sm border border-cyan-700/50 rounded hover:bg-cyan-800/50 hover:border-cyan-500 transition-colors shadow-sm"
                  >
                    [ LOAD VCP VERIFICATION GUARD ]
                  </button>"""

content = content.replace("""                  <button
                    onClick={loadQedPreset}
                    className="px-4 py-2 bg-emerald-900/50 text-emerald-400 font-mono text-sm border border-emerald-700/50 rounded hover:bg-emerald-800/50 hover:border-emerald-500 transition-colors shadow-sm"
                  >
                    [ LOAD EPISTEMIC WORKBENCH QED ]
                  </button>""", button_str)


with open('App.tsx', 'w') as f:
    f.write(content)
