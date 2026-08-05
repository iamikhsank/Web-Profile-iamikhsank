const fs = require('fs');
let reactCode = fs.readFileSync('src/App.tsx', 'utf8');

const doubleImportIndex = reactCode.indexOf('import React', 10);
if (doubleImportIndex !== -1) {
    console.log("Found duplicate import at", doubleImportIndex);
    reactCode = reactCode.substring(doubleImportIndex);
    fs.writeFileSync('src/App.tsx', reactCode);
    console.log("Restored original file.");
} else {
    console.log("Not found duplicate");
}
