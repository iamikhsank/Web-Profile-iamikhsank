import fs from 'fs';
const htmlCode = fs.readFileSync('apps_script_landing_page (10).html', 'utf8');

const cardsStart = '    <!-- 2. SHOWCASE (Stacked Cards) -->';
const cardsEnd = '    <!-- 2.3 SOCIAL PROOF (KLIEN & TESTIMONI) -->';
let cardsHtml = htmlCode.substring(htmlCode.indexOf(cardsStart), htmlCode.indexOf(cardsEnd));

console.log(cardsHtml.substring(0, 1000));
console.log("\n...\n");
console.log(cardsHtml.substring(cardsHtml.length - 1000));
