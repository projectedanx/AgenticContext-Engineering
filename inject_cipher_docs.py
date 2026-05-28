import re

file_path = 'presets/cipher.ts'
with open(file_path, 'r') as f:
    content = f.read()

replacements = [
    (r"export const cipherInstructions =",
     "/**\n * The CIPHER instructions constant.\n * @type {string}\n * @description Contains the core directives and invariants for the CIPHER agent.\n */\nexport const cipherInstructions ="),

    (r"export const cipherKnowledge =",
     "/**\n * The CIPHER knowledge constant.\n * @type {string}\n * @description Contains the threat modeling reference and failure pattern taxonomy for the CIPHER agent.\n */\nexport const cipherKnowledge ="),

    (r"export const cipherState =",
     "/**\n * The CIPHER state constant.\n * @type {string}\n * @description Contains the initial execution context and state variables for the CIPHER agent.\n */\nexport const cipherState ="),

    (r"export const cipherTools: Tool\[\] =",
     "/**\n * The CIPHER tools constant.\n * @type {Tool[]}\n * @description Contains the set of tools available to the CIPHER agent for threat analysis and code execution.\n */\nexport const cipherTools: Tool[] =")
]

new_content = content
for old, new in replacements:
    new_content = re.sub(old, new, new_content, count=1)

with open(file_path, 'w') as f:
    f.write(new_content)

print(f"Updated {file_path}")
