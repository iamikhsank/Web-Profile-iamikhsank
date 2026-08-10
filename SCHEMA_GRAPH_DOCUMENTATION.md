# Dokumentasi Schema.org JSON-LD (@graph Architecture)

Dokumen ini berisi salinan lengkap dan penjelasan teknis dari **Structured Data Schema.org** bertipe `@graph` yang diimplementasikan pada file `index.html` aplikasi web landing page **Ikhsan Kamal - Data Analytics & Business Intelligence Consultant**.

---

## 1. Kode JSON-LD Schema.org Lengkap

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://iamikhsank.github.io/Web-Profile-iamikhsank/#person",
      "name": "Ikhsan Kamal",
      "jobTitle": "Data Analyst & Business Intelligence Analyst",
      "url": "https://iamikhsank.github.io/Web-Profile-iamikhsank/",
      "image": "https://drive.google.com/thumbnail?id=184y2ZUwxJn1mXCgPtX_kuomeJaQ461zE&sz=w1000",
      "sameAs": [
        "https://github.com/iamikhsank",
        "https://www.linkedin.com/in/ikhsankamal",
        "https://fastwork.id/user/iamikhsan",
        "https://www.fiverr.com/iamikhsank",
        "https://www.instagram.com/iamikhsank_"
      ],
      "knowsAbout": [
        "Data Analytics",
        "Business Intelligence",
        "Power BI",
        "Python",
        "SQL",
        "Data Visualization",
        "Machine Learning",
        "Google Apps Script",
        "ETL Pipeline",
        "Business Analytics"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://iamikhsank.github.io/Web-Profile-iamikhsank/#service",
      "name": "Ikhsan Kamal - Data Analytics Consultant & Business Intelligence Analyst Indonesia",
      "url": "https://iamikhsank.github.io/Web-Profile-iamikhsank/",
      "image": "https://iamikhsank.github.io/Web-Profile-iamikhsank/assets/prj_img/Sales%20Analytics%20Cockpit%20(2).png",
      "description": "Layanan Data Analyst Indonesia, Power BI Consultant, Business Intelligence Analyst, Data Visualization, SQL & Python Data Analyst, serta Business Analytics.",
      "telephone": "+6282126574799",
      "priceRange": "Rp 3.500.000 - Rp 15.000.000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bandung",
        "addressCountry": "ID"
      },
      "founder": {
        "@id": "https://iamikhsank.github.io/Web-Profile-iamikhsank/#person"
      },
      "areaServed": ["Indonesia", "Global"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Layanan Business Analytics & BI",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Data Cleansing & SQL Data Analyst Services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dashboard Power BI & Data Visualization Development"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Predictive Analytics & Python Data Analyst ML Engine"
            }
          }
        ]
      }
    }
  ]
}
</script>
```

---

## 2. Rincian Komponen Entitas

### A. Entitas Person (`@type: Person`)
- **ID Unik**: `https://iamikhsank.github.io/Web-Profile-iamikhsank/#person`
- **Nama Resmi**: Ikhsan Kamal
- **Gelar Jabatan**: Data Analyst & Business Intelligence Analyst
- **Profiling Lintas Platform (`sameAs`)**:
  - GitHub: `https://github.com/iamikhsank`
  - LinkedIn: `https://www.linkedin.com/in/ikhsankamal`
  - Fastwork: `https://fastwork.id/user/iamikhsan`
  - Fiverr: `https://www.fiverr.com/iamikhsank`
  - Instagram: `https://www.instagram.com/iamikhsank_`
- **Daftar Spesialisasi Keahlian (`knowsAbout`)**:
  1. Data Analytics
  2. Business Intelligence
  3. Power BI
  4. Python
  5. SQL
  6. Data Visualization
  7. Machine Learning
  8. Google Apps Script
  9. ETL Pipeline
  10. Business Analytics

### B. Entitas Layanan Profesional (`@type: ProfessionalService`)
- **ID Unik**: `https://iamikhsank.github.io/Web-Profile-iamikhsank/#service`
- **Nama Bisnis**: Ikhsan Kamal - Data Analytics Consultant & Business Intelligence Analyst Indonesia
- **Pendiri (`founder`)**: Terhubung langsung ke entitas `#person`
- **Cakupan Wilayah (`areaServed`)**: `["Indonesia", "Global"]`
- **Rentang Harga (`priceRange`)**: Rp 3.500.000 - Rp 15.000.000

---

## 3. Panduan Pengujian & Validasi

Kode JSON-LD di atas telah divalidasi dan dapat diuji secara mandiri menggunakan platform validasi resmi:

1. **Google Rich Results Test**: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. **Schema Markup Validator (W3C)**: [https://validator.schema.org/](https://validator.schema.org/)
