# Requirements - Jasa Web App Google Apps Script Modern

Dokumen ini mencantumkan persyaratan fungsional, non-fungsional, arsitektur teknis, dan langkah integrasi untuk membangun Landing Page interaktif yang menyajikan Jasa Pembuatan Aplikasi Web berbasis Google Apps Script (GAS).

## 1. Persyaratan Fungsional (Functional Requirements)
- **Tampilan Informasi Layanan Jasa**: Menampilkan detail jasa pembuatan Web App berbasis Google Apps Script dengan database Google Sheets gratis, mencakup ERP, CRM, Dashboard, dan CRUD kustom.
- **Mockup Interaktif Laptop & Mobile**: Menyajikan simulasi visual dashboard yang responsif dan interaktif (disertai pembaruan data real-time pada state lokal seperti jumlah pengunjung, konversi, transaksi, dan log peristiwa).
- **Kategori Showcase Proyek**: Menyediakan fitur pemilihan tab/kategori proyek (CRM, ERP, Dashboard, CRUD) beserta spesifikasi teknis kustom dari masing-masing proyek.
- **Alur Kerja Transparan (Roadmap)**: Menampilkan 5 langkah pengerjaan proyek dari Konsultasi Gratis hingga Handover & Support 30 hari.
- **Formulir Konsultasi Klien Real-time**:
  - Kolom input: Nama, Instansi/Perusahaan, Email, No. WhatsApp, Pilihan Layanan, Estimasi Budget, dan Detail Masalah.
  - Penanganan pengiriman form hybrid: menggunakan `google.script.run` di lingkungan GAS asli dan simulasi lokal yang interaktif di luar lingkungan GAS.
  - Penyimpanan langsung data input ke sheet Google Sheets `Leads` dan pengiriman email notifikasi Gmail HTML otomatis ke administrator.
- **Tanya Jawab (F.A.Q)**: Menjawab keraguan umum calon pelanggan tentang keamanan Google Sheets, efisiensi biaya VPS/server, dan skalabilitas sistem.
- **Visualisasi Alur & Responsivitas**: Ilustrasi alur kerja integrasi dari Google Sheets, Google Apps Script backend, hingga sinkronisasi data real-time yang disajikan dalam bentuk alur grid 3-kolom responsif yang rapi dan elegan untuk memperagakan fungsionalitas otomasi Google Apps Script secara dramatis.
- **Diagram Integrasi Marquee Squircle Tanpa Celah (Infinite Scroll Connected Squircle Marquee)**: Komponen diagram alur *modern tech-stack* dinamis yang menyajikan jajaran kartu *squircle* putih murni berukuran `w-20 h-20 sm:w-24 sm:h-24` dengan kelengkungan sudut yang halus (`rounded-[22px] sm:rounded-[28px]`) berisi ikon-ikon stack utama (Apps Script, Google Sheets, React 19, Tailwind v4, Motion, Workspace APIs). Jajaran kartu ini bergulir secara kontinu dan ultra-mulus (60 FPS) menggunakan animasi pergeseran persentase matematika presisi (`x: ["0%", "-20%"]`) dengan 5x duplikasi data paralel untuk mengeliminasi celah putih (*white gap*) pada layar ultra-lebar atau resolusi tinggi (4K/5K), memberikan kesan integrasi sistem modern kelas enterprise.
- **Analisis ROI & Transparansi Biaya (Marketing Engine)**: Perbandingan visual yang komprehensif antara biaya pengembangan konvensional bulanan dengan solusi Google Apps Script dari GASForge yang bebas biaya sewa server.
- **Paket Harga & Solusi Modular**: Penjabaran paket Starter, Premium, dan Enterprise dengan tombol aksi dinamis yang otomatis mengisi isian formulir konsultasi untuk meminimalkan friksi konversi calon klien.
- **Panel Pratinjau Proyek Premium (Premium Project Preview Panel)**: Menampilkan panel pratinjau portofolio kustom yang mewah, bersih, dan elegan untuk memperagakan spesifikasi fungsional dan teknis setiap proyek yang dipilih secara dinamis. Menghadirkan visualisasi metrik bisnis nyata, daftar checklist fitur inti modular dengan ikon hijau kontras, tabel rincian teknis lengkap (database, hosting, framework, styling), serta tombol aksi langsung (CTA) pemesanan terintegrasi.
- **Identitas Visual Logo & Kredibilitas Google Apps Script (Brand Logo & GAS Branding)**:
  - **Logo Utama Kustom**: Penggunaan logo kustom GASForge berkualitas tinggi yang dimuat langsung dari tautan publik Google Drive resmi (`https://lh3.googleusercontent.com/d/17CWoqbwMZHVcBJuMgue5ESzHUspNWIvh`) dengan penanganan error fallback ke SVG C-Growth interaktif yang cerdas. Logo menggambarkan perpaduan huruf "C" pertumbuhan dengan bar chart data dan panah naik yang melambangkan kemajuan teknologi bisnis klien.
  - **Lencana Google Apps Script Resmi**: Penempatan lencana logo Google Apps Script resmi yang bersumber dari SVG berkualitas tinggi di Header, Footer, dan Marquee Stack Teknologi untuk memancarkan aura kredibilitas tinggi sebagai spesialis resmi Google Workspace Developer.
  - **Logo React Kustom (`react-js-icon.png`)**: Menambahkan komponen logo React (`ReactLogo`) berbasis vektor SVG yang sangat tajam dan indah di dalam Marquee Stack Teknologi untuk menggantikan ikon standar, lengkap dengan rotasi lambat modern yang mencerminkan performa dinamis.
  - **Logo Google Sheets Kustom (`pngwing.com.png`)**: Menambahkan komponen logo Google Sheets (`GoogleSheetsLogo`) berbasis vektor SVG resmi yang modern dan bersih di dalam Marquee Stack Teknologi, langkah alur kerja (Langkah 01), serta header Simulator CRM untuk menggantikan ikon generik, memperkuat kesan keaslian integrasi ekosistem Google Spreadsheet secara langsung.


