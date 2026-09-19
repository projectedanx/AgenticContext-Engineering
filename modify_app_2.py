import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Check load function
load_func = """  const loadQedPreset = () => {
    setState("instructions", qedInstructions);
    setState("knowledge", qedKnowledge);
    const parsedTools = safeJsonParse<Tool[]>(
      qedTools,
      isValidTools,
      [],
    );
    setState("tools", parsedTools);
    setState("state", qedState);
    // addMessage("Loaded QED Sovereign Preset.", "system");
  };

  const loadVcpPreset = () => {
    setState("instructions", vcpInstructions);
    setState("knowledge", vcpKnowledge);
    setState("tools", vcpTools);
    setState("state", vcpState);
    // addMessage("Loaded VCP Sovereign Preset.", "system");
  };"""

if load_func in content:
    print("load_func is in content")
else:
    print("load_func is NOT in content")
    print(content.find('loadQedPreset'))
    print(content[content.find('loadQedPreset')-20:content.find('loadQedPreset')+300])
