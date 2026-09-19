import re

with open('App.tsx', 'r') as f:
    content = f.read()

idx = content.find('onClick={loadQedPreset}')
print("QED onClick check:")
if idx != -1:
    print(content[idx-50:idx+300])
else:
    print("onClick={loadQedPreset} not found in content")
