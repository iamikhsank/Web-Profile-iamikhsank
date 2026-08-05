const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<div className="w-full md:w-1\/2 p-6 md:p-12 lg:p-16 flex flex-col justify-between z-10 overflow-y-auto">/g, '<div className="w-full md:w-[60%] p-6 md:p-10 lg:p-12 flex flex-col justify-between z-10 overflow-y-auto">');
code = code.replace(/<div className="w-full md:w-1\/2 h-64 md:h-full relative overflow-hidden bg-black\/50 p-4 md:p-8 cursor-pointer group">/g, '<div className="w-full md:w-[40%] h-64 md:h-full relative overflow-hidden bg-black/50 p-4 md:p-8 cursor-pointer group">');

fs.writeFileSync('src/App.tsx', code);
