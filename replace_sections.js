import fs from 'fs';
const htmlCode = fs.readFileSync('apps_script_landing_page (10).html', 'utf8');
let reactCode = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Move Tech Stack Marquee to Hero Section
const marqueeStartHtml = '        <!-- Tech Stack Marquee (Inserted Here) -->';
const marqueeEndHtml = '        </div>\n    </section>';
const marqueeHtml = htmlCode.substring(htmlCode.indexOf(marqueeStartHtml), htmlCode.indexOf(marqueeEndHtml) + '        </div>'.length);

let reactMarquee = marqueeHtml.replace(/class=/g, 'className=');
reactMarquee = reactMarquee.replace(/stroke-width/g, 'strokeWidth');
reactMarquee = reactMarquee.replace(/stroke-linecap/g, 'strokeLinecap');
reactMarquee = reactMarquee.replace(/stroke-linejoin/g, 'strokeLinejoin');
reactMarquee = reactMarquee.replace(/<!-- Original Set -->/g, '{/* Original Set */}');
reactMarquee = reactMarquee.replace(/<!-- Duplicated Set for Infinite Scroll Illusion -->/g, '{/* Duplicated Set for Infinite Scroll Illusion */}');
reactMarquee = reactMarquee.replace(/<!-- Tech Stack Marquee \(Inserted Here\) -->/g, '{/* Tech Stack Marquee (Inserted Here) */}');

// The original tech marquee in src/App.tsx was around line 1030
const oldMarqueeStart = '      {/* TOOLS & FRAMEWORKS */}';
const oldMarqueeEndIndex = reactCode.indexOf('</section>', reactCode.indexOf(oldMarqueeStart)) + '</section>'.length;
reactCode = reactCode.substring(0, reactCode.indexOf(oldMarqueeStart)) + reactCode.substring(oldMarqueeEndIndex);

// Add reactMarquee to the Hero section in src/App.tsx
const heroButtonsEnd = `            <a href="#contact" className="gsap-hero-ctas bg-transparent border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white/5 transition-colors">Konsultasi Gratis</a>
          </div>`;
reactCode = reactCode.replace(heroButtonsEnd, heroButtonsEnd + '\n\n' + reactMarquee);

// 2. Replace Projects Section (Cards)
const cardsStart = '    <!-- 2. SHOWCASE (Stacked Cards) -->';
const cardsEnd = '    <!-- 2.3 SOCIAL PROOF (KLIEN & TESTIMONI) -->';
let cardsHtml = htmlCode.substring(htmlCode.indexOf(cardsStart), htmlCode.indexOf(cardsEnd));

let reactCards = cardsHtml.replace(/class=/g, 'className=');
reactCards = reactCards.replace(/stroke-width/g, 'strokeWidth');
reactCards = reactCards.replace(/stroke-linecap/g, 'strokeLinecap');
reactCards = reactCards.replace(/stroke-linejoin/g, 'strokeLinejoin');
reactCards = reactCards.replace(/<img src="([^"]+)" alt="([^"]+)" className="([^"]+)">/g, '<img src="$1" alt="$2" className="$3" />');
reactCards = reactCards.replace(/<polyline points="([^"]+)"><\/polyline>/g, '<polyline points="$1" />');
reactCards = reactCards.replace(/<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)"><\/line>/g, '<line x1="$1" y1="$2" x2="$3" y2="$4" />');
reactCards = reactCards.replace(/<path d="([^"]+)"><\/path>/g, '<path d="$1" />');
reactCards = reactCards.replace(/<!--/g, '{/*');
reactCards = reactCards.replace(/-->/g, '*/}');
reactCards = reactCards.replace(/<br>/g, '<br/>');

const reactShowcaseStart = '      {/* PORTFOLIO & INTERACTIVE DEMO SELECTOR */}';
const reactShowcaseEndMatch = '    {/* END PORTFOLIO SECTION */}';
const showcaseStartIndex = reactCode.indexOf(reactShowcaseStart);
let showcaseEndIndex = reactCode.indexOf(reactShowcaseEndMatch);
if (showcaseEndIndex === -1) {
    showcaseEndIndex = reactCode.indexOf('      {/* SOCIAL PROOF (KLIEN & TESTIMONI) */}');
}

reactCode = reactCode.substring(0, showcaseStartIndex) + reactCards + '\n' + reactCode.substring(showcaseEndIndex);

fs.writeFileSync('src/App.tsx', reactCode);
console.log('App.tsx updated');
