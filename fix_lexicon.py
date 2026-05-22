import re

with open("LEXICON.md", "r") as f:
    content = f.read()

# I need to clean up the trailing content that was appended by the user's raw prompt
bad_content_start = content.find("PAT-005 · Lexical Cartography\nType: Analysis Zone Definition")

if bad_content_start != -1:
    content = content[:bad_content_start]

with open("LEXICON.md", "w") as f:
    f.write(content)

print("Lexicon cleaned up")
