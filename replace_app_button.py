import sys

def replace_in_file(file_path, old_text, new_text):
    with open(file_path, 'r') as file:
        filedata = file.read()

    if old_text not in filedata:
        print(f"Error: Could not find old_text in {file_path}")
        return False

    filedata = filedata.replace(old_text, new_text)

    with open(file_path, 'w') as file:
        file.write(filedata)
    print(f"Successfully updated {file_path}")
    return True

old_button = """              <button
                onClick={loadAletheonPreset}
                className="px-4 py-2 bg-[#0D1B2A] text-[#E63946] border border-[#E63946]/50 rounded hover:bg-[#0D1B2A]/80 hover:text-[#E63946] font-mono text-sm transition-colors"
              >
                [ LOAD ALETHEON ]
              </button>"""

new_button = """              <button
                onClick={loadAletheonPreset}
                className="px-4 py-2 bg-[#0D1B2A] text-[#E63946] border border-[#E63946]/50 rounded hover:bg-[#0D1B2A]/80 hover:text-[#E63946] font-mono text-sm transition-colors"
              >
                [ LOAD ALETHEON ]
              </button>

              <button
                onClick={loadViperPreset}
                className="px-4 py-2 bg-red-900/20 text-red-500 border border-red-900/50 rounded hover:bg-red-900/40 hover:text-red-400 font-mono text-sm transition-colors"
              >
                [ LOAD V.I.P.E.R. ]
              </button>"""

replace_in_file("App.tsx", old_button, new_button)
