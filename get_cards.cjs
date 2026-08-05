const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
const startIndex = code.indexOf('<div className="cards-container relative pb-[20vh]">');
const nextSectionIndex = code.indexOf('<section id="testimoni"');
if (startIndex !== -1 && nextSectionIndex !== -1) {
  console.log("Lines between cards-container and next section: ", code.substring(startIndex, nextSectionIndex).split('\n').length);
}
