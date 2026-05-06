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

# 1. Add Import
old_import = """import {
  aletheonInstructions,
  aletheonKnowledge,
  aletheonState,
  aletheonTools,
} from "./presets/aletheon";"""

new_import = """import {
  aletheonInstructions,
  aletheonKnowledge,
  aletheonState,
  aletheonTools,
} from "./presets/aletheon";
import {
  viperInstructions,
  viperKnowledge,
  viperState,
  viperTools,
} from "./presets/viper";"""

replace_in_file("App.tsx", old_import, new_import)

# 2. Add loadViperPreset
old_func = """  const loadAletheonPreset = () => {
    setInstructions(aletheonInstructions);
    setKnowledge(aletheonKnowledge);
    setTools(aletheonTools);
    setState(aletheonState);
    setQuery(
      "I need a structural autopsy on the new 'SyncMaster' library before we adopt it. What is its Betti-1 score and SRDS?",
    );
  };"""

new_func = """  const loadAletheonPreset = () => {
    setInstructions(aletheonInstructions);
    setKnowledge(aletheonKnowledge);
    setTools(aletheonTools);
    setState(aletheonState);
    setQuery(
      "I need a structural autopsy on the new 'SyncMaster' library before we adopt it. What is its Betti-1 score and SRDS?",
    );
  };

  const loadViperPreset = () => {
    setInstructions(viperInstructions);
    setKnowledge(viperKnowledge);
    setTools(viperTools);
    setState(viperState);
    setQuery(
      "I want a nostalgic, beautiful portrait of an old woman in a Parisian cafe, very cinematic and emotional, masterpiece quality, 8k",
    );
  };"""

replace_in_file("App.tsx", old_func, new_func)
