# Chatbot WhatsApp - Sistem Informasi Pakan Ternak Desa Seyegan

Chatbot WhatsApp untuk membantu peternak di Desa Seyegan mendapatkan informasi lengkap seputar pakan ternak lokal.

## 📋 Fitur Lengkap

### 1️⃣ Jenis Pakan Ternak
**Rumput (7 jenis):**
- Rumput Odot - Protein 12-17%, produktivitas >60 ton/ha/tahun
- Rumput Gajah - Produksi 43-57 ton/ha
- Rumput Raja (King Grass) - Adaptasi baik, biomassa besar
- Rumput Benggala - Tahan kekeringan, cegah erosi
- Rumput Pakchong - Protein tinggi 16-18%
- Rumput Gama Umami - Hasil mutasi gamma, batang lunak
- Rumput Liar/Lahan - Gratis dan melimpah

**Limbah Pertanian (3 jenis):**
- Jerami Padi - Tersedia melimpah setelah panen
- Jerami Kacang Tanah - Protein 12-14%
- Jerami Jagung - Sumber serat ruminansia

**Limbah Padat:**
- Ampas Tahu - Protein 20-39%, murah dan bergizi

### 2️⃣ Kalkulator Kebutuhan Pakan
- Hitung kebutuhan harian dan bulanan
- Untuk sapi, kambing, dan ayam
- Sesuai berat badan dan jumlah ternak

### 3️⃣ Harga Pakan Terkini
- Update harga pakan lokal
- Informasi supplier/toko

### 4️⃣ Cara Pengolahan Pakan
**Silase (Pakan Fermentasi):**
- Langkah-langkah detail pembuatan
- Waktu fermentasi 14 hari
- Ciri silase yang baik

**Hay (Pakan Kering):**
- Cara pengeringan yang benar
- Waktu 2-3 hari
- Tips penyimpanan

**Fermentasi Ampas Tahu:**
- Resep lengkap dengan takaran
- Waktu 3-7 hari
- Kombinasi dengan dedak

### 5️⃣ Strategi Pakan Berdasarkan Musim
**Musim Hujan:**
- Fokus pakan segar
- Produksi silase untuk cadangan
- Rekomendasi rumput terbaik

**Musim Kemarau:**
- Gunakan silase/hay
- Manfaatkan limbah pertanian
- Tambahan protein dari ampas tahu

**Strategi Kombinasi:**
- Langkah implementasi sepanjang tahun
- Antisipasi kekurangan pakan
- Efisiensi sumber daya lokal

### 6️⃣ Tips Pemberian Pakan
- Jadwal pemberian
- Cara penyimpanan
- Cara pencampuran
- Tips umum

### 7️⃣ Tanya Jawab (FAQ)
- Pertanyaan umum seputar pakan ternak
- Kontak konsultasi lebih lanjut

## 🛠️ Teknologi

- Node.js
- Baileys (WhatsApp Web API)
- JSON sebagai database

## 📦 Instalasi

