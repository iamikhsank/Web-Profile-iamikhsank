const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/const waNumber = "6281234567890";/, 'const waNumber = "6282126574799";');
code = code.replace(/mailto:ikhsan@sense-data.com/, 'mailto:iamikhsank@gmail.com');

fs.writeFileSync('src/App.tsx', code);
