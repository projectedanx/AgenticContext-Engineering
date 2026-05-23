import sys

def modify_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Import
    import_statement = "import {\n  aegis11Instructions,\n  aegis11Knowledge,\n  aegis11Tools,\n  aegis11State\n} from \"./presets/aegis_11\";\n"
    if "aegis11Instructions" not in content[:1000]:
        insert_idx = content.find('import {\n  aegisPrimeInstructions,')
        if insert_idx != -1:
            content = content[:insert_idx] + import_statement + content[insert_idx:]
        else:
            print("Could not find import insertion point")
            return

    # Load function
    load_func = """  const loadAegis11Preset = () => {
    setInstructions(aegis11Instructions);
    setKnowledge(aegis11Knowledge);
    setState(aegis11State);
    setTools(aegis11Tools);
    addMessage("Loaded AEGIS-11 Sovereign Preset.", "system");
  };

"""
    if "const loadAegis11Preset" not in content:
        insert_idx = content.find('  const loadAegisPrimePreset = () => {')
        if insert_idx != -1:
            content = content[:insert_idx] + load_func + content[insert_idx:]
        else:
            print("Could not find load function insertion point")
            return

    # Button
    button_code = """              <button
                onClick={loadAegis11Preset}
                className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 hover:border-gray-600 group"
              >
                <div className="font-semibold text-purple-400 group-hover:text-purple-300">AEGIS-11</div>
                <div className="text-sm text-gray-400 mt-1">Autonomic Epistemic Gatekeeper</div>
              </button>
"""
    if "AEGIS-11" not in content[content.find('<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">'):]:
        insert_idx = content.find('              <button\n                onClick={loadAegisPrimePreset}')
        if insert_idx != -1:
            content = content[:insert_idx] + button_code + content[insert_idx:]
        else:
            print("Could not find button insertion point")
            return

    with open(filepath, 'w') as f:
        f.write(content)
    print("Successfully modified App.tsx")

modify_file('App.tsx')
