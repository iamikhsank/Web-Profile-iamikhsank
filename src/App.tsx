import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


interface PaketHargaItem {
  id: string;
  namaPaket: string;
  subjudul: string;
  harga: string;
  rekomendasi: boolean;
  fiturAktif: string[];
  fiturInaktif: string[];
  teksTombol: string;
}

interface PortofolioItem {
  id: string;
  kategori: string;
  warnaKategori: string;
  judul: string;
  klien: string;
  highlight: string;
  deskripsi: string;
  fitur: string[];
  metrikNilai: string;
  metrikLabel: string;
  linkGambar: string;
  linkProject: string;
  techStack: string[];
}


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const startY = window.scrollY || window.pageYOffset;
    
    if (targetId === "top" || targetId === "") {
      const scrollObj = { y: startY };
      gsap.to(scrollObj, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => window.scrollTo(0, scrollObj.y)
      });
      return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const targetY = element.getBoundingClientRect().top + startY + yOffset;
      const scrollObj = { y: startY };
      gsap.to(scrollObj, {
        y: targetY,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => window.scrollTo(0, scrollObj.y)
      });
    }
  };
  
  const [portofolio, setPortofolio] = useState<PortofolioItem[]>([]);
  const [isLoadingPortofolio, setIsLoadingPortofolio] = useState(true);

  const [paketHarga, setPaketHarga] = useState<PaketHargaItem[]>([]);
  const [isLoadingPaket, setIsLoadingPaket] = useState(true);

  useEffect(() => {
    if (typeof (window as any).google !== "undefined" && (window as any).google.script) {
      (window as any).google.script.run
        .withSuccessHandler((response: any) => {
          if (response.success) {
            setPaketHarga(response.data);
          }
          setIsLoadingPaket(false);
        })
        .withFailureHandler(() => {
          setIsLoadingPaket(false);
        })
        .getPaketHarga();
    } else {
      setTimeout(() => {
        setPaketHarga([
          {
            id: "PKT-001",
            namaPaket: "Starter",
            subjudul: "Untuk operasional tim kecil.",
            harga: "Mulai 3Jt",
            rekomendasi: false,
            fiturAktif: ["1-2 Google Sheets Terhubung", "Form Input Interaktif", "Notifikasi Email Otomatis"],
            fiturInaktif: ["Dashboard BI Eksekutif", "Multi-role Access"],
            teksTombol: "Pilih Starter"
          },
          {
            id: "PKT-002",
            namaPaket: "Pro System",
            subjudul: "Automasi end-to-end bisnis.",
            harga: "Mulai 7Jt",
            rekomendasi: true,
            fiturAktif: ["Arsitektur Database Sheets Kompleks", "Web App UI Premium (Tailwind)", "Integrasi Drive & PDF Generator", "Logika Approval Bertingkat", "Dokumentasi Handover"],
            fiturInaktif: [],
            teksTombol: "Pilih Pro"
          },
          {
            id: "PKT-003",
            namaPaket: "Enterprise",
            subjudul: "Dashboard & Integrasi Eksternal.",
            harga: "Custom",
            rekomendasi: false,
            fiturAktif: ["Pengembangan React Front-end", "Koneksi API Eksternal (HRIS/ERP)", "Custom Looker Studio/Tableau BI", "Sistem Autentikasi Pengguna", "Maintenance & Support 3 Bulan"],
            fiturInaktif: [],
            teksTombol: "Hubungi Saya"
          }
        ]);
        setIsLoadingPaket(false);
      }, 1000);
    }
  }, []);


  useEffect(() => {
    if (typeof (window as any).google !== "undefined" && (window as any).google.script) {
      (window as any).google.script.run
        .withSuccessHandler((response: any) => {
          if (response.success) {
            setPortofolio(response.data);
          }
          setIsLoadingPortofolio(false);
        })
        .withFailureHandler(() => {
          setIsLoadingPortofolio(false);
        })
        .getPortofolio();
    } else {
      // Mock data for development
      setTimeout(() => {
        setPortofolio([
          {
            id: "PRJ-004",
            kategori: "Enterprise BI & Govt",
            warnaKategori: "blue",
            judul: "BI-BEGR Telemetry.",
            klien: "Bank Indonesia (Kantor Pusat & Perwakilan)",
            highlight: "Zero-TCO Enterprise Culture Maturity Index Dashboard on Google Workspace.",
            deskripsi: "Platform visualisasi telemetri budaya kerja tingkat tinggi yang dioperasikan secara serverless di atas ekosistem Google Workspace. Memantau tingkat kematangan budaya (Culture Maturity Level - CML) di seluruh Satuan Kerja (Satker) Bank Indonesia tanpa sewa server.",
            fitur: [
              "Tracking Kematangan Budaya (CML 360°) Seluruh Satker",
              "Monitoring Championship Program & EVP",
              "Export Laporan Formal Otomatis ke PDF A4",
              "Single Source of Truth Google Sheets Engine"
            ],
            metrikNilai: "100% Zero Cost",
            metrikLabel: "Penghematan Biaya Server BI",
            linkGambar: "./assets/prj_img/BI_BEGR.png",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"]
          },
          {
            id: "PRJ-005",
            kategori: "Supply Chain & Inventory ERP",
            warnaKategori: "emerald",
            judul: "StockFlow Analytics Engine.",
            klien: "Enterprise Distributor & E-Commerce Merchant",
            highlight: "ABC-XYZ Pareto Matrix & Dynamic Safety Stock Engine on Google Sheets.",
            deskripsi: "Platform Business Intelligence & Supply Chain Optimization Engine berbasis Apps Script. Memecahkan masalah kebocoran omzet akibat kehabisan barang (stockout) dan penumpukan modal kerja akibat barang mati (dead stock) secara otomatis.",
            fitur: [
              "Analisis Matriks ABC-XYZ (Pareto 80/20 & Volatilitas Demand)",
              "Dynamic Reorder Point (ROP) & Safety Stock Estimator",
              "Lost Sales Calculator & Dead Stock Liquidation Hub",
              "Multi-Warehouse Governance & Stock Transfer Logging"
            ],
            metrikNilai: "0% Lost Sales",
            metrikLabel: "Optimasi Modal Kerja Gudang",
            linkGambar: "./assets/prj_img/StockflowERP.png",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Pure SVG Engine"]
          },
          {
            id: "PRJ-006",
            kategori: "Real Estate & Property ERP",
            warnaKategori: "purple",
            judul: "EstateManagement ERP.",
            klien: "Pengembang Kawasan Properti & Real Estate",
            highlight: "Interactive Visual Siteplan & Automated Tenant Billing on Google Sheets.",
            deskripsi: "Sistem ERP Properti Premium & Modular dengan visualisasi siteplan interaktif real-time, peta status unit properti, billing otomatis tagihan sewa/IPL, dan portal tenant mandiri.",
            fitur: [
              "Interactive Visual Siteplan Map (Status Unit Ready, Sold, Booked)",
              "Automated IPL & Rent Billing Generator (Invoice & PDF Drive)",
              "Tenant Portal Mandiri & Riwayat Pembayaran Tagihan",
              "Multi-Block Estate Occupancy & Revenue Analytics"
            ],
            metrikNilai: "98% On-time",
            metrikLabel: "Ketepatan Pembayaran Tagihan IPL",
            linkGambar: "./assets/prj_img/EstateManagement ERP.png",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Motion"]
          },
          {
            id: "PRJ-007",
            kategori: "Enterprise Multichannel ERP",
            warnaKategori: "blue",
            judul: "Multichannel Commerce ERP.",
            klien: "Modern Multi-Channel Merchants & E-Commerce Distributors",
            highlight: "Serverless E-Commerce Integration (Tokopedia, Shopee, Direct) on Google Sheets.",
            deskripsi: "Platform ERP Serverless yang mengonsolidasikan log transaksi, stok produk, dan ledger keuangan dari Tokopedia, Shopee, Facebook/Instagram Ads, dan Direct Store ke dalam satu database terpusat Google Sheets.",
            fitur: [
              "Multichannel Sales Order Consolidation & Sync",
              "Integrated Financial Ledger & Real-time Revenue Reporting",
              "Role-Based Access Control (RBAC) & Approval Workflows",
              "System-wide Diagnostic Monitoring & Idempotent Log Engine"
            ],
            metrikNilai: "5 Channel -> 1 Cockpit",
            metrikLabel: "Konsolidasi Data Real-time",
            linkGambar: "./assets/prj_img/Sales Analytics Cockpit.png",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"]
          },
          {
            id: "PRJ-008",
            kategori: "Financial Analytics & Market BI",
            warnaKategori: "emerald",
            judul: "Dynamic Sector Rotation.",
            klien: "Fund Managers, Research Analysts & Active Investors",
            highlight: "Real-time GICS Capital Rotation Detection & Momentum Signal Engine.",
            deskripsi: "Platform analisis rotasi modal makro-ekonomi antar 11 sektor GICS secara real-time. Mengubah data harga pasar mentah menjadi sinyal momentum transaksi dan analisis tren kontekstual.",
            fitur: [
              "Real-time Capital Rotation Tracking (11 GICS Sectors)",
              "Relative Strength & Momentum Rank Scoring Engine",
              "Interactive Recharts Visual Analytics (Cyclical vs Defensive)",
              "Automated Textual Market Signal & Risk Mitigation Insights"
            ],
            metrikNilai: "11 Sektor Real-time",
            metrikLabel: "Deteksi Sinyal Rotasi Modal",
            linkGambar: "./assets/prj_img/Dynamic Sector Rotation & Momentum Analytics.png",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Recharts"]
          },
          {
            id: "PRJ-009",
            kategori: "Operations Cockpit & CRM Workspace",
            warnaKategori: "purple",
            judul: "Analytics Workspace.",
            klien: "SaaS Operations & Agency Workspace Management",
            highlight: "Unified Revenue Streams, CRM Channels & Operations Cockpit on Google Sheets.",
            deskripsi: "Platform business intelligence & operasi kerja tingkat lanjut yang mengonsolidasi aliran data pendapatan, log pesanan, tracking produk, saluran komunikasi CRM, dan kolaborasi tim ke dalam satu kokpit terpadu.",
            fitur: [
              "Unified Operations Cockpit & Revenue Stream Tracker",
              "Dynamic Comparison Engine (YoY Historical Growth Milestones)",
              "Integrated CRM & Member Collaboration Channels",
              "Frictionless Auth & Session-Mapped Google Sheets API Router"
            ],
            metrikNilai: "100% Unified",
            metrikLabel: "Konsolidasi Operations Cockpit",
            linkGambar: "./assets/prj_img/AnalyticsWorkspace.png",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"]
          },
          {
            id: "PRJ-010",
            kategori: "Healthcare & Supply Chain",
            warnaKategori: "emerald",
            judul: "MediCare Supply Engine.",
            klien: "Jaringan Rumah Sakit & Distributor Alat Kesehatan",
            highlight: "Automated Medical Consumables & Hospital Allocation Tracking on Google Sheets.",
            deskripsi: "Sistem manajemen rantai pasok medis terintegrasi yang mengotomatisasi distribusi alat kesehatan, obat-obatan, dan tracking alokasi faskes/rumah sakit secara real-time.",
            fitur: [
              "Real-time Hospital & Faskes Stock Allocation Tracker",
              "Batch Expiry Date Alert & Critical Inventory Thresholds",
              "Automated Emergency Purchase Order (PO) Workflows",
              "Cold-Chain Logistical Status Monitoring"
            ],
            metrikNilai: "100% Tracking",
            metrikLabel: "Akurasi Distribusi Alkes & Obat",
            linkGambar: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Vite"]
          },
          {
            id: "PRJ-001",
            kategori: "Sistem Inventaris Gudang",
            warnaKategori: "emerald",
            judul: "Inventory Control.",
            klien: "Retail & Distribusi Nasional",
            highlight: "Real-time warehouse management with zero backend cost.",
            deskripsi: "Sistem manajemen gudang real-time yang menggunakan Google Sheets sebagai database utama, dibalut dengan antarmuka web modern untuk staf lapangan.",
            fitur: [
              "Integrasi Barcode & QR Code Scanner via Kamera",
              "Alert Reorder Point Otomatis (Email/WhatsApp)",
              "Tracking Mutasi Stok Multi-Gudang (FIFO)",
              "Role-based Access Control (Admin vs Staf Gudang)"
            ],
            metrikNilai: "100%",
            metrikLabel: "Pengurangan Biaya Server",
            linkGambar: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React"]
          },
          {
            id: "PRJ-003",
            kategori: "Data Pipeline & BI",
            warnaKategori: "purple",
            judul: "Custom Dashboard BI.",
            klien: "FMCG Enterprise",
            highlight: "Menyulap ribuan baris data mentah menjadi wawasan bisnis.",
            deskripsi: "Data pipeline dari berbagai cabang dikonsolidasikan otomatis ke Master Sheet, kemudian divisualisasikan menggunakan custom React Dashboard tanpa perlu langganan Tableau/PowerBI.",
            fitur: [
              "ETL Pipeline Otomatis (Extract Transform Load)",
              "Interactive Charts (Filter by Date/Region)",
              "Sinkronisasi Real-time < 5 Detik",
              "Export Laporan ke PDF/CSV"
            ],
            metrikNilai: "3 Hari -> 5 Menit",
            metrikLabel: "Percepatan Rekap Laporan",
            linkGambar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "React", "Google Sheets"]
          },
          {
            id: "PRJ-011",
            kategori: "Logistics & Fleet Management",
            warnaKategori: "blue",
            judul: "Loka Logistics App.",
            klien: "Perusahaan Ekspedisi & Armada Logistik",
            highlight: "Fleet Tracking, Cargo Manifest & Automated Delivery Dispatch on Google Sheets.",
            deskripsi: "Aplikasi manajemen armada logistik dan pelacakan kargo pengiriman barang. Mengelola jadwal pengemudi, manifes muatan kargo, serta operasional biaya armada secara transparan.",
            fitur: [
              "Real-time Cargo Manifest & Dispatch Scheduler",
              "Fleet Fuel & Operational Expense Tracking",
              "Digital Proof of Delivery (POD) Signature Integration",
              "Delivery Lead-Time & Route Optimization Metrics"
            ],
            metrikNilai: "100% Real-time",
            metrikLabel: "Visibilitas Status Pengiriman",
            linkGambar: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Chart.js"]
          },
          {
            id: "PRJ-012",
            kategori: "Sales & CRM Analytics",
            warnaKategori: "purple",
            judul: "Sales Analytics Cockpit.",
            klien: "B2B Commercial Sales Team & Distributor",
            highlight: "Real-time Sales Pipeline & Representative Performance Cockpit on Google Sheets.",
            deskripsi: "Dasbor analitik performa penjualan B2B dan manajemen pipeline transaksi sales representative. Menyajikan perbandingan kuota target bulanan, komisi, dan rasio konversi deal.",
            fitur: [
              "Sales Funnel & Pipeline Stage Conversion Tracking",
              "Representative Target vs Achievement Leaderboard",
              "Commission Calculator & Deal Velocity Analytics",
              "Real-time Sales Revenue Forecast & Projection Charts"
            ],
            metrikNilai: "3.5x Fast",
            metrikLabel: "Percepatan Deal Velocity Sales",
            linkGambar: "./assets/prj_img/Sales Analytics Cockpit (2).png",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Vite"]
          },
          {
            id: "PRJ-013",
            kategori: "Retail POS & Inventory ERP",
            warnaKategori: "emerald",
            judul: "Retail-ERP System.",
            klien: "Retail Store Chains & Offline/Online POS Outlets",
            highlight: "Serverless Point of Sale & Multi-Store Inventory Management on Google Sheets.",
            deskripsi: "Sistem ERP retail terpadu yang memfasilitasi transaksi kasir (Point of Sale), pencatatan stok multi-toko offline/online, dan manajemen harga grosir/eceran secara real-time.",
            fitur: [
              "Multi-Store POS Cashier & Receipt Printing",
              "Real-time Multi-Branch Inventory Synchronization",
              "Wholesale vs Retail Tiered Pricing Matrix",
              "Daily Sales Profit & Loss Summary Reports"
            ],
            metrikNilai: "100% Real-time",
            metrikLabel: "Konsolidasi Stok Multi-Toko",
            linkGambar: "https://images.unsplash.com/photo-1556742049-0a6756860010?q=80&w=2070&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"]
          },
          {
            id: "PRJ-002",
            kategori: "HR & Payroll Automation",
            warnaKategori: "blue",
            judul: "HR & Payroll Automation.",
            klien: "Perusahaan Manufaktur (>500 Karyawan)",
            highlight: "Otomatisasi 100% proses slip gaji dan rekap absensi.",
            deskripsi: "Mengganti sistem manual Excel menjadi web app dinamis. Pegawai dapat login, melihat slip gaji PDF bulanan, dan mengajukan cuti langsung dari HP mereka.",
            fitur: ["Pembuatan Slip Gaji PDF Otomatis massal", "Portal Karyawan Mandiri (Self-Service)", "Approval Cuti Bertingkat via Email", "Dashboard Analitik HR untuk Manajemen"],
            metrikNilai: "15 Jam/Minggu",
            metrikLabel: "Waktu Diselamatkan",
            linkGambar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React"]
          }
        ]);
        setIsLoadingPortofolio(false);
      }, 1000);
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    category: "",
    message: ""
  });

  const faqs = [
    { q: 'Apakah ini aman untuk data rahasia perusahaan?', a: 'Sangat aman. Kerahasiaan data perusahaan (Data Confidentiality & NDA) adalah prioritas utama kami. Data Anda berada penuh di bawah kontrol otorisasi domain Anda sendiri.' },
    { q: 'Sumber data & platform apa saja yang didukung untuk ETL & Dashboard?', a: 'Kami mendukung penarikan, pembersihan (Data Cleansing), dan konsolidasi data dari Google Sheets, MS Excel, Database MySQL/PostgreSQL, CRM, ERP, hingga Sistem POS Kasir untuk divisualisasikan pada Power BI, Tableau, maupun Web App Apps Script kustom.' },
    { q: 'Bagaimana peran Machine Learning & Predictive Analytics dalam bisnis saya?', a: 'Dengan pemodelan skrip Python (Pandas, Scikit-learn), kami mengeksekusi Sales Forecasting (prediksi omzet), Customer Segmentation (RFM Analysis), serta Churn Prediction untuk mendeteksi risiko dan menangkap peluang bisnis secara presisi.' },
    { q: 'Berapa lama proses pembuatan aplikasi & handover?', a: 'Tergantung kompleksitas. Untuk automasi sederhana 3-5 hari kerja. Untuk sistem ERP mini atau Dashboard BI komprehensif memakan waktu 2-4 minggu, lengkap dengan penyerahan file akhir (Power BI/Tableau, Web App, skrip Python, PDF Eksekutif, dan panduan data).' },
    { q: 'Bagaimana jika nanti sistem kami bertambah besar (Scale-up)?', a: 'Google Sheets memiliki kapasitas hingga 10 juta cell. Jika data Anda melampaui batas tersebut, pipeline data Apps Script dapat dengan mulus dihubungkan ke Google Cloud SQL (PostgreSQL/MySQL) tanpa merombak antarmuka pengguna.' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const waNumber = "6282126574799"; // Silakan ganti dengan nomor WhatsApp Anda
    const waText = `Halo mas Ikhsan, perkenalkan saya ${formData.name}.
Email: ${formData.email}
Kategori Kebutuhan: ${formData.category}

Detail Pesan:
${formData.message}`;
    
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

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
  };

  useGSAP(() => {
    // 2. Animasi Showcase Cards (Apple App Switcher Style)
    const cards = gsap.utils.toArray('.project-card');
    cards.forEach((card: any, index: number) => {
        if (index === cards.length - 1) return;
        const cardInner = card.querySelector('.card-inner');
        const nextCard = cards[index + 1] as HTMLElement;

        if (cardInner && nextCard) {
            gsap.to(cardInner, {
                scrollTrigger: {
                    trigger: nextCard,
                    start: "top bottom-=200", 
                    end: "top top+=96", 
                    scrub: true,
                },
                scale: 0.95,
                opacity: 0,
                filter: "blur(4px)",
                y: 0,
                transformOrigin: "top center",
                ease: "none"
            });
        }
    });

    // 2.5 Animasi "Why Apps Script" Feature Cards
    gsap.utils.toArray('.feature-card').forEach((card: any, index: number) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%", // Mulai animasi saat kartu mencapai 85% layar dari atas
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.15 // Efek domino berurutan dari kiri ke kanan
        });
    });

    // 3. Animasi Alur Kerja (Highlight saat di-scroll)
    const steps = gsap.utils.toArray('.step-item');
    steps.forEach((step: any) => {
        ScrollTrigger.create({
            trigger: step,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => gsap.to(step, { opacity: 1, duration: 0.4, ease: "power2.out" }),
            onLeave: () => gsap.to(step, { opacity: 0.2, duration: 0.4, ease: "power2.out" }),
            onEnterBack: () => gsap.to(step, { opacity: 1, duration: 0.4, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(step, { opacity: 0.2, duration: 0.4, ease: "power2.out" }),
        });
    });

    // 5. Animasi About Section
    gsap.to(".about-card", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });

    // 6. Animasi Social Proof (Klien & Testimoni)
    gsap.utils.toArray('.social-anim').forEach((el: any, index: number) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: "#social-proof",
                start: "top 75%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2 // Animasi berurutan (cascade)
        });
    });

    // 7. Animasi Form Kontak
    gsap.to(".form-anim", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    });
  }, []);

  return (
    <div className="selection:bg-emerald-500/30">
        

    {/* Navigation Header */}
    <header>
      <nav className="glass-nav fixed top-0 w-full z-50 transition-all duration-300" aria-label="Main Navigation">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <a href="#" onClick={(e) => scrollToSection(e, 'top')} className="font-sans font-extrabold tracking-tight text-lg md:text-xl text-white hover:opacity-80 transition-opacity">IKHSAN K<span className="text-emerald-500">.</span></a>
              <div className="hidden md:flex space-x-8 text-sm font-medium text-[#86868b]">
                  <a href="#showcase" onClick={(e) => scrollToSection(e, 'showcase')} className="hover:text-white transition cursor-pointer">Karya</a>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition cursor-pointer">Layanan & AI</a>
                  <a href="#workflow" onClick={(e) => scrollToSection(e, 'workflow')} className="hover:text-white transition cursor-pointer">Alur Kerja</a>
                  <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-white transition cursor-pointer">Harga</a>
                  <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-white transition cursor-pointer">FAQ</a>
              </div>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-[#f5f5f7] text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer">Konsultasi</a>
          </div>
      </nav>
    </header>

    <main id="main-content">

    {/* 1. HERO SECTION */}
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10 pt-36 md:pt-44 lg:pt-48 pb-16">
        <div className="ambient-glow"></div>
        
        <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm">
            Data Analytics & Business Intelligence
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]">
            Data-Driven Decisions. <br/>
            <span className="text-[#86868b]">Bukan Lagi Tebakan.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto font-light leading-relaxed mt-4 mb-10">
            Mengubah jutaan baris data mentah menjadi Executive Dashboard Interaktif, Prediksi Bisnis berbasis Machine Learning, dan Laporan Strategis yang siap dieksekusi oleh manajemen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
            <a href="#showcase" onClick={(e) => scrollToSection(e, 'showcase')} className="bg-[#f5f5f7] text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform cursor-pointer">Lihat Proyek</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-colors cursor-pointer">Konsultasi Gratis</a>
        </div>
        
        {/* Tech Stack Marquee (Inserted Here) */}
        <div className="w-full max-w-5xl mx-auto mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
            <p className="text-xs uppercase tracking-[0.2em] text-[#86868b] mb-6 font-semibold">Teknologi yang Digunakan</p>
            <div className="tech-marquee-wrapper">
                <div className="tech-marquee">
                    {/* Original Set */}
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_Apps_Script.svg/1280px-Google_Apps_Script.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20221103122014" alt="Apps Script" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Apps Script</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968557.png" alt="Google Sheets" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Google Sheets</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg"><circle r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
                        <span className="text-sm font-medium">React 19</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg"><path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#06B6D4"/></svg>
                        <span className="text-sm font-medium">Tailwind v4</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://images.icon-icons.com/2415/PNG/512/typescript_plain_logo_icon_146316.png" alt="TypeScript" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">TypeScript</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png" alt="HTML" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">HTML</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968242.png" alt="CSS" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">CSS</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/960px-New_Power_BI_Logo.svg.png?_=20210102182532" alt="Power BI" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Power BI</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png" alt="Tableau" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Tableau</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://img.icons8.com/color/512/python--v1.png" alt="Python" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Python</span>
                    </div>
                    
                    {/* Duplicated Set for Infinite Scroll Illusion */}
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_Apps_Script.svg/1280px-Google_Apps_Script.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20221103122014" alt="Apps Script" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Apps Script</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968557.png" alt="Google Sheets" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Google Sheets</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg"><circle r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
                        <span className="text-sm font-medium">React 19</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg"><path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#06B6D4"/></svg>
                        <span className="text-sm font-medium">Tailwind v4</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://images.icon-icons.com/2415/PNG/512/typescript_plain_logo_icon_146316.png" alt="TypeScript" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">TypeScript</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png" alt="HTML" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">HTML</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968242.png" alt="CSS" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">CSS</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/960px-New_Power_BI_Logo.svg.png?_=20210102182532" alt="Power BI" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Power BI</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png" alt="Tableau" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Tableau</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://img.icons8.com/color/512/python--v1.png" alt="Python" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Python</span>
                    </div>
                </div>
            </div>
        </div>

    </section>

    {/* 2. SHOWCASE (Stacked Cards) */}
    <section id="showcase" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Karya Transformasional.</h2>
            <p className="text-[#86868b] mt-4 text-lg">Bukti nyata efisiensi menggunakan arsitektur Apps Script.</p>
        </div>

        <div className="cards-container relative pb-16 space-y-6">
            
            
            {isLoadingPortofolio ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-[#86868b] animate-pulse">Memuat data portofolio...</p>
                </div>
            ) : portofolio.length > 0 ? (
                portofolio.map((item, index) => {
                    const colorMap: Record<string, string> = {
                        emerald: "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20",
                        blue: "text-blue-500 bg-blue-500/10 border border-blue-500/20",
                        purple: "text-purple-500 bg-purple-500/10 border border-purple-500/20",
                        default: "text-gray-500 bg-gray-500/10 border border-gray-500/20"
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
                        <div key={item.id} className="project-card sticky top-24 pt-4 pb-4" style={{ zIndex: index + 10 }}>
                            <div className={`card-inner w-full rounded-3xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] ${index % 2 !== 0 ? 'bg-[#121214]' : 'bg-[#0a0a0c]'} overflow-hidden flex flex-col md:flex-row relative origin-top`}>
                                <div className="w-full md:w-[62%] p-6 md:p-8 flex flex-col justify-between z-10">
                                    <div>
                                        {/* Badge Section */}
                                        <div className="flex items-center gap-2.5 mb-3">
                                            <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full ${colorClass}`}>{item.kategori}</span>
                                        </div>
                                        
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1.5 tracking-tight leading-tight">{item.judul}</h3>
                                        
                                        {/* Klien Info */}
                                        <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-4">Klien: {item.klien}</p>
                                        
                                        <p className="text-[#86868b] text-sm font-light leading-relaxed mb-5">
                                            <span className="text-white font-medium">{item.highlight}</span> {item.deskripsi}
                                        </p>
                                        
                                        {/* Fitur Inti List */}
                                        <div>
                                            <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2.5">Fitur Inti yang Diimplementasikan:</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {item.fitur.map((f, i) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <svg className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${svgColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                        <p className="text-xs text-[#f5f5f7]">{f}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-end">
                                        <div>
                                            <p className={`text-2xl md:text-3xl font-bold tracking-tighter mb-0.5 ${gradientClass}`}>{item.metrikNilai}</p>
                                            <p className="text-[10px] text-[#86868b] font-medium tracking-wide uppercase">{item.metrikLabel}</p>
                                        </div>
                                        {/* Tech Stack minimal */}
                                        <div className="flex flex-wrap gap-1.5 justify-end max-w-[220px]">
                                            {item.techStack.map((tech, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#86868b]">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[38%] min-h-[220px] md:min-h-full relative overflow-hidden bg-black/50 p-4 md:p-5 cursor-pointer group">
                                    <div className="w-full h-full min-h-[200px] rounded-2xl overflow-hidden relative shadow-xl border border-white/5">
                                        <img src={item.linkGambar} alt={item.judul} className="absolute inset-0 w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105 opacity-85" />
                                        
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
   </div>
    </section>

    {/* 2.3 SOCIAL PROOF (KLIEN & TESTIMONI) */}
    <section id="social-proof" className="py-24 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
            
            {/* Client Marquee */}
            <div className="text-center mb-20 social-anim">
                <p className="text-xs uppercase tracking-[0.2em] text-[#86868b] mb-8 font-semibold">Telah Dipercaya Oleh Lembaga Negara & Enterprise</p>
                <div className="tech-marquee-wrapper">
                    <div className="tech-marquee flex items-center">
                        {/* First Set */}
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://zonalogo.com/assets/logo-pertamina.webp?asset=888" alt="Pertamina" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Pertamina</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/3840px-Bank_Central_Asia.svg.png" alt="Bank Central Asia" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Central Asia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BI_Logo_%28cropped%29.png/250px-BI_Logo_%28cropped%29.png" alt="Bank Indonesia" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Indonesia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_kementerian_keuangan_republik_indonesia.png" alt="Kementerian Keuangan" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Keuangan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Logo_Kementerian_Kehutanan_RI_%282024%29_%28cropped%29.png" alt="Kementerian Kehutanan" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Kehutanan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/BMG_2003.png" alt="BMKG" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">BMKG</span>
                        </div>

                        {/* Duplicated Set for Infinite Loop */}
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://zonalogo.com/assets/logo-pertamina.webp?asset=888" alt="Pertamina" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Pertamina</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/3840px-Bank_Central_Asia.svg.png" alt="Bank Central Asia" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Central Asia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BI_Logo_%28cropped%29.png/250px-BI_Logo_%28cropped%29.png" alt="Bank Indonesia" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Indonesia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_kementerian_keuangan_republik_indonesia.png" alt="Kementerian Keuangan" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Keuangan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Logo_Kementerian_Kehutanan_RI_%282024%29_%28cropped%29.png" alt="Kementerian Kehutanan" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Kehutanan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/BMG_2003.png" alt="BMKG" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">BMKG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                {/* Testi 1 */}
                <div className="glass-panel p-10 rounded-[2rem] opacity-0 translate-y-10 social-anim relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <svg className="w-10 h-10 text-emerald-500/30 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    <p className="text-lg md:text-xl text-[#f5f5f7] font-light leading-relaxed mb-8 relative z-10">
                        "Sistem ini mengubah total cara gudang kami beroperasi. Laporan yang biasanya memakan waktu 3 hari sekarang tersaji secara real-time. Yang paling luar biasa, kami <span className="text-white font-semibold">tidak membayar biaya server sepeserpun</span> setiap bulannya."
                    </p>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <span className="text-emerald-400 font-bold text-sm tracking-wider">BS</span>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm">Budi Santoso</h4>
                            <p className="text-[#86868b] text-xs">Operations Manager · Retail & Logistics Division</p>
                        </div>
                    </div>
                </div>

                {/* Testi 2 */}
                <div className="glass-panel p-10 rounded-[2rem] opacity-0 translate-y-10 social-anim relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <svg className="w-10 h-10 text-blue-500/30 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    <p className="text-lg md:text-xl text-[#f5f5f7] font-light leading-relaxed mb-8 relative z-10">
                        "Sangat jarang menemukan solusi yang paham betul <span className="text-white font-semibold">proses bisnis (BI) sekaligus mahir dalam Web Development</span>. Portal HR yang dibangun sangat responsif, aman, dan integrasinya dengan Google Workspace sangat mulus."
                    </p>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <span className="text-blue-400 font-bold text-sm tracking-wider">SW</span>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm">Sarah Wijaya</h4>
                            <p className="text-[#86868b] text-xs">VP of Human Capital · Enterprise Group</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* 2.4 SPESIALISASI LAYANAN & ARSITEKTUR DATA */}
    <section id="services" className="py-32 relative bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <span className="text-emerald-500 font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Spesialisasi Layanan & Arsitektur Data</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Executive Dashboard &<br/>
                    <span className="text-[#86868b]">Predictive Analytics (Machine Learning).</span>
                </h2>
                <p className="text-[#86868b] mt-4 text-lg max-w-3xl mx-auto font-light">
                    Mengubah jutaan baris data mentah (<span className="text-white font-medium">raw data</span>) perusahaan Anda menjadi wawasan taktis berlandaskan data aktual (<span className="text-white font-medium">Data-Driven Decision Making</span>).
                </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                {/* Service 1 */}
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.12)', backdropFilter: 'blur(20px)'}}>
                            <img src="https://ico.hugeicons.com/database-stroke-rounded@3x.webp" alt="Database" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(120deg) brightness(0.85)'}} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Data Cleansing & ETL Pipeline</h3>
                        <p className="text-[#86868b] text-sm leading-relaxed mb-6">
                            Pembersihan, standarisasi, dan konsolidasi data dari berbagai sumber (<span className="text-white/80 font-medium">Google Sheets, MS Excel, Database MySQL, CRM, ERP, atau POS Kasir</span>) menjadi format rasional yang valid dan bebas duplikasi.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-emerald-400/90 font-medium tracking-wide" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.1)'}}>Data Scrubbing</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-emerald-400/90 font-medium tracking-wide" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.1)'}}>Multi-source Integration</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-emerald-400/90 font-medium tracking-wide" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.1)'}}>Schema Validation</span>
                        </div>
                    </div>
                </div>

                {/* Service 2 */}
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.12)', backdropFilter: 'blur(20px)'}}>
                            <img src="https://ico.hugeicons.com/dashboard-browsing-stroke-rounded@3x.webp" alt="Dashboard" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(190deg) brightness(0.85)'}} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Power BI, Tableau & Web App Dashboards</h3>
                        <p className="text-[#86868b] text-sm leading-relaxed mb-6">
                            Pengembangan visualisasi tingkat korporat untuk memantau metrik krusial seperti <span className="text-white/80 font-medium">Sales Performance, Inventory Tracking, Financial Cash Flow, hingga Marketing ROI</span> dalam satu layar interaktif web & mobile.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-blue-400/90 font-medium tracking-wide" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.1)'}}>Power BI</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-blue-400/90 font-medium tracking-wide" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.1)'}}>Tableau</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-blue-400/90 font-medium tracking-wide" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.1)'}}>React & Apps Script</span>
                        </div>
                    </div>
                </div>

                {/* Service 3 */}
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.12)', backdropFilter: 'blur(20px)'}}>
                            <img src="https://ico.hugeicons.com/artificial-intelligence-04-stroke-rounded@3x.webp" alt="AI" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(250deg) brightness(0.85)'}} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Data Science & Predictive Analytics (ML)</h3>
                        <p className="text-[#86868b] text-sm leading-relaxed mb-4">
                            Menggunakan algoritma Python canggih (<span className="text-white/80 font-medium">Pandas, Scikit-learn</span>) untuk strategi AI bisnis presisi:
                        </p>
                        <ul className="space-y-2 text-xs md:text-sm text-[#f5f5f7]/80 mb-6">
                            <li className="flex items-start gap-2"><span className="text-purple-400/90 font-semibold shrink-0">Sales Forecasting:</span> Prediksi volume omzet & penjualan di masa depan.</li>
                            <li className="flex items-start gap-2"><span className="text-purple-400/90 font-semibold shrink-0">RFM Segmentation:</span> Memetakan profil pelanggan dengan daya beli tertinggi.</li>
                            <li className="flex items-start gap-2"><span className="text-purple-400/90 font-semibold shrink-0">Churn Prediction:</span> Mendeteksi potensi pelanggan yang akan pindah ke kompetitor.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-purple-400/90 font-medium tracking-wide" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.1)'}}>Python AI</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-purple-400/90 font-medium tracking-wide" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.1)'}}>Scikit-learn</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-purple-400/90 font-medium tracking-wide" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.1)'}}>RFM Analysis</span>
                        </div>
                    </div>
                </div>

                {/* Service 4 */}
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.12)', backdropFilter: 'blur(20px)'}}>
                            <img src="https://ico.hugeicons.com/task-01-stroke-rounded@3x.webp" alt="Report" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(30deg) brightness(0.85)'}} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Actionable Insights & Executive Reporting</h3>
                        <p className="text-[#86868b] text-sm leading-relaxed mb-6">
                            Penyerahan dokumen laporan analitik komprehensif berisi <span className="text-white/80 font-medium">hidden insights</span> dan rekomendasi langkah strategis yang siap dieksekusi oleh dewan direksi maupun manajer operasional.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-amber-400/90 font-medium tracking-wide" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.1)'}}>Executive Summary</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-amber-400/90 font-medium tracking-wide" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.1)'}}>Strategic Recommendations</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] text-amber-400/90 font-medium tracking-wide" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.1)'}}>PDF Reporting</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Target Industry Sectors */}
            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-[#0a0a0c]">
                <div className="text-center mb-10">
                    <span className="text-emerald-500 font-bold text-xs tracking-[0.2em] uppercase mb-2 block">Solusi Relevan Untuk Sektor Industri</span>
                    <h3 className="text-2xl md:text-4xl font-bold">Pengalaman Lintas Industri.</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <img src="https://ico.hugeicons.com/shopping-bag-01-stroke-rounded@3x.webp" alt="Retail" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(120deg) brightness(0.85)'}} />
                        </div>
                        <h4 className="text-white font-bold text-sm md:text-base mb-1">Retail, F&B & E-Commerce</h4>
                        <p className="text-[11px] text-[#86868b]">POS Kasir, Stok & Sales</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <img src="https://ico.hugeicons.com/truck-01-stroke-rounded@3x.webp" alt="Distribusi" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(120deg) brightness(0.85)'}} />
                        </div>
                        <h4 className="text-white font-bold text-sm md:text-base mb-1">Distribusi & Supply Chain</h4>
                        <p className="text-[11px] text-[#86868b]">FMCG, Logistik & Fleet</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <img src="https://ico.hugeicons.com/bank-stroke-rounded@3x.webp" alt="Keuangan" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(120deg) brightness(0.85)'}} />
                        </div>
                        <h4 className="text-white font-bold text-sm md:text-base mb-1">Keuangan & Perbankan</h4>
                        <p className="text-[11px] text-[#86868b]">Cash Flow & Telemetri Budaya</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <img src="https://ico.hugeicons.com/target-02-stroke-rounded@3x.webp" alt="Digital Marketing" width="24" height="24" className="w-6 h-6" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(120deg) brightness(0.85)'}} />
                        </div>
                        <h4 className="text-white font-bold text-sm md:text-base mb-1">Digital Marketing Agency</h4>
                        <p className="text-[11px] text-[#86868b]">ROI, Funnel & Lead Analytics</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* 2.5 WHY APPS SCRIPT */}
    <section id="why-apps-script" className="py-32 relative bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <span className="text-emerald-500 font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Alasan Utama Memilih Apps Script</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Aplikasi Enterprise.<br/>
                    <span className="text-[#86868b]">Tanpa Tagihan Infrastruktur Bulanan.</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="glass-panel p-10 rounded-[2rem] feature-card opacity-0 translate-y-10">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                        <img src="https://ico.hugeicons.com/coins-01-stroke-rounded@3x.webp" alt="Zero Server Cost" width="28" height="28" className="w-7 h-7" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(120deg) brightness(0.85)'}} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Zero Server Cost</h3>
                    <p className="text-[#86868b] leading-relaxed text-sm md:text-base">Sistem Anda berjalan 100% di atas infrastruktur serverless Google. Ucapkan selamat tinggal pada biaya langganan AWS, Azure, atau VPS bulanan untuk hosting backend.</p>
                </div>

                {/* Feature 2 */}
                <div className="glass-panel p-10 rounded-[2rem] feature-card opacity-0 translate-y-10">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                        <img src="https://ico.hugeicons.com/link-01-stroke-rounded@3x.webp" alt="Native Integration" width="28" height="28" className="w-7 h-7" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(190deg) brightness(0.85)'}} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Native Integration</h3>
                    <p className="text-[#86868b] leading-relaxed text-sm md:text-base">Terhubung langsung dengan ekosistem Google Workspace. Generate PDF di Drive, kirim email via Gmail, dan sync ke Calendar tanpa API otorisasi (OAuth) yang rumit.</p>
                </div>

                {/* Feature 3 */}
                <div className="glass-panel p-10 rounded-[2rem] feature-card opacity-0 translate-y-10">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                        <img src="https://ico.hugeicons.com/shield-01-stroke-rounded@3x.webp" alt="Enterprise Security" width="28" height="28" className="w-7 h-7" style={{filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(250deg) brightness(0.85)'}} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Enterprise Security</h3>
                    <p className="text-[#86868b] leading-relaxed text-sm md:text-base">Keamanan sekelas perusahaan besar. Data Anda tidak pernah keluar dari Google Drive domain Anda, dienkripsi, dan memanfaatkan sistem otorisasi bawaan Google.</p>
                </div>
            </div>
        </div>
    </section>

    {/* 3. ALUR PENGERJAAN (Scroll Highlight) */}
    <section id="workflow" className="py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative">
            {/* Pinned Title */}
            <div className="md:sticky top-1/3 h-fit">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Proses Kerja <br/>yang Presisi.</h2>
                <p className="text-[#86868b] text-lg md:text-xl">Alur kerja konsulansi profesional 5 tahap. Sistematis, transparan, dan berorientasi pada hasil bisnis nyata.</p>
            </div>
            
            {/* Scrolling Steps */}
            <div className="space-y-24 py-10 step-container">
                
                <div className="step-item opacity-20 transition-opacity duration-500">
                    <span className="text-emerald-500 font-bold text-xl mb-2 block">01. Audit Kebutuhan Bisnis</span>
                    <h3 className="text-3xl font-bold mb-4">Diskusi Target & Metrik KPI</h3>
                    <p className="text-[#86868b] text-lg">Diskusi mendalam mengenai target (<span className="text-white font-medium">Goals</span>) dan metrik utama (<span className="text-white font-medium">KPI</span>) yang ingin dicapai oleh manajemen atau perusahaan Anda.</p>
                </div>
                
                <div className="step-item opacity-20 transition-opacity duration-500">
                    <span className="text-emerald-500 font-bold text-xl mb-2 block">02. Injeksi & Evaluasi Data</span>
                    <h3 className="text-3xl font-bold mb-4">Integrasi Multi-Sumber Data</h3>
                    <p className="text-[#86868b] text-lg">Menarik dan mengevaluasi data mentah dari sistem Anda (<span className="text-white font-medium">Excel, Google Sheets, CRM, SQL, ERP, atau POS Kasir</span>).</p>
                </div>
                
                <div className="step-item opacity-20 transition-opacity duration-500">
                    <span className="text-emerald-500 font-bold text-xl mb-2 block">03. Data Engineering & ETL</span>
                    <h3 className="text-3xl font-bold mb-4">Cleansing & Restrukturisasi</h3>
                    <p className="text-[#86868b] text-lg">Pembersihan data, standarisasi format, penanganan duplikasi, dan restrukturisasi tabel relasional komprehensif.</p>
                </div>

                <div className="step-item opacity-20 transition-opacity duration-500">
                    <span className="text-emerald-500 font-bold text-xl mb-2 block">04. Pemodelan & Arsitektur Visual</span>
                    <h3 className="text-3xl font-bold mb-4">Algoritma & Dashboard Interaktif</h3>
                    <p className="text-[#86868b] text-lg">Pembangunan logika algoritma Machine Learning / BI serta pengembangan antarmuka dashboard interaktif tingkat korporat.</p>
                </div>

                <div className="step-item opacity-20 transition-opacity duration-500">
                    <span className="text-emerald-500 font-bold text-xl mb-2 block">05. Penyerahan & Handover Strategis</span>
                    <h3 className="text-3xl font-bold mb-4">Aset Akhir & Panduan Wawasan Data</h3>
                    <p className="text-[#86868b] text-lg">Pengiriman aset akhir (<span className="text-white font-medium">File Power BI/Tableau, Web App Apps Script, Skrip Python, PDF Eksekutif</span>) beserta panduan pembacaan wawasan data.</p>
                </div>
            </div>
        </div>
    </section>

    {/* 3.5 ABOUT THE EXPERT */}
    <section id="about" className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="about-card glass-panel p-8 md:p-16 rounded-[3rem] relative flex flex-col md:flex-row gap-12 items-center opacity-0 translate-y-10">
                
                {/* Ambient Glow inside the card */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Profile Photo */}
                <div className="w-full md:w-1/3 relative group z-10 shrink-0">
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 relative shadow-2xl">
                        {/* Placeholder Photo: Ganti dengan foto profesional Anda */}
                        <img src="https://drive.google.com/thumbnail?id=184y2ZUwxJn1mXCgPtX_kuomeJaQ461zE&sz=w1000" referrerPolicy="no-referrer" 
                             alt="Ikhsan Kamal" 
                             className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition duration-700 ease-in-out transform group-hover:scale-105" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* Biography */}
                <div className="w-full md:w-2/3 z-10">
                    <div className="mb-2 flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-emerald-500"></div>
                        <span className="text-emerald-500 font-bold text-xs tracking-[0.2em] uppercase">The Expert</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">Ikhsan Kamal.</h2>
                    <p className="text-xl md:text-2xl text-white font-medium mb-8">Spesialis Data Analytics & Konsultan Business Intelligence.</p>
                    
                    <p className="text-[#86868b] text-base md:text-lg leading-relaxed font-light mb-10">
                        Spesialis <span className="text-white font-medium">Data Analytics</span>, <span className="text-white font-medium">Business Intelligence</span>, dan <span className="text-white font-medium">Machine Learning</span>. Saya siap mengubah jutaan baris data mentah (<span className="text-white font-medium">raw data</span>) perusahaan Anda menjadi Executive Dashboard interaktif dan prediksi bisnis yang melacak KPI, memantau tren penjualan, serta menekan inefisiensi operasional secara real-time.
                    </p>

                    {/* Stats / Highlight */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                        <div>
                            <p className="text-4xl font-bold text-white mb-2 tracking-tighter">5<span className="text-emerald-500">+</span></p>
                            <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Tahun Pengalaman</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-2 tracking-tighter">50<span className="text-emerald-500">+</span></p>
                            <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Proyek Skala Enterprise</p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-4xl font-bold text-white mb-2 tracking-tighter">100<span className="text-emerald-500">%</span></p>
                            <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Sistem Kustom</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
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
                        <div key={paket.id} className={`glass-panel p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 ${paket.rekomendasi ? 'border-emerald-500/50 relative transform md:scale-105 z-10 bg-[#111] shadow-[0_0_50px_rgba(5,150,105,0.15)]' : ''}`}>
                            {paket.rekomendasi && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wide">RECOMMENDED</div>
                            )}
                            <h3 className={`text-2xl font-bold mb-2 ${paket.rekomendasi ? 'text-emerald-400' : ''}`}>{paket.namaPaket}</h3>
                            <p className="text-[#86868b] mb-6 text-sm">{paket.subjudul}</p>
                            <div className="mb-8">
                                <span className="text-4xl font-bold">{paket.harga}</span>
                            </div>
                            <ul className="space-y-4 mb-10 text-sm text-[#f5f5f7]">
                                {paket.fiturAktif.map((fitur, i) => (
                                    <li key={`aktif-${i}`} className="flex items-start gap-3"><span>✓</span> {fitur}</li>
                                ))}
                                {paket.fiturInaktif.map((fitur, i) => (
                                    <li key={`inaktif-${i}`} className="flex items-start gap-3 text-[#86868b]"><span>—</span> {fitur}</li>
                                ))}
                            </ul>
                            <a href="#contact" className={`block w-full py-3 rounded-full text-center font-semibold transition ${paket.rekomendasi ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'border border-white/20 hover:bg-white/10'}`}>
                                {paket.teksTombol}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </section>


    {/* 5. FAQ */}
    <section id="faq" className="py-32 relative bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Tanya Jawab.</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`faq-item group bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-colors ${activeFaq === index ? 'active' : ''}`}
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                        <button className="w-full px-6 py-5 flex justify-between items-center text-left">
                            <span className="font-semibold text-lg">{faq.q}</span>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 faq-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </button>
                        <div className="faq-content bg-black/20 border-t border-white/5">
                            <p className="px-6 py-5 text-[#86868b] leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>

    {/* 6. CONTACT & BOOKING SYSTEM */}
    <section id="contact" className="py-32 relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Copy & Booking Info */}
                <div className="z-10">
                    <span className="text-emerald-500 font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Mulai Kolaborasi</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">Otomatiskan bisnis <br/>Anda hari ini.</h2>
                    <p className="text-[#86868b] text-lg mb-10 leading-relaxed font-light max-w-lg">
                        Jadwalkan sesi <span className="text-white font-medium">discovery call (30 Menit)</span>. Kita akan membedah alur kerja Anda saat ini dan memetakan arsitektur sistem yang tepat—tanpa komitmen apapun.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        
                        {/* Direct Booking Button (Calendly style) */}
                        <a href="https://calendly.com/your-link" target="_blank" className="flex items-center justify-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Booking Kalender
                        </a>
                        {/* WhatsApp Button */}
                        <a href="https://wa.me/6282126574799" target="_blank" className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#20b958] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            WhatsApp
                        </a>
                        {/* Alternative Direct Email */}
                        <a href="mailto:iamikhsank@gmail.com" className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
                            Email
                        </a>
                        
                    </div>

                    {/* Micro Info */}
                    <div className="space-y-4 text-sm text-[#86868b]">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-emerald-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>Berbasis di Bandung, Indonesia (Tersedia Remote Global)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-emerald-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Responsibilitas Tipikal: 12-24 Jam</span>
                        </div>
                    </div>
                </div>

                {/* Right: Glass Form */}
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] relative z-10 form-anim opacity-0 translate-y-10">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs text-[#86868b] uppercase tracking-wider font-semibold ml-1">Kategori Kebutuhan</label>
                            <div className="relative">
                                <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#f5f5f7] focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm appearance-none cursor-pointer">
                                    <option value="" disabled className="bg-zinc-900 text-gray-400">Pilih jenis layanan...</option>
                                    <option value="bi" className="bg-zinc-900 text-white">Dashboard BI / Data Pipeline</option>
                                    <option value="webapp" className="bg-zinc-900 text-white">Web App Kustom (React/Tailwind)</option>
                                    <option value="automation" className="bg-zinc-900 text-white">Otomatisasi Apps Script / Workspace</option>
                                    <option value="other" className="bg-zinc-900 text-white">Lainnya / Konsultasi Umum</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-[#86868b] uppercase tracking-wider font-semibold ml-1">Ceritakan Singkat Kebutuhan Anda</label>
                            <textarea rows="4" name="message" value={formData.message} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm resize-none" placeholder="Saat ini tim kami menghabiskan 10 jam seminggu untuk rekap data manual..."></textarea>
                        </div>
                        {/* Success Message (Hidden by default) */}
                        <div id="success-msg" className={`${submitStatus === 'success' ? 'block' : 'hidden'} bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-sm text-center`}>
                            Terima kasih! Pesan Anda telah diterima. Mengalihkan ke WhatsApp...
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#f5f5f7] text-black font-bold rounded-xl py-4 mt-2 hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:hover:scale-100">
                            {isSubmitting ? 'Mengirim...' : 'Kirim Pertanyaan'}
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    </section>
    </main>

    <footer className="text-center pb-8 pt-8 text-[#86868b] text-sm border-t border-white/5">
        <p>© 2026 Ikhsan K. Spesialis Data Analytics & Konsultan Business Intelligence.</p>
    </footer>

    
    </div>
  );
}
