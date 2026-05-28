import os
import re

def find_exports(filepath):
    exports = []
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            # Match export const / function / class / default
            # Also interface and type, though prompt says "public function, method, and class"
            matches = re.finditer(r'^(export\s+(default\s+)?(const|function|class)\s+([a-zA-Z0-9_]+))', content, re.MULTILINE)
            for m in matches:
                exports.append(m.group(4))
            # export default function/class without name
            matches2 = re.finditer(r'^(export\s+default\s+(function|class)\s*\()', content, re.MULTILINE)
            for m in matches2:
                exports.append("default " + m.group(2))
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return exports

files_to_check = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or '__mocks__' in root or 'dist' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js')) and not file.endswith('.test.ts') and not file.endswith('.test.tsx'):
            if file in ['vite.config.ts', 'vitest.config.ts']: continue
            files_to_check.append(os.path.join(root, file))

total_exports = 0
for file in files_to_check:
    exports = find_exports(file)
    if exports:
        print(f"{file}: {', '.join(exports)}")
        total_exports += len(exports)

print(f"Total exports found: {total_exports}")
