const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const doubleImportIndex = code.indexOf('import React', 10);
if (doubleImportIndex !== -1) {
    console.log("Found duplicate at", doubleImportIndex);
    fs.writeFileSync('src/App.tsx', code.substring(doubleImportIndex));
}
