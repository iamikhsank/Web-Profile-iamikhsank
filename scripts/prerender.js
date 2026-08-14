import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Err: dist/index.html tidak ditemukan. Jalankan vite build terlebih dahulu.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf-8');

// Copy 404.html for GitHub Pages SPA direct link reload safety
const path404 = path.join(distDir, '404.html');
fs.writeFileSync(path404, baseHtml, 'utf-8');
console.log('✓ Generated 404.html for GitHub Pages SPA direct link fallback');

const routes = [
  {
    path: 'services/power-bi-dashboard',
    title: 'Jasa Dashboard Power BI & Tableau Enterprise | Ikhsan Kamal',
    description: 'Layanan pembuatan Dashboard Power BI, Tableau, dan Google Looker Studio interaktif untuk eksekutif & perusahaan. Visualisasi data real-time dan otomatisasi spreadsheet.',
    canonical: 'https://iamikhsank.github.io/Web-Profile-iamikhsank/services/power-bi-dashboard/'
  },
  {
    path: 'services/data-analysis',
    title: 'Jasa Analisis Data & SQL Data Analyst Indonesia | Ikhsan Kamal',
    description: 'Jasa konsultan analisis data bisnis, perancangan kueri SQL kompleks, Python data analysis, pembersihan data otomatis, dan pelaporan intelijen bisnis.',
    canonical: 'https://iamikhsank.github.io/Web-Profile-iamikhsank/services/data-analysis/'
  },
  {
    path: 'services/business-intelligence',
    title: 'Konsultan Business Intelligence (BI) Enterprise | Ikhsan Kamal',
    description: 'Jasa konsultan Business Intelligence terpadu. Perancangan arsitektur data warehouse, pemodelan data, otomatisasi ETL pipeline, dan dashboard laporan eksekutif.',
    canonical: 'https://iamikhsank.github.io/Web-Profile-iamikhsank/services/business-intelligence/'
  },
  {
    path: 'services/machine-learning-ai',
    title: 'Jasa Machine Learning & Predictive Analytics AI | Ikhsan Kamal',
    description: 'Layanan pengembangan model Machine Learning, AI predictive analytics, klasifikasi data, kecerdasan buatan terapan, dan pemodelan prediktif bisnis.',
    canonical: 'https://iamikhsank.github.io/Web-Profile-iamikhsank/services/machine-learning-ai/'
  },
  {
    path: 'case-studies',
    title: 'Galeri Studi Kasus & Portfolio Data Analytics | Ikhsan Kamal',
    description: 'Kumpulan studi kasus proyek data analytics, implementasi BI enterprise, dan otomasi spreadsheet yang telah berhasil dikerjakan untuk kementerian & perusahaan.',
    canonical: 'https://iamikhsank.github.io/Web-Profile-iamikhsank/case-studies/'
  },
  {
    path: 'articles',
    title: 'Artikel & Publikasi Eksekutif Data Analytics | Ikhsan Kamal',
    description: 'Kumpulan artikel teknis, panduan arsitektur Data Analytics, serta wawasan Business Intelligence yang telah dipublikasikan di Medium, LinkedIn, dan jurnal eksekutif.',
    canonical: 'https://iamikhsank.github.io/Web-Profile-iamikhsank/articles/'
  }
];

routes.forEach((route) => {
  const routeDir = path.join(distDir, route.path);
  fs.mkdirSync(routeDir, { recursive: true });

  let customHtml = baseHtml;

  // Replace Title
  customHtml = customHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );
  customHtml = customHtml.replace(
    /<meta name="title" content=".*?" \/>/i,
    `<meta name="title" content="${route.title}" />`
  );

  // Replace Description
  customHtml = customHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical
  customHtml = customHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace Open Graph Title & Description & URL
  customHtml = customHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Replace Twitter Title & Description & URL
  customHtml = customHtml.replace(
    /<meta property="twitter:title" content=".*?" \/>/i,
    `<meta property="twitter:title" content="${route.title}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="twitter:description" content=".*?" \/>/i,
    `<meta property="twitter:description" content="${route.description}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="twitter:url" content=".*?" \/>/i,
    `<meta property="twitter:url" content="${route.canonical}" />`
  );

  // Inject Static Pre-rendered HTML inside <div id="root">
  const staticRootContent = `
    <header>
      <nav aria-label="Static Page Navigation">
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/">IKHSAN K. - Data Analytics &amp; BI Consultant</a>
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/">Utama</a>
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/power-bi-dashboard/">Power BI &amp; Tableau</a>
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/data-analysis/">Data Analysis &amp; ETL</a>
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/business-intelligence/">Corporate BI</a>
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/machine-learning-ai/">ML &amp; AI</a>
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/case-studies/">Case Studies</a>
      </nav>
    </header>
    <main>
      <nav aria-label="Breadcrumb">
        <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/">Utama</a> &gt; 
        <a href="${route.canonical}">${route.title}</a>
      </nav>
      <article>
        <h1>${route.title}</h1>
        <p>${route.description}</p>
      </article>
      <section>
        <h2>Layanan &amp; Navigasi Internal</h2>
        <ul>
          <li><a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/power-bi-dashboard/">Jasa Dashboard Power BI &amp; Tableau Enterprise</a></li>
          <li><a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/data-analysis/">Jasa Analisis Data &amp; SQL Data Analyst</a></li>
          <li><a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/business-intelligence/">Konsultan Business Intelligence (BI) Enterprise</a></li>
          <li><a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/services/machine-learning-ai/">Jasa Machine Learning &amp; Predictive Analytics AI</a></li>
          <li><a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/case-studies/">Galeri Studi Kasus &amp; Portfolio Data Analytics</a></li>
        </ul>
      </section>
    </main>
  `;

  customHtml = customHtml.replace(
    /<div id="root">.*?<\/div>/s,
    `<div id="root">${staticRootContent}</div>`
  );

  const outputPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(outputPath, customHtml, 'utf-8');
  console.log(`✓ Generated SSG static page: ${route.path}/index.html`);
});

console.log('✓ Milestone 1 & 2 SSG pre-rendering & 404 fallback berhasil dibuat.');
