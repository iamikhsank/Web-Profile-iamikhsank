export type Language = 'id' | 'en';

export interface TranslationSchema {
  nav: {
    services: string;
    showcase: string;
    whyUs: string;
    workflow: string;
    about: string;
    pricing: string;
    faq: string;
    caseStudies: string;
    consultation: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaConsult: string;
    ctaFastwork: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
  };
  techMarquee: {
    title: string;
  };
  showcase: {
    title: string;
    subtitle: string;
    clientLabel: string;
    coreFeaturesLabel: string;
    ctaReadCaseStudy: string;
    ctaOrderFastwork: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar1Cta: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar2Cta: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar3Cta: string;
    pillar4Title: string;
    pillar4Desc: string;
    pillar4Cta: string;
    industriesTitle: string;
    industriesSubtitle: string;
  };
  whyAppsScript: {
    title: string;
    subtitle: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    cta: string;
  };
  workflow: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
  };
  about: {
    title: string;
    subtitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    recommended: string;
    ctaConsult: string;
    ctaFastwork: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    btnCalendar: string;
    btnWhatsapp: string;
    btnEmail: string;
    location: string;
    responseTime: string;
    profilesLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    serviceLabel: string;
    serviceDefaultOption: string;
    msgLabel: string;
    msgPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successMsg: string;
  };
  footer: {
    copyright: string;
  };
  landingPages: {
    returnToPortfolio: string;
    powerBi: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      desc: string;
      ctaConsult: string;
      ctaFastwork: string;
      kpi1Label: string;
      kpi2Label: string;
      kpi3Label: string;
      sectionTitle: string;
    };
    dataAnalysis: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      desc: string;
      ctaConsult: string;
      ctaFastwork: string;
      kpi1Label: string;
      kpi2Label: string;
      kpi3Label: string;
      sectionTitle: string;
    };
    businessIntelligence: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      desc: string;
      ctaConsult: string;
      ctaFastwork: string;
      ctaGas: string;
      kpi1Label: string;
      kpi2Label: string;
      kpi3Label: string;
      sectionTitle: string;
    };
    machineLearning: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      desc: string;
      ctaConsult: string;
      ctaMlFastwork: string;
      ctaDsFastwork: string;
      kpi1Label: string;
      kpi2Label: string;
      kpi3Label: string;
      sectionTitle: string;
    };
    caseStudiesGallery: {
      eyebrow: string;
      titleLine1: string;
      subtitle: string;
      desc: string;
      ctaConsult: string;
      ctaReturn: string;
      readDeepDive: string;
      orderFastwork: string;
      modalFooterPrompt: string;
      modalOrderFastwork: string;
      modalDiscussionWa: string;
    };
  };
}

