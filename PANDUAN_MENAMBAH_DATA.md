# 📖 Panduan Menambahkan Data Baru ke Chatbot

Dokumen ini menjelaskan cara menambahkan data pakan ternak baru dari dokumen PDF/Word ke dalam chatbot.

## 🎯 Kapan Menggunakan Panduan Ini?

Gunakan panduan ini ketika Anda memiliki:
- ✅ Dokumen PDF/Word tentang pakan ternak baru
- ✅ Informasi tambahan jenis rumput/limbah
- ✅ Data update harga pakan
- ✅ Metode pengolahan pakan baru
- ✅ Tips atau strategi baru

## 📁 Struktur File Data

Chatbot menggunakan 5 file JSON utama:

### 1. `data/pakan.json` - Database Jenis Pakan

**Untuk rumput pakan:**
```json
{
  "rumput": {
    "namaKunci": {
      "nama": "Nama Lengkap Rumput",
      "deskripsi": "Penjelasan singkat",
      "keunggulan": [
        "Keunggulan 1",
        "Keunggulan 2"
      ],
      "nutrisi": {
        "proteinKasar": "10-15%",
        "seratKasar": "20-30%",
        "catatan": "Informasi tambahan"
      },
      "penanaman": {
        "metode": "Cara penanaman",
        "jarak": "Jarak tanam",
        "persiapanLahan": "Persiapan lahan"
      },
      "perawatan": {
        "pupukKandang": "Dosis pupuk",
        "penyiangan": "Cara penyiangan"
      },
      "penggunaan": [
        "Cara penggunaan 1",
        "Cara penggunaan 2"
      ],
      "rekomendasiMusim": ["hujan", "kemarau"]
    }
  }
}
```

**Untuk limbah pertanian:**
```json
{
  "limbahPertanian": {
    "namaKunci": {
      "nama": "Nama Limbah",
      "deskripsi": "...",
      "keunggulan": [...],
      "nutrisi": {...},
      "pengolahan": [...],
      "penggunaan": [...],
      "rekomendasiMusim": [...]
    }
  }
}
```

### 2. `data/fermentasi.json` - Cara Pengolahan

```json
{
  "namaMetode": {
    "nama": "Nama Metode",
    "deskripsi": "Deskripsi metode",
    "bahanCocok": ["Bahan 1", "Bahan 2"],
    "langkahLangkah": [
      {
        "step": 1,
        "judul": "Judul Langkah",
        "detail": "Detail lengkap"
      }
    ],
    "waktuFermentasi": "7 hari",
    "penyimpanan": "Cara simpan"
  }
}
```

### 3. `data/strategi_musim.json` - Strategi Musiman

```json
{
  "musimBaru": {
    "nama": "Nama Musim",
    "kondisi": "Kondisi musim",
    "fokus": "Fokus utama",
    "pakanDirekomendasikan": [
      {
        "nama": "Nama Pakan",
        "prioritas": "Tinggi/Sedang/Rendah",
        "alasan": "Alasan pemilihan"
      }
    ]
  }
}
```

### 4. `data/harga.json` - Harga Pakan

```json
{
  "hargaPakan": {
    "jenisTernak": [
      {
        "nama": "Nama Pakan",
        "satuan": "per kg",
        "harga": "5000-7000",
        "keterangan": "Catatan"
      }
    ]
  }
}
```

### 5. `data/tips.json` - Tips dan FAQ

```json
{
  "tips": {
    "kategori": {
      "judul": "Judul Tips",
      "konten": ["Tip 1", "Tip 2"]
    }
  },
  "faq": [
    {
      "pertanyaan": "Pertanyaan?",
      "jawaban": "Jawaban"
    }
  ]
}
```

## 🔧 Langkah-Langkah Menambah Data

### Contoh: Menambahkan Rumput Baru "Rumput Taiwan"

#### 1. Baca Dokumen Sumber
Dari dokumen, ekstrak informasi:
- Nama lengkap
- Deskripsi
- Keunggulan
- Kandungan nutrisi
- Cara penanaman
- Perawatan
- Cara penggunaan
- Rekomendasi musim

#### 2. Buka File `data/pakan.json`

#### 3. Tambahkan Data di Bagian `rumput`

```json
{
  "rumput": {
    "odot": { ... },
    "gajah": { ... },
    "taiwan": {
      "nama": "Rumput Taiwan (Pennisetum purpureum cv. Taiwan)",
      "deskripsi": "Rumput hijauan produktif dari Taiwan dengan kandungan protein tinggi",
      "keunggulan": [
        "Protein kasar tinggi 18-20%",
        "Pertumbuhan sangat cepat",
        "Tahan terhadap pemangkasan berulang",
        "Produksi biomassa tinggi"
      ],
      "nutrisi": {
        "proteinKasar": "18-20%",
        "seratKasar": "25-30%",
        "TDN": "60-65%",
        "kecernaan": "70-75%"
      },
      "penanaman": {
        "metode": "Stek batang 2-3 ruas",
        "jarak": "50 x 75 cm",
        "persiapanLahan": "Gemburkan tanah, tambah pupuk kandang 2-3 ton/ha"
      },
      "perawatan": {
        "pupukKandang": "2-3 ton/ha awal tanam",
        "pupukNPK": "50 kg/ha setiap setelah panen",
        "penyiangan": "Rutin setiap 2 minggu",
        "panen": "60-70 hari pertama, selanjutnya 30-35 hari"
      },
      "penggunaan": [
        "Pakan segar: cacah 3-5 cm sebelum diberikan",
        "Silase: fermentasi 14-21 hari dengan EM4",
        "Kombinasi dengan konsentrat untuk hasil maksimal"
      ],
      "rekomendasiMusim": ["hujan", "kemarau"]
    }
  }
}
```

