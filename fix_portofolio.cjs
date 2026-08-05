const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add Type Definition
const typeDef = `
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
`;

code = code.replace(/import { useGSAP } from "@gsap\/react";\n/, `import { useGSAP } from "@gsap/react";\n${typeDef}\n`);

// Add State
const stateDef = `
  const [portofolio, setPortofolio] = useState<PortofolioItem[]>([]);
  const [isLoadingPortofolio, setIsLoadingPortofolio] = useState(true);

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
            id: "PRJ-001",
            kategori: "Sistem Inventaris",
            warnaKategori: "emerald",
            judul: "Inventory Control.",
            klien: "Retail & Distribusi Nasional",
            highlight: "Real-time warehouse management with zero backend cost.",
            deskripsi: "Sistem manajemen gudang real-time yang menggunakan Google Sheets sebagai database utama, dibalut dengan antarmuka web modern untuk staf lapangan.",
            fitur: ["Integrasi Barcode & QR Code Scanner via Kamera", "Alert Reorder Point Otomatis (Email/WhatsApp)", "Tracking Mutasi Stok Multi-Gudang (FIFO)", "Role-based Access Control (Admin vs Staf Gudang)"],
            metrikNilai: "100%",
            metrikLabel: "Pengurangan Biaya Server",
            linkGambar: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "Google Sheets", "React"]
          },
          {
            id: "PRJ-002",
            kategori: "CRUD Layanan",
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
          },
          {
            id: "PRJ-003",
            kategori: "Data Pipeline & BI",
            warnaKategori: "purple",
            judul: "Custom Dashboard BI.",
            klien: "FMCG Enterprise",
            highlight: "Menyulap ribuan baris data mentah menjadi wawasan bisnis.",
            deskripsi: "Data pipeline dari berbagai cabang dikonsolidasikan otomatis ke Master Sheet, kemudian divisualisasikan menggunakan custom React Dashboard tanpa perlu langganan Tableau/PowerBI.",
            fitur: ["ETL Pipeline Otomatis (Extract Transform Load)", "Interactive Charts (Filter by Date/Region)", "Sinkronisasi Real-time < 5 Detik", "Export Laporan ke PDF/CSV"],
            metrikNilai: "3 Hari -> 5 Menit",
            metrikLabel: "Percepatan Rekap Laporan",
            linkGambar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            linkProject: "#",
            techStack: ["Apps Script", "React", "Google Sheets"]
          }
        ]);
        setIsLoadingPortofolio(false);
      }, 1000);
    }
  }, []);
`;
code = code.replace(/const \[isSubmitting, setIsSubmitting\] = useState\(false\);/, stateDef + '\n  const [isSubmitting, setIsSubmitting] = useState(false);');

fs.writeFileSync('src/App.tsx', code);
