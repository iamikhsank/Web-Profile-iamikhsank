const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const badCode = `    return () => {
      clearTimeout(timer);
    return () => clearTimeout(timer);
  }, { dependencies: [selectedCategory], revertOnUpdate: true });`;

const goodCode = `    return () => clearTimeout(timer);
  }, { dependencies: [selectedCategory], revertOnUpdate: true });`;

code = code.replace(badCode, goodCode);
fs.writeFileSync('src/App.tsx', code);
