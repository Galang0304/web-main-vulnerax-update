# VulneraX - Website Utama

Website utama VulneraX dibangun dengan **Next.js 15** untuk menampilkan artikel, layanan, dan informasi perusahaan keamanan siber.

## 🌐 Demo

- **Production**: http://103.151.145.167/
- **Admin Panel**: http://103.151.145.167/admin/

---

## 🚀 Fitur

- Landing page dengan informasi layanan keamanan siber
- Halaman artikel/resources dari API
- VulneraLab - Tutorial dan lab keamanan
- Ransomware Readiness Assessment (RRA)
- Score Card generator
- PDF Report generator
- Responsive design
- SEO optimized dengan sitemap

---

## 📋 Prasyarat

Pastikan sudah terinstall:

- **Node.js** v18 atau lebih baru (disarankan v20+)
- **npm** atau **yarn**
- **Git**

---

## 🛠️ Instalasi & Development

### 1. Clone Repository

```bash
git clone https://github.com/Galang0304/web-main-vulnerax-update.git
cd web-main-vulnerax-update
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment (Opsional)

Buat file `.env.local` jika diperlukan:

```env
# Untuk development lokal (jika admin API jalan di localhost:5001)
NEXT_PUBLIC_API_URL=/api/public/articles
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: **http://localhost:3000**

### 5. Build untuk Production

```bash
npm run build
npm start
```

---

## 📤 Cara Push Perubahan

### 1. Cek Status Perubahan

```bash
git status
```

### 2. Add Semua Perubahan

```bash
git add .
```

### 3. Commit dengan Pesan

```bash
git commit -m "feat: deskripsi perubahan"
```

Format commit message:
- `feat:` - Fitur baru
- `fix:` - Perbaikan bug
- `docs:` - Perubahan dokumentasi
- `style:` - Perubahan style/CSS
- `refactor:` - Refactor kode

### 4. Push ke GitHub

```bash
git push origin main
```

---

## 🖥️ Deployment ke Server Production

### Prasyarat Server

- Ubuntu 20.04+ / Debian
- Node.js v20+
- PM2
- Nginx
- PostgreSQL 14+ (untuk admin API)

### 1. SSH ke Server

```bash
ssh root@103.151.145.167
```

### 2. Clone/Pull Repository

```bash
# Pertama kali
cd /var/www
mkdir -p vulnerax
cd vulnerax
git clone https://github.com/Galang0304/web-main-vulnerax-update.git main

# Update (jika sudah ada)
cd /var/www/vulnerax/main
git pull origin main
```

### 3. Install Dependencies

```bash
cd /var/www/vulnerax/main
npm install
```

### 4. Setup Environment Production

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=/api/public/articles
EOF
```

### 5. Build

```bash
npm run build
```

### 6. Setup PM2

```bash
# Pertama kali
pm2 start npm --name "vulnerax-main" -- start -- -p 3001
pm2 save
pm2 startup

# Restart setelah update
pm2 restart vulnerax-main
```

### 7. Setup Nginx

Copy config dari repo:

```bash
cp nginx-vulnerax-new.conf /etc/nginx/sites-available/vulnerax
ln -sf /etc/nginx/sites-available/vulnerax /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 8. ⚡ Update Cepat (Setelah Push)

Setelah push perubahan ke GitHub, jalankan di server:

```bash
cd /var/www/vulnerax/main && git pull && npm run build && pm2 restart vulnerax-main
```

---

## 📁 Struktur Folder

```
vulnerax-main/
├── public/              # Static files (images, icons)
│   ├── img/
│   └── robots.txt
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── page.js      # Landing page
│   │   ├── layout.js    # Root layout
│   │   ├── globals.css  # Global styles
│   │   ├── resources/   # Halaman artikel
│   │   │   ├── page.js          # List artikel
│   │   │   ├── [slug]/          # Detail artikel
│   │   │   └── vulneralab/      # VulneraLab page
│   │   ├── rra/         # Ransomware Assessment
│   │   └── [Services]/  # Halaman layanan
│   ├── components/      # React components
│   ├── data/            # Static data
│   ├── store/           # State management
│   ├── styles/          # CSS Modules
│   └── utils/           # Utility functions
├── nginx-vulnerax-new.conf  # Nginx config untuk production
├── package.json
└── next.config.mjs
```

---

## 🔗 Integrasi dengan Admin Panel

Website ini mengambil data dari **VulneraX Admin API**:

| Endpoint | Deskripsi |
|----------|-----------|
| `/api/public/articles` | List semua artikel |
| `/api/public/articles/:slug` | Detail artikel |
| `/api/vulneralab/public/list` | List dokumen VulneraLab |

---

## 🧪 Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server (port 3000) |
| `npm run build` | Build untuk production |
| `npm start` | Jalankan production server |
| `npm run lint` | Cek kode dengan ESLint |

---

## 🔧 Troubleshooting

### Error: EADDRINUSE port 3000

Port sudah digunakan. Jalankan di port lain:

```bash
npm start -- -p 3001
```

### Error: API not available

Pastikan admin API server berjalan di port 5001.

### Error: 500 Internal Server Error di artikel

Pastikan `export const dynamic = 'force-dynamic'` ada di `src/app/resources/[slug]/page.js`

### Artikel tidak muncul di halaman Resources

1. Pastikan admin API berjalan
2. Cek apakah artikel sudah di-publish (status: published)
3. Cek console browser untuk error

---

## 📄 Lisensi

© 2024-2026 VulneraX. All rights reserved.
