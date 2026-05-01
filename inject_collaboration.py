import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Add import
import_statement = 'import { CollaborationManager } from "./components/CollaborationManager";\n'
if import_statement not in content:
    content = re.sub(
        r'(import \{ StakeholderMatrix \} from "\./components/StakeholderMatrix";)',
        r'\1\n' + import_statement.strip(),
        content
    )

# Add component
component_tag = '<CollaborationManager />\n'
if component_tag not in content:
    content = re.sub(
        r'(<StakeholderMatrix />)',
        r'\1\n          ' + component_tag.strip(),
        content
    )

with open('App.tsx', 'w') as f:
    f.write(content)
