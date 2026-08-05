const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I will remove the extra </div> that causes the mismatch.
// Actually, let's look at the structure:
/*
    <section id="pricing" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                ...
            </div>
            {isLoadingPaket ? (
                ...
            )}
        </div>
    </section>
*/
// The problem is my replace might have eaten a `div` or left an extra one.
// Let's replace the whole section to be sure.

const sectionStart = code.indexOf('<section id="pricing"');
const sectionEnd = code.indexOf('</section>', sectionStart) + 10;

const correctSection = `
    {/* 4. PRICING */}
    <section id="pricing" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Investasi Cerdas.</h2>
                <p className="text-[#86868b] mt-4 text-lg">Pilih paket pengembangan sesuai kompleksitas sistem bisnis Anda.</p>
            </div>
            
            {isLoadingPaket ? (
                <div className="flex justify-center items-center h-64 w-full">
                    <p className="text-[#86868b] animate-pulse">Memuat data paket investasi...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {paketHarga.map((paket) => (
                        <div key={paket.id} className={\`glass-panel p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 \${paket.rekomendasi ? 'border-emerald-500/50 relative transform md:scale-105 z-10 bg-[#111] shadow-[0_0_50px_rgba(5,150,105,0.15)]' : ''}\`}>
                            {paket.rekomendasi && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wide">RECOMMENDED</div>
                            )}
                            <h3 className={\`text-2xl font-bold mb-2 \${paket.rekomendasi ? 'text-emerald-400' : ''}\`}>{paket.namaPaket}</h3>
                            <p className="text-[#86868b] mb-6 text-sm">{paket.subjudul}</p>
                            <div className="mb-8">
                                <span className="text-4xl font-bold">{paket.harga}</span>
                            </div>
                            <ul className="space-y-4 mb-10 text-sm text-[#f5f5f7]">
                                {paket.fiturAktif.map((fitur, i) => (
                                    <li key={\`aktif-\${i}\`} className="flex items-start gap-3"><span>✓</span> {fitur}</li>
                                ))}
                                {paket.fiturInaktif.map((fitur, i) => (
                                    <li key={\`inaktif-\${i}\`} className="flex items-start gap-3 text-[#86868b]"><span>—</span> {fitur}</li>
                                ))}
                            </ul>
                            <a href="#contact" className={\`block w-full py-3 rounded-full text-center font-semibold transition \${paket.rekomendasi ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'border border-white/20 hover:bg-white/10'}\`}>
                                {paket.teksTombol}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </section>
`;

code = code.substring(0, code.lastIndexOf('{/* 4. PRICING */}', sectionStart)) + correctSection + code.substring(sectionEnd);

fs.writeFileSync('src/App.tsx', code);