export const translations: Record<Language, TranslationSchema> = {
  id: {
    nav: {
      services: "Layanan & Spesialisasi",
      showcase: "Portofolio",
      whyUs: "Mengapa Apps Script?",
      workflow: "Alur Kerja",
      about: "Tentang Expert",
      pricing: "Paket Investasi",
      faq: "FAQ",
      caseStudies: "Studi Kasus 6-Tahap",
      consultation: "Konsultasi",
    },
    hero: {
      badge: "Analytics Engineer & B2B Solutions Architect",
      titleLine1: "Arsitektur Data & BI Portal.",
      titleLine2: "Eksklusif Tanpa Biaya Server.",
      subtitle: "Transformasi Google Sheets & database terisolasi menjadi Web App ERP serverless dan Dashboard Power BI berstandar B2B korporat.",
      ctaConsult: "Jadwalkan Konsultasi",
      ctaFastwork: "Lihat Layanan Fastwork",
      stat1Label: "Penghematan TCO Perusahaan",
      stat2Label: "Integrasi Google Apps Script",
      stat3Label: "Akurasi ETL & Data Scrubbing",
    },
    techMarquee: {
      title: "EKOSISTEM TEKNOLOGI & DATA STACK B2B KORPORAT",
    },
    showcase: {
      title: "Karya Transformasional.",
      subtitle: "Bukti nyata efisiensi menggunakan arsitektur modern.",
      clientLabel: "Klien:",
      coreFeaturesLabel: "Fitur Inti yang Diimplementasikan:",
      ctaReadCaseStudy: "Baca Case Study (6-Stage Deep-Dive)",
      ctaOrderFastwork: "Pesan Jasa Kategori Ini di Fastwork →",
    },
    services: {
      badge: "Pilar Layanan Utama",
      title: "Spesialisasi Enterprise BI & Analytics Engineering",
      subtitle: "Solusi analitik terpadu dari pengolahan data mentah hingga dasbor eksekutif tingkat tinggi.",
      pillar1Title: "Data Cleansing & ETL Pipeline",
      pillar1Desc: "Pembersihan, standarisasi, dan konsolidasi data dari berbagai sumber (Google Sheets, MS Excel, Database MySQL, CRM, ERP, atau POS Kasir) menjadi format rasional yang valid.",
      pillar1Cta: "Pesan Jasa Analisis Data (Terverifikasi & Ulasan Klien) →",
      pillar2Title: "Power BI, Tableau & Web App Dashboards",
      pillar2Desc: "Pengembangan Data Visualization & Dashboard Power BI tingkat korporat untuk memantau metrik krusial seperti Sales Performance, Inventory Tracking, Financial Cash Flow, hingga Marketing ROI.",
      pillar2Cta: "Pesan Dashboard Power BI & Tableau →",
      pillar3Title: "Data Science & Predictive Analytics (ML)",
      pillar3Desc: "Layanan Python Data Analyst mengombinasikan algoritma Machine Learning (Pandas, Scikit-learn) untuk strategi Data Science bisnis presisi: Sales Forecasting, RFM Segmentation, dan Churn Prediction.",
      pillar3Cta: "Pesan Model Machine Learning (Terverifikasi & Ulasan Klien) →",
      pillar4Title: "Actionable Insights & Executive Reporting",
      pillar4Desc: "Penyerahan dokumen laporan Business Analytics komprehensif berisi hidden insights dan rekomendasi langkah strategis yang siap dieksekusi oleh dewan direksi maupun manajer operasional.",
      pillar4Cta: "Pesan Business Intelligence Specialist →",
      industriesTitle: "Sektor Industri Berpengalaman",
      industriesSubtitle: "Telah diimplementasikan pada beragam model bisnis korporasi dan institusi publik.",
    },
    whyAppsScript: {
      title: "Mengapa Google Apps Script & Serverless?",
      subtitle: "Solusi efisien untuk bisnis yang menginginkan otomatisasi tanpa beban perawatan server mahal.",
      feat1Title: "Zero Infrastructure Cost",
      feat1Desc: "Tanpa biaya sewa server bulanan (AWS/GCP/VPS). Seluruh skrip berjalan di atas infrastruktur Google Cloud secara gratis.",
      feat2Title: "Native Integration",
      feat2Desc: "Terhubung langsung dengan ekosistem Google Workspace. Generate PDF di Drive, kirim email via Gmail, dan sync ke Calendar tanpa OAuth rumit.",
      feat3Title: "Enterprise Security",
      feat3Desc: "Keamanan sekelas perusahaan besar. Data Anda tidak pernah keluar dari Google Drive domain Anda, dienkripsi, dan memanfaatkan otorisasi Google.",
      cta: "Pesan Otomasi Google Sheets & Apps Script di Fastwork →",
    },
    workflow: {
      title: "Proses Kerja yang Presisi.",
      subtitle: "Alur kerja konsulansi profesional 5 tahap. Sistematis, transparan, dan berorientasi pada hasil bisnis nyata.",
      step1Title: "01. Discovery & Auditing Data",
      step1Desc: "Pemetaan masalah bisnis, audit alur kerja data eksisting, serta identifikasi kebutuhan KPI eksekutif.",
      step2Title: "02. Data Engineering & Cleansing",
      step2Desc: "Ekstraksi data dari berbagai format, standarisasi variabel, dan penghilangan duplikasi.",
      step3Title: "03. Data Modeling & System Architecture",
      step3Desc: "Perancangan skema relasional, formula DAX/Python, serta arsitektur backend Apps Script.",
      step4Title: "04. Interactive Dashboard Development",
      step4Desc: "Pengembangan antarmuka visual Power BI/React dengan prinsip UI/UX minimalis dan responsif.",
      step5Title: "05. Handover & Strategic Insights Report",
      step5Desc: "Penyerahan sistem, dokumentasi penggunaan, serta laporan rekomendasi keputusan bisnis.",
    },
    about: {
      title: "Tentang Ikhsan Kamal.",
      subtitle: "Data Analytics Specialist & Enterprise BI Consultant",
      bioParagraph1: "Berbekal pengalaman intensif di bidang Analytics Engineering dan Business Intelligence, Ikhsan Kamal berfokus pada penyelesaian masalah data kompleks untuk korporasi, UMKM skala menengah, hingga instansi pemerintah.",
      bioParagraph2: "Spesialisasi mencakup pengolahan data mentah menjadi aset berharga, otomatisasi alur kerja tanpa biaya server bulanan, serta penyusunan dasbor eksekutif yang mempercepat pengambilan keputusan strategis.",
      stat1Label: "Tingkat Keberhasilan Proyek BI",
      stat2Label: "Baris Data Diolah & Disaring",
      stat3Label: "Rata-rata Penghematan Waktu Klien",
    },
    pricing: {
      title: "Investasi Cerdas.",
      subtitle: "Pilih paket pengembangan sesuai kompleksitas sistem bisnis Anda.",
      recommended: "RECOMMENDED",
      ctaConsult: "Pilih Paket Ini",
      ctaFastwork: "Pesan di Fastwork →",
    },
    faq: {
      title: "Tanya Jawab.",
      subtitle: "Jawaban atas pertanyaan umum seputar layanan analitik data dan arsitektur BI.",
    },
    contact: {
      title: "Otomatiskan Bisnis Anda Hari Ini.",
      subtitle: "Diskusikan tantangan data perusahaan Anda langsung dengan Ikhsan Kamal. Respon cepat dalam 12-24 jam.",
      btnCalendar: "Booking Kalender",
      btnWhatsapp: "WhatsApp",
      btnEmail: "Email",
      location: "Berbasis di Bandung, Indonesia (Tersedia Remote Global)",
      responseTime: "Responsibilitas Tipikal: 12-24 Jam",
      profilesLabel: "Platform Profil:",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Misal: Budi Santoso",
      emailLabel: "Email Profesional",
      emailPlaceholder: "budi@perusahaan.com",
      companyLabel: "Nama Perusahaan / Organisasi",
      companyPlaceholder: "PT Perusahaan Jaya",
      serviceLabel: "Layanan yang Dibutuhkan",
      serviceDefaultOption: "Pilih Jenis Layanan Analitik",
      msgLabel: "Ceritakan Singkat Kebutuhan Anda",
      msgPlaceholder: "Saat ini tim kami menghabiskan 10 jam seminggu untuk rekap data manual...",
      submitBtn: "Kirim Pesan & Konsultasi →",
      submittingBtn: "Mengirim Pesan...",
      successMsg: "Terima kasih! Pesan Anda telah diterima. Mengalihkan ke WhatsApp...",
    },
    footer: {
      copyright: "© 2026 Ikhsan K. Spesialis Data Analytics & Konsultan Business Intelligence.",
    },
    landingPages: {
      returnToPortfolio: "Kembali ke Portofolio Utama",
      powerBi: {
        eyebrow: "Konsultan Power BI & Tableau Dashboard Eksekutif",
        titleLine1: "Power BI & Tableau Dashboard Eksekutif.",
        titleLine2: "Visualisasi Real-time Berstandar Korporat.",
        desc: "Memvisualisasikan metrik bisnis krusial (Sales Performance, Inventory Tracking, Cash Flow, Marketing ROI) ke dalam dasbor Power BI, Tableau, dan React Web App interaktif yang dapat diakses langsung dari desktop dan mobile.",
        ctaConsult: "Konsultasi Dashboard Power BI",
        ctaFastwork: "Pesan via Fastwork",
        kpi1Label: "Kecepatan Decision Making",
        kpi2Label: "Sinkronisasi Data Real-time",
        kpi3Label: "Pemborosan Biaya Lisensi",
        sectionTitle: "Solusi Dashboard Power BI & Tableau Korporat",
      },
      dataAnalysis: {
        eyebrow: "Spesialis Data Analysis & ETL Data Cleansing",
        titleLine1: "Analisis & Pembersihan Data Terpadu.",
        titleLine2: "Restrukturisasi Data Mentah Menjadi Aset & Wawasan Valid.",
        desc: "Pembersihan, ekstraksi (ETL Pipeline), standarisasi format, dan penyusunan tabel relasional dari Google Sheets, MS Excel, Database SQL (MySQL/PostgreSQL), POS Kasir, dan CRM ke dalam master data yang valid.",
        ctaConsult: "Konsultasi Data Cleansing",
        ctaFastwork: "Pesan via Fastwork (Terverifikasi & Ulasan Klien)",
        kpi1Label: "Akurasi Validasi Data",
        kpi2Label: "Eliminasi Duplikasi",
        kpi3Label: "Kecepatan Sync ETL",
        sectionTitle: "Solusi Data Engineering & Cleansing",
      },
      businessIntelligence: {
        eyebrow: "Konsultan Business Intelligence & Corporate BI",
        titleLine1: "Corporate Business Intelligence.",
        titleLine2: "Arsitektur Data Serverless Tanpa Biaya Server.",
        desc: "Membangun arsitektur data terpusat, otomatisasi alur kerja Apps Script, dan konsolidasi KPI eksekutif dengan penghematan TCO 100% (Zero Server Cost).",
        ctaConsult: "Konsultasi Corporate BI",
        ctaFastwork: "Pesan via Fastwork",
        ctaGas: "Pesan Otomasi Apps Script",
        kpi1Label: "Zero Server Cost TCO",
        kpi2Label: "Konsolidasi 1 Cockpit",
        kpi3Label: "Kecepatan Sync Pipeline",
        sectionTitle: "Solusi Arsitektur Business Intelligence",
      },
      machineLearning: {
        eyebrow: "Predictive Analytics & Enterprise AI Consultant",
        titleLine1: "Machine Learning & AI Analytics.",
        titleLine2: "Prediksi Omzet & Presisi Strategi Bisnis.",
        desc: "Memanfaatkan pemodelan skrip Python canggih (Pandas, Scikit-learn, PyTorch) untuk Sales Forecasting, Customer Churn Prediction, segmentasi RFM, dan integrasi Enterprise AI.",
        ctaConsult: "Konsultasi Machine Learning & AI",
        ctaMlFastwork: "Pesan Machine Learning (Terverifikasi & Ulasan Klien)",
        ctaDsFastwork: "Pesan Data Science & Predictive",
        kpi1Label: "Skor Akurasi Prediksi Sales",
        kpi2Label: "Retensi Pelanggan Bernilai Tinggi",
        kpi3Label: "Waktu Proses Prediksi Model",
        sectionTitle: "Solusi Predictive Analytics & Machine Learning",
      },
      caseStudiesGallery: {
        eyebrow: "Arsip Studi Kasus 6-Tahap MBB Standard",
        titleLine1: "Studi Kasus Analisis Data.",
        subtitle: "Problem → Data → Analysis → Dashboard → Insight → ROI Impact.",
        desc: "Eksplorasi mendalam bagaimana 10 proyek analitik data dan dashboard BI membantu perusahaan mengeliminasi bottleneck operasional, menghemat biaya server, dan mempercepat pengambilan keputusan eksekutif.",
        ctaConsult: "Konsultasi Studi Kasus Anda",
        ctaReturn: "Kembali ke Beranda Utama",
        readDeepDive: "Baca Case Study (6-Stage Deep-Dive)",
        orderFastwork: "Pesan Jasa Kategori Ini di Fastwork →",
        modalFooterPrompt: "Ingin mengimplementasikan arsitektur sistem serupa untuk perusahaan Anda?",
        modalOrderFastwork: "Pesan Jasa Kategori Ini di Fastwork →",
        modalDiscussionWa: "Diskusi via WhatsApp",
      },
    },
  },

  en: {
    nav: {
      services: "Services & Expertise",
      showcase: "Portfolio",
      whyUs: "Why Apps Script?",
      workflow: "Workflow",
      about: "About Expert",
      pricing: "Pricing Plans",
      faq: "FAQ",
      caseStudies: "6-Stage Case Studies",
      consultation: "Consultation",
    },
    hero: {
      badge: "Analytics Engineer & B2B Solutions Architect",
      titleLine1: "Data Architecture & BI Portals.",
      titleLine2: "Exclusive Zero Server Cost.",
      subtitle: "Transforming raw Google Sheets & isolated databases into serverless ERP Web Apps and corporate-grade Power BI Dashboards.",
      ctaConsult: "Schedule Consultation",
      ctaFastwork: "View Fastwork Services",
      stat1Label: "Corporate TCO Savings",
      stat2Label: "Google Apps Script Integration",
      stat3Label: "ETL & Data Scrubbing Accuracy",
    },
    techMarquee: {
      title: "B2B ENTERPRISE TECHNOLOGY & DATA STACK ECOSYSTEM",
    },
    showcase: {
      title: "Transformational Works.",
      subtitle: "Proven efficiency results powered by modern architecture.",
      clientLabel: "Client:",
      coreFeaturesLabel: "Core Implemented Features:",
      ctaReadCaseStudy: "Read Case Study (6-Stage Deep-Dive)",
      ctaOrderFastwork: "Order This Category Service on Fastwork →",
    },
    services: {
      badge: "Core Service Pillars",
      title: "Enterprise BI & Analytics Engineering Expertise",
      subtitle: "End-to-end analytical solutions from raw data engineering to executive C-suite dashboards.",
      pillar1Title: "Data Cleansing & ETL Pipeline",
      pillar1Desc: "Cleaning, standardization, and consolidation of data from multiple sources (Google Sheets, MS Excel, MySQL Databases, CRM, ERP, POS Kasir) into clean relational formats.",
      pillar1Cta: "Order Data Analysis Service (Verified Client Reviews) →",
      pillar2Title: "Power BI, Tableau & Web App Dashboards",
      pillar2Desc: "Corporate-grade Power BI & Tableau data visualization dashboards to monitor crucial metrics like Sales Performance, Inventory Tracking, Cash Flow, and Marketing ROI.",
      pillar2Cta: "Order Power BI & Tableau Dashboard →",
      pillar3Title: "Data Science & Predictive Analytics (ML)",
      pillar3Desc: "Python Data Analyst services combining Machine Learning algorithms (Pandas, Scikit-learn) for high-precision business strategies: Sales Forecasting, RFM Segmentation, and Churn Prediction.",
      pillar3Cta: "Order Machine Learning Model (Verified Client Reviews) →",
      pillar4Title: "Actionable Insights & Executive Reporting",
      pillar4Desc: "Comprehensive Business Analytics reporting documents delivering hidden insights and strategic recommendations ready for C-level executives and operation managers.",
      pillar4Cta: "Order Business Intelligence Specialist →",
      industriesTitle: "Proven Industry Experience",
      industriesSubtitle: "Successfully deployed across corporate enterprises, mid-market businesses, and government institutions.",
    },
    whyAppsScript: {
      title: "Why Google Apps Script & Serverless?",
      subtitle: "The ultimate cost-efficient solution for companies seeking automation without expensive server maintenance fees.",
      feat1Title: "Zero Infrastructure Cost",
      feat1Desc: "No recurring server rental fees (AWS/GCP/VPS). All scripts run seamlessly on Google Cloud's free infrastructure.",
      feat2Title: "Native Integration",
      feat2Desc: "Direct connection with Google Workspace. Generate Drive PDFs, dispatch Gmail notifications, and sync Calendar events without complex OAuth setups.",
      feat3Title: "Enterprise Security",
      feat3Desc: "Bank-grade enterprise security. Your data never leaves your organization's Google Drive domain, fully encrypted under Google's auth system.",
      cta: "Order Google Sheets & Apps Script Automation on Fastwork →",
    },
    workflow: {
      title: "Precision Engineering Process.",
      subtitle: "5-stage MBB-standard consulting workflow. Systematic, transparent, and driven by real business ROI.",
      step1Title: "01. Discovery & Data Auditing",
      step1Desc: "Mapping business pain points, auditing existing data pipelines, and defining C-level KPI requirements.",
      step2Title: "02. Data Engineering & Cleansing",
      step2Desc: "Extracting raw multi-source data, standardizing variables, and removing duplicate records.",
      step3Title: "03. Data Modeling & System Architecture",
      step3Desc: "Designing relational schemas, DAX/Python formulas, and serverless Apps Script backend architecture.",
      step4Title: "04. Interactive Dashboard Development",
      step4Desc: "Building minimalist, responsive Power BI & React web interfaces optimized for executive decision-making.",
      step5Title: "05. Handover & Strategic Insights Report",
      step5Desc: "System handover, comprehensive documentation, and actionable business strategy recommendation reports.",
    },
    about: {
      title: "About Ikhsan Kamal.",
      subtitle: "Data Analytics Specialist & Enterprise BI Consultant",
      bioParagraph1: "With extensive experience in Analytics Engineering and Business Intelligence, Ikhsan Kamal focuses on solving complex data challenges for enterprises, growing mid-market companies, and government entities.",
      bioParagraph2: "Specializing in transforming raw data into high-value assets, automating workflows with zero server fees, and building C-suite executive dashboards that accelerate strategic decision-making.",
      stat1Label: "BI Project Success Rate",
      stat2Label: "Data Rows Processed & Scrubbed",
      stat3Label: "Average Client Time Saved",
    },
    pricing: {
      title: "Smart Investment Plans.",
      subtitle: "Select the development tier tailored to your business system complexity.",
      recommended: "RECOMMENDED",
      ctaConsult: "Select This Plan",
      ctaFastwork: "Order on Fastwork →",
    },
    faq: {
      title: "Frequently Asked Questions.",
      subtitle: "Answers to common questions regarding data analytics services and BI architecture.",
    },
    contact: {
      title: "Automate Your Business Today.",
      subtitle: "Discuss your data challenges directly with Ikhsan Kamal. Fast response guaranteed within 12-24 hours.",
      btnCalendar: "Schedule Calendar",
      btnWhatsapp: "WhatsApp",
      btnEmail: "Email",
      location: "Based in Bandung, Indonesia (Available for Global Remote)",
      responseTime: "Typical Response Time: 12-24 Hours",
      profilesLabel: "Platform Profiles:",
      nameLabel: "Full Name",
      namePlaceholder: "E.g., Alex Turner",
      emailLabel: "Professional Email",
      emailPlaceholder: "alex@company.com",
      companyLabel: "Company / Organization Name",
      companyPlaceholder: "Enterprise Inc.",
      serviceLabel: "Required Service",
      serviceDefaultOption: "Select Analytics Service Type",
      msgLabel: "Briefly Describe Your Project Need",
      msgPlaceholder: "Our team currently spends 10 hours a week on manual spreadsheet reconciliation...",
      submitBtn: "Send Message & Consult →",
      submittingBtn: "Sending Message...",
      successMsg: "Thank you! Your message has been received. Redirecting to WhatsApp...",
    },
    footer: {
      copyright: "© 2026 Ikhsan K. Data Analytics Specialist & Business Intelligence Consultant.",
    },
    landingPages: {
      returnToPortfolio: "Return to Main Portfolio",
      powerBi: {
        eyebrow: "Executive Power BI & Tableau Dashboard Consultant",
        titleLine1: "Executive Power BI & Tableau Dashboards.",
        titleLine2: "Real-time Corporate-Grade Data Visualization.",
        desc: "Visualizing crucial business metrics (Sales Performance, Inventory Tracking, Cash Flow, Marketing ROI) into interactive Power BI, Tableau, and React Web App dashboards accessible from desktop and mobile.",
        ctaConsult: "Consult Power BI Dashboard",
        ctaFastwork: "Order via Fastwork",
        kpi1Label: "Decision Making Speedup",
        kpi2Label: "Real-time Data Synchronization",
        kpi3Label: "License Cost Waste",
        sectionTitle: "Corporate Power BI & Tableau Dashboard Solutions",
      },
      dataAnalysis: {
        eyebrow: "Data Analysis & ETL Data Cleansing Specialist",
        titleLine1: "Unified Data Analysis & Cleansing.",
        titleLine2: "Restructuring Raw Data into Valid Business Assets.",
        desc: "Cleaning, extraction (ETL Pipeline), format standardization, and relational table modeling from Google Sheets, MS Excel, SQL Databases (MySQL/PostgreSQL), POS Cashiers, and CRMs into a clean master database.",
        ctaConsult: "Consult Data Cleansing",
        ctaFastwork: "Order via Fastwork (Verified Client Reviews)",
        kpi1Label: "Data Validation Accuracy",
        kpi2Label: "Duplicate Record Elimination",
        kpi3Label: "ETL Pipeline Sync Speed",
        sectionTitle: "Data Engineering & Cleansing Solutions",
      },
      businessIntelligence: {
        eyebrow: "Business Intelligence & Corporate BI Consultant",
        titleLine1: "Corporate Business Intelligence.",
        titleLine2: "Serverless Data Architecture with Zero Infrastructure Cost.",
        desc: "Building centralized data architecture, Apps Script workflow automation, and executive KPI consolidation with 100% TCO savings (Zero Server Cost).",
        ctaConsult: "Consult Corporate BI",
        ctaFastwork: "Order via Fastwork",
        ctaGas: "Order Apps Script Automation",
        kpi1Label: "Zero Server Cost TCO",
        kpi2Label: "Single Cockpit Consolidation",
        kpi3Label: "Pipeline Sync Speed",
        sectionTitle: "Business Intelligence Architecture Solutions",
      },
      machineLearning: {
        eyebrow: "Predictive Analytics & Enterprise AI Consultant",
        titleLine1: "Machine Learning & AI Analytics.",
        titleLine2: "Revenue Forecasting & Precision Business Strategy.",
        desc: "Leveraging advanced Python script modeling (Pandas, Scikit-learn, PyTorch) for Sales Forecasting, Customer Churn Prediction, RFM Segmentation, and Enterprise AI integration.",
        ctaConsult: "Consult Machine Learning & AI",
        ctaMlFastwork: "Order Machine Learning (Verified Client Reviews)",
        ctaDsFastwork: "Order Data Science & Predictive",
        kpi1Label: "Sales Prediction Accuracy Score",
        kpi2Label: "High-Value Customer Retention",
        kpi3Label: "Model Inference Processing Time",
        sectionTitle: "Predictive Analytics & Machine Learning Solutions",
      },
      caseStudiesGallery: {
        eyebrow: "6-Stage MBB Standard Case Study Archive",
        titleLine1: "Data Analytics Case Studies.",
        subtitle: "Problem → Data → Analysis → Dashboard → Insight → ROI Impact.",
        desc: "In-depth exploration of how 10 data analytics & BI dashboard projects helped enterprises eliminate operational bottlenecks, save server costs, and accelerate executive decision-making.",
        ctaConsult: "Consult Your Case Study",
        ctaReturn: "Return to Main Homepage",
        readDeepDive: "Read Case Study (6-Stage Deep-Dive)",
        orderFastwork: "Order This Category Service on Fastwork →",
        modalFooterPrompt: "Want to implement a similar system architecture for your organization?",
        modalOrderFastwork: "Order This Category Service on Fastwork →",
        modalDiscussionWa: "Discuss via WhatsApp",
      },
    },
  },
};
