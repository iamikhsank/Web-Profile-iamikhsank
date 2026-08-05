const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const cardsContainerStart = code.indexOf('<div className="cards-container relative pb-[20vh]">');
const showcaseEnd = code.indexOf('</section>', cardsContainerStart);

// We need to just extract the section and rewrite it
const startOfCards = code.indexOf('{/* CARD 1: INVENTORY CONTROL */}');
const endOfCards = code.lastIndexOf('</div>', code.indexOf('</section>', startOfCards)) - 4; // approximate

const mapCode = `
            {isLoadingPortofolio ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-[#86868b] animate-pulse">Memuat data portofolio...</p>
                </div>
            ) : portofolio.length > 0 ? (
                portofolio.map((item, index) => {
                    const colorMap: Record<string, string> = {
                        emerald: "text-emerald-500 bg-emerald-500/10",
                        blue: "text-blue-500 bg-blue-500/10",
                        purple: "text-purple-500 bg-purple-500/10",
                        default: "text-gray-500 bg-gray-500/10"
                    };
                    const colorClass = colorMap[item.warnaKategori] || colorMap.default;
                    const gradientMap: Record<string, string> = {
                        emerald: "gradient-text-emerald",
                        blue: "gradient-text-blue",
                        purple: "gradient-text-purple",
                        default: "text-white"
                    };
                    const gradientClass = gradientMap[item.warnaKategori] || gradientMap.default;
                    const svgColorMap: Record<string, string> = {
                        emerald: "text-emerald-500",
                        blue: "text-blue-500",
                        purple: "text-purple-500",
                        default: "text-gray-500"
                    };
                    const svgColorClass = svgColorMap[item.warnaKategori] || svgColorMap.default;

                    return (
                        <div key={item.id} className="project-card sticky top-24 pt-8 h-[85vh] flex items-center justify-center">
                            <div className={\`card-inner w-full h-[95%] md:h-full rounded-[2.5rem] glass-panel \${index % 2 !== 0 ? 'bg-[#111111]/90' : ''} overflow-hidden flex flex-col md:flex-row relative origin-top\`}>
                                <div className="w-full md:w-[70%] p-6 md:p-8 lg:p-10 flex flex-col justify-between z-10 overflow-y-auto">
                                    <div>
                                        {/* Badge Section */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={\`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded \${colorClass}\`}>{item.kategori}</span>
                                            <span className="text-[10px] font-bold tracking-widest text-[#86868b]">{item.id}</span>
                                        </div>
                                        
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight leading-none" dangerouslySetInnerHTML={{ __html: item.judul.replace('.', '.<br/>') }}></h2>
                                        
                                        {/* Klien Info */}
                                        <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-6">Klien: {item.klien}</p>
                                        
                                        <p className="text-[#86868b] text-sm md:text-base font-light leading-relaxed mb-6">
                                            <span className="text-white font-medium">{item.highlight}</span> {item.deskripsi}
                                        </p>
                                        
                                        {/* Fitur Inti List */}
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-3">Fitur Inti yang Diimplementasikan:</p>
                                            {item.fitur.map((f, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <svg className={\`w-4 h-4 shrink-0 mt-0.5 \${svgColorClass}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                    <p className="text-sm text-[#f5f5f7]">{f}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end">
                                        <div>
                                            <p className={\`text-3xl lg:text-4xl font-bold tracking-tighter mb-1 \${gradientClass}\`}>{item.metrikNilai}</p>
                                            <p className="text-[10px] text-[#86868b] font-medium tracking-wide uppercase">{item.metrikLabel}</p>
                                        </div>
                                        {/* Tech Stack minimal */}
                                        <div className="flex flex-wrap gap-2 justify-end max-w-[150px]">
                                            {item.techStack.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-[#86868b]">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[30%] h-64 md:h-full relative overflow-hidden bg-black/50 p-4 md:p-6 cursor-pointer group">
                                    <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl border border-white/5">
                                        <img src={item.linkGambar} alt={item.judul} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80" />
                                        
                                        {/* Link Overlay */}
                                        {item.linkProject && item.linkProject !== '#' && (
                                            <a href={item.linkProject} target="_blank" rel="noopener noreferrer" className="image-overlay-link">
                                                <span>
                                                    Lihat Aplikasi
                                                    <svg className="external-link-icon" viewBox="0 0 24 24">
                                                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-[#86868b]">Belum ada data portofolio.</p>
                </div>
            )}
`;

// It's safer to use regex to replace from {/* CARD 1: INVENTORY CONTROL */} to the end of cards-container </div>
const prefix = code.substring(0, startOfCards);
const suffix = code.substring(code.indexOf('</section>', startOfCards) - 14);

fs.writeFileSync('src/App.tsx', prefix + mapCode + suffix);
