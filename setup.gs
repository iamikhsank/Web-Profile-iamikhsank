/**
 * setup.gs
 * File ini digunakan untuk melakukan inisialisasi struktur database Google Sheets
 * untuk integrasi dengan Web App Google Apps Script.
 */

function inisialisasiDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("Memulai proses inisialisasi database...");

  // 1. Buat atau hubungkan Tabel 'Konfigurasi'
  inisialisasiSheet(ss, "Konfigurasi", [
    ["Kunci", "Nilai", "Deskripsi"],
    ["NAMA_SISTEM", "GAS Enterprise Dashboard", "Nama aplikasi web"],
    ["VERSI", "1.0.0", "Versi aplikasi saat ini"],
    ["EMAIL_NOTIFIKASI", Session.getActiveUser().getEmail(), "Email tujuan untuk laporan & notifikasi"],
    ["STATUS_MAINTENANCE", "FALSE", "Status pemeliharaan sistem (TRUE/FALSE)"]
  ]);

  // 2. Buat atau hubungkan Tabel 'Portofolio' (Data untuk halaman Karya Transformasional)
  inisialisasiSheet(ss, "Portofolio", [
    ["ID", "Kategori", "Warna Kategori", "Judul", "Klien", "Highlight Deskripsi", "Deskripsi", "Fitur", "Metrik Nilai", "Metrik Label", "Link Gambar", "Link Project", "Tech Stack"],
    [
      "PRJ-004",
      "Enterprise BI & Govt",
      "blue",
      "BI-BEGR Telemetry.",
      "Bank Indonesia (Kantor Pusat & Perwakilan)",
      "Zero-TCO Enterprise Culture Maturity Index Dashboard on Google Workspace.",
      "Platform visualisasi telemetri budaya kerja tingkat tinggi yang dioperasikan secara serverless di atas ekosistem Google Workspace. Memantau tingkat kematangan budaya (Culture Maturity Level - CML) di seluruh Satuan Kerja (Satker) Bank Indonesia tanpa sewa server.",
      "Tracking Kematangan Budaya (CML 360°) Seluruh Satker,Monitoring Championship Program & EVP,Export Laporan Formal Otomatis ke PDF A4,Single Source of Truth Google Sheets Engine",
      "100% Zero Cost",
      "Penghematan Biaya Server BI",
      "/assets/prj_img/BI_BEGR.png",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,TypeScript"
    ],
    [
      "PRJ-005",
      "Supply Chain & Inventory ERP",
      "emerald",
      "StockFlow Analytics Engine.",
      "Enterprise Distributor & E-Commerce Merchant",
      "ABC-XYZ Pareto Matrix & Dynamic Safety Stock Engine on Google Sheets.",
      "Platform Business Intelligence & Supply Chain Optimization Engine berbasis Apps Script. Memecahkan masalah kebocoran omzet akibat kehabisan barang (stockout) dan penumpukan modal kerja akibat barang mati (dead stock) secara otomatis.",
      "Analisis Matriks ABC-XYZ (Pareto 80/20 & Volatilitas Demand),Dynamic Reorder Point (ROP) & Safety Stock Estimator,Lost Sales Calculator & Dead Stock Liquidation Hub,Multi-Warehouse Governance & Stock Transfer Logging",
      "0% Lost Sales",
      "Optimasi Modal Kerja Gudang",
      "/assets/prj_img/StockflowERP.png",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,Pure SVG Engine"
    ],
    [
      "PRJ-006",
      "Real Estate & Property ERP",
      "purple",
      "EstateManagement ERP.",
      "Pengembang Kawasan Properti & Real Estate",
      "Interactive Visual Siteplan & Automated Tenant Billing on Google Sheets.",
      "Sistem ERP Properti Premium & Modular dengan visualisasi siteplan interaktif real-time, peta status unit properti, billing otomatis tagihan sewa/IPL, dan portal tenant mandiri.",
      "Interactive Visual Siteplan Map (Status Unit Ready, Sold, Booked),Automated IPL & Rent Billing Generator (Invoice & PDF Drive),Tenant Portal Mandiri & Riwayat Pembayaran Tagihan,Multi-Block Estate Occupancy & Revenue Analytics",
      "98% On-time",
      "Ketepatan Pembayaran Tagihan IPL",
      "/assets/prj_img/EstateManagement ERP.png",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,Motion"
    ],
    [
      "PRJ-007",
      "Enterprise Multichannel ERP",
      "blue",
      "Multichannel Commerce ERP.",
      "Modern Multi-Channel Merchants & E-Commerce Distributors",
      "Serverless E-Commerce Integration (Tokopedia, Shopee, Direct) on Google Sheets.",
      "Platform ERP Serverless yang mengonsolidasikan log transaksi, stok produk, dan ledger keuangan dari Tokopedia, Shopee, Facebook/Instagram Ads, dan Direct Store ke dalam satu database terpusat Google Sheets.",
      "Multichannel Sales Order Consolidation & Sync,Integrated Financial Ledger & Real-time Revenue Reporting,Role-Based Access Control (RBAC) & Approval Workflows,System-wide Diagnostic Monitoring & Idempotent Log Engine",
      "5 Channel -> 1 Cockpit",
      "Konsolidasi Data Real-time",
      "/assets/prj_img/Sales Analytics Cockpit.png",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,TypeScript"
    ],
    [
      "PRJ-008",
      "Financial Analytics & Market BI",
      "emerald",
      "Dynamic Sector Rotation.",
      "Fund Managers, Research Analysts & Active Investors",
      "Real-time GICS Capital Rotation Detection & Momentum Signal Engine.",
      "Platform analisis rotasi modal makro-ekonomi antar 11 sektor GICS secara real-time. Mengubah data harga pasar mentah menjadi sinyal momentum transaksi dan analisis tren kontekstual.",
      "Real-time Capital Rotation Tracking (11 GICS Sectors),Relative Strength & Momentum Rank Scoring Engine,Interactive Recharts Visual Analytics (Cyclical vs Defensive),Automated Textual Market Signal & Risk Mitigation Insights",
      "11 Sektor Real-time",
      "Deteksi Sinyal Rotasi Modal",
      "/assets/prj_img/Dynamic Sector Rotation & Momentum Analytics.png",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,Recharts"
    ],
    [
      "PRJ-009",
      "Operations Cockpit & CRM Workspace",
      "purple",
      "Analytics Workspace.",
      "SaaS Operations & Agency Workspace Management",
      "Unified Revenue Streams, CRM Channels & Operations Cockpit on Google Sheets.",
      "Platform business intelligence & operasi kerja tingkat lanjut yang mengonsolidasi aliran data pendapatan, log pesanan, tracking produk, saluran komunikasi CRM, dan kolaborasi tim ke dalam satu kokpit terpadu.",
      "Unified Operations Cockpit & Revenue Stream Tracker,Dynamic Comparison Engine (YoY Historical Growth Milestones),Integrated CRM & Member Collaboration Channels,Frictionless Auth & Session-Mapped Google Sheets API Router",
      "100% Unified",
      "Konsolidasi Operations Cockpit",
      "/assets/prj_img/AnalyticsWorkspace.png",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,TypeScript"
    ],
    [
      "PRJ-010",
      "Healthcare & Supply Chain",
      "emerald",
      "MediCare Supply Engine.",
      "Jaringan Rumah Sakit & Distributor Alat Kesehatan",
      "Automated Medical Consumables & Hospital Allocation Tracking on Google Sheets.",
      "Sistem manajemen rantai pasok medis terintegrasi yang mengotomatisasi distribusi alat kesehatan, obat-obatan, dan tracking alokasi faskes/rumah sakit secara real-time.",
      "Real-time Hospital & Faskes Stock Allocation Tracker,Batch Expiry Date Alert & Critical Inventory Thresholds,Automated Emergency Purchase Order (PO) Workflows,Cold-Chain Logistical Status Monitoring",
      "100% Tracking",
      "Akurasi Distribusi Alkes & Obat",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,Vite"
    ],
    [
      "PRJ-001", 
      "Sistem Inventaris Gudang", 
      "emerald", 
      "Inventory Control.", 
      "Retail & Distribusi Nasional", 
      "Real-time warehouse management with zero backend cost.", 
      "Sistem manajemen gudang real-time yang menggunakan Google Sheets sebagai database utama, dibalut dengan antarmuka web modern untuk staf lapangan.", 
      "Integrasi Barcode & QR Code Scanner via Kamera,Alert Reorder Point Otomatis (Email/WhatsApp),Tracking Mutasi Stok Multi-Gudang (FIFO),Role-based Access Control (Admin vs Staf Gudang)", 
      "100%", 
      "Pengurangan Biaya Server", 
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", 
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React"
    ],
    [
      "PRJ-003", 
      "Data Pipeline & BI", 
      "purple", 
      "Custom Dashboard BI.", 
      "FMCG Enterprise", 
      "Menyulap ribuan baris data mentah menjadi wawasan bisnis.", 
      "Data pipeline dari berbagai cabang dikonsolidasikan otomatis ke Master Sheet, kemudian divisualisasikan menggunakan custom React Dashboard tanpa perlu langganan Tableau/PowerBI.", 
      "ETL Pipeline Otomatis (Extract Transform Load),Interactive Charts (Filter by Date/Region),Sinkronisasi Real-time < 5 Detik,Export Laporan ke PDF/CSV", 
      "3 Hari -> 5 Menit", 
      "Percepatan Rekap Laporan", 
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", 
      "https://your-dashboard-link-here.com",
      "Apps Script,React,Google Sheets"
    ],
    [
      "PRJ-011",
      "Logistics & Fleet Management",
      "blue",
      "Loka Logistics App.",
      "Perusahaan Ekspedisi & Armada Logistik",
      "Fleet Tracking, Cargo Manifest & Automated Delivery Dispatch on Google Sheets.",
      "Aplikasi manajemen armada logistik dan pelacakan kargo pengiriman barang. Mengelola jadwal pengemudi, manifes muatan kargo, serta operasional biaya armada secara transparan.",
      "Real-time Cargo Manifest & Dispatch Scheduler,Fleet Fuel & Operational Expense Tracking,Digital Proof of Delivery (POD) Signature Integration,Delivery Lead-Time & Route Optimization Metrics",
      "100% Real-time",
      "Visibilitas Status Pengiriman",
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,Chart.js"
    ],
    [
      "PRJ-012",
      "Sales & CRM Analytics",
      "purple",
      "Sales Analytics Cockpit.",
      "B2B Commercial Sales Team & Distributor",
      "Real-time Sales Pipeline & Representative Performance Cockpit on Google Sheets.",
      "Dasbor analitik performa penjualan B2B dan manajemen pipeline transaksi sales representative. Menyajikan perbandingan kuota target bulanan, komisi, dan rasio konversi deal.",
      "Sales Funnel & Pipeline Stage Conversion Tracking,Representative Target vs Achievement Leaderboard,Commission Calculator & Deal Velocity Analytics,Real-time Sales Revenue Forecast & Projection Charts",
      "3.5x Fast",
      "Percepatan Deal Velocity Sales",
      "/assets/prj_img/Sales Analytics Cockpit (2).png",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,Vite"
    ],
    [
      "PRJ-013",
      "Retail POS & Inventory ERP",
      "emerald",
      "Retail-ERP System.",
      "Retail Store Chains & Offline/Online POS Outlets",
      "Serverless Point of Sale & Multi-Store Inventory Management on Google Sheets.",
      "Sistem ERP retail terpadu yang memfasilitasi transaksi kasir (Point of Sale), pencatatan stok multi-toko offline/online, dan manajemen harga grosir/eceran secara real-time.",
      "Multi-Store POS Cashier & Receipt Printing,Real-time Multi-Branch Inventory Synchronization,Wholesale vs Retail Tiered Pricing Matrix,Daily Sales Profit & Loss Summary Reports",
      "100% Real-time",
      "Konsolidasi Stok Multi-Toko",
      "https://images.unsplash.com/photo-1556742049-0a6756860010?q=80&w=2070&auto=format&fit=crop",
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React 19,TypeScript"
    ],
    [
      "PRJ-002", 
      "CRUD Layanan", 
      "blue", 
      "HR & Payroll Automation.", 
      "Perusahaan Manufaktur (>500 Karyawan)", 
      "Otomatisasi 100% proses slip gaji dan rekap absensi.", 
      "Mengganti sistem manual Excel menjadi web app dinamis. Pegawai dapat login, melihat slip gaji PDF bulanan, dan mengajukan cuti langsung dari HP mereka.", 
      "Pembuatan Slip Gaji PDF Otomatis massal,Portal Karyawan Mandiri (Self-Service),Approval Cuti Bertingkat via Email,Dashboard Analitik HR untuk Manajemen", 
      "15 Jam/Minggu", 
      "Waktu Diselamatkan", 
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", 
      "https://your-dashboard-link-here.com",
      "Apps Script,Google Sheets,React"
    ]
  ]);

  // 3. Buat atau hubungkan Tabel 'PaketHarga' (Investasi Cerdas)
  inisialisasiSheet(ss, "PaketHarga", [
    ["ID", "Nama Paket", "Subjudul", "Harga", "Rekomendasi", "Fitur Aktif", "Fitur Inaktif", "Teks Tombol"],
    ["PKT-001", "Starter", "Untuk operasional tim kecil.", "Mulai 3Jt", "FALSE", "1-2 Google Sheets Terhubung,Form Input Interaktif,Notifikasi Email Otomatis", "Dashboard BI Eksekutif,Multi-role Access", "Pilih Starter"],
    ["PKT-002", "Pro System", "Automasi end-to-end bisnis.", "Mulai 7Jt", "TRUE", "Arsitektur Database Sheets Kompleks,Web App UI Premium (Tailwind),Integrasi Drive & PDF Generator,Logika Approval Bertingkat,Dokumentasi Handover", "", "Pilih Pro"],
    ["PKT-003", "Enterprise", "Dashboard & Integrasi Eksternal.", "Custom", "FALSE", "Pengembangan React Front-end,Koneksi API Eksternal (HRIS/ERP),Custom Looker Studio/Tableau BI,Sistem Autentikasi Pengguna,Maintenance & Support 3 Bulan", "", "Hubungi Saya"]
  ]);

  // 4. Buat atau hubungkan Tabel 'Leads'
  inisialisasiSheet(ss, "Leads", [
    ["Timestamp", "Nama Lengkap", "Perusahaan/Instansi", "Email", "WhatsApp", "Jenis Layanan", "Estimasi Budget", "Detail Kebutuhan", "Status", "Catatan Admin"],
  ]);

  // 5. Buat atau hubungkan Tabel 'LogAktivitas'
  inisialisasiSheet(ss, "LogAktivitas", [
    ["Waktu", "Pengguna", "Aksi", "Modul", "Detail Status"],
    [new Date(), Session.getActiveUser().getEmail(), "Sistem Diinisialisasi", "Database Setup", "Struktur tabel database berhasil dibuat."]
  ]);

  Logger.log("Inisialisasi database selesai! Spreadsheet siap digunakan sebagai backend.");
}

function inisialisasiSheet(ss, namaSheet, dataAwal) {
  let sheet = ss.getSheetByName(namaSheet);
  
  if (!sheet) {
    sheet = ss.insertSheet(namaSheet);
    Logger.log(`Sheet '${namaSheet}' belum ada. Membuat sheet baru...`);
    
    if (dataAwal && dataAwal.length > 0) {
      const range = sheet.getRange(1, 1, dataAwal.length, dataAwal[0].length);
      range.setValues(dataAwal);
      
      const headerRange = sheet.getRange(1, 1, 1, dataAwal[0].length);
      headerRange.setBackground("#1e293b"); // Slate 800
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      
      for (let i = 1; i <= dataAwal[0].length; i++) {
        sheet.autoResizeColumn(i);
      }
    }
    Logger.log(`Sheet '${namaSheet}' berhasil diinisialisasi.`);
  } else {
    Logger.log(`Sheet '${namaSheet}' sudah ada. Lewati pembuatan.`);
  }
}
