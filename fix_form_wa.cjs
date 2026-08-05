const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update formData state
code = code.replace(/company: "",/, 'category: "",');

// Update handleInputChange to include HTMLSelectElement
code = code.replace(/HTMLTextAreaElement>/, 'HTMLTextAreaElement | HTMLSelectElement>');

// Replace handleSubmit
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

    // Mock submit or actual Apps Script submit
    if (typeof (window as any).google !== "undefined" && (window as any).google.script) {
      (window as any).google.script.run
        .withSuccessHandler((response: any) => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          setFormData({ name: "", email: "", category: "", message: "" });
          window.open(waUrl, '_blank');
        })
        .withFailureHandler((error: any) => {
          setIsSubmitting(false);
          setSubmitStatus('error');
          window.open(waUrl, '_blank');
        })
        .processForm(formData);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: "", email: "", category: "", message: "" });
        window.open(waUrl, '_blank');
      }, 1000);
    }
  };`;

// We need to replace the old handleSubmit block.
code = code.replace(/const handleSubmit = \(e: React\.FormEvent\) => {[\s\S]*?};\n/, submitBlock + "\n");

// Update Form Inputs
code = code.replace(/<input type="text" required className/g, '<input type="text" name="name" value={formData.name} onChange={handleInputChange} required className');
code = code.replace(/<input type="email" required className/g, '<input type="email" name="email" value={formData.email} onChange={handleInputChange} required className');
code = code.replace(/<select required defaultValue="" className/g, '<select required name="category" value={formData.category} onChange={handleInputChange} className');
code = code.replace(/<textarea rows="4" required className/g, '<textarea rows="4" name="message" value={formData.message} onChange={handleInputChange} required className');

fs.writeFileSync('src/App.tsx', code);
