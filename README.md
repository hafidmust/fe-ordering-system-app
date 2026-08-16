# Waroeng Ngangeni

Prototipe pemesanan meja berbasis QR code (React + Vite). Mensimulasikan seluruh
alur pemesanan dari sisi Pelanggan, Kasir, Koki, Pelayan, Admin, dan Manager
dalam satu aplikasi.

## Jalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build untuk produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`. Preview build tersebut dengan:

```bash
npm run preview
```

## Deploy

Proyek ini adalah static site (hasil build hanya HTML/CSS/JS), jadi bisa di-deploy ke platform mana pun yang menerima static site:

### Vercel
```bash
npm install -g vercel
vercel
```
Vercel otomatis mendeteksi Vite. Build command: `npm run build`, output directory: `dist`.

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --build
```
Build command: `npm run build`, publish directory: `dist`.

### GitHub Pages
1. `npm install --save-dev gh-pages`
2. Tambahkan `"homepage": "https://<username>.github.io/<repo>"` di `package.json`
3. Tambahkan script: `"deploy": "gh-pages -d dist"`
4. `npm run build && npm run deploy`

## Struktur

- `src/App.jsx` &mdash; seluruh logika & UI aplikasi (state pesanan, menu, meja, staf, pembayaran)
- `src/main.jsx` &mdash; entry point React
- Tidak ada backend/database &mdash; semua data disimpan di memory (state React), reset saat halaman di-refresh.

## Catatan

Ini adalah prototipe front-end saja. Untuk versi produksi, data (menu, meja,
pesanan, pembayaran) sebaiknya dipindahkan ke backend + database sesuai
class diagram aslinya (Go + Gin + PostgreSQL, dsb).
