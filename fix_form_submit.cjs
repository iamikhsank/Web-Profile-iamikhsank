const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update formData state to include whatsapp
code = code.replace(/const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);/, `const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    category: "",
    message: ""
  });`);

// In handleSubmit, update the GAS function call and logic
const submitBlock = `const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const waNumber = "6281234567890"; // Silakan ganti dengan nomor WhatsApp Anda
    const waText = \`Halo mas Ikhsan, perkenalkan saya \${formData.name}.
Email: \${formData.email}
Kategori Kebutuhan: \${formData.category}

Detail Pesan:
\${formData.message}\`;
    
    const waUrl = \`https://wa.me/\${waNumber}?text=\${encodeURIComponent(waText)}\`;

    const leadData = {
      nama: formData.name,
      perusahaan: "-",
      email: formData.email,
      whatsapp: formData.whatsapp,
      layanan: formData.category,
      budget: "-",
      detail: formData.message
    };

    // Mock submit or actual Apps Script submit
    if (typeof (window as any).google !== "undefined" && (window as any).google.script) {
      (window as any).google.script.run
        .withSuccessHandler((response: any) => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          setFormData({ name: "", email: "", whatsapp: "", category: "", message: "" });
          window.open(waUrl, '_blank');
        })
        .withFailureHandler((error: any) => {
          setIsSubmitting(false);
          setSubmitStatus('error');
          window.open(waUrl, '_blank');
        })
        .submitLead(leadData); // Use submitLead instead of processForm
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: "", email: "", whatsapp: "", category: "", message: "" });
        window.open(waUrl, '_blank');
      }, 1000);
    }
  };`;

code = code.replace(/const handleSubmit = \(e: React\.FormEvent\) => {[\s\S]*?};\n/, submitBlock + "\n");

// Add WhatsApp input below Email (in the form grid)
const gridHTML = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs text-[#86868b] uppercase tracking-wider font-semibold ml-1">Nama Lengkap</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm" placeholder="Misal: John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-[#86868b] uppercase tracking-wider font-semibold ml-1">Email Profesional</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm" placeholder="john@perusahaan.com" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-xs text-[#86868b] uppercase tracking-wider font-semibold ml-1">Nomor WhatsApp</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm" placeholder="Misal: 081234567890" />
                            </div>
                        </div>`;

code = code.replace(/<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">[\s\S]*?<\/div>\s*<div className="space-y-2">/, gridHTML + '\n                        \n                        <div className="space-y-2">');

fs.writeFileSync('src/App.tsx', code);
