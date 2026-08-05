const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I need to replace from <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> to the closing </div> of that section, without breaking the parent tags.

const pricingSectionHTML = `
            {isLoadingPaket ? (
                <div className="flex justify-center items-center h-64 w-full">
                    <p className="text-[#86868b] animate-pulse">Memuat data paket investasi...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {paketHarga.map((paket, index) => (
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
`;

const pricingStart = code.indexOf('{isLoadingPaket ? (');
if (pricingStart !== -1) {
    // Already transformed, replace from this to the closing </div> }
    const endStr = ')}';
    const faqIndex = code.indexOf('{/* 5. FAQ */}');
    const lastClosingDiv = code.lastIndexOf('</div>', faqIndex);
    const beforeLast = code.lastIndexOf('</div>', lastClosingDiv - 1);
    const actualEnd = code.lastIndexOf(')}', beforeLast) + 2;
    
    code = code.substring(0, pricingStart) + pricingSectionHTML + code.substring(actualEnd);
} else {
    // not transformed yet
}

fs.writeFileSync('src/App.tsx', code);
