# VulneraX - Website Utama

Website utama VulneraX dibangun dengan **Next.js 15** untuk menampilkan artikel, layanan, dan informasi perusahaan.

## 🚀 Fitur

- Landing page dengan informasi layanan keamanan siber
- Halaman artikel/resources dari API
- VulneraLab - Tutorial dan lab keamanan
- Ransomware Readiness Assessment (RRA)
- Score Card generator
- PDF Report generator
- Responsive design

## 📋 Prasyarat

Pastikan sudah terinstall:

- **Node.js** v18 atau lebih baru (disarankan v20+)
- **npm** atau **yarn**
- **Git**

## 🛠️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/Galang0304/web-main-vulnerax-update.git
cd web-main-vulnerax-update
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: **http://localhost:3000**

### 4. Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Folder

```
vulnerax-main/
├── public/              # Static files (images, icons, dll)
│   ├── img/
│   └── robots.txt
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── page.js      # Landing page
│   │   ├── layout.js    # Root layout
│   │   ├── globals.css  # Global styles
│   │   ├── resources/   # Halaman artikel
│   │   ├── rra/         # Ransomware Assessment
│   │   └── [Services]/  # Halaman layanan
│   ├── components/      # React components
│   ├── data/            # Static data
│   ├── store/           # State management
│   ├── styles/          # CSS Modules
│   └── utils/           # Utility functions
├── package.json
└── next.config.mjs
```

## 🔗 Integrasi dengan Admin Panel

Website ini mengambil data artikel dari **VulneraX Admin API**. 

Untuk development lokal dengan data artikel:

1. Jalankan Admin API server (lihat repo `web-admin-vulnerax`)
2. Update endpoint API di komponen yang membutuhkan

## 📝 Environment Variables (Opsional)

Buat file `.env.local` jika diperlukan:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🧪 Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm start` | Jalankan production server |
| `npm run lint` | Cek kode dengan ESLint |

## 📄 Lisensi

© 2024-2026 VulneraX. All rights reserved.
