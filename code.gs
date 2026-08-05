function doGet(e) {
  // Hanya return template, file statis di-handle oleh React (Vite)
  const template = HtmlService.createTemplateFromFile("Dashboard-for-Spreadsheet");
  
  return template.evaluate()
    .setTitle("Jasa Web App Google Apps Script & Dashboard Otomatisasi")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ==========================================
// BACKEND RPC API
// ==========================================

function getSystemConfig() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Konfigurasi");
    if (!sheet) return { NAMA_SISTEM: "GAS Enterprise", VERSI: "1.0.0" };
    
    const data = sheet.getDataRange().getValues();
    const config = {};
    for (let i = 1; i < data.length; i++) {
      config[data[i][0]] = data[i][1];
    }
    return config;
  } catch (error) {
    return { error: error.toString() };
  }
}

function getPortofolio() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Portofolio");
    if (!sheet) return { success: false, error: "Sheet Portofolio tidak ditemukan." };
    
    const data = sheet.getDataRange().getValues();
    const portofolioList = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0]) {
        portofolioList.push({
          id: row[0],
          kategori: row[1],
          warnaKategori: row[2],
          judul: row[3],
          klien: row[4],
          highlight: row[5],
          deskripsi: row[6],
          fitur: row[7].split(',').map(f => f.trim()).filter(f => f),
          metrikNilai: row[8],
          metrikLabel: row[9],
          linkGambar: row[10],
          linkProject: row[11],
          techStack: row[12].split(',').map(t => t.trim()).filter(t => t)
        });
      }
    }
    
    return { success: true, data: portofolioList };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function getPaketHarga() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("PaketHarga");
    if (!sheet) return { success: false, error: "Sheet PaketHarga tidak ditemukan." };
    
    const data = sheet.getDataRange().getValues();
    const paketList = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0]) {
        paketList.push({
          id: row[0],
          namaPaket: row[1],
          subjudul: row[2],
          harga: row[3],
          rekomendasi: (row[4] === true || row[4] === "TRUE" || row[4] === "true"),
          fiturAktif: row[5].toString().split(',').map(f => f.trim()).filter(f => f),
          fiturInaktif: row[6].toString().split(',').map(f => f.trim()).filter(f => f),
          teksTombol: row[7]
        });
      }
    }
    
    return { success: true, data: paketList };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function submitLead(leadData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Leads");
    
    if (!sheet) {
      inisialisasiDatabase();
      sheet = ss.getSheetByName("Leads");
    }
    
    const timestamp = new Date();
    const rowData = [
      timestamp,
      leadData.nama || "",
      leadData.perusahaan || "",
      leadData.email || "",
      leadData.whatsapp || "",
      leadData.layanan || "",
      leadData.budget || "",
      leadData.detail || "",
      "Baru",
      "Diterima via Landing Page Web App"
    ];
    
    sheet.appendRow(rowData);
    logAktivitas("Lead Masuk Baru", "Marketing", "Klien " + leadData.nama + " mengirimkan formulir konsultasi.");
    kirimNotifikasiEmail(leadData, timestamp);
    
    return { success: true, message: "Pesan konsultasi Anda berhasil disimpan! Tim kami akan menghubungi Anda dalam 1x24 jam." };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function kirimNotifikasiEmail(lead, time) {
  try {
    const adminEmail = Session.getActiveUser().getEmail() || "worksenseanalytics@gmail.com";
    const subject = "🔥 LEAD BARU: Pengajuan Konsultasi Web App GAS - " + lead.nama;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background-color: #f8fafc;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; margin-top: 0;">Konsultasi Baru Masuk!</h2>
        <p style="color: #475569;">Seseorang telah mengisi formulir konsultasi di Landing Page Jasa Web App Google Apps Script Anda.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f1f5f9;">
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">Tanggal</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569;">${time.toLocaleString('id-ID')}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">Nama Klien</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569; font-weight: bold;">${lead.nama}</td>
          </tr>
          <tr style="background-color: #f1f5f9;">
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">Perusahaan</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569;">${lead.perusahaan || '-'}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">Email</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569;"><a href="mailto:${lead.email}">${lead.email}</a></td>
          </tr>
          <tr style="background-color: #f1f5f9;">
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">WhatsApp</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569;"><a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}">${lead.whatsapp}</a></td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">Jenis Layanan</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569; font-weight: bold; color: #2563eb;">${lead.layanan}</td>
          </tr>
          <tr style="background-color: #f1f5f9;">
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">Estimasi Budget</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569; color: #16a34a; font-weight: bold;">${lead.budget}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #334155;">Detail Kebutuhan</th>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569; font-style: italic;">${lead.detail}</td>
          </tr>
        </table>
        
        <div style="text-align: center; margin-top: 24px;">
          <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Buka Database Google Sheet</a>
        </div>
        
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px;">Email otomatis dikirim oleh Sistem Landing Page Google Apps Script Anda.</p>
      </div>
    `;
    
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (err) {
    Logger.log("Gagal mengirim email: " + err.toString());
  }
}

function logAktivitas(aksi, modul, detail) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("LogAktivitas");
    if (sheet) {
      sheet.appendRow([new Date(), Session.getActiveUser().getEmail(), aksi, modul, detail]);
    }
  } catch (e) {
    Logger.log("Gagal menulis log: " + e.toString());
  }
}