## 2. Persyaratan Non-Fungsional (Non-Functional Requirements)
- **Kinerja Optimal**: Penggunaan bundler Vite dan plugin `vite-plugin-singlefile` untuk menggabungkan seluruh aset CSS (Tailwind) dan JavaScript ke dalam file tunggal `dist/index.html` demi mempercepat render di Google Apps Script (`HtmlService` GAS memproses single-file jauh lebih cepat).
- **Responsivitas Maksimal**: Memanfaatkan sistem grid dan flexbox dari Tailwind CSS v4 agar tampilan bekerja sempurna di resolusi mobile (320px) hingga layar ultra-wide desktop.
- **Desain Modern (Aesthetic UI/UX)**: Skema warna terang premium (*Sleek Interface*) berbasis Off-White dan Slate-900 dengan aksen Royal Blue yang bersih, tipografi modern (Plus Jakarta Sans, Outfit & JetBrains Mono), sudut membulat (*rounded-2xl*), kartu bento berbayangan halus (*soft shadows*), tata letak vertikal presisi tinggi yang meminimalkan gap antarseksi (tinggi header dirampingkan ke `h-16`, padding hero section dikompresi ke `pt-6 md:pt-12 md:pb-24`), serta animasi mikro menggunakan Framer Motion (`motion/react`) untuk transisi state tab dan hover tombol.
- **Optimasi SEO**: Penggunaan kerangka HTML semantik, meta-tags yang tepat, dan rasio kontras warna tinggi (standar WCAG AA) agar mudah diindeks oleh mesin pencarian Google.

## 3. Spesifikasi Arsitektur Sistem
- **Frontend**: React 19, Tailwind CSS v4, Lucide Icons, Framer Motion (Motion).
- **Backend**: Google Apps Script (V8 Engine) serverless hosting.
- **Database**: Google Sheets (Spreadsheet) sebagai database relasional sederhana.
- **Integrasi**: Gmail API untuk notifikasi otomatis, Google Drive sebagai media penyimpanan berkas tambahan.
