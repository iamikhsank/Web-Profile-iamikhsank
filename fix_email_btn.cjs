const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/\{\/\* Alternative Direct Email \*\/}[\s\n]+<a href="mailto:iamikhsank@gmail\.com" className="flex items-center justify-center gap-2 bg-transparent border border-white\/20 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white\/10 transition-colors">[\s\n]+Email Langsung[\s\n]+<\/a>/, '');
fs.writeFileSync('src/App.tsx', code);
