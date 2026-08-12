import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { translations, Language } from "./translations";


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

interface CaseStudyDetail {
  seoTitle: string;
  problem: string;
  data: string;
  analysis: string;
  dashboard: string;
  insight: string;
  businessImpact: string;
}

interface PortofolioItem {
  id: string;
  kategori: string;
  warnaKategori: string;
  judul: string;
  seoTitle: string;
  klien: string;
  highlight: string;
  deskripsi: string;
  fitur: string[];
  metrikNilai: string;
  metrikLabel: string;
  linkGambar: string;
  linkProject: string;
  techStack: string[];
  caseStudy: CaseStudyDetail;
}


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const GITHUB_PAGES_BASE = '/Web-Profile-iamikhsank';

const resolveAssetUrl = (assetPath: string): string => {
  if (!assetPath) return '';
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) return assetPath;
  
  const cleanPath = assetPath.replace(/^\.\//, '').replace(/^\//, '');
  const isGas = typeof window !== 'undefined' && (window.location.hostname.includes('script.google.com') || window.location.protocol === 'file:');
  const prefix = isGas ? '/' : `${GITHUB_PAGES_BASE}/`;
  
  return `${prefix}${cleanPath}`;
};

const getRouteHref = (targetRoute: string): string => {
  const isGas = typeof window !== 'undefined' && (window.location.hostname.includes('script.google.com') || window.location.protocol === 'file:');
  if (isGas) {
    return targetRoute === '/' ? '#/' : `#${targetRoute}`;
  }

  if (targetRoute === '/' || targetRoute === '' || targetRoute === '#/') {
    return `${GITHUB_PAGES_BASE}/`;
  }

  const cleanRoute = targetRoute.replace(/^#/, '').replace(/^\/?/, '/').replace(/\/$/, '');
  return `${GITHUB_PAGES_BASE}${cleanRoute}/`;
};

const normalizeRoute = (): string => {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname;
  const hash = window.location.hash;

  if (path.includes("power-bi-dashboard") || hash.includes("power-bi-dashboard")) {
    return "/services/power-bi-dashboard";
  }
  if (path.includes("data-analysis") || hash.includes("data-analysis")) {
    return "/services/data-analysis";
  }
  if (path.includes("business-intelligence") || hash.includes("business-intelligence")) {
    return "/services/business-intelligence";
  }
  if (path.includes("machine-learning-ai") || hash.includes("machine-learning-ai")) {
    return "/services/machine-learning-ai";
  }
  if (path.includes("case-studies") || hash.includes("case-studies")) {
    return "/case-studies";
  }
  return "/";
};

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortofolioItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string>(() => normalizeRoute());
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const stepElements = document.querySelectorAll('.step-item');
      if (!stepElements || stepElements.length === 0) return;

      const viewportHeight = window.innerHeight;
      const targetCenter = viewportHeight * 0.45;

      let closestIndex = 0;
      let minDistance = Infinity;

      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - targetCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveWorkflowStep(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentRoute]);

  const navigateRoute = (targetRoute: string) => {
    if (typeof window === "undefined") return;
    const isAppsScript = window.location.hostname.includes("script.google.com") || window.location.protocol === "file:";

    if (isAppsScript) {
      window.location.hash = targetRoute === "/" ? "#/" : `#${targetRoute}`;
    } else {
      const basePath = window.location.pathname.startsWith('/Web-Profile-iamikhsank') ? '/Web-Profile-iamikhsank' : '';
      const fullPath = targetRoute === "/" ? (basePath ? `${basePath}/` : "/") : `${basePath}${targetRoute}/`;
      window.history.pushState({}, "", fullPath);
    }
    setCurrentRoute(targetRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(normalizeRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (currentRoute === "/services/power-bi-dashboard") {
      document.title = "Konsultan Power BI & Tableau Dashboard | Ikhsan Kamal";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Layanan Konsultan Power BI & Tableau Dashboard eksekutif. Mengubah data perusahaan menjadi visualisasi interaktif real-time berstandar B2B.");
    } else if (currentRoute === "/services/data-analysis") {
      document.title = "Spesialis Data Analysis & ETL Data Cleansing | Ikhsan Kamal";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Layanan Spesialis Data Analysis & Data Cleansing. Pembersihan data mentah, SQL database engineering, dan konsolidasi data terpusat.");
    } else if (currentRoute === "/services/business-intelligence") {
      document.title = "Konsultan Business Intelligence & Corporate BI | Ikhsan Kamal";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Layanan Konsultan Business Intelligence (BI) Perusahaan. Arsitektur data serverless Apps Script, pelaporan KPI eksekutif, dan efisiensi TCO Rp 0.");
    } else if (currentRoute === "/services/machine-learning-ai") {
      document.title = "Predictive Analytics & AI Machine Learning Consultant | Ikhsan Kamal";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Layanan Konsultan Machine Learning & AI Predictive Analytics. Sales Forecasting, Churn Prediction, Segmentasi RFM, dan Integrasi AI Enterprise.");
    } else if (currentRoute === "/case-studies") {
      document.title = "Studi Kasus 6-Tahap Data Analytics & Business Intelligence | Ikhsan Kamal";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Arsip Studi Kasus 6-Tahap Data Analytics & Business Intelligence oleh Ikhsan Kamal. Problem, Data ETL, Analisis, Visualisasi Dashboard, Insight, dan ROI Impact.");
    } else {
      document.title = "Spesialis Data Analytics & Konsultan Business Intelligence (BI) | Ikhsan Kamal";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Ikhsan Kamal - Data Analyst Indonesia & Business Intelligence Consultant. Layanan Dashboard Power BI, Data Analytics Consultant, SQL & Python Data Analyst, serta Business Analytics.");
    }
  }, [currentRoute]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetSectionId: string) => {
    e.preventDefault();
    if (currentRoute !== "/") {
      navigateRoute("/");
      setCurrentRoute("/");
      setTimeout(() => {
        if (targetSectionId === "top" || targetSectionId === "") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const element = document.getElementById(targetSectionId);
        if (element) {
          const yOffset = -80;
          const targetY = element.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + yOffset;
          const scrollObj = { y: window.scrollY || window.pageYOffset };
          gsap.to(scrollObj, {
            y: targetY,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: () => window.scrollTo(0, scrollObj.y)
          });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 150);
    } else {
      scrollToSection(e, targetSectionId);
    }
  };

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
            seoTitle: "Enterprise Culture Maturity Telemetry | Government Business Intelligence Case Study",
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
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"],
            caseStudy: {
              seoTitle: "Enterprise Culture Maturity Telemetry | Government Business Intelligence Case Study",
              problem: "Bank Indonesia memerlukan pemantauan tingkat kematangan budaya kerja (Culture Maturity Level - CML) secara terpusat di seluruh Satuan Kerja (Satker) tanpa membebankan anggaran sewa server tahunan yang tinggi.",
              data: "Konsolidasi log survei berkala, laporan pelaksanaan program championship, dan data keterlibatan pegawai dari puluhan Satker ke dalam master Google Sheets terstruktur via Apps Script.",
              analysis: "Kalkulasi indeks CML 360° menggunakan skoring berbobot untuk setiap dimensi budaya, pemetaan maturity tier (Stage 1-5), dan analisis komparatif antar-Satker.",
              dashboard: "Antarmuka visual berbasis React & Apps Script dengan heatmap tingkat kematangan Satker, filter wilayah, serta modul ekspor laporan formal PDF A4 sekali klik.",
              insight: "Teridentifikasi bahwa 18% Satker memerlukan intervensi langsung pada pilar inovasi digital, sementara Satker wilayah timur menunjukkan adopsi program championship tercepat.",
              businessImpact: "Menerapkan sistem monitoring real-time berstandar enterprise dengan 100% Zero Server Cost (TCO Rp 0/bulan), menghemat ratusan juta rupiah biaya Lisensi BI tahunan."
            }
          },
          {
            id: "PRJ-005",
            kategori: "Supply Chain & Inventory ERP",
            warnaKategori: "emerald",
            judul: "StockFlow Analytics Engine.",
            seoTitle: "StockFlow Analytics Engine | Supply Chain ERP & Inventory BI Case Study",
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
            techStack: ["Apps Script", "Google Sheets", "React 19", "Pure SVG Engine"],
            caseStudy: {
              seoTitle: "StockFlow Analytics Engine | Supply Chain ERP & Inventory BI Case Study",
              problem: "Kebocoran omzet akibat kehabisan stok (stockout) barang laris dan penumpukan modal kerja pada barang mati (dead stock) akibat estimasi reorder point secara manual di Excel.",
              data: "Pengolahan data transaksi penjualan bulanan, riwayat pengiriman supplier, lead time barang, dan log mutasi gudang.",
              analysis: "Implementasi Analisis Matriks ABC-XYZ (Prinsip Pareto 80/20 & Volatilitas Demand) serta kalkulasi otomatis Dynamic Reorder Point (ROP) & Safety Stock Estimator.",
              dashboard: "Dashboard visual interaktif dengan status indikator ketersediaan barang (Safe, Warning, Critical Out), modul penentuan jumlah pesanan ulang, dan fitur Dead Stock Liquidation Hub.",
              insight: "12% produk kategori A menyumbang 78% total omzet bisnis, namun memiliki tingkat kehabisan stok terbesar akibat periode pemesanan ulang yang kaku.",
              businessImpact: "Memangkas kecenderungan lost sales hingga 0%, mengoptimalkan perputaran modal kerja gudang hingga 35%, dan mempercepat pengambilan keputusan restock."
            }
          },
          {
            id: "PRJ-006",
            kategori: "Real Estate & Property ERP",
            warnaKategori: "purple",
            judul: "EstateManagement ERP.",
            seoTitle: "EstateManagement ERP | Real Estate Operations & Tenant Billing BI Case Study",
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
            techStack: ["Apps Script", "Google Sheets", "React 19", "Motion"],
            caseStudy: {
              seoTitle: "EstateManagement ERP | Real Estate Operations & Tenant Billing BI Case Study",
              problem: "Pengembang kawasan properti kesulitan memantau status okupansi unit di banyak blok serta mengalami keterlambatan penagihan IPL (Iuran Pengelolaan Lingkungan) dan sewa.",
              data: "Integrasi data master unit properti, peta koordinat blok, data penyewa/pemilik, serta riwayat pembayaran tagihan bulanan.",
              analysis: "Pemodelan rasio okupansi kawasan, analisis Aging Receivables tagihan IPL, dan estimasi arus kas masuk (Cash Inflow Projection).",
              dashboard: "Antarmuka Interactive Visual Siteplan Map dengan warna indikator status unit (Ready, Sold, Booked), generator tagihan otomatis PDF ke Google Drive, dan portal tenant.",
              insight: "Keterlambatan pembayaran IPL terbanyak terjadi akibat proses pengiriman invoice fisik manual yang lambat dan tanpa pengingat otomatis.",
              businessImpact: "Meningkatkan ketepatan waktu pembayaran tagihan IPL hingga 98%, menghemat waktu administrasi invoice hingga 85%, dan memberikan visibilitas okupansi 100% real-time."
            }
          },
          {
            id: "PRJ-007",
            kategori: "Enterprise Multichannel ERP",
            warnaKategori: "blue",
            judul: "Multichannel Commerce ERP.",
            seoTitle: "Multichannel Commerce ERP | E-Commerce Sales Integration BI Case Study",
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
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"],
            caseStudy: {
              seoTitle: "Multichannel Commerce ERP | E-Commerce Sales Integration BI Case Study",
              problem: "Merchant e-commerce yang berjualan di Tokopedia, Shopee, TikTok Shop, dan toko fisik mengalami kesulitan merekap total omzet harian dan memantau persediaan barang lintas saluran.",
              data: "Ingesting data pesanan harian, biaya admin marketplace, stok produk, dan log transaksi dari 5 saluran penjualan berbeda.",
              analysis: "Konsolidasi ledger keuangan terpadu, kalkulasi Net Profit Margin setelah dipotong biaya platform marketplace, dan rekonsiliasi stok otomatis.",
              dashboard: "Kokpit eksekutif terintegrasi dengan chart tren omzet harian per channel, perbandingan profitabilitas produk, dan sistem alert stok kritis.",
              insight: "Saluran Shopee menyumbang volume pesanan terbanyak, namun Tokopedia menghasilkan Net Profit Margin tertinggi akibat struktur biaya promosi yang lebih efisien.",
              businessImpact: "Menyatu padukan 5 saluran penjualan ke dalam 1 kokpit terpadu, memangkas waktu konsolidasi laporan dari 2 hari menjadi kurang dari 5 menit."
            }
          },
          {
            id: "PRJ-008",
            kategori: "Financial Analytics & Market BI",
            warnaKategori: "emerald",
            judul: "Dynamic Sector Rotation.",
            seoTitle: "Dynamic Sector Rotation Engine | Financial Analytics & Market BI Case Study",
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
            techStack: ["Apps Script", "Google Sheets", "React 19", "Recharts"],
            caseStudy: {
              seoTitle: "Dynamic Sector Rotation Engine | Financial Analytics & Market BI Case Study",
              problem: "Investment manager dan analis pasar kesulitan melacak arah pergerakan modal makro-ekonomi antar 11 sektor GICS secara real-time untuk penyesuaian alokasi portofolio.",
              data: "Streaming data harga penutupan harian, volume transaksi, dan data indeks sektoral saham dari penyedia data pasar.",
              analysis: "Skoring momentum berbasis Relative Strength Index (RSI), pergerakan rata-rata (Moving Averages), dan pemetaan rotasi makro (Cyclical vs Defensive).",
              dashboard: "Visualisasi Recharts interaktif dengan matriks rotasi sektor, pemetaan ranking momentum, serta sinyal naratif otomatis mitigasi risiko.",
              insight: "Modal institusional terdeteksi mulai berpindah dari sektor teknologi menuju sektor energi 2 minggu sebelum pengumuman perubahan suku bunga pasar.",
              businessImpact: "Memberikan sinyal awal rotasi modal makro secara real-time, memungkinkan manajer investasi mengambil posisi defensif lebih cepat dan mengoptimalkan return portofolio."
            }
          },
          {
            id: "PRJ-009",
            kategori: "Operations Cockpit & CRM Workspace",
            warnaKategori: "purple",
            judul: "Analytics Workspace.",
            seoTitle: "Analytics Workspace | SaaS Operations & CRM Business Intelligence Case Study",
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
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"],
            caseStudy: {
              seoTitle: "Analytics Workspace | SaaS Operations & CRM Business Intelligence Case Study",
              problem: "Perusahaan SaaS dan agensi menghadapi fragmentasi data operasi, di mana log penjualan, tiket dukungan CRM, dan performa tim berada di platform terpisah.",
              data: "Penggabungan aliran data pendapatan bulanan (MRR/ARR), tiket CRM pengguna, log pesanan layanan, dan metrik kolaborasi tim internal.",
              analysis: "Pemodelan pertumbuhan historis Year-over-Year (YoY), kalkulasi Customer Lifetime Value (CLV), dan skoring efisiensi operasional.",
              dashboard: "Kokpit operasi terpadu dengan perbandingan pencapaian milestone bisnis, pelacak status tiket CRM real-time, dan kontrol akses berbasis peran (RBAC).",
              insight: "Waktu penyelesaian tiket CRM berbanding lurus dengan tingkat perpanjangan berlangganan (renewal rate) klien enterprise.",
              businessImpact: "Memecahkan isolasi data (data silos) dengan efisiensi operasi 100% terpadu, mempercepat respons tim layanan hingga 40%."
            }
          },
          {
            id: "PRJ-010",
            kategori: "Healthcare & Supply Chain",
            warnaKategori: "emerald",
            judul: "MediCare Supply Engine.",
            seoTitle: "MediCare Supply Engine | Healthcare Consumables Logistics BI Case Study",
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
            linkGambar: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Vite"],
            caseStudy: {
              seoTitle: "MediCare Supply Engine | Healthcare Consumables Logistics BI Case Study",
              problem: "Jaringan rumah sakit dan distributor alat kesehatan mengalami risiko kedaluwarsa bahan medis habis pakai akibat keterlambatan tracking distribusi antar-faskes.",
              data: "Monitoring data inventaris medis harian, tanggal kedaluwarsa lot/batch, alokasi stok per faskes, serta temperatur rantai dingin (cold-chain).",
              analysis: "Peringatan dini kedaluwarsa berbasis algoritma FIFO, kalkulasi batas kritis stok (Critical Stock Threshold), dan alokasi stok darurat.",
              dashboard: "Dashboard kontrol inventaris rumah sakit dengan status warna risiko kedaluwarsa, pembuat Purchase Order (PO) otomatis, dan pelacak distribusi rantai dingin.",
              insight: "15% stok alat kesehatan berisiko kedaluwarsa dapat diselamatkan jika didistribusikan ulang ke faskes dengan tingkat penggunaan tinggi 30 hari lebih awal.",
              businessImpact: "Menjamin 100% akurasi tracking alokasi medis & obat, mengeliminasi potensi kerugian finansial akibat barang medis expired."
            }
          },
          {
            id: "PRJ-001",
            kategori: "Sistem Inventaris Gudang",
            warnaKategori: "emerald",
            judul: "Inventory Control.",
            seoTitle: "Inventory Control App | Warehouse ERP & Barcode BI Case Study",
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
            linkGambar: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React"],
            caseStudy: {
              seoTitle: "Inventory Control App | Warehouse ERP & Barcode BI Case Study",
              problem: "Staf gudang distributor nasional melakukan pencatatan barang masuk/keluar secara manual di kertas, menyebabkan selisih stok fisik dan laporan keuangan.",
              data: "Data master SKU barang, log pemindaian barcode/QR code, lokasi rak gudang, dan mutasi stok antar-cabang.",
              analysis: "Metodologi pemotongan stok FIFO (First-In, First-Out), kalkulasi Reorder Point (ROP) harian, dan pencocokan otomatis selisih stok (Stock Opname Reconciliation).",
              dashboard: "Antarmuka Web App responsif mobile dengan fitur scanner kamera smartphone untuk pencatatan barang dan notifikasi pengingat ROP otomatis.",
              insight: "Selisih stok terbesar terjadi saat periode pergantian shift gudang akibat tidak adanya verifikasi pemindaian fisik waktu nyata.",
              businessImpact: "Menghilangkan selisih stok hingga 0%, memberikan sistem manajemen gudang real-time dengan 100% Zero Server Cost."
            }
          },
          {
            id: "PRJ-003",
            kategori: "Data Pipeline & BI",
            warnaKategori: "purple",
            judul: "Custom Dashboard BI.",
            seoTitle: "Custom Dashboard BI | FMCG Multi-Branch Data Pipeline BI Case Study",
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
            linkGambar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            linkProject: "#",
            techStack: ["Apps Script", "React", "Google Sheets"],
            caseStudy: {
              seoTitle: "Custom Dashboard BI | FMCG Multi-Branch Data Pipeline BI Case Study",
              problem: "Perusahaan FMCG dengan puluhan cabang mengalami penundaan laporan konsolidasi omzet bulanan hingga 3 hari kerja akibat pengumpulan file Excel manual.",
              data: "Ingesting file laporan dari 25 cabang secara otomatis menggunakan ETL Pipeline Apps Script ke Master Google Sheets.",
              analysis: "Konsolidasi agregat omzet harian, analisis kontribusi cabang, dan perbandingan target vs pencapaian aktual bulanan.",
              dashboard: "Dashboard React kustom tanpa biaya lisensi bulanan dengan filter tanggal, wilayah, dan fitur ekspor laporan resmi PDF/CSV.",
              insight: "Cabang di wilayah Jawa Tengah mengalami peningkatan penjualan produk segmen ekonomi sebesar 45% setelah penyesuaian harga grosir lokal.",
              businessImpact: "Memangkas waktu rekap laporan bisnis dari 3 Hari Kerja menjadi hanya 5 Menit, menghemat biaya lisensi software BI komersial."
            }
          },
          {
            id: "PRJ-011",
            kategori: "Logistics & Fleet Management",
            warnaKategori: "blue",
            judul: "Loka Logistics App.",
            seoTitle: "Loka Logistics App | Fleet Management & Cargo Manifest BI Case Study",
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
            linkGambar: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "Chart.js"],
            caseStudy: {
              seoTitle: "Loka Logistics App | Fleet Management & Cargo Manifest BI Case Study",
              problem: "Perusahaan armada ekspedisi kesulitan memantau posisi pengiriman kargo, penggunaan bahan bakar armada, dan bukti penerimaan barang (Proof of Delivery).",
              data: "Log jadwal pengemudi, manifes muatan kargo, pengeluaran BBM, serta koordinat lokasi dan jam pengiriman.",
              analysis: "Metrik Delivery Lead-Time, kalkulasi efisiensi konsumsi BBM per kilometer, dan pemetaan rute pengiriman optimal.",
              dashboard: "Antarmuka pelacak armada real-time dengan fitur tanda tangan digital POD (Proof of Delivery) langsung dari smartphone pengemudi.",
              insight: "Rute pengiriman jalur selatan menghemat konsumsi BBM hingga 14% dibandingkan jalur utara pada jam operasional sibuk.",
              businessImpact: "Memberikan visibilitas 100% status pengiriman kargo secara real-time, menekan biaya operasional BBM armada hingga 12%."
            }
          },
          {
            id: "PRJ-012",
            kategori: "Sales & CRM Analytics",
            warnaKategori: "purple",
            judul: "Sales Analytics Cockpit.",
            seoTitle: "Sales Analytics Cockpit | B2B Sales Pipeline & Funnel BI Case Study",
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
            techStack: ["Apps Script", "Google Sheets", "React 19", "Vite"],
            caseStudy: {
              seoTitle: "Sales Analytics Cockpit | B2B Sales Pipeline & Funnel BI Case Study",
              problem: "Tim sales B2B tidak memiliki visibilitas terhadap status deal pipeline, estimasi komisi, dan kecepatan penutupan transaksi (deal velocity).",
              data: "Data prospek, tahap funnel penjualan (Lead, Contacted, Proposal, Won/Lost), nilai deal, dan riwayat aktivitas tim sales.",
              analysis: "Kalkulasi rasio konversi per tahap funnel, perbandingan target vs pencapaian harian sales rep, dan perkiraan omzet (Revenue Forecast).",
              dashboard: "Dasbor analitik penjualan interaktif dengan leaderboard performa sales, kalkulator komisi otomatis, dan chart proyeksi omzet.",
              insight: "Deal B2B yang ditindaklanjuti dalam waktu kurang dari 24 jam setelah proposal dikirim memiliki rasio konversi 3x lebih tinggi.",
              businessImpact: "Mempercepat deal velocity tim sales hingga 3.5x lebih cepat, meningkatkan akurasi estimasi pencapaian target bulanan."
            }
          },
          {
            id: "PRJ-013",
            kategori: "Retail POS & Inventory ERP",
            warnaKategori: "emerald",
            judul: "Retail-ERP System.",
            seoTitle: "Retail-ERP System | Multi-Store POS & Wholesale BI Case Study",
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
            linkGambar: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React 19", "TypeScript"],
            caseStudy: {
              seoTitle: "Retail-ERP System | Multi-Store POS & Wholesale BI Case Study",
              problem: "Jaringan toko retail offline dan toko online kesulitan menyinkronkan stok barang saat terjadi transaksi bersamaan di kasir dan marketplace.",
              data: "Log transaksi kasir POS waktu nyata, master harga grosir & eceran, serta status persediaan multi-cabang.",
              analysis: "Rekonsiliasi persediaan otomatis antar-toko, skoring keuntungan harian (Daily Profit & Loss), dan pemetaan tingkat perputaran produk.",
              dashboard: "Sistem POS kasir berbasis web yang terhubung langsung dengan cetak struk dan pembaruan stok cabang instan.",
              insight: "Penjualan paket bundel produk pada jam sibuk akhir pekan meningkatkan nilai rata-rata keranjang belanja (Average Order Value) sebesar 28%.",
              businessImpact: "Mencegah kondisi kehabisan stok lintas cabang (zero stock mismatch) dan mempercepat proses transaksi kasir hingga 50%."
            }
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
            linkGambar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React"]
          }
        ]);
        setIsLoadingPortofolio(false);
      }, 1000);
    }
  }, []);

  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('user_lang') as Language) || 'id';
  });

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('user_lang', newLang);
  };

  const t = translations[lang];

  useEffect(() => {
    if (lang === 'en') {
      if (currentRoute === '/services/power-bi-dashboard') {
        document.title = "Power BI & Tableau Consultant | Executive Data Visualization Services";
      } else if (currentRoute === '/services/data-analysis') {
        document.title = "Data Analysis & ETL Specialist | Raw Data Restructuring";
      } else if (currentRoute === '/services/business-intelligence') {
        document.title = "Corporate Business Intelligence Consultant | Zero Server Cost Architecture";
      } else if (currentRoute === '/services/machine-learning-ai') {
        document.title = "Machine Learning & AI Analytics | Predictive Sales & Churn Models";
      } else if (currentRoute === '/case-studies') {
        document.title = "6-Stage Data Analytics Case Studies Archive | MBB Standard";
      } else {
        document.title = "Ikhsan K. | Data Analytics Specialist & Business Intelligence Consultant";
      }
    } else {
      if (currentRoute === '/services/power-bi-dashboard') {
        document.title = "Konsultan Power BI & Tableau Dashboard | Jasa Visualisasi Data Eksekutif";
      } else if (currentRoute === '/services/data-analysis') {
        document.title = "Spesialis Data Analysis & ETL Data Cleansing | Restrukturisasi Data Mentah";
      } else if (currentRoute === '/services/business-intelligence') {
        document.title = "Konsultan Business Intelligence & Corporate BI | Arsitektur Serverless Zero Server Cost";
      } else if (currentRoute === '/services/machine-learning-ai') {
        document.title = "Predictive Analytics & Enterprise AI Consultant | Pemodelan Sales & Churn Machine Learning";
      } else if (currentRoute === '/case-studies') {
        document.title = "Arsip Studi Kasus Analisis Data 6-Tahap MBB Standard | Ikhsan Kamal";
      } else {
        document.title = "Ikhsan K. | Spesialis Data Analytics & Konsultan Business Intelligence";
      }
    }
  }, [currentRoute, lang]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    category: "",
    message: ""
  });

  const faqs = lang === 'en' ? [
    { q: 'Is this secure for confidential company data?', a: 'Extremely secure. Data confidentiality and NDA enforcement are our highest priorities. Your data remains 100% under your own Google Workspace domain authorization control.' },
    { q: 'What data sources & platforms are supported for ETL & Dashboards?', a: 'We support ingestion, cleansing, and consolidation from Google Sheets, MS Excel, MySQL/PostgreSQL databases, CRM, ERP, and POS systems into Power BI, Tableau, or custom Apps Script Web Apps.' },
    { q: 'How do Machine Learning & Predictive Analytics add business value?', a: 'Using Python scripts (Pandas, Scikit-learn), we execute Sales Forecasting, Customer Segmentation (RFM), and Churn Prediction to catch revenue risks and opportunities with extreme precision.' },
    { q: 'What is the development timeline and handover process?', a: 'Depending on complexity. Simple automations take 3-5 business days. Full BI Dashboards or Mini ERP systems take 2-4 weeks, complete with source files (Power BI/Tableau, Web App, Python scripts, Executive PDF, and data manuals).' },
    { q: 'What happens if our data scales up in the future?', a: 'Google Sheets supports up to 10 million cells. If your volume exceeds this limit, Apps Script pipelines can seamlessly connect to Google Cloud SQL (PostgreSQL/MySQL) without changing the user interface.' }
  ] : [
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
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.15
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
    gsap.from(".about-card", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 6. Animasi Social Proof (Klien & Testimoni)
    gsap.utils.toArray('.social-anim').forEach((el: any, index: number) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: "#social-proof",
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2
        });
    });

    // 7. Animasi Form Kontak
    gsap.from(".form-anim", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
  }, []);

  return (
    <div className="selection:bg-emerald-500/30">
        

    {/* Navigation Header */}
    <header>
      <nav className="glass-nav fixed top-0 w-full z-50 transition-all duration-300" aria-label="Main Navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
              <a href={getRouteHref('/')} onClick={(e) => handleNavClick(e, 'top')} className="font-sans font-extrabold tracking-tight text-lg md:text-xl text-white hover:opacity-80 transition-opacity">IKHSAN K<span className="text-emerald-500">.</span></a>
              <div className="hidden lg:flex items-center space-x-4 text-sm font-medium text-[#86868b]">
                  <a href={getRouteHref('/')} onClick={(e) => handleNavClick(e, 'top')} className={`hover:text-white transition cursor-pointer ${currentRoute === '/' ? 'text-white font-semibold' : ''}`}>{lang === 'en' ? 'Home' : 'Utama'}</a>
                  <a href={getRouteHref('/services/power-bi-dashboard')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/power-bi-dashboard'); }} className={`hover:text-white transition cursor-pointer ${currentRoute === '/services/power-bi-dashboard' ? 'text-emerald-400 font-semibold' : ''}`}>Power BI</a>
                  <a href={getRouteHref('/services/data-analysis')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/data-analysis'); }} className={`hover:text-white transition cursor-pointer ${currentRoute === '/services/data-analysis' ? 'text-emerald-400 font-semibold' : ''}`}>Data Analysis</a>
                  <a href={getRouteHref('/services/business-intelligence')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/business-intelligence'); }} className={`hover:text-white transition cursor-pointer ${currentRoute === '/services/business-intelligence' ? 'text-emerald-400 font-semibold' : ''}`}>Corporate BI</a>
                  <a href={getRouteHref('/services/machine-learning-ai')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/machine-learning-ai'); }} className={`hover:text-white transition cursor-pointer ${currentRoute === '/services/machine-learning-ai' ? 'text-emerald-400 font-semibold' : ''}`}>ML &amp; AI</a>
                  <a href={getRouteHref('/case-studies')} onClick={(e) => { e.preventDefault(); navigateRoute('/case-studies'); }} className={`hover:text-white transition cursor-pointer ${currentRoute === '/case-studies' ? 'text-emerald-400 font-semibold' : ''}`}>Case Studies</a>
                  <a href={getRouteHref('/')} onClick={(e) => handleNavClick(e, 'showcase')} className="hover:text-white transition cursor-pointer">{lang === 'en' ? 'Showcase' : 'Karya'}</a>
                  <a href={getRouteHref('/')} onClick={(e) => handleNavClick(e, 'pricing')} className="hover:text-white transition cursor-pointer">{lang === 'en' ? 'Pricing' : 'Harga'}</a>
                  <a href={getRouteHref('/')} onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-white transition cursor-pointer">FAQ</a>
              </div>
              <div className="flex items-center gap-3">
                  {/* Language Switcher Segmented Control */}
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-xs font-semibold">
                    <button 
                      onClick={() => toggleLanguage('id')} 
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${lang === 'id' ? 'bg-emerald-500 text-black font-extrabold shadow-sm' : 'text-[#86868b] hover:text-white'}`}
                      aria-label="Bahasa Indonesia"
                    >
                      ID
                    </button>
                    <button 
                      onClick={() => toggleLanguage('en')} 
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${lang === 'en' ? 'bg-emerald-500 text-black font-extrabold shadow-sm' : 'text-[#86868b] hover:text-white'}`}
                      aria-label="English"
                    >
                      EN
                    </button>
                  </div>
                  <a href={getRouteHref('/')} onClick={(e) => handleNavClick(e, 'contact')} className="hidden lg:inline-flex bg-[#f5f5f7] text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer">{lang === 'en' ? 'Consultation' : 'Konsultasi'}</a>
                  {/* Hamburger Menu Button */}
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                    className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                  >
                    <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></span>
                  </button>
              </div>
          </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
      )}
      <div className={`fixed top-0 right-0 z-45 h-full w-[280px] sm:w-[320px] bg-[#0a0a0c]/95 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{zIndex: 45}}>
        <div className="flex flex-col h-full pt-16 pb-8 px-6 overflow-y-auto">
          {/* Mobile Drawer Top Language Switcher */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <span className="text-xs text-[#86868b] font-medium">{lang === 'en' ? 'Language' : 'Bahasa'}</span>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-xs font-semibold">
              <button 
                onClick={() => toggleLanguage('id')} 
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === 'id' ? 'bg-emerald-500 text-black font-extrabold shadow-sm' : 'text-[#86868b] hover:text-white'}`}
              >
                ID
              </button>
              <button 
                onClick={() => toggleLanguage('en')} 
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === 'en' ? 'bg-emerald-500 text-black font-extrabold shadow-sm' : 'text-[#86868b] hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
          {/* Layanan Section */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">{lang === 'en' ? 'Services' : 'Layanan'}</p>
          <div className="space-y-1 mb-6">
            <a href={getRouteHref('/')} onClick={(e) => { handleNavClick(e, 'top'); setMobileMenuOpen(false); }} className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${currentRoute === '/' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'}`}>{lang === 'en' ? 'Home' : 'Utama'}</a>
            <a href={getRouteHref('/services/power-bi-dashboard')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/power-bi-dashboard'); setMobileMenuOpen(false); }} className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${currentRoute === '/services/power-bi-dashboard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'}`}>Power BI &amp; Tableau</a>
            <a href={getRouteHref('/services/data-analysis')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/data-analysis'); setMobileMenuOpen(false); }} className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${currentRoute === '/services/data-analysis' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'}`}>Data Analysis &amp; ETL</a>
            <a href={getRouteHref('/services/business-intelligence')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/business-intelligence'); setMobileMenuOpen(false); }} className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${currentRoute === '/services/business-intelligence' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'}`}>Corporate BI</a>
            <a href={getRouteHref('/services/machine-learning-ai')} onClick={(e) => { e.preventDefault(); navigateRoute('/services/machine-learning-ai'); setMobileMenuOpen(false); }} className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${currentRoute === '/services/machine-learning-ai' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'}`}>ML &amp; AI</a>
          </div>
          {/* Navigasi Section */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#86868b] mb-3">{lang === 'en' ? 'Navigation' : 'Navigasi'}</p>
          <div className="space-y-1 mb-6">
            <a href={getRouteHref('/case-studies')} onClick={(e) => { e.preventDefault(); navigateRoute('/case-studies'); setMobileMenuOpen(false); }} className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${currentRoute === '/case-studies' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'}`}>Case Studies</a>
            <a href={getRouteHref('/')} onClick={(e) => { handleNavClick(e, 'showcase'); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-all">{lang === 'en' ? 'Showcase' : 'Karya'}</a>
            <a href={getRouteHref('/')} onClick={(e) => { handleNavClick(e, 'pricing'); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-all">{lang === 'en' ? 'Pricing' : 'Harga'}</a>
            <a href={getRouteHref('/')} onClick={(e) => { handleNavClick(e, 'faq'); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-all">FAQ</a>
          </div>
          {/* CTA */}
          <div className="mt-auto">
            <a href={getRouteHref('/')} onClick={(e) => { handleNavClick(e, 'contact'); setMobileMenuOpen(false); }} className="block w-full text-center bg-[#f5f5f7] text-black px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-white transition-all">{lang === 'en' ? 'Free Consultation' : 'Konsultasi Gratis'}</a>
          </div>
        </div>
      </div>
    </header>

    <main id="main-content">

    {/* POWER BI DASHBOARD LANDING PAGE VIEW */}
    {currentRoute === "/services/power-bi-dashboard" && (
      <div className="pt-28 pb-16">
        <div className="ambient-glow"></div>
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="text-xs text-[#86868b] hover:text-white transition">{lang === 'en' ? 'Home' : 'Utama'}</a>
            <span className="text-xs text-[#86868b]">/</span>
            <span className="px-4 py-1.5 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/10 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              Konsultan Power BI & Tableau Dashboard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] max-w-5xl">
            Power BI & Tableau Dashboard Eksekutif. <br />
            <span className="text-[#86868b]">Visualisasi Real-time Berstandar Korporat.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#86868b] max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Memvisualisasikan metrik bisnis krusial (<span className="text-white font-medium">Sales Performance, Inventory Tracking, Cash Flow, Marketing ROI</span>) ke dalam dasbor Power BI, Tableau, dan React Web App interaktif yang dapat diakses langsung dari desktop dan mobile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href={getRouteHref('/')} onClick={(e) => scrollToSection(e, 'contact')} className="bg-emerald-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all cursor-pointer">Konsultasi Dashboard Power BI</a>
            <a href="https://fastwork.id/user/iamikhsan/data-analysis-84856158?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#00b900]/20 transition-all cursor-pointer flex items-center justify-center gap-2">Pesan via Fastwork</a>
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">{lang === 'en' ? 'Return to Main Portfolio' : 'Kembali ke Portofolio Utama'}</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mx-auto border-t border-white/10 pt-10">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-blue-400 mb-1">3.5x</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Kecepatan Decision Making</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-emerald-400 mb-1">100%</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Sinkronisasi Data Real-time</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-purple-400 mb-1">Rp 0</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Pemborosan Biaya Lisensi</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-32 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Spesialisasi Visualisasi Data</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">Solusi Dashboard Power BI & Tableau Korporat</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 font-bold">01</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Executive Sales & Revenue Cockpit</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Pemantauan tren omzet harian, pencapaian target sales rep, rasio konversi funnel, dan proyeksi pendapatan bulanan berbasis data aktual.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-blue-300 font-medium">Power BI DAX</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-blue-300 font-medium">Sales Pipeline</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 font-bold">02</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Financial Cash Flow & P&L Analytics</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Laporan laba rugi interaktif, tracking arus kas masuk/keluar, analisis rasio utang piutang (aging receivables), dan pengawasan margin keuntungan.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">Cash Flow</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">Tableau Desktop</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 font-bold">03</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Multi-Warehouse Inventory Control</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Monitoring persediaan barang di banyak lokasi gudang, indikator status ROP (Reorder Point), serta analisis rotasi barang mati (dead stock).</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Pareto ABC-XYZ</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Inventory BI</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400 font-bold">04</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Custom Web App Embedding</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Penyematan visualisasi data ke dalam aplikasi web internal perusahaan (React & Apps Script) sehingga seluruh tim dapat mengakses tanpa akun Power BI Pro.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-amber-300 font-medium">Embedded BI</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-amber-300 font-medium">React + Apps Script</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )}

    {/* DATA ANALYSIS & ETL LANDING PAGE VIEW */}
    {currentRoute === "/services/data-analysis" && (
      <div className="pt-28 pb-16">
        <div className="ambient-glow"></div>
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="text-xs text-[#86868b] hover:text-white transition">{lang === 'en' ? 'Home' : 'Utama'}</a>
            <span className="text-xs text-[#86868b]">/</span>
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              Spesialis Data Analysis & ETL Data Cleansing
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] max-w-5xl">
            Analisis & Pembersihan Data Terpadu. <br />
            <span className="text-[#86868b]">Restrukturisasi Data Mentah Menjadi Aset & Wawasan Valid.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#86868b] max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Pembersihan, ekstraksi (<span className="text-white font-medium">ETL Pipeline</span>), standarisasi format, dan penyusunan tabel relasional dari Google Sheets, MS Excel, Database SQL (MySQL/PostgreSQL), POS Kasir, dan CRM ke dalam master data yang valid dan bebas duplikasi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href={getRouteHref('/')} onClick={(e) => scrollToSection(e, 'contact')} className="bg-emerald-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all cursor-pointer">Konsultasi Data Cleansing</a>
            <a href="https://fastwork.id/user/iamikhsan/data-analysis-59830902?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#00b900]/20 transition-all cursor-pointer flex items-center justify-center gap-2">Pesan via Fastwork (Terverifikasi & Ulasan Klien)</a>
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">{lang === 'en' ? 'Return to Main Portfolio' : 'Kembali ke Portofolio Utama'}</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mx-auto border-t border-white/10 pt-10">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-emerald-400 mb-1">99.9%</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Akurasi Validasi Data</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-blue-400 mb-1">100%</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Eliminasi Duplikasi</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-purple-400 mb-1">&lt; 5 Detik</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Kecepatan Sync ETL</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-32 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Spesialisasi Data Analysis</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">Solusi Data Engineering & Cleansing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 font-bold">01</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Multi-Source Data Scrubbing</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Penanganan file Excel/CSV berantakan, perbaikan format tanggal, pembersihan spasi ganda, dan penanganan nilai kosong (*null values*) secara otomatis.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">Data Scrubbing</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">Automated ETL</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 font-bold">02</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">SQL Relational Database Engineering</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Penyusunan struktur skema tabel relasional (MySQL, PostgreSQL, Google Cloud SQL) dengan kueri optimasi tinggi untuk ketersediaan data cepat.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-blue-300 font-medium">SQL Engineering</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-blue-300 font-medium">Schema Design</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 font-bold">03</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Dynamic Pareto ABC-XYZ Analytics</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Penerapan pemodelan statistik Pareto 80/20 dan volatilitas permintaan untuk mengelompokkan kontribusi omzet produk secara presisi.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Pareto Analysis</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Data Modeling</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400 font-bold">04</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Automated Master Sheet Consolidation</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Mengonsolidasi puluhan file laporan cabang terpisah secara otomatis ke Master Google Sheets terstruktur menggunakan Apps Script serverless.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-amber-300 font-medium">Master Consolidation</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-amber-300 font-medium">Apps Script ETL</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )}

    {/* CORPORATE BUSINESS INTELLIGENCE LANDING PAGE VIEW */}
    {currentRoute === "/services/business-intelligence" && (
      <div className="pt-28 pb-16">
        <div className="ambient-glow"></div>
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="text-xs text-[#86868b] hover:text-white transition">{lang === 'en' ? 'Home' : 'Utama'}</a>
            <span className="text-xs text-[#86868b]">/</span>
            <span className="px-4 py-1.5 rounded-full border border-purple-500/30 text-purple-400 bg-purple-500/10 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              Konsultan Business Intelligence & Corporate BI
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] max-w-5xl">
            Corporate Business Intelligence. <br />
            <span className="text-[#86868b]">Arsitektur Data Serverless Tanpa Biaya Server.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#86868b] max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Membangun arsitektur data terpusat, otomatisasi alur kerja Apps Script, dan konsolidasi KPI eksekutif dengan penghematan TCO 100% (<span className="text-white font-medium">Zero Server Cost</span>).
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16">
            <a href={getRouteHref('/')} onClick={(e) => scrollToSection(e, 'contact')} className="bg-emerald-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all cursor-pointer">Konsultasi Corporate BI</a>
            <a href="https://fastwork.id/user/iamikhsan/data-visualization-55978134?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#00b900]/20 transition-all cursor-pointer flex items-center justify-center gap-2">Pesan via Fastwork</a>
            <a href="https://fastwork.id/user/iamikhsan/excel-dashboard-53324531?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#00b900]/20 transition-all cursor-pointer flex items-center justify-center gap-2">Pesan Otomasi Apps Script</a>
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">{lang === 'en' ? 'Return to Main Portfolio' : 'Kembali ke Portofolio Utama'}</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mx-auto border-t border-white/10 pt-10">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-purple-400 mb-1">100%</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Zero Server Cost TCO</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-emerald-400 mb-1">5 Channel</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Konsolidasi 1 Cockpit</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-blue-400 mb-1">&lt; 5 Detik</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Kecepatan Sync Pipeline</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-32 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Spesialisasi Corporate BI</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">Solusi Arsitektur Business Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 font-bold">01</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Single Source of Truth Architecture</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Menghilangkan isolasi data (*data silos*) antar divisi dengan mengintegrasikan seluruh log operasional ke satu database terpusat.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Data Integration</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Single Source</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 font-bold">02</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Automated Formal PDF Reporting</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Penjadwalan pengiriman laporan formal format PDF A4 secara otomatis ke email direksi dan Drive tanpa rekap manual.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">PDF Automation</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">Google Drive Sync</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 font-bold">03</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Executive Approval Workflow Engine</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Sistem persetujuan bertingkat (*multi-stage approval*) untuk pesanan pembelian (PO), pengeluaran biaya, dan perubahan status operasional.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-blue-300 font-medium">Approval Engine</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-blue-300 font-medium">Governance</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400 font-bold">04</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Role-Based Access Control (RBAC)</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Pengaturan hak akses ketat berdasarkan peran pengguna (Admin, Direksi, Manajer, Staf Gudang) untuk keamanan data perusahaan.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-amber-300 font-medium">RBAC Security</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-amber-300 font-medium">Google Auth</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )}

    {/* PREDICTIVE ANALYTICS & AI MACHINE LEARNING LANDING PAGE VIEW */}
    {currentRoute === "/services/machine-learning-ai" && (
      <div className="pt-28 pb-16">
        <div className="ambient-glow"></div>
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="text-xs text-[#86868b] hover:text-white transition">{lang === 'en' ? 'Home' : 'Utama'}</a>
            <span className="text-xs text-[#86868b]">/</span>
            <span className="px-4 py-1.5 rounded-full border border-purple-500/30 text-purple-400 bg-purple-500/10 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              Predictive Analytics & Enterprise AI Consultant
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] max-w-5xl">
            Machine Learning & AI Analytics. <br />
            <span className="text-[#86868b]">Prediksi Omzet & Presisi Strategi Bisnis.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#86868b] max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Memanfaatkan pemodelan skrip Python canggih (<span className="text-white font-medium">Pandas, Scikit-learn, PyTorch</span>) untuk <span className="text-white font-medium">Sales Forecasting</span>, <span className="text-white font-medium">Customer Churn Prediction</span>, segmentasi RFM, dan integrasi Enterprise AI.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16">
            <a href={getRouteHref('/')} onClick={(e) => scrollToSection(e, 'contact')} className="bg-emerald-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all cursor-pointer">Konsultasi Machine Learning & AI</a>
            <a href="https://fastwork.id/user/iamikhsan/machine-learning-10631626?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#00b900]/20 transition-all cursor-pointer flex items-center justify-center gap-2">Pesan Machine Learning (Terverifikasi & Ulasan Klien)</a>
            <a href="https://fastwork.id/user/iamikhsan/data-science-69848195?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#00b900]/20 transition-all cursor-pointer flex items-center justify-center gap-2">Pesan Data Science & Predictive</a>
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">{lang === 'en' ? 'Return to Main Portfolio' : 'Kembali ke Portofolio Utama'}</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mx-auto border-t border-white/10 pt-10">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-purple-400 mb-1">94.5%</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Skor Akurasi Prediksi Sales</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-emerald-400 mb-1">3x</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Peningkatan Konversi RFM</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl text-center">
              <p className="text-3xl font-extrabold text-blue-400 mb-1">0%</p>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">Penumpukan Dead Stock</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-32 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Spesialisasi Machine Learning & AI</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">Solusi Predictive Analytics Enterprise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 font-bold">01</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Predictive Sales & Revenue Forecasting</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Pemodelan algoritma regresi time-series untuk memprediksi volume omzet penjualan bulan depan berdasarkan tren histori dan musiman.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Sales Forecast</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-purple-300 font-medium">Time-Series ML</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-rose-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 text-rose-400 font-bold">02</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Customer Churn Prediction Engine</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Mendeteksi potensi pelanggan yang akan pindah ke kompetitor sebelum mereka pergi dengan pemodelan klasifikasi perilaku transaksi.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-rose-300 font-medium">Churn Analytics</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-rose-300 font-medium">Scikit-learn</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 font-bold">03</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">RFM Customer Segmentation</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Memetakan profil pelanggan berdasarkan Recency, Frequency, dan Monetary (RFM) untuk penawaran promosi yang sangat personal.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">RFM Analysis</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-emerald-300 font-medium">Clustering</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 font-bold">04</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">LLM & Chat With Your Data Engine</h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">Integrasi kecerdasan buatan (AI/LLM) untuk memungkinkan manajer berdiskusi dan menanyakan wawasan bisnis langsung ke database secara alami.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-cyan-300 font-medium">Enterprise AI</span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-cyan-300 font-medium">Chat With Data</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )}

    {/* FULL 6-STAGE CASE STUDIES GALLERY LANDING PAGE VIEW */}
    {currentRoute === "/case-studies" && (
      <div className="pt-28 pb-16">
        <div className="ambient-glow"></div>
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="text-xs text-[#86868b] hover:text-white transition">{lang === 'en' ? 'Home' : 'Utama'}</a>
            <span className="text-xs text-[#86868b]">/</span>
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
              {lang === 'en' ? '6-Stage Case Studies Archive (MBB Standard)' : 'Arsip Studi Kasus 6-Tahap MBB Standard'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight max-w-5xl">
            {lang === 'en' ? 'Data Analytics Case Studies.' : 'Studi Kasus Analisis Data.'}
            <span className="block text-lg sm:text-xl md:text-4xl lg:text-5xl text-[#86868b] font-semibold tracking-normal mt-4 leading-snug">
              Problem → Data → Analysis → Dashboard → Insight → ROI Impact.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#86868b] max-w-3xl mx-auto font-light leading-relaxed mb-10">
            {lang === 'en' 
              ? 'Deep-dive exploration of how 10 data analytics and BI dashboard projects helped enterprises eliminate operational bottlenecks, save server costs, and accelerate executive decision-making.'
              : 'Eksplorasi mendalam bagaimana 10 proyek analitik data dan dashboard BI membantu perusahaan mengeliminasi bottleneck operasional, menghemat biaya server, dan mempercepat pengambilan keputusan eksekutif.'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href={getRouteHref('/')} onClick={(e) => scrollToSection(e, 'contact')} className="bg-emerald-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all cursor-pointer">{lang === 'en' ? 'Consult Your Case Study' : 'Konsultasi Studi Kasus Anda'}</a>
            <a href={getRouteHref('/')} onClick={(e) => { e.preventDefault(); navigateRoute('/'); }} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">{lang === 'en' ? 'Return to Main Portfolio' : 'Kembali ke Beranda Utama'}</a>
          </div>
        </section>

        {/* Portfolio Case Studies Grid */}
        <section className="py-20 md:py-24 lg:py-32 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portofolio.map((item) => {
              const kat = (item.kategori || '').toLowerCase();
              const fastworkUrl = kat.includes('power bi') || kat.includes('tableau') || kat.includes('dashboard')
                ? "https://fastwork.id/user/iamikhsan/data-analysis-84856158?source=seller-center_my-service"
                : kat.includes('machine learning') || kat.includes('ai')
                ? "https://fastwork.id/user/iamikhsan/machine-learning-10631626?source=seller-center_my-service"
                : kat.includes('corporate bi') || kat.includes('business intelligence')
                ? "https://fastwork.id/user/iamikhsan/data-visualization-55978134?source=seller-center_my-service"
                : kat.includes('data science') || kat.includes('predictive')
                ? "https://fastwork.id/user/iamikhsan/data-science-69848195?source=seller-center_my-service"
                : kat.includes('apps script') || kat.includes('sheets') || kat.includes('excel')
                ? "https://fastwork.id/user/iamikhsan/excel-dashboard-53324531?source=seller-center_my-service"
                : "https://fastwork.id/user/iamikhsan/data-analysis-59830902?source=seller-center_my-service";

              return (
                <div key={item.id} className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
                      <img src={resolveAssetUrl(item.linkGambar)} alt={`Studi Kasus Analisis Data ${item.judul} - ${item.kategori}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <a 
                        href={fastworkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="absolute top-3 left-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-[#141416]/90 backdrop-blur-md text-white border border-white/20 shadow-lg hover:bg-white/20 transition-all cursor-pointer"
                        title={`Pesan Layanan Kategori ${item.kategori} di Fastwork`}
                      >
                        {item.kategori} ↗
                      </a>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors">
                      {item.seoTitle}
                    </h3>

                    <p className="text-sm sm:text-base text-[#86868b] font-medium mb-3">{lang === 'en' ? 'Client:' : 'Klien:'} {item.klien}</p>
                    <p className="text-sm sm:text-base text-[#86868b] leading-relaxed mb-4 line-clamp-3">{item.deskripsi}</p>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-5">
                      <p className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider mb-0.5">{item.metrikLabel}</p>
                      <p className="text-lg font-extrabold text-emerald-400">{item.metrikNilai}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button onClick={() => setSelectedCaseStudy(item)} className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-normal transition-all duration-300 cursor-pointer">
                      {lang === 'en' ? 'Read Case Study (6-Stage Deep-Dive)' : 'Baca Case Study (6-Stage Deep-Dive)'}
                    </button>
                    <a 
                      href={fastworkUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] hover:bg-[#00b900]/20 text-center font-semibold text-xs sm:text-sm tracking-normal transition-all cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Order Category Service on Fastwork' : 'Pesan Jasa Kategori Ini di Fastwork'}</span>
                      <span className="text-sm font-bold leading-none">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    )}

    {/* DEFAULT HOMEPAGE VIEW */}
    {(currentRoute === "/" || currentRoute === "" || currentRoute === "#/") && (
      <>
    {/* 1. HERO SECTION */}
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-6 relative z-10 pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-16">
        <div className="ambient-glow"></div>
        
        <span className="px-5 py-2 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm">
            Data Analytics & Business Intelligence
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.08]">
            Data-Driven Decisions. <br/>
            <span className="text-[#86868b]">{lang === 'en' ? 'No Longer Guesses.' : 'Bukan Lagi Tebakan.'}</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto font-light leading-relaxed mt-4 mb-10">
            {lang === 'en' 
              ? 'Transforming millions of raw data rows into Interactive Executive Dashboards, Machine Learning Predictive Models, and Executive-Ready Strategic Reports.'
              : 'Mengubah jutaan baris data mentah menjadi Executive Dashboard Interaktif, Prediksi Bisnis berbasis Machine Learning, dan Laporan Strategis yang siap dieksekusi oleh manajemen.'
            }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-24 w-full sm:w-auto px-4 sm:px-0">
            <a href={getRouteHref('/')} onClick={(e) => scrollToSection(e, 'showcase')} className="bg-[#f5f5f7] text-black px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform cursor-pointer text-center">{lang === 'en' ? 'View Projects' : 'Lihat Proyek'}</a>
            <a href={getRouteHref('/')} onClick={(e) => scrollToSection(e, 'contact')} className="bg-transparent border border-white/20 text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white/5 transition-colors cursor-pointer text-center">{lang === 'en' ? 'Free Consultation' : 'Konsultasi Gratis'}</a>
        </div>
        
        {/* Tech Stack Marquee (Inserted Here) */}
        <div className="w-full max-w-5xl mx-auto mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
            <p className="text-xs uppercase tracking-[0.2em] text-[#86868b] mb-6 font-semibold">{lang === 'en' ? 'Technologies Used' : 'Teknologi yang Digunakan'}</p>
            <div className="tech-marquee-wrapper">
                <div className="tech-marquee">
                    {/* Original Set */}
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_Apps_Script.svg/1280px-Google_Apps_Script.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20221103122014" alt="Logo Google Apps Script - Serverless Backend Engine" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Apps Script</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968557.png" alt="Logo Google Sheets - Database & Spreadsheets Infrastructure" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Google Sheets</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="-11.5 -10.232 23 20.463" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><circle r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
                        <span className="text-sm font-medium">React 19</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="0 0 256 154" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#06B6D4"/></svg>
                        <span className="text-sm font-medium">Tailwind v4</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://images.icon-icons.com/2415/PNG/512/typescript_plain_logo_icon_146316.png" alt="Logo TypeScript - Pemrograman Frontend Single Page Application" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">TypeScript</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png" alt="Logo HTML5 - Standard Markup Semantik" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">HTML5</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968242.png" alt="Logo CSS3 - Styling Glassmorphism & UI Responsif" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">CSS3</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/960px-New_Power_BI_Logo.svg.png?_=20210102182532" alt="Logo Microsoft Power BI - Platform Visualisasi Data Eksekutif" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Power BI</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png" alt="Logo Tableau - Enterprise Business Intelligence Software" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Tableau</span>
                    </div>
                    
                    {/* Duplicated Set for Infinite Scroll */}
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_Apps_Script.svg/1280px-Google_Apps_Script.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20221103122014" alt="Logo Google Apps Script - Serverless Backend Engine" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Apps Script</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968557.png" alt="Logo Google Sheets - Database & Spreadsheets Infrastructure" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Google Sheets</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="-11.5 -10.232 23 20.463" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><circle r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
                        <span className="text-sm font-medium">React 19</span>
                    </div>
                    <div className="tech-icon-box">
                        <svg viewBox="0 0 256 154" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#06B6D4"/></svg>
                        <span className="text-sm font-medium">Tailwind v4</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://images.icon-icons.com/2415/PNG/512/typescript_plain_logo_icon_146316.png" alt="Logo TypeScript - Pemrograman Frontend Single Page Application" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">TypeScript</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png" alt="Logo HTML5 - Standard Markup Semantik" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">HTML5</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968242.png" alt="Logo CSS3 - Styling Glassmorphism & UI Responsif" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">CSS3</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/960px-New_Power_BI_Logo.svg.png?_=20210102182532" alt="Logo Microsoft Power BI - Platform Visualisasi Data Eksekutif" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Power BI</span>
                    </div>
                    <div className="tech-icon-box">
                        <img src="https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png" alt="Logo Tableau - Enterprise Business Intelligence Software" className="w-6 h-6 object-contain" />
                        <span className="text-sm font-medium">Tableau</span>
                    </div>
                </div>
            </div>
        </div>

    </section>

    {/* 2. SHOWCASE (Stacked Cards) */}
    <section id="showcase" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">{lang === 'en' ? 'Transformational Portfolio.' : 'Karya Transformasional.'}</h2>
            <p className="text-[#86868b] mt-4 text-sm sm:text-base md:text-lg">{lang === 'en' ? 'Empirical proof of efficiency using modern BI & data architecture.' : 'Bukti nyata efisiensi menggunakan arsitektur modern.'}</p>
        </div>

        <div className="cards-container relative pb-16 space-y-6">
            
            
            {isLoadingPortofolio ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-[#86868b] animate-pulse">{lang === 'en' ? 'Loading portfolio data...' : 'Memuat data portofolio...'}</p>
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
                        <div key={item.id} className="project-card md:sticky md:top-24 pt-4 pb-4" style={{ zIndex: index + 10 }}>
                            <div className={`card-inner w-full rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] ${index % 2 !== 0 ? 'bg-[#121214]' : 'bg-[#0a0a0c]'} overflow-hidden flex flex-col md:flex-row relative origin-top`}>
                                <div className="w-full md:w-[62%] p-6 sm:p-8 md:p-10 flex flex-col justify-between z-10">
                                    <div>
                                        {/* Badge Section */}
                                        <div className="flex items-center gap-2.5 mb-3">
                                            <span className={`text-xs sm:text-sm font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full ${colorClass}`}>{item.kategori}</span>
                                        </div>
                                        
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 tracking-tight leading-tight">{item.judul}</h3>
                                        
                                        {/* Klien Info */}
                                        <p className="text-sm sm:text-base font-semibold text-[#86868b] uppercase tracking-wider mb-4">{lang === 'en' ? 'Client:' : 'Klien:'} {item.klien}</p>
                                        
                                        <p className="text-[#86868b] text-sm sm:text-base font-light leading-relaxed mb-5">
                                            <span className="text-white font-medium">{item.highlight}</span> {item.deskripsi}
                                        </p>
                                        
                                        {/* Fitur Inti List */}
                                        <div>
                                            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/50 mb-2.5">{lang === 'en' ? 'Core Implemented Features:' : 'Fitur Inti yang Diimplementasikan:'}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {item.fitur.map((f, i) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <svg className={`w-5 h-5 shrink-0 mt-0.5 ${svgColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                        <p className="text-sm sm:text-base text-[#f5f5f7]">{f}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                                        <div>
                                            <p className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-0.5 ${gradientClass}`}>{item.metrikNilai}</p>
                                            <p className="text-xs sm:text-sm font-semibold text-[#86868b] tracking-wide uppercase">{item.metrikLabel}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                                            <button
                                                onClick={() => setSelectedCaseStudy(item)}
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                                            >
                                                <span>{lang === 'en' ? 'Read Case Study (6-Stage Deep-Dive)' : 'Baca Case Study (6-Stage Deep-Dive)'}</span>
                                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                            </button>
                                            {/* Tech Stack minimal */}
                                            <div className="flex flex-wrap gap-1.5 justify-end max-w-[240px]">
                                                {item.techStack.map((tech, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-[#86868b]">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[38%] min-h-[220px] md:min-h-full relative overflow-hidden bg-black/50 p-6 sm:p-8 md:p-10 cursor-pointer group">
                                    <div className="w-full h-full min-h-[200px] rounded-2xl overflow-hidden relative shadow-xl border border-white/5">
                                        <img src={resolveAssetUrl(item.linkGambar)} alt={`Tampilan Visualisasi Dashboard ${item.judul} oleh Ikhsan Kamal`} className="absolute inset-0 w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105 opacity-85" />
                                        
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
    <section id="social-proof" className="py-20 md:py-24 lg:py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
            
            {/* Client Marquee */}
            <div className="text-center mb-10 md:mb-20 social-anim">
                <p className="text-xs uppercase tracking-[0.2em] text-[#86868b] mb-8 font-semibold">Telah Dipercaya Oleh Lembaga Negara & Enterprise</p>
                <div className="tech-marquee-wrapper">
                    <div className="tech-marquee flex items-center">
                        {/* First Set */}
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://zonalogo.com/assets/logo-pertamina.webp?asset=888" alt="Logo Pertamina - Klien Enterprise Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Pertamina</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/3840px-Bank_Central_Asia.svg.png" alt="Logo Bank Central Asia (BCA) - Klien Perbankan Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Central Asia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BI_Logo_%28cropped%29.png/250px-BI_Logo_%28cropped%29.png" alt="Logo Bank Indonesia (BI) - Klien Lembaga Negara Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Indonesia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_kementerian_keuangan_republik_indonesia.png" alt="Logo Kementerian Keuangan RI - Klien Pemerintahan Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Keuangan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Logo_Kementerian_Kehutanan_RI_%282024%29_%28cropped%29.png" alt="Logo Kementerian Kehutanan RI - Klien Pemerintahan Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Kehutanan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/BMG_2003.png" alt="Logo BMKG Indonesia - Klien Lembaga Negara Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">BMKG</span>
                        </div>

                        {/* Duplicated Set for Infinite Loop */}
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://zonalogo.com/assets/logo-pertamina.webp?asset=888" alt="Logo Pertamina - Klien Enterprise Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Pertamina</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/3840px-Bank_Central_Asia.svg.png" alt="Logo Bank Central Asia (BCA) - Klien Perbankan Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Central Asia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BI_Logo_%28cropped%29.png/250px-BI_Logo_%28cropped%29.png" alt="Logo Bank Indonesia (BI) - Klien Lembaga Negara Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Bank Indonesia</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_kementerian_keuangan_republik_indonesia.png" alt="Logo Kementerian Keuangan RI - Klien Pemerintahan Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Keuangan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Logo_Kementerian_Kehutanan_RI_%282024%29_%28cropped%29.png" alt="Logo Kementerian Kehutanan RI - Klien Pemerintahan Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">Kementerian Kehutanan</span>
                        </div>
                        <div className="tech-icon-box bg-white/5 border border-white/10 px-6 py-3.5 rounded-full flex items-center gap-3.5 shrink-0 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/BMG_2003.png" alt="Logo BMKG Indonesia - Klien Lembaga Negara Ikhsan Kamal" className="h-7 w-auto object-contain" />
                            <span className="text-sm font-bold tracking-wide text-white">BMKG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials (Bento Style - Anonymized Enterprise NDA Verified Reviews) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                {/* Testi 1 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] social-anim relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <svg className="w-10 h-10 text-emerald-500/30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                        <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {lang === 'en' ? 'Verified Client · NDA Protected' : 'Klien Terverifikasi · NDA Protected'}
                        </span>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-[#f5f5f7] font-light leading-relaxed mb-8 relative z-10">
                        {lang === 'en' ? (
                            <>"This system completely transformed how our warehouse operates. Reports that usually took 3 days are now delivered in real-time. Best of all, we <span className="text-white font-semibold">pay zero monthly server fees</span>."</>
                        ) : (
                            <>"Sistem ini mengubah total cara gudang kami beroperasi. Laporan yang biasanya memakan waktu 3 hari sekarang tersaji secara real-time. Yang paling luar biasa, kami <span className="text-white font-semibold">tidak membayar biaya server sepeserpun</span> setiap bulannya."</>
                        )}
                    </p>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <span className="text-emerald-400 font-bold text-sm tracking-wider">OM</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-base sm:text-lg">Operations Manager</h4>
                            <p className="text-[#86868b] text-sm sm:text-base">Retail &amp; Logistics Enterprise</p>
                        </div>
                    </div>
                </div>

                {/* Testi 2 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] social-anim relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <svg className="w-10 h-10 text-blue-500/30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                        <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            {lang === 'en' ? 'Verified Client · NDA Protected' : 'Klien Terverifikasi · NDA Protected'}
                        </span>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-[#f5f5f7] font-light leading-relaxed mb-8 relative z-10">
                        {lang === 'en' ? (
                            <>"It is rare to find a consultant who truly understands <span className="text-white font-semibold">business intelligence &amp; web development</span> together. The HR portal built is fast, secure, and seamlessly integrated into Google Workspace."</>
                        ) : (
                            <>"Sangat jarang menemukan solusi yang paham betul <span className="text-white font-semibold">proses bisnis (BI) sekaligus mahir dalam Web Development</span>. Portal HR yang dibangun sangat responsif, aman, dan integrasinya dengan Google Workspace sangat mulus."</>
                        )}
                    </p>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <span className="text-blue-400 font-bold text-sm tracking-wider">VP</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-base sm:text-lg">VP of Human Capital</h4>
                            <p className="text-[#86868b] text-sm sm:text-base">Financial Services &amp; Holdings Group</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* 2.4 SPESIALISASI LAYANAN & ARSITEKTUR DATA */}
    <section id="services" className="py-20 md:py-24 lg:py-32 relative bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-20">
                <span className="text-emerald-500 font-bold text-xs tracking-[0.2em] uppercase mb-4 block">{lang === 'en' ? 'Services & Data Architecture' : 'Spesialisasi Layanan & Arsitektur Data'}</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Executive Dashboard &<br/>
                    <span className="text-[#86868b]">Predictive Analytics (Machine Learning).</span>
                </h2>
                <p className="text-[#86868b] mt-4 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light">
                    {lang === 'en' ? 'Transforming millions of raw data rows into tactical Insights grounded in actual Data-Driven Decision Making.' : <>Mengubah jutaan baris data mentah (<span className="text-white font-medium">raw data</span>) perusahaan Anda menjadi wawasan taktis berlandaskan data aktual (<span className="text-white font-medium">Data-Driven Decision Making</span>).</>}
                </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-20">
                {/* Service 1 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.12)', backdropFilter: 'blur(20px)'}}>
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="1.8"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3M21 19c0 1.66-4.03 3-9 3s-9-1.34-9-3M3 5v14M21 5v14"/></svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Data Cleansing & ETL Pipeline</h3>
                        <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-6">
                            {lang === 'en' ? 'Cleansing, standardization, and consolidation of data from multiple sources (Google Sheets, MS Excel, MySQL, CRM, ERP, or POS) into valid, deduplicated rational formats.' : <>Pembersihan, standarisasi, dan konsolidasi data dari berbagai sumber (<span className="text-white/80 font-medium">Google Sheets, MS Excel, Database MySQL, CRM, ERP, atau POS Kasir</span>) menjadi format rasional yang valid dan bebas duplikasi.</>}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-400/90 tracking-wide" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.1)'}}>Analytics Engineer</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-400/90 tracking-wide" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.1)'}}>SQL Data Analyst</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-400/90 tracking-wide" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.1)'}}>MS Excel & Spreadsheets</span>
                        </div>
                        <a href="https://fastwork.id/user/iamikhsan/data-analysis-59830902?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-emerald-400 hover:text-emerald-300 transition-colors mt-4">{lang === 'en' ? 'Order Data Analysis Service (Verified & Client Reviews) →' : 'Pesan Jasa Analisis Data (Terverifikasi & Ulasan Klien) →'}</a>
                    </div>
                </div>

                {/* Service 2 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.12)', backdropFilter: 'blur(20px)'}}>
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="1.8"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 9h18M9 21V9M14 15l2-2 3 3"/></svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Power BI, Tableau & Web App Dashboards</h3>
                        <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-6">
                            {lang === 'en' ? 'Enterprise Power BI Data Visualization & Dashboard development to monitor critical metrics such as Sales Performance, Inventory Tracking, Financial Cash Flow, to Marketing ROI in a single interactive view.' : <>Pengembangan Data Visualization & Dashboard Power BI tingkat korporat untuk memantau metrik krusial seperti <span className="text-white/80 font-medium">Sales Performance, Inventory Tracking, Financial Cash Flow, hingga Marketing ROI</span> dalam satu layar interaktif.</>}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-blue-400/90 tracking-wide" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.1)'}}>Dashboard Power BI</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-blue-400/90 tracking-wide" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.1)'}}>Tableau</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-blue-400/90 tracking-wide" style={{background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.1)'}}>Power BI Consultant</span>
                        </div>
                        <a href="https://fastwork.id/user/iamikhsan/data-analysis-84856158?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-blue-400 hover:text-blue-300 transition-colors mt-4">{lang === 'en' ? 'Order Power BI & Tableau Dashboard →' : 'Pesan Dashboard Power BI & Tableau →'}</a>
                    </div>
                </div>

                {/* Service 3 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.12)', backdropFilter: 'blur(20px)'}}>
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 2a4 4 0 00-4 4c0 1.9 1.3 3.5 3 3.9V13h2V9.9c1.7-.4 3-2 3-3.9a4 4 0 00-4-4zM6 14a3 3 0 100 6 3 3 0 000-6zm12 0a3 3 0 100 6 3 3 0 000-6zM8.5 16h7"/></svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Data Science & Predictive Analytics (ML)</h3>
                        <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-4">
                            {lang === 'en' ? 'Python Data Analyst services combining Machine Learning algorithms (Pandas, Scikit-learn) for precise business Data Science strategies:' : <>Layanan Python Data Analyst mengombinasikan algoritma Machine Learning (<span className="text-white/80 font-medium">Pandas, Scikit-learn</span>) untuk strategi Data Science bisnis presisi:</>}
                        </p>
                        <ul className="space-y-2 text-sm sm:text-base text-[#f5f5f7]/80 mb-6">
                            <li className="flex items-start gap-2"><span className="text-purple-400/90 font-semibold shrink-0">Sales Forecasting:</span> {lang === 'en' ? 'Predicting future revenue & sales volumes.' : 'Prediksi volume omzet & penjualan di masa depan.'}</li>
                            <li className="flex items-start gap-2"><span className="text-purple-400/90 font-semibold shrink-0">RFM Segmentation:</span> {lang === 'en' ? 'Mapping customer profiles with highest purchasing power.' : 'Memetakan profil pelanggan dengan daya beli tertinggi.'}</li>
                            <li className="flex items-start gap-2"><span className="text-purple-400/90 font-semibold shrink-0">Churn Prediction:</span> {lang === 'en' ? 'Detecting customers at risk of switching to competitors.' : 'Mendeteksi potensi pelanggan yang akan pindah ke kompetitor.'}</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-purple-400/90 tracking-wide" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.1)'}}>Machine Learning</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-purple-400/90 tracking-wide" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.1)'}}>Data Science</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-purple-400/90 tracking-wide" style={{background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.1)'}}>Python Data Analyst</span>
                        </div>
                        <a href="https://fastwork.id/user/iamikhsan/machine-learning-10631626?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-purple-400 hover:text-purple-300 transition-colors mt-4">{lang === 'en' ? 'Order Machine Learning Model (Verified & Client Reviews) →' : 'Pesan Model Machine Learning (Terverifikasi & Ulasan Klien) →'}</a>
                    </div>
                </div>

                {/* Service 4 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition duration-300" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.12)', backdropFilter: 'blur(20px)'}}>
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Actionable Insights & Executive Reporting</h3>
                        <p className="text-[#86868b] text-sm sm:text-base leading-relaxed mb-6">
                            {lang === 'en' ? 'Delivery of comprehensive Business Analytics report documents containing hidden insights and strategic recommendations ready for executive board execution.' : <>Penyerahan dokumen laporan Business Analytics komprehensif berisi <span className="text-white/80 font-medium">hidden insights</span> dan rekomendasi langkah strategis yang siap dieksekusi oleh dewan direksi maupun manajer operasional.</>}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-400/90 tracking-wide" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.1)'}}>Business Analytics</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-400/90 tracking-wide" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.1)'}}>BI Consultant</span>
                            <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-400/90 tracking-wide" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.1)'}}>Full-Stack Developer</span>
                        </div>
                        <a href="https://fastwork.id/user/iamikhsan/data-visualization-55978134?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-amber-400 hover:text-amber-300 transition-colors mt-4">{lang === 'en' ? 'Order Business Intelligence Specialist →' : 'Pesan Business Intelligence Specialist →'}</a>
                    </div>
                </div>
            </div>

            {/* Target Industry Sectors */}
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-[#0a0a0c]">
                <div className="text-center mb-10">
                    <span className="text-emerald-500 font-bold text-xs tracking-[0.2em] uppercase mb-2 block">{lang === 'en' ? 'Relevant Solutions for Industry Sectors' : 'Solusi Relevan Untuk Sektor Industri'}</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{lang === 'en' ? 'Cross-Industry Experience.' : 'Pengalaman Lintas Industri.'}</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        </div>
                        <h4 className="text-white font-bold text-base sm:text-lg mb-1">Retail, F&B & E-Commerce</h4>
                        <p className="text-xs sm:text-sm font-semibold text-[#86868b]">{lang === 'en' ? 'POS Cashier, Stock & Sales' : 'POS Kasir, Stok & Sales'}</p>
                    </div>
                    <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1h2m4 0h2a1 1 0 001-1v-4a1 1 0 00-.293-.707l-3-3A1 1 0 0015.586 7H14v9a1 1 0 001 1h2"/></svg>
                        </div>
                        <h4 className="text-white font-bold text-base sm:text-lg mb-1">{lang === 'en' ? 'Distribution & Supply Chain' : 'Distribusi & Supply Chain'}</h4>
                        <p className="text-xs sm:text-sm font-semibold text-[#86868b]">FMCG, Logistik & Fleet</p>
                    </div>
                    <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"/></svg>
                        </div>
                        <h4 className="text-white font-bold text-base sm:text-lg mb-1">{lang === 'en' ? 'Finance & Banking' : 'Keuangan & Perbankan'}</h4>
                        <p className="text-xs sm:text-sm font-semibold text-[#86868b]">{lang === 'en' ? 'Cash Flow & Culture Telemetry' : 'Cash Flow & Telemetri Budaya'}</p>
                    </div>
                    <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/40 transition duration-300 group">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
                        </div>
                        <h4 className="text-white font-bold text-base sm:text-lg mb-1">Digital Marketing Agency</h4>
                        <p className="text-xs sm:text-sm font-semibold text-[#86868b]">ROI, Funnel & Lead Analytics</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* 2.5 WHY APPS SCRIPT */}
    <section id="why-apps-script" className="py-20 md:py-24 lg:py-32 relative bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-20">
                <span className="text-emerald-500 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 block">{lang === 'en' ? 'Key Reasons to Choose Our Architecture' : 'Alasan Utama Memilih Arsitektur Kami'}</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    {lang === 'en' ? <>Enterprise Applications.<br/><span className="text-[#86868b]">Zero Monthly Infrastructure Bills.</span></> : <>Aplikasi Enterprise.<br/><span className="text-[#86868b]">Tanpa Tagihan Infrastruktur Bulanan.</span></>}
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] feature-card">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3">Zero Server Cost</h3>
                    <p className="text-[#86868b] leading-relaxed text-sm sm:text-base">
                        {lang === 'en' ? 'Your system runs 100% on Google serverless infrastructure. Say goodbye to monthly AWS, Azure, or VPS backend hosting bills.' : 'Sistem Anda berjalan 100% di atas infrastruktur serverless Google. Ucapkan selamat tinggal pada biaya langganan AWS, Azure, atau VPS bulanan untuk hosting backend.'}
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] feature-card">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3">Native Integration</h3>
                    <p className="text-[#86868b] leading-relaxed text-sm sm:text-base">
                        {lang === 'en' ? 'Directly connected with the Google Workspace ecosystem. Generate PDFs in Drive, send emails via Gmail, and sync to Calendar without complex OAuth APIs.' : 'Terhubung langsung dengan ekosistem Google Workspace. Generate PDF di Drive, kirim email via Gmail, dan sync ke Calendar tanpa API otorisasi (OAuth) yang rumit.'}
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] feature-card">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3">Enterprise Security</h3>
                    <p className="text-[#86868b] leading-relaxed text-sm sm:text-base">
                        {lang === 'en' ? 'Enterprise-grade security. Your data never leaves your Google Drive domain, encrypted, and backed by Google native authorization.' : 'Keamanan sekelas perusahaan besar. Data Anda tidak pernah keluar dari Google Drive domain Anda, dienkripsi, dan memanfaatkan sistem otorisasi bawaan Google.'}
                    </p>
                </div>
            </div>
            
            <div className="text-center mt-12">
                <a href="https://fastwork.id/user/iamikhsan/excel-dashboard-53324531?source=seller-center_my-service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] px-8 py-4 rounded-full text-sm sm:text-base font-bold hover:bg-[#00b900]/20 transition-all cursor-pointer">
                    {lang === 'en' ? 'Order Google Sheets & Apps Script Automation on Fastwork →' : 'Pesan Otomasi Google Sheets & Apps Script di Fastwork →'}
                </a>
            </div>
        </div>
    </section>

    {/* 3. ALUR PENGERJAAN (Scroll Highlight) */}
    <section id="workflow" className="py-20 md:py-24 lg:py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
            {/* Pinned Title */}
            <div className="md:sticky top-1/3 h-fit">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4">{lang === 'en' ? <>Precision Working <br/>Process.</> : <>Proses Kerja <br/>yang Presisi.</>}</h2>
                <p className="text-[#86868b] text-sm sm:text-base md:text-lg">{lang === 'en' ? '5-stage professional consultancy workflow. Systematic, transparent, and driven by real business results.' : 'Alur kerja konsulansi profesional 5 tahap. Sistematis, transparan, dan berorientasi pada hasil bisnis nyata.'}</p>
            </div>
            
            {/* Scrolling Steps */}
            <div className="space-y-12 md:space-y-24 py-10 step-container">
                
                <div className={`step-item transition-all duration-500 border-l-2 pl-6 sm:pl-8 py-2 rounded-r-2xl ${activeWorkflowStep === 0 ? 'opacity-100 border-emerald-500 bg-emerald-500/[0.04] shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'opacity-25 border-white/10'}`}>
                    <span className={`font-bold text-xl mb-2 block transition-colors duration-500 ${activeWorkflowStep === 0 ? 'text-emerald-400 font-extrabold' : 'text-emerald-500/50'}`}>01. {lang === 'en' ? 'Business Requirements Audit' : 'Audit Kebutuhan Bisnis'}</span>
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-500 ${activeWorkflowStep === 0 ? 'text-white' : 'text-[#86868b]'}`}>{lang === 'en' ? 'Goals & KPI Metrics Discussion' : 'Diskusi Target & Metrik KPI'}</h3>
                    <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${activeWorkflowStep === 0 ? 'text-[#f5f5f7] font-normal' : 'text-[#86868b]/70 font-light'}`}>
                        {lang === 'en' ? 'In-depth discussion on key target Goals and KPI metrics to be achieved by your management.' : <>Diskusi mendalam mengenai target (<span className={activeWorkflowStep === 0 ? "text-emerald-300 font-semibold" : "text-white/40"}>Goals</span>) dan metrik utama (<span className={activeWorkflowStep === 0 ? "text-emerald-300 font-semibold" : "text-white/40"}>KPI</span>) yang ingin dicapai oleh manajemen atau perusahaan Anda.</>}
                    </p>
                </div>
                
                <div className={`step-item transition-all duration-500 border-l-2 pl-6 sm:pl-8 py-2 rounded-r-2xl ${activeWorkflowStep === 1 ? 'opacity-100 border-emerald-500 bg-emerald-500/[0.04] shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'opacity-25 border-white/10'}`}>
                    <span className={`font-bold text-xl mb-2 block transition-colors duration-500 ${activeWorkflowStep === 1 ? 'text-emerald-400 font-extrabold' : 'text-emerald-500/50'}`}>02. {lang === 'en' ? 'Data Injection & Evaluation' : 'Injeksi & Evaluasi Data'}</span>
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-500 ${activeWorkflowStep === 1 ? 'text-white' : 'text-[#86868b]'}`}>{lang === 'en' ? 'Multi-Source Data Integration' : 'Integrasi Multi-Sumber Data'}</h3>
                    <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${activeWorkflowStep === 1 ? 'text-[#f5f5f7] font-normal' : 'text-[#86868b]/70 font-light'}`}>
                        {lang === 'en' ? 'Extracting and evaluating raw data from your existing systems (Excel, Google Sheets, CRM, SQL, ERP, POS).' : <>Menarik dan mengevaluasi data mentah dari sistem Anda (<span className={activeWorkflowStep === 1 ? "text-emerald-300 font-semibold" : "text-white/40"}>Excel, Google Sheets, CRM, SQL, ERP, atau POS Kasir</span>).</>}
                    </p>
                </div>
                
                <div className={`step-item transition-all duration-500 border-l-2 pl-6 sm:pl-8 py-2 rounded-r-2xl ${activeWorkflowStep === 2 ? 'opacity-100 border-emerald-500 bg-emerald-500/[0.04] shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'opacity-25 border-white/10'}`}>
                    <span className={`font-bold text-xl mb-2 block transition-colors duration-500 ${activeWorkflowStep === 2 ? 'text-emerald-400 font-extrabold' : 'text-emerald-500/50'}`}>03. Data Engineering & ETL</span>
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-500 ${activeWorkflowStep === 2 ? 'text-white' : 'text-[#86868b]'}`}>{lang === 'en' ? 'Cleansing & Restructuring' : 'Cleansing & Restrukturisasi'}</h3>
                    <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${activeWorkflowStep === 2 ? 'text-[#f5f5f7] font-normal' : 'text-[#86868b]/70 font-light'}`}>
                        {lang === 'en' ? 'Data scrubbing, format standardization, duplicate handling, and relational table restructuring.' : 'Pembersihan data, standarisasi format, penanganan duplikasi, dan restrukturisasi tabel relasional komprehensif.'}
                    </p>
                </div>

                <div className={`step-item transition-all duration-500 border-l-2 pl-6 sm:pl-8 py-2 rounded-r-2xl ${activeWorkflowStep === 3 ? 'opacity-100 border-emerald-500 bg-emerald-500/[0.04] shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'opacity-25 border-white/10'}`}>
                    <span className={`font-bold text-xl mb-2 block transition-colors duration-500 ${activeWorkflowStep === 3 ? 'text-emerald-400 font-extrabold' : 'text-emerald-500/50'}`}>04. {lang === 'en' ? 'Modeling & Visual Architecture' : 'Pemodelan & Arsitektur Visual'}</span>
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-500 ${activeWorkflowStep === 3 ? 'text-white' : 'text-[#86868b]'}`}>{lang === 'en' ? 'Algorithms & Interactive Dashboards' : 'Algoritma & Dashboard Interaktif'}</h3>
                    <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${activeWorkflowStep === 3 ? 'text-[#f5f5f7] font-normal' : 'text-[#86868b]/70 font-light'}`}>
                        {lang === 'en' ? 'Building Machine Learning / BI logic algorithms and developing enterprise interactive dashboard interfaces.' : 'Pembangunan logika algoritma Machine Learning / BI serta pengembangan antarmuka dashboard interaktif tingkat korporat.'}
                    </p>
                </div>

                <div className={`step-item transition-all duration-500 border-l-2 pl-6 sm:pl-8 py-2 rounded-r-2xl ${activeWorkflowStep === 4 ? 'opacity-100 border-emerald-500 bg-emerald-500/[0.04] shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'opacity-25 border-white/10'}`}>
                    <span className={`font-bold text-xl mb-2 block transition-colors duration-500 ${activeWorkflowStep === 4 ? 'text-emerald-400 font-extrabold' : 'text-emerald-500/50'}`}>05. {lang === 'en' ? 'Strategic Handover & Delivery' : 'Penyerahan & Handover Strategis'}</span>
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-500 ${activeWorkflowStep === 4 ? 'text-white' : 'text-[#86868b]'}`}>{lang === 'en' ? 'Final Assets & Data Insight Guide' : 'Aset Akhir & Panduan Wawasan Data'}</h3>
                    <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${activeWorkflowStep === 4 ? 'text-[#f5f5f7] font-normal' : 'text-[#86868b]/70 font-light'}`}>
                        {lang === 'en' ? 'Delivery of final assets (Power BI/Tableau files, Apps Script Web App, Python scripts, Executive PDF) along with data insight interpretation guidelines.' : <>Pengiriman aset akhir (<span className={activeWorkflowStep === 4 ? "text-emerald-300 font-semibold" : "text-white/40"}>File Power BI/Tableau, Web App Apps Script, Skrip Python, PDF Eksekutif</span>) beserta panduan pembacaan wawasan data.</>}
                    </p>
                </div>
            </div>
        </div>
    </section>

    {/* 2.6 ABOUT THE EXPERT */}
    <section id="about" className="py-20 md:py-24 lg:py-32 relative bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="about-card glass-panel p-6 sm:p-8 md:p-16 rounded-2xl md:rounded-[3rem] relative flex flex-col md:flex-row gap-6 md:gap-12 items-center" itemScope itemType="https://schema.org/Person">
                
                {/* Ambient Glow inside the card */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Profile Photo */}
                <div className="w-full md:w-1/3 relative group z-10 shrink-0">
                    <div className="aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 relative shadow-2xl">
                        {/* Placeholder Photo: Ganti dengan foto profesional Anda */}
                        <img src="https://lh3.googleusercontent.com/d/184y2ZUwxJn1mXCgPtX_kuomeJaQ461zE=s1000" referrerPolicy="no-referrer" 
                             alt="Foto Profil Profesional Ikhsan Kamal - Spesialis Data Analytics & Konsultan Business Intelligence" 
                             itemProp="image"
                             className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition duration-700 ease-in-out transform group-hover:scale-105" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* Biography */}
                <div className="w-full md:w-2/3 z-10">
                    <div className="mb-2 flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-emerald-500"></div>
                        <span className="text-emerald-500 font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase">The Expert</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-3" itemProp="name">Ikhsan Kamal.</h2>
                    <p className="text-2xl sm:text-3xl text-white font-bold mb-8" itemProp="jobTitle">{lang === 'en' ? 'Data Analytics Specialist & Business Intelligence Consultant.' : 'Spesialis Data Analytics & Konsultan Business Intelligence.'}</p>
                    
                    <p className="text-[#86868b] text-sm sm:text-base md:text-lg leading-relaxed font-light mb-10">
                        {lang === 'en' 
                          ? <>Data Analytics Specialist & Business Intelligence Consultant based in Indonesia. As an independent consultant, I help enterprises transform millions of raw data rows into interactive Executive Dashboards, Machine Learning predictive models, and executive-ready strategic reports tracking KPIs and cutting operational inefficiencies in real-time.</>
                          : <>Spesialis <span className="text-white font-medium">Data Analytics</span> & <span className="text-white font-medium">Business Intelligence Consultant</span> berbasis di Indonesia. Sebagai konsultan independen, saya membantu perusahaan mengubah jutaan baris data mentah (<span className="text-white font-medium">raw data</span>) menjadi Executive Dashboard interaktif, pemodelan Machine Learning, dan laporan strategis yang melacak KPI serta menekan inefisiensi operasional secara real-time.</>
                        }
                    </p>

                    {/* Stats / Highlight */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                        <div>
                            <p className="text-4xl font-bold text-white mb-2 tracking-tighter">5<span className="text-emerald-500">+</span></p>
                            <p className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider">{lang === 'en' ? 'Years Experience' : 'Tahun Pengalaman'}</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-2 tracking-tighter">50<span className="text-emerald-500">+</span></p>
                            <p className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider">{lang === 'en' ? 'Enterprise Projects' : 'Proyek Skala Enterprise'}</p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-4xl font-bold text-white mb-2 tracking-tighter">100<span className="text-emerald-500">%</span></p>
                            <p className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider">{lang === 'en' ? 'Custom Systems' : 'Sistem Kustom'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
    {/* 4. PRICING */}
    <section id="pricing" className="py-20 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">{lang === 'en' ? 'Smart Investment.' : 'Investasi Cerdas.'}</h2>
                <p className="text-[#86868b] mt-4 text-sm sm:text-base md:text-lg">{lang === 'en' ? 'Choose the development package suited for your business system complexity.' : 'Pilih paket pengembangan sesuai kompleksitas sistem bisnis Anda.'}</p>
            </div>
            
            {isLoadingPaket ? (
                <div className="flex justify-center items-center h-64 w-full">
                    <p className="text-[#86868b] animate-pulse">{lang === 'en' ? 'Loading investment packages...' : 'Memuat data paket investasi...'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {paketHarga.map((paket) => {
                        const isEn = lang === 'en';
                        let subjudul = paket.subjudul;
                        let harga = paket.harga;
                        let fiturAktif = paket.fiturAktif;
                        let fiturInaktif = paket.fiturInaktif;
                        let teksTombol = paket.teksTombol;

                        if (isEn) {
                          if (paket.id === 'PKT-001' || paket.namaPaket.toLowerCase().includes('starter')) {
                            subjudul = "For small team operations.";
                            harga = "From 3M IDR";
                            fiturAktif = ["1-2 Connected Google Sheets", "Interactive Input Forms", "Automated Email Notifications"];
                            fiturInaktif = ["Executive BI Dashboard", "Multi-role Access"];
                            teksTombol = "Choose Starter";
                          } else if (paket.id === 'PKT-002' || paket.namaPaket.toLowerCase().includes('pro')) {
                            subjudul = "End-to-end business automation.";
                            harga = "From 7M IDR";
                            fiturAktif = ["Complex Database Sheets Architecture", "Premium Web App UI (Tailwind)", "Drive Integration & PDF Generator", "Multi-Level Approval Logic", "Handover Documentation"];
                            fiturInaktif = [];
                            teksTombol = "Choose Pro";
                          } else if (paket.id === 'PKT-003' || paket.namaPaket.toLowerCase().includes('enterprise')) {
                            subjudul = "Dashboards & External Integrations.";
                            harga = "Custom";
                            fiturAktif = ["React Front-end Development", "External API Connection (HRIS/ERP)", "Custom Looker Studio/Tableau BI", "User Authentication System", "3 Months Maintenance & Support"];
                            fiturInaktif = [];
                            teksTombol = "Contact Me";
                          }
                        }

                        return (
                          <div key={paket.id} className={`glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 ${paket.rekomendasi ? 'border-emerald-500/50 relative transform md:scale-105 z-10 bg-[#111] shadow-[0_0_50px_rgba(5,150,105,0.15)]' : ''}`}>
                              {paket.rekomendasi && (
                                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide">RECOMMENDED</div>
                              )}
                              <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${paket.rekomendasi ? 'text-emerald-400' : ''}`}>{paket.namaPaket}</h3>
                              <p className="text-[#86868b] mb-6 text-sm sm:text-base">{subjudul}</p>
                              <div className="mb-8">
                                  <span className="text-4xl font-bold">{harga}</span>
                              </div>
                              <ul className="space-y-4 mb-10 text-sm sm:text-base text-[#f5f5f7]">
                                  {fiturAktif.map((fitur, i) => (
                                      <li key={`aktif-${i}`} className="flex items-start gap-3"><span>✓</span> {fitur}</li>
                                  ))}
                                  {fiturInaktif.map((fitur, i) => (
                                      <li key={`inaktif-${i}`} className="flex items-start gap-3 text-[#86868b]"><span>—</span> {fitur}</li>
                                  ))}
                              </ul>
                              <div className="space-y-2 mt-auto">
                                <a href={getRouteHref('/')} className={`block w-full py-3 rounded-full text-center font-bold text-sm sm:text-base transition ${paket.rekomendasi ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'border border-white/20 hover:bg-white/10'}`}>
                                    {teksTombol}
                                </a>
                                <a 
                                  href={
                                    paket.namaPaket.toLowerCase().includes('basic') || paket.namaPaket.toLowerCase().includes('spreadsheet') 
                                      ? "https://fastwork.id/user/iamikhsan/excel-dashboard-53324531?source=seller-center_my-service"
                                      : paket.namaPaket.toLowerCase().includes('enterprise') || paket.namaPaket.toLowerCase().includes('custom')
                                      ? "https://fastwork.id/user/iamikhsan/machine-learning-10631626?source=seller-center_my-service"
                                      : "https://fastwork.id/user/iamikhsan/data-analysis-59830902?source=seller-center_my-service"
                                  } 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="block w-full py-2.5 rounded-full text-center font-bold text-sm sm:text-base bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] hover:bg-[#00b900]/20 transition cursor-pointer"
                                >
                                    {lang === 'en' ? 'Order on Fastwork →' : 'Pesan di Fastwork →'}
                                </a>
                              </div>
                          </div>
                        );
                    })}
                </div>
            )}
        </div>
    </section>


    {/* 5. FAQ */}
    <section id="faq" className="py-20 md:py-24 lg:py-32 relative bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">{lang === 'en' ? 'Frequently Asked Questions.' : 'Tanya Jawab.'}</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`faq-item group bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-colors ${activeFaq === index ? 'active' : ''}`}
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                        <button className="w-full px-6 py-5 flex justify-between items-center text-left">
                            <span className="font-bold text-xl sm:text-2xl">{faq.q}</span>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 faq-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </button>
                        <div className="faq-content bg-black/20 border-t border-white/5">
                            <p className="px-6 py-5 text-[#86868b] text-sm sm:text-base leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>

    {/* 6. CONTACT & BOOKING SYSTEM */}
    <section id="contact" className="py-20 md:py-24 lg:py-32 relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                
                {/* Left: Copy & Booking Info */}
                <div className="z-10">
                    <span className="text-emerald-500 font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 block">{lang === 'en' ? 'Start Collaboration' : 'Mulai Kolaborasi'}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">{lang === 'en' ? <>Automate your business <br/>today.</> : <>Otomatiskan bisnis <br/>Anda hari ini.</>}</h2>
                    <p className="text-[#86868b] text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed font-light max-w-lg">
                        {lang === 'en' ? <>Schedule a <span className="text-white font-medium">30-minute discovery call</span>. We will analyze your current workflow and map out the right system architecture—no commitment required.</> : <>Jadwalkan sesi <span className="text-white font-medium">discovery call (30 Menit)</span>. Kita akan membedah alur kerja Anda saat ini dan memetakan arsitektur sistem yang tepat—tanpa komitmen apapun.</>}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                        
                        {/* Direct Booking Button (Calendly style) */}
                        <a href="https://calendly.com/your-link" target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-emerald-400 transition-colors text-center">
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {lang === 'en' ? 'Calendar Booking' : 'Booking Kalender'}
                        </a>
                        {/* WhatsApp Button */}
                        <a href="https://wa.me/6282126574799" target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-[#20b958] transition-colors text-center">
                            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            WhatsApp
                        </a>
                        {/* Alternative Direct Email */}
                        <a href="mailto:iamikhsank@gmail.com" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-white/10 transition-colors text-center">
                            Email
                        </a>
                        
                    </div>

                    {/* Micro Info */}
                    <div className="space-y-3.5 text-sm sm:text-base text-[#86868b]">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-emerald-500/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>{lang === 'en' ? 'Based in Bandung, Indonesia (Available for Global Remote)' : 'Berbasis di Bandung, Indonesia (Tersedia Remote Global)'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-emerald-500/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{lang === 'en' ? 'Typical Response: 12-24 Hours' : 'Responsibilitas Tipikal: 12-24 Jam'}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/40 mr-1 block w-full sm:w-auto mb-1 sm:mb-0">{lang === 'en' ? 'Profile Platforms:' : 'Platform Profil:'}</span>
                            <a href="https://fastwork.id/user/iamikhsan" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] hover:bg-[#00b900]/20 transition">{lang === 'en' ? 'Fastwork Profile (6 Verified Services)' : 'Profil Fastwork (6 Jasa Terverifikasi)'}</a>
                            <a href="https://www.linkedin.com/in/ikhsankamal" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition">LinkedIn</a>
                            <a href="https://www.fiverr.com/iamikhsank" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition">Fiverr</a>
                            <a href="https://www.instagram.com/iamikhsank_" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition">Instagram</a>
                        </div>
                    </div>
                </div>

                {/* Right: Glass Form */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] relative z-10 form-anim">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider ml-1">{lang === 'en' ? 'Full Name' : 'Nama Lengkap'}</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-base" placeholder={lang === 'en' ? 'E.g.: Alex Turner' : 'Misal: Budi Santoso'} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider ml-1">{lang === 'en' ? 'Professional Email' : 'Email Profesional'}</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-base" placeholder={lang === 'en' ? 'alex@company.com' : 'budi@perusahaan.com'} />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider ml-1">{lang === 'en' ? 'WhatsApp Number' : 'Nomor WhatsApp'}</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-base" placeholder={lang === 'en' ? '081234567890' : 'Misal: 081234567890'} />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider ml-1">{lang === 'en' ? 'Service Category' : 'Kategori Kebutuhan'}</label>
                            <div className="relative">
                                <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#f5f5f7] focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-base appearance-none cursor-pointer">
                                    <option value="" disabled className="bg-zinc-900 text-gray-400">{lang === 'en' ? 'Select service type...' : 'Pilih jenis layanan...'}</option>
                                    <option value="bi" className="bg-zinc-900 text-white">Dashboard BI / Data Pipeline</option>
                                    <option value="webapp" className="bg-zinc-900 text-white">Web App Kustom (React/Tailwind)</option>
                                    <option value="automation" className="bg-zinc-900 text-white">Otomatisasi Apps Script / Workspace</option>
                                    <option value="other" className="bg-zinc-900 text-white">{lang === 'en' ? 'Others / General Consultation' : 'Lainnya / Konsultasi Umum'}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider ml-1">{lang === 'en' ? 'Briefly Describe Your Needs' : 'Ceritakan Singkat Kebutuhan Anda'}</label>
                            <textarea rows="4" name="message" value={formData.message} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#f5f5f7] placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-base resize-none" placeholder={lang === 'en' ? 'Currently our team spends 10 hours a week on manual data recap...' : 'Saat ini tim kami menghabiskan 10 jam seminggu untuk rekap data manual...'}></textarea>
                        </div>
                        {/* Success Message (Hidden by default) */}
                        <div id="success-msg" className={`${submitStatus === 'success' ? 'block' : 'hidden'} bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-sm sm:text-base text-center`}>
                            {lang === 'en' ? 'Thank you! Your message has been received. Redirecting to WhatsApp...' : 'Terima kasih! Pesan Anda telah diterima. Mengalihkan ke WhatsApp...'}
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#f5f5f7] text-black font-bold text-base sm:text-lg rounded-xl py-4 mt-2 hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:hover:scale-100">
                            {isSubmitting ? (lang === 'en' ? 'Sending...' : 'Mengirim...') : (lang === 'en' ? 'Send Inquiry' : 'Kirim Pertanyaan')}
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    </section>
    </>
    )}
    </main>

    <footer className="text-center pb-8 pt-8 text-[#86868b] text-sm border-t border-white/5">
        <p>{lang === 'en' ? '© 2026 Ikhsan K. Data Analytics Specialist & Business Intelligence Consultant.' : '© 2026 Ikhsan K. Spesialis Data Analytics & Konsultan Business Intelligence.'}</p>
    </footer>

    {/* 6-STAGE CASE STUDY INTERACTIVE GLASSMORPHISM MODAL DRAWER */}
    {selectedCaseStudy && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl transition-all duration-300 overflow-y-auto">
        <div className="relative w-full max-w-5xl bg-[#0a0a0c] border border-white/15 rounded-none sm:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-0 sm:my-8 max-h-[100vh] md:max-h-[90vh] flex flex-col">
          {/* Modal Header */}
          <div className="sticky top-0 z-20 px-6 md:px-8 py-5 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/10 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-[#141416]/90 backdrop-blur-md text-white border border-white/20 shadow-md">{selectedCaseStudy.kategori}</span>
                <span className="text-xs sm:text-sm font-semibold text-[#86868b]">{lang === 'en' ? 'Client:' : 'Klien:'} {selectedCaseStudy.klien}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">{selectedCaseStudy.seoTitle || selectedCaseStudy.judul}</h2>
            </div>
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-all shrink-0 cursor-pointer"
              aria-label="Tutup Case Study"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
            {/* Banner Image & High Impact Metric */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10 h-36 sm:h-48 md:h-64 relative bg-black">
                <img src={resolveAssetUrl(selectedCaseStudy.linkGambar)} alt={`Visualisasi Detail Studi Kasus ${selectedCaseStudy.judul}`} className="w-full h-full object-cover object-left-top" />
              </div>
              <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-400">{lang === 'en' ? 'ROI Results & Primary Impact' : 'Hasil ROI & Dampak Utama'}</p>
                <p className="text-3xl font-extrabold text-white tracking-tight">{selectedCaseStudy.metrikNilai}</p>
                <p className="text-xs sm:text-sm font-semibold text-[#86868b] uppercase tracking-wider">{selectedCaseStudy.metrikLabel}</p>
                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                  {selectedCaseStudy.techStack.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-xs sm:text-sm font-semibold text-white/80">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 6-Stage McKinsey/BCG Framework Grid */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-emerald-500"></div>
                <span className="text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">6-Stage Business Intelligence Case Study Breakdown</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stage 1: Problem */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-rose-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-rose-400">01. Problem ({lang === 'en' ? 'Business Challenge' : 'Tantangan Bisnis'})</span>
                    <span className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold flex items-center justify-center">1</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f5f5f7]/90 leading-relaxed font-light">{selectedCaseStudy.caseStudy?.problem || selectedCaseStudy.deskripsi}</p>
                </div>

                {/* Stage 2: Data */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400">02. Data (ETL & Ingesting)</span>
                    <span className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold flex items-center justify-center">2</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f5f5f7]/90 leading-relaxed font-light">{selectedCaseStudy.caseStudy?.data}</p>
                </div>

                {/* Stage 3: Analysis */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400">03. Analysis ({lang === 'en' ? 'Methodology & KPI' : 'Metodologi & KPI'})</span>
                    <span className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold flex items-center justify-center">3</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f5f5f7]/90 leading-relaxed font-light">{selectedCaseStudy.caseStudy?.analysis}</p>
                </div>

                {/* Stage 4: Dashboard */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-400">04. Dashboard ({lang === 'en' ? 'Visualization Features' : 'Fitur Visualisasi'})</span>
                    <span className="w-7 h-7 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold flex items-center justify-center">4</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f5f5f7]/90 leading-relaxed font-light">{selectedCaseStudy.caseStudy?.dashboard}</p>
                </div>

                {/* Stage 5: Insight */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-400">05. Insight (Hidden Insights)</span>
                    <span className="w-7 h-7 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold flex items-center justify-center">5</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f5f5f7]/90 leading-relaxed font-light">{selectedCaseStudy.caseStudy?.insight}</p>
                </div>

                {/* Stage 6: Business Impact */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400">06. Business Impact ({lang === 'en' ? 'ROI Value' : 'Nilai ROI'})</span>
                    <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center">6</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f5f5f7]/90 leading-relaxed font-light">{selectedCaseStudy.caseStudy?.businessImpact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-[#0a0a0c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-[#86868b]">{lang === 'en' ? 'Want to implement a similar system architecture for your enterprise?' : 'Ingin mengimplementasikan arsitektur sistem serupa untuk perusahaan Anda?'}</p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={
                  (selectedCaseStudy.kategori || '').toLowerCase().includes('power bi') || (selectedCaseStudy.kategori || '').toLowerCase().includes('tableau') || (selectedCaseStudy.kategori || '').toLowerCase().includes('dashboard')
                    ? "https://fastwork.id/user/iamikhsan/data-analysis-84856158?source=seller-center_my-service"
                    : (selectedCaseStudy.kategori || '').toLowerCase().includes('machine learning') || (selectedCaseStudy.kategori || '').toLowerCase().includes('ai')
                    ? "https://fastwork.id/user/iamikhsan/machine-learning-10631626?source=seller-center_my-service"
                    : (selectedCaseStudy.kategori || '').toLowerCase().includes('corporate bi') || (selectedCaseStudy.kategori || '').toLowerCase().includes('business intelligence')
                    ? "https://fastwork.id/user/iamikhsan/data-visualization-55978134?source=seller-center_my-service"
                    : (selectedCaseStudy.kategori || '').toLowerCase().includes('data science') || (selectedCaseStudy.kategori || '').toLowerCase().includes('predictive')
                    ? "https://fastwork.id/user/iamikhsan/data-science-69848195?source=seller-center_my-service"
                    : (selectedCaseStudy.kategori || '').toLowerCase().includes('apps script') || (selectedCaseStudy.kategori || '').toLowerCase().includes('sheets') || (selectedCaseStudy.kategori || '').toLowerCase().includes('excel')
                    ? "https://fastwork.id/user/iamikhsan/excel-dashboard-53324531?source=seller-center_my-service"
                    : "https://fastwork.id/user/iamikhsan/data-analysis-59830902?source=seller-center_my-service"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#00b900]/10 border border-[#00b900]/40 text-[#25D366] font-bold text-sm sm:text-base hover:bg-[#00b900]/20 transition-all text-center cursor-pointer"
              >
                {lang === 'en' ? 'Order This Category Service on Fastwork →' : 'Pesan Jasa Kategori Ini di Fastwork →'}
              </a>
              <a
                href={`https://wa.me/6282126574799?text=Halo%20Ikhsan,%20saya%20tertarik%20dengan%20Case%20Study%20${encodeURIComponent(selectedCaseStudy.judul)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-500 text-black font-bold text-sm sm:text-base hover:bg-emerald-400 transition-all hover:scale-105 text-center cursor-pointer"
              >
                {lang === 'en' ? 'Discuss via WhatsApp' : 'Diskusi via WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </div>
    )}
    
    </div>
  );
}