### 1. Install Node.js
Download dan install dari [nodejs.org](https://nodejs.org/) (pilih versi LTS)

Verifikasi instalasi:
```bash
node --version
npm --version
```

### 2. Clone/Download Project
```bash
cd chatbot-pakan-ternak-v2
```

### 3. Install Dependencies
```bash
npm install
```

## 🚀 Cara Menjalankan

### 1. Jalankan Bot
```bash
npm start
```

### 2. Scan QR Code
- QR Code akan muncul di terminal
- Buka WhatsApp di HP Anda
- Pilih **WhatsApp Web** (3 titik > Perangkat Tertaut)
- Scan QR code yang muncul di terminal

### 3. Bot Siap Digunakan!
Setelah QR code ter-scan, bot akan terkoneksi dan siap menerima pesan.

## 📱 Cara Menggunakan Bot

Pengguna cukup chat ke nomor WhatsApp yang sudah di-scan:

1. Ketik **menu** atau **mulai** untuk memulai
2. Pilih menu dengan ketik angka (1-7)
3. Ikuti instruksi bot

### Contoh Percakapan:

```
User: menu

Bot: 🐄 CHATBOT PAKAN TERNAK SEYEGAN 🐓
[Menu muncul...]

User: 1

Bot: 🌾 JENIS PAKAN TERNAK
Pilih kategori pakan:
1️⃣ Rumput (Odot, Gajah, Raja, dll)
2️⃣ Limbah Pertanian (Jerami)
3️⃣ Limbah Padat (Ampas Tahu)

User: 1

Bot: 🌱 JENIS RUMPUT PAKAN
[Daftar rumput muncul...]

User: 1

Bot: [Informasi detail Rumput Odot ditampilkan...]
```

## 📊 Struktur Project

```
chatbot-pakan-ternak-v2/
├── index.js                    # File utama bot
├── package.json                # Konfigurasi npm
├── handlers/
│   └── messageHandler.js       # Logika pemrosesan pesan (UPDATED)
├── data/
│   ├── pakan.json             # Database lengkap jenis pakan (NEW)
│   ├── fermentasi.json        # Database cara pengolahan (NEW)
│   ├── strategi_musim.json    # Database strategi musim (NEW)
│   ├── harga.json             # Database harga
│   └── tips.json              # Database tips & FAQ
└── auth_info_baileys/         # Folder sesi WhatsApp (auto-generated)
```

## 📚 Data dari Dokumen Seyegan

Chatbot ini sudah berisi data lengkap dari dokumen **"Potensi Pakan Ternak di Desa Seyegan"** meliputi:

✅ 7 jenis rumput pakan dengan detail lengkap  
✅ 3 jenis limbah pertanian  
✅ Ampas tahu sebagai sumber protein  
✅ Cara pengolahan pakan (silase, hay, fermentasi)  
✅ Strategi pakan berdasarkan musim  
✅ Nutrisi, penanaman, perawatan setiap jenis pakan  

## 🔧 Menambahkan Data Baru

### Menambah Jenis Pakan Baru
Edit file `data/pakan.json`:

```json
{
  "rumput": {
    "namaRumputBaru": {
      "nama": "Nama Rumput Baru",
      "deskripsi": "...",
      "keunggulan": [...],
      "nutrisi": {...},
      ...
    }
  }
}
```

### Menambah Cara Pengolahan Baru
Edit file `data/fermentasi.json`:

```json
{
  "metodeBaru": {
    "nama": "Metode Baru",
    "deskripsi": "...",
    "langkahLangkah": [...]
  }
}
```

## 🌐 Hosting Gratis (Agar Bot Jalan 24/7)

### Railway.app (Recommended)
```bash
npm install -g railway
railway login
railway up
```

### Render.com
1. Push code ke GitHub
2. Buka [render.com](https://render.com)
3. Buat "New Web Service"
4. Connect repository
5. Deploy!

### Replit.com (Paling Mudah)
1. Buka [replit.com](https://replit.com)
2. Import dari GitHub atau upload folder
3. Klik "Run"
4. Gunakan uptimerobot.com agar bot tetap aktif

## ⚠️ Troubleshooting

### QR Code tidak muncul
```bash
rm -rf auth_info_baileys
npm start
```

### Bot disconnect terus
- Pastikan koneksi internet stabil
- Jangan logout WhatsApp Web dari HP
- Gunakan hosting yang stabil

### Pesan tidak terbalas
- Cek console log untuk error
- Pastikan bot dalam keadaan running
- Coba restart bot

## 📝 Update Log

**Versi 2.0 (Berdasarkan Dokumen Seyegan):**
- ✅ Tambah 7 jenis rumput pakan lokal
- ✅ Tambah 3 jenis limbah pertanian
- ✅ Tambah informasi ampas tahu
- ✅ Tambah panduan pengolahan pakan (silase, hay, fermentasi)
- ✅ Tambah strategi pakan berdasarkan musim
- ✅ Detail nutrisi, penanaman, perawatan setiap pakan
- ✅ Menu lebih lengkap dan terstruktur

## 📞 Support & Kontribusi

Untuk menambahkan data pakan baru atau update informasi:
1. Siapkan dokumen PDF/Word dengan informasi lengkap
2. Kirim ke tim KKN
3. Data akan diintegrasikan ke chatbot

## 📝 Lisensi

Dibuat untuk keperluan KKN Desa Seyegan - Bebas digunakan dan dimodifikasi

---

**Dibuat dengan ❤️ oleh Tim KKN untuk Peternak Desa Seyegan**
