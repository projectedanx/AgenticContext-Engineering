import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Make sure VCP button is correctly added
if "loadVcpPreset" in content and "VCP" in content:
    print("VCP preset seems correctly integrated.")
