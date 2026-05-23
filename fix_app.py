with open('App.tsx', 'r') as f:
    content = f.read()

content = content.replace('    addMessage("Loaded AEGIS-11 Sovereign Preset.", "system");', '    // addMessage("Loaded AEGIS-11 Sovereign Preset.", "system");')

with open('App.tsx', 'w') as f:
    f.write(content)
