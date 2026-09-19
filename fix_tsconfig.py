import json

with open('tsconfig.json', 'r') as f:
    config = json.load(f)

if 'compilerOptions' in config:
    if 'types' in config['compilerOptions']:
        if '@testing-library/jest-dom' not in config['compilerOptions']['types']:
            config['compilerOptions']['types'].append('@testing-library/jest-dom')
    else:
        config['compilerOptions']['types'] = ['@testing-library/jest-dom', 'vite/client']

with open('tsconfig.json', 'w') as f:
    json.dump(config, f, indent=2)
