import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Let's find where onClick={loadQedPreset} is
print("QED onClick check:")
idx = content.find('onClick={loadQedPreset}')
if idx != -1:
    print(content[idx-200:idx+300])
else:
    print("onClick={loadQedPreset} not found in content")
