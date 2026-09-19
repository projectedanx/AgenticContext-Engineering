import re

with open('App.tsx', 'r') as f:
    content = f.read()

load_func = """  const loadQedPreset = () => {
    setInstructions(qedInstructions);
    setKnowledge(qedKnowledge);
    setTools(qedTools);
    setState(qedState);
  };

  const loadVcpPreset = () => {
    setInstructions(vcpInstructions);
    setKnowledge(vcpKnowledge);
    setTools(vcpTools);
    setState(vcpState);
  };"""

content = content.replace("""  const loadQedPreset = () => {
    setInstructions(qedInstructions);
    setKnowledge(qedKnowledge);
    setTools(qedTools);
    setState(qedState);
  };""", load_func)


button_str = """                    <button
                      className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-emerald-400/70 hover:text-emerald-300 font-mono text-[10px] py-1.5 px-3 rounded-none border border-slate-600/30 transition-all text-left truncate flex items-center justify-between group"
                      onClick={loadQedPreset}
                    >
                      <span className="truncate">QED</span>
                      <span className="opacity-0 group-hover:opacity-100 text-emerald-500/50 transition-opacity">
                        [EXEC]
                      </span>
                    </button>
                    <button
                      className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-cyan-400/70 hover:text-cyan-300 font-mono text-[10px] py-1.5 px-3 rounded-none border border-slate-600/30 transition-all text-left truncate flex items-center justify-between group"
                      onClick={loadVcpPreset}
                    >
                      <span className="truncate">VCP</span>
                      <span className="opacity-0 group-hover:opacity-100 text-cyan-500/50 transition-opacity">
                        [EXEC]
                      </span>
                    </button>"""

content = content.replace("""                    <button
                      className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-emerald-400/70 hover:text-emerald-300 font-mono text-[10px] py-1.5 px-3 rounded-none border border-slate-600/30 transition-all text-left truncate flex items-center justify-between group"
                      onClick={loadQedPreset}
                    >
                      <span className="truncate">QED</span>
                      <span className="opacity-0 group-hover:opacity-100 text-emerald-500/50 transition-opacity">
                        [EXEC]
                      </span>
                    </button>""", button_str)


with open('App.tsx', 'w') as f:
    f.write(content)
