import re

with open('App.tsx', 'r') as f:
    content = f.read()

idx = content.find('onClick={loadQedPreset}')
replace_str = content[idx-112:idx+350]

button_str = replace_str + """                  <button
                    onClick={loadVcpPreset}
                    className="px-4 py-2 bg-cyan-900/50 text-cyan-400 font-mono text-sm border border-cyan-700/50 rounded hover:bg-cyan-800/50 hover:border-cyan-500 transition-colors shadow-sm"
                  >
                    [ LOAD VERIFICATION CO-PROCESSOR ]
                  </button>
"""

content = content.replace(replace_str, button_str)


with open('App.tsx', 'w') as f:
    f.write(content)
