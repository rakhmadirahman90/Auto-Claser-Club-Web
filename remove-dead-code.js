const fs = require('fs');
const lines = fs.readFileSync('src/pages/Admin.tsx', 'utf8').split('\n');
const newLines = [...lines.slice(0, 1207), ...lines.slice(1316)];
fs.writeFileSync('src/pages/Admin.tsx', newLines.join('\n'));
