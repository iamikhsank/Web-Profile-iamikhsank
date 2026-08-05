const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = "className={`card-inner w-full h-[95%] md:h-full rounded-[2.5rem] glass-panel ${index % 2 !== 0 ? 'bg-[#111111]/90' : ''} overflow-hidden flex flex-col md:flex-row relative origin-top`}";

const replacementStr = "className={`card-inner w-full h-[95%] md:h-full rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] ${index % 2 !== 0 ? 'bg-[#151515]' : 'bg-[#0a0a0a]'} overflow-hidden flex flex-col md:flex-row relative origin-top`}";

code = code.split(targetStr).join(replacementStr);

fs.writeFileSync('src/App.tsx', code);