#### 4. Update Handler Menu (jika perlu)

Buka file `handlers/messageHandler.js`, cari fungsi `getMenuRumput()`:

```javascript
function getMenuRumput() {
    return `🌱 *JENIS RUMPUT PAKAN*

1️⃣ Rumput Odot
2️⃣ Rumput Gajah
3️⃣ Rumput Raja (King Grass)
4️⃣ Rumput Benggala
5️⃣ Rumput Pakchong
6️⃣ Rumput Gama Umami
7️⃣ Rumput Liar/Lahan
8️⃣ Rumput Taiwan  <- TAMBAHKAN DI SINI

Ketik angka 1-8 atau *menu* untuk kembali`;
}
```

Kemudian update array `rumputMap`:

```javascript
// Di handler rumput
if (state.menu === 'jenis_pakan' && state.submenu === 'rumput') {
    const rumputMap = ['odot', 'gajah', 'raja', 'benggala', 'pakchong', 'gamaUmami', 'liar', 'taiwan']; // TAMBAHKAN 'taiwan'
    const idx = parseInt(input) - 1;
    if (idx >= 0 && idx < rumputMap.length) {
        state.menu = null;
        state.submenu = null;
        return getInfoRumput(rumputMap[idx]);
    }
    return 'Pilihan tidak valid. ' + getMenuRumput();
}
```

#### 5. Test Chatbot

```bash
npm start
```

Test dengan:
```
User: menu
Bot: [Menu utama muncul]

User: 1
Bot: [Menu kategori pakan]

User: 1
Bot: [Menu rumput, sekarang ada 8 pilihan]

User: 8
Bot: [Informasi Rumput Taiwan ditampilkan]
```

## 📝 Template Ekstraksi Data dari Dokumen

Saat membaca dokumen baru, gunakan template ini:

```
=== TEMPLATE EKSTRAKSI DATA ===

NAMA PAKAN: _______________________
KATEGORI: Rumput / Limbah Pertanian / Limbah Padat

DESKRIPSI (1-2 kalimat):
_________________________________

KEUNGGULAN (bullet points):
- 
- 
- 

NUTRISI:
- Protein Kasar: ____%
- Serat Kasar: ____%
- Lemak Kasar: ____%
- TDN: ____%
- Kecernaan: ____%
- Lainnya: _______

PENANAMAN:
- Metode: _______
- Jarak tanam: _______
- Persiapan lahan: _______

PERAWATAN:
- Pupuk: _______
- Penyiangan: _______
- Penyiraman: _______
- Panen: _______

CARA PENGGUNAAN:
1. 
2. 
3. 

REKOMENDASI MUSIM: Hujan / Kemarau / Keduanya
```

## 🎨 Tips untuk Data Berkualitas

### ✅ DO (Lakukan):
1. **Gunakan bahasa yang sederhana** - Peternak mudah mengerti
2. **Sertakan angka konkret** - "12-15%" lebih baik dari "tinggi"
3. **Berikan contoh** - "Contoh: 5 kg pakan per ekor"
4. **Konsisten dengan format** - Ikuti struktur JSON yang ada
5. **Verifikasi data** - Pastikan angka nutrisi benar

### ❌ DON'T (Jangan):
1. **Bahasa terlalu teknis** - Hindari istilah ilmiah berlebihan
2. **Data tidak jelas** - "Cukup banyak" tidak informatif
3. **Format acak** - Ikuti struktur yang sudah ada
4. **Copy-paste mentah** - Rephrase agar lebih mudah dipahami
5. **Tanpa sumber** - Catat dari mana data berasal

## 🔄 Update Data yang Sudah Ada

### Mengubah Harga Pakan:
1. Buka `data/harga.json`
2. Cari item yang mau diubah
3. Update nilai `harga` dan `updateTerakhir`

### Menambah Tips Baru:
1. Buka `data/tips.json`
2. Tambahkan di array `konten` pada kategori yang sesuai

### Update Nutrisi Pakan:
1. Buka `data/pakan.json`
2. Cari pakan yang mau diupdate
3. Ubah nilai di bagian `nutrisi`

## 🚀 Workflow Lengkap

```
1. Terima Dokumen Baru
   ↓
2. Baca dan Ekstrak Data (gunakan template)
   ↓
3. Tentukan Kategori (Rumput/Limbah/Tips/dll)
   ↓
4. Edit File JSON yang Sesuai
   ↓
5. Update Handler (jika tambah menu baru)
   ↓
6. Test di Local (npm start)
   ↓
7. Verifikasi Output di WhatsApp
   ↓
8. Deploy ke Production
   ↓
9. Dokumentasikan Perubahan di README
```

## 📞 Bantuan

Jika mengalami kesulitan:
1. Lihat contoh data yang sudah ada di file JSON
2. Ikuti format yang persis sama
3. Test step-by-step, jangan langsung banyak perubahan
4. Hubungi tim developer jika ada error

---

**Selamat menambahkan data! Semakin lengkap data, semakin bermanfaat chatbot untuk peternak.** 🎉
