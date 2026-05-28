import os
import re

files_to_check = []
for root, dirs, files in os.walk('.'):
    if any(ignore in root for ignore in ['node_modules', '.git', '__mocks__', 'dist', 'coverage']):
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js')) and not file.endswith('.test.ts') and not file.endswith('.test.tsx'):
            if file in ['vite.config.ts', 'vitest.config.ts']: continue
            files_to_check.append(os.path.join(root, file))

for file in sorted(files_to_check):
    with open(file, 'r') as f:
        content = f.read()

    matches = re.finditer(r'(?:/\*\*(.*?)\*/\s*)?^(export\s+(?:default\s+)?(?:const|function|class)\s+(?:[a-zA-Z0-9_]+)?)', content, re.MULTILINE | re.DOTALL)

    found = False
    for m in matches:
        docstring = m.group(1)
        decl = m.group(2).strip()
        if not found:
            print(f"--- {file} ---")
            found = True

        doc = docstring.strip() if docstring else "NO DOCSTRING"
        # Just print first line of doc or something, or print "MISSING" if lacking param/returns
        print(f"DECL: {decl}")
        print(f"DOC: {doc[:100]}...\n")
