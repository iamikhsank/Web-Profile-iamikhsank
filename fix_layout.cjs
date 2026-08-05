const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update project card text container
code = code.replace(/className="w-full md:w-\[60%\] p-6 md:p-10 lg:p-12 flex flex-col justify-between z-10 overflow-y-auto"/g, 'className="w-full md:w-[70%] p-6 md:p-8 lg:p-10 flex flex-col justify-between z-10 overflow-y-auto"');

// Update project card image container
code = code.replace(/className="w-full md:w-\[40%\] h-64 md:h-full relative overflow-hidden bg-black\/50 p-4 md:p-8 cursor-pointer group"/g, 'className="w-full md:w-[30%] h-64 md:h-full relative overflow-hidden bg-black/50 p-4 md:p-6 cursor-pointer group"');

fs.writeFileSync('src/App.tsx', code);
