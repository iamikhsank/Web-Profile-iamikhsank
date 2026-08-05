const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `  // GSAP Animations Context untuk pengalaman interaktif mewah ala Apple
  useEffect(() => {
    let ctx: any;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // 1. Hero Entrance Timeline`;

const endStr = `      if (ctx) {
        ctx.revert();
      }
    };
  }, [selectedCategory]);`;

const replacement = `  // GSAP Animations Context untuk pengalaman interaktif mewah ala Apple
  useGSAP(() => {
    const timer = setTimeout(() => {
        // 1. Hero Entrance Timeline`;

const replacementEnd = `    return () => clearTimeout(timer);
  }, { dependencies: [selectedCategory], revertOnUpdate: true });`;

let newCode = code.replace(targetStr, replacement);
newCode = newCode.replace(endStr, replacementEnd);
// Also remove the extra "      });" at the end of the context 
const contextEnd = `        ScrollTrigger.refresh();
      });
    }, 100);`;
const contextEndReplacement = `        ScrollTrigger.refresh();
    }, 100);`;
newCode = newCode.replace(contextEnd, contextEndReplacement);

fs.writeFileSync('src/App.tsx', newCode);
console.log('updated');
