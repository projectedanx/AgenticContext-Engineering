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

for file in files_to_check:
    with open(file, 'r') as f:
        content = f.read()

    # We'll just look for any exported declarations and check if they are preceded by /** ... */
    # This is rough but gives an idea
    matches = re.finditer(r'(/\*\*.*?\*/\s*)?^(export\s+(default\s+)?(const|function|class)\s+([a-zA-Z0-9_]+)?)', content, re.MULTILINE | re.DOTALL)

    for m in matches:
        docstring = m.group(1)
        decl = m.group(2)
        if not docstring:
            print(f"Missing docstring in {file} for {decl.strip().split()[-1] if decl.strip().split()[-1] not in ['const', 'function', 'class', 'default'] else decl.strip()}")
