import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Let's see why the button was not added
print("QED button check:")
print(content.find('loadQedPreset'))
print(content[content.find('loadQedPreset', 400)-20:content.find('loadQedPreset', 400)+300])
