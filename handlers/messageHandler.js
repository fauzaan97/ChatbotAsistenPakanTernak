const pakanData = require('../data/pakan.json');
const hargaData = require('../data/harga.json');
const tipsData = require('../data/tips.json');
const fermentasiData = require('../data/fermentasi.json');
const strategiMusimData = require('../data/strategi_musim.json');

// Simpan state user (dalam memory, akan hilang jika restart)
const userStates = {};

// Format menu utama
function getMainMenu() {
    return `🐄 *CHATBOT PAKAN TERNAK SEYEGAN* 🐓

Halo! 👋

Saya adalah asisten yang siap membantu tentang pakan ternak.

*SILAKAN PILIH:*

1️⃣ Jenis-Jenis Pakan Ternak
     (Rumput, Jerami, Ampas Tahu)

2️⃣ Hitung Kebutuhan Pakan
     (Berapa banyak pakan yang diperlukan)

3️⃣ Harga Pakan Sekarang
     (Daftar harga pakan terbaru)

4️⃣ Cara Mengolah Pakan
     (Silase, Hay, Fermentasi)

5️⃣ Pakan Musim Hujan/Kemarau
     (Pakan yang cocok tiap musim)

6️⃣ Tips Memberi Pakan
     (Jadwal, penyimpanan, campuran)

7️⃣ Pertanyaan Umum
     (Jawaban pertanyaan yang sering ditanya)

━━━━━━━━━━━━━━━━━━━━━━━━
📝 *Cara pakai:*
Ketik angka *1* sampai *7* lalu kirim

Ketik *menu* kapan saja untuk kembali ke sini`;
}

// Menu kategori pakan
function getMenuKategoriPakan() {
    return `🌾 *JENIS PAKAN TERNAK*

Pakan mana yang ingin dilihat?

1️⃣ *Rumput-rumputan*
     Rumput Odot, Gajah, Raja, dll

2️⃣ *Sisa Hasil Panen*
     Jerami padi, kacang, jagung

3️⃣ *Ampas Tahu*
     Pakan dari sisa pembuatan tahu

━━━━━━━━━━━━━━━━━━━━━━━━
Ketik angka *1*, *2*, atau *3*
Ketik *menu* untuk kembali`;
}

// Menu rumput
function getMenuRumput() {
    return `🌱 *MACAM-MACAM RUMPUT PAKAN*

Pilih rumput yang ingin diketahui:

1️⃣ Rumput Odot (batang kecil, daun lembut)
2️⃣ Rumput Gajah (batang besar, tumbuh cepat)
3️⃣ Rumput Raja / King Grass (hasil panen banyak)
4️⃣ Rumput Benggala (tahan kering)
5️⃣ Rumput Pakchong (tinggi protein)
6️⃣ Rumput Gama Umami (enak untuk ternak)
7️⃣ Rumput Liar (dari kebun/sawah)

━━━━━━━━━━━━━━━━━━━━━━━━
Ketik angka *1* sampai *7*
Ketik *menu* untuk kembali`;
}

// Menu limbah pertanian
function getMenuLimbahPertanian() {
    return `🌾 *SISA HASIL PANEN UNTUK PAKAN*

Pilih yang ingin diketahui:

1️⃣ *Jerami Padi*
     Batang padi setelah panen

2️⃣ *Jerami Kacang Tanah*
     Batang dan daun kacang tanah

3️⃣ *Jerami Jagung*
     Batang jagung setelah dipanen

━━━━━━━━━━━━━━━━━━━━━━━━
Ketik angka *1*, *2*, atau *3*
Ketik *menu* untuk kembali`;
}

// Menu pengolahan pakan
function getMenuPengolahan() {
    return `🔄 *CARA MENGOLAH PAKAN*

Pilih cara pengolahan yang ingin dipelajari:

1️⃣ *Silase (Pakan Fermentasi)*
     Pakan yang diawetkan dengan cara difermentasi
     supaya tahan lama dan bergizi

2️⃣ *Hay (Pakan Kering)*
     Rumput yang dikeringkan supaya bisa
     disimpan lama untuk musim kemarau

3️⃣ *Fermentasi Ampas Tahu*
     Cara mengolah ampas tahu supaya
     lebih awet dan bergizi

━━━━━━━━━━━━━━━━━━━━━━━━
Ketik angka *1*, *2*, atau *3*
Ketik *menu* untuk kembali`;
}

// Menu strategi musim
function getMenuStrategiMusim() {
    return `☀️🌧️ *PAKAN SESUAI MUSIM*

Pilih yang ingin diketahui:

1️⃣ *Pakan untuk Musim Hujan*
     Rumput melimpah, cara menyimpan

2️⃣ *Pakan untuk Musim Kemarau*
     Pakan alternatif saat rumput susah

3️⃣ *Pakan Sepanjang Tahun*
     Cara mengatur pakan supaya
     ternak tidak kekurangan makan

━━━━━━━━━━━━━━━━━━━━━━━━
Ketik angka *1*, *2*, atau *3*
Ketik *menu* untuk kembali`;
}

// Format informasi rumput detail
function getInfoRumput(jenis) {
    const rumput = pakanData.rumput[jenis];
    if (!rumput) return '🙏 Maaf, data rumput ini belum tersedia.';
    
    let response = `🌱 *${rumput.nama.toUpperCase()}*\n\n`;
    response += `📝 *Deskripsi:*\n${rumput.deskripsi}\n\n`;
    
    response += `✨ *Keunggulan:*\n`;
    rumput.keunggulan.forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n🔬 *Kandungan Nutrisi:*\n`;
    Object.keys(rumput.nutrisi).forEach(key => {
        const label = key.replace(/([A-Z])/g, ' $1').trim();
        response += `• ${label}: ${rumput.nutrisi[key]}\n`;
    });
    
    if (rumput.penanaman) {
        response += `\n🌾 *Cara Penanaman:*\n`;
        Object.keys(rumput.penanaman).forEach(key => {
            const label = key.replace(/([A-Z])/g, ' $1').trim();
            response += `• ${label}: ${rumput.penanaman[key]}\n`;
        });
    }
    
    if (rumput.perawatan) {
        response += `\n🔧 *Perawatan:*\n`;
        Object.keys(rumput.perawatan).forEach(key => {
            const label = key.replace(/([A-Z])/g, ' $1').trim();
            response += `• ${label}: ${rumput.perawatan[key]}\n`;
        });
    }
    
    response += `\n📋 *Cara Penggunaan:*\n`;
    rumput.penggunaan.forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n📅 *Rekomendasi Musim:* `;
    response += rumput.rekomendasiMusim.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');
    
    response += `\n\nKetik *menu* untuk kembali`;
    return response;
}

// Format informasi limbah pertanian
function getInfoLimbahPertanian(jenis) {
    const limbah = pakanData.limbahPertanian[jenis];
    if (!limbah) return '🙏 Maaf, data jerami ini belum tersedia.';
    
    let response = `🌾 *${limbah.nama.toUpperCase()}*\n\n`;
    response += `📝 *Deskripsi:*\n${limbah.deskripsi}\n\n`;
    
    response += `✨ *Keunggulan:*\n`;
    limbah.keunggulan.forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n🔬 *Kandungan Nutrisi:*\n`;
    Object.keys(limbah.nutrisi).forEach(key => {
        const label = key.replace(/([A-Z])/g, ' $1').trim();
        response += `• ${label}: ${limbah.nutrisi[key]}\n`;
    });
    
    if (limbah.pengolahan) {
        response += `\n🔄 *Pengolahan:*\n`;
        limbah.pengolahan.forEach((item, idx) => {
            response += `${idx + 1}. ${item}\n`;
        });
    }
    
    response += `\n📋 *Cara Penggunaan:*\n`;
    limbah.penggunaan.forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n📅 *Rekomendasi Musim:* ${limbah.rekomendasiMusim.join(', ')}`;
    
    response += `\n\nKetik *menu* untuk kembali`;
    return response;
}

// Format informasi ampas tahu
function getInfoAmpasTahu() {
    const ampas = pakanData.limbahPadat.ampasTahu;
    
    let response = `🥛 *${ampas.nama.toUpperCase()}*\n\n`;
    response += `📝 *Deskripsi:*\n${ampas.deskripsi}\n\n`;
    
    response += `✨ *Keunggulan:*\n`;
    ampas.keunggulan.forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n🔬 *Kandungan Nutrisi:*\n`;
    Object.keys(ampas.nutrisi).forEach(key => {
        const label = key.replace(/([A-Z])/g, ' $1').trim();
        response += `• ${label}: ${ampas.nutrisi[key]}\n`;
    });
    
    response += `\n🔄 *Pengolahan:*\n`;
    ampas.pengolahan.forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n📋 *Cara Penggunaan:*\n`;
    ampas.penggunaan.forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n📅 *Rekomendasi Musim:* ${ampas.rekomendasiMusim.join(', ')}`;
    
    response += `\n\nKetik *menu* untuk kembali`;
    return response;
}

// Format cara pengolahan
function getInfoPengolahan(jenis) {
    const data = fermentasiData[jenis];
    if (!data) return '🙏 Maaf, data pengolahan ini belum tersedia.';
    
    let response = `🔄 *${data.nama.toUpperCase()}*\n\n`;
    response += `📝 *Deskripsi:*\n${data.deskripsi}\n\n`;
    
    if (data.bahanCocok) {
        response += `🌾 *Bahan yang Cocok:*\n`;
        data.bahanCocok.forEach((item, idx) => {
            response += `${idx + 1}. ${item}\n`;
        });
        response += '\n';
    }
    
    if (data.bahanDibutuhkan) {
        response += `📦 *Bahan yang Dibutuhkan:*\n`;
        Object.keys(data.bahanDibutuhkan).forEach(key => {
            const label = key.replace(/([A-Z])/g, ' $1').trim();
            response += `• ${label}: ${data.bahanDibutuhkan[key]}\n`;
        });
        response += '\n';
    }
    
    response += `📋 *Langkah-Langkah:*\n`;
    data.langkahLangkah.forEach(step => {
        response += `\n*${step.step}. ${step.judul}*\n`;
        response += `${step.detail}\n`;
    });
    
    response += `\n✅ *Ciri ${data.nama} yang Baik:*\n`;
    const ciriKey = jenis === 'silase' ? 'ciriSilaseBaik' : 
                    jenis === 'hay' ? 'ciriHayBaik' : 'ciriAmpasTahuBaik';
    data[ciriKey].forEach((item, idx) => {
        response += `${idx + 1}. ${item}\n`;
    });
    
    response += `\n⏱️ *Waktu:* ${data.waktuFermentasi || data.waktuPengeringan}`;
    response += `\n📦 *Penyimpanan:* ${data.penyimpanan}`;
    
    response += `\n\nKetik *menu* untuk kembali`;
    return response;
}

// Format strategi musim
function getInfoStrategiMusim(jenis) {
    let data;
    if (jenis === 'hujan') data = strategiMusimData.musimHujan;
    else if (jenis === 'kemarau') data = strategiMusimData.musimKemarau;
    else if (jenis === 'kombinasi') data = strategiMusimData.strategiKombinasi;
    else return '🙏 Maaf, data strategi musim ini belum tersedia.';
    
    let response = `${jenis === 'hujan' ? '🌧️' : jenis === 'kemarau' ? '☀️' : '📅'} *${data.nama.toUpperCase()}*\n\n`;
    
    if (data.kondisi) {
        response += `📊 *Kondisi:* ${data.kondisi}\n`;
        response += `🎯 *Fokus:* ${data.fokus}\n\n`;
    }
    
    if (data.tujuan) {
        response += `🎯 *Tujuan:* ${data.tujuan}\n\n`;
    }
    
    if (data.pakanDirekomendasikan) {
        response += `🌾 *Pakan yang Direkomendasikan:*\n\n`;
        data.pakanDirekomendasikan.forEach((pakan, idx) => {
            response += `${idx + 1}. *${pakan.nama}*\n`;
            response += `   📌 Prioritas: ${pakan.prioritas}\n`;
            response += `   💡 ${pakan.alasan}\n\n`;
        });
    }
    
    if (data.aktivitasUtama) {
        response += `📋 *Aktivitas Utama:*\n`;
        data.aktivitasUtama.forEach((item, idx) => {
            response += `${idx + 1}. ${item}\n`;
        });
        response += '\n';
    }
    
    if (data.tips) {
        response += `💡 *Tips:*\n`;
        data.tips.forEach((item, idx) => {
            response += `${idx + 1}. ${item}\n`;
        });
        response += '\n';
    }
    
    if (data.pendekatan) {
        response += `📋 *Pendekatan:*\n`;
        response += `• Musim Hujan: ${data.pendekatan.musimHujan}\n`;
        response += `• Musim Kemarau: ${data.pendekatan.musimKemarau}\n\n`;
    }
    
    if (data.manfaat) {
        response += `✨ *Manfaat:*\n`;
        data.manfaat.forEach((item, idx) => {
            response += `${idx + 1}. ${item}\n`;
        });
        response += '\n';
    }
    
    if (data.langkahImplementasi) {
        response += `🔧 *Langkah Implementasi:*\n\n`;
        data.langkahImplementasi.forEach((langkah, idx) => {
            response += `*${idx + 1}. ${langkah.waktu}*\n`;
            response += `   Kegiatan: ${langkah.kegiatan}\n`;
            response += `   Target: ${langkah.target}\n\n`;
        });
    }
    
    response += `Ketik *menu* untuk kembali`;
    return response;
}

// Fungsi untuk mendapatkan harga pakan (dari file lama, bisa disesuaikan)
function getHargaPakan(jenisTernak) {
    const data = hargaData.hargaPakan[jenisTernak];
    if (!data) return '🙏 Maaf, data harga pakan ini belum tersedia.';
    
    let response = `💰 *HARGA PAKAN ${jenisTernak.toUpperCase()}*\n`;
    response += `_Update: ${hargaData.updateTerakhir}_\n\n`;
    
    data.forEach((item, index) => {
        response += `${index + 1}. *${item.nama}*\n`;
        response += `   💵 Rp ${item.harga} ${item.satuan}\n`;
        response += `   ℹ️ ${item.keterangan}\n\n`;
    });
    
    response += `⚠️ ${hargaData.catatan}\n\n`;
    response += `Ketik *menu* untuk kembali`;
    return response;
}

// Fungsi menghitung kebutuhan pakan (dari file lama)
function hitungPakan(jenisTernak, jumlah, beratRataRata) {
    let response = `📊 *HASIL HITUNGAN KEBUTUHAN PAKAN*\n\n`;
    response += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    response += `🐄 Jenis Ternak: *${jenisTernak.toUpperCase()}*\n`;
    response += `🔢 Jumlah: *${jumlah} ekor*\n`;
    response += `⚖️ Berat rata-rata: *${beratRataRata} kg*\n`;
    response += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    if (jenisTernak === 'sapi') {
        const hijauan = (beratRataRata * 0.10) * jumlah;
        const konsentrat = (beratRataRata * 0.015) * jumlah;
        
        response += `*PAKAN SETIAP HARI:*\n`;
        response += `🌾 Rumput/Hijauan: *${hijauan.toFixed(1)} kg*\n`;
        response += `🌽 Konsentrat (dedak/ampas): *${konsentrat.toFixed(1)} kg*\n\n`;
        response += `*PAKAN SEBULAN (30 hari):*\n`;
        response += `🌾 Rumput/Hijauan: *${(hijauan * 30).toFixed(1)} kg*\n`;
        response += `🌽 Konsentrat: *${(konsentrat * 30).toFixed(1)} kg*\n`;
        
    } else if (jenisTernak === 'kambing') {
        const hijauan = (beratRataRata * 0.12) * jumlah;
        const konsentrat = (beratRataRata * 0.01) * jumlah;
        
        response += `*PAKAN SETIAP HARI:*\n`;
        response += `🌾 Rumput/Daun-daunan: *${hijauan.toFixed(1)} kg*\n`;
        response += `🌽 Konsentrat (dedak/ampas): *${konsentrat.toFixed(1)} kg*\n\n`;
        response += `*PAKAN SEBULAN (30 hari):*\n`;
        response += `🌾 Rumput/Daun-daunan: *${(hijauan * 30).toFixed(1)} kg*\n`;
        response += `🌽 Konsentrat: *${(konsentrat * 30).toFixed(1)} kg*\n`;
        
    } else if (jenisTernak === 'ayam') {
        let pakanPerEkor = 0;
        let fase = '';
        
        if (beratRataRata < 0.5) {
            pakanPerEkor = 0.03;
            fase = 'Ayam Kecil (Anakan)';
        } else if (beratRataRata < 1.5) {
            pakanPerEkor = 0.06;
            fase = 'Ayam Remaja';
        } else {
            pakanPerEkor = 0.11;
            fase = 'Ayam Dewasa';
        }
        
        const pakanHarian = pakanPerEkor * jumlah;
        
        response += `📌 Umur Ayam: *${fase}*\n\n`;
        response += `*PAKAN SETIAP HARI:*\n`;
        response += `🌾 Total Pakan: *${pakanHarian.toFixed(2)} kg*\n`;
        response += `   (Setiap ekor dapat *${(pakanPerEkor * 1000).toFixed(0)} gram*)\n\n`;
        response += `*PAKAN SEBULAN (30 hari):*\n`;
        response += `🌾 Total Pakan: *${(pakanHarian * 30).toFixed(1)} kg*\n`;
    }
    
    response += `\n━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    response += `💡 *Catatan Penting:*\n`;
    response += `Hitungan ini adalah perkiraan. Bisa disesuaikan dengan kondisi ternak.\n\n`;
    response += `Ketik *menu* untuk kembali`;
    return response;
}

// Format menu jenis ternak untuk hitung dan harga
function getMenuTernak() {
    return `Punya ternak apa?

1️⃣ *Sapi*
2️⃣ *Kambing*
3️⃣ *Ayam*

━━━━━━━━━━━━━━━━━━━━━━━━
Ketik angka *1*, *2*, atau *3*
Ketik *menu* untuk kembali`;
}

// Menu tips (dari file lama)
function getMenuTips() {
    return `📚 *TIPS MEMBERI PAKAN TERNAK*

Pilih yang ingin dipelajari:

1️⃣ *Jadwal Memberi Pakan*
     Kapan waktu yang tepat memberi makan

2️⃣ *Cara Menyimpan Pakan*
     Supaya pakan tidak rusak/berjamur

3️⃣ *Cara Mencampur Pakan*
     Campuran pakan yang baik

4️⃣ *Tips Tambahan*
     Hal penting lainnya

━━━━━━━━━━━━━━━━━━━━━━━━
Ketik angka *1*, *2*, *3*, atau *4*
Ketik *menu* untuk kembali`;
}

// Fungsi getTips (dari file lama)
function getTips(kategori) {
    let response = '';
    
    switch(kategori) {
        case '1':
            const jadwal = tipsData.tips.jadwal;
            response = `⏰ *${jadwal.judul}*\n\n`;
            jadwal.konten.forEach(tip => {
                response += `${tip}\n`;
            });
            break;
        case '2':
            const penyimpanan = tipsData.tips.penyimpanan;
            response = `📦 *${penyimpanan.judul}*\n\n`;
            penyimpanan.konten.forEach(tip => {
                response += `${tip}\n`;
            });
            break;
        case '3':
            const pencampuran = tipsData.tips.pencampuran;
            response = `🔄 *${pencampuran.judul}*\n\n`;
            pencampuran.konten.forEach(tip => {
                response += `${tip}\n`;
            });
            break;
        case '4':
            const umum = tipsData.tips.umum;
            response = `💡 *${umum.judul}*\n\n`;
            umum.konten.forEach(tip => {
                response += `${tip}\n`;
            });
            break;
        default:
            response = '🙏 Pilihan tidak tersedia.';
    }
    
    response += `\n\nKetik *menu* untuk kembali`;
    return response;
}

// Fungsi getFAQ (dari file lama)
function getFAQ() {
    let response = `❓ *PERTANYAAN YANG SERING DITANYAKAN*\n\n`;
    
    tipsData.faq.forEach((item, index) => {
        response += `*${index + 1}. ${item.pertanyaan}*\n`;
        response += `${item.jawaban}\n\n`;
    });
    
    response += `📞 *Butuh Bantuan Lebih Lanjut?*\n`;
    response += `Silakan hubungi petugas penyuluh peternakan desa atau tim KKN kami.\n\n`;
    response += `Ketik *menu* untuk kembali`;
    return response;
}

// Handler utama untuk memproses pesan
async function handleMessage(text, userId) {
    const input = text.toLowerCase().trim();
    
    if (!userStates[userId]) {
        userStates[userId] = {
            menu: null,
            submenu: null,
            step: 0,
            data: {}
        };
    }
    
    const state = userStates[userId];
    
    // Reset ke menu utama
    if (input === 'menu' || input === '/start' || input === 'mulai') {
        state.menu = null;
        state.submenu = null;
        state.step = 0;
        state.data = {};
        return getMainMenu();
    }
    
    // Menu utama
    if (!state.menu) {
        switch(input) {
            case '1':
                state.menu = 'jenis_pakan';
                return getMenuKategoriPakan();
            case '2':
                state.menu = 'hitung_pakan';
                state.step = 1;
                return getMenuTernak();
            case '3':
                state.menu = 'harga_pakan';
                return getMenuTernak();
            case '4':
                state.menu = 'pengolahan';
                return getMenuPengolahan();
            case '5':
                state.menu = 'strategi_musim';
                return getMenuStrategiMusim();
            case '6':
                state.menu = 'tips';
                return getMenuTips();
            case '7':
                state.menu = null;
                return getFAQ();
            default:
                return getMainMenu();
        }
    }
    
    // Handler jenis pakan
    if (state.menu === 'jenis_pakan' && !state.submenu) {
        if (input === '1') {
            state.submenu = 'rumput';
            return getMenuRumput();
        } else if (input === '2') {
            state.submenu = 'limbah_pertanian';
            return getMenuLimbahPertanian();
        } else if (input === '3') {
            state.menu = null;
            state.submenu = null;
            return getInfoAmpasTahu();
        }
        return '🙏 Pilihan tidak tersedia. ' + getMenuKategoriPakan();
    }
    
    // Handler rumput
    if (state.menu === 'jenis_pakan' && state.submenu === 'rumput') {
        const rumputMap = ['odot', 'gajah', 'raja', 'benggala', 'pakchong', 'gamaUmami', 'liar'];
        const idx = parseInt(input) - 1;
        if (idx >= 0 && idx < rumputMap.length) {
            state.menu = null;
            state.submenu = null;
            return getInfoRumput(rumputMap[idx]);
        }
        return '🙏 Pilihan tidak tersedia. ' + getMenuRumput();
    }
    
    // Handler limbah pertanian
    if (state.menu === 'jenis_pakan' && state.submenu === 'limbah_pertanian') {
        const limbahMap = ['jeramiPadi', 'jeramiKacangTanah', 'jeramiJagung'];
        const idx = parseInt(input) - 1;
        if (idx >= 0 && idx < limbahMap.length) {
            state.menu = null;
            state.submenu = null;
            return getInfoLimbahPertanian(limbahMap[idx]);
        }
        return '🙏 Pilihan tidak tersedia. ' + getMenuLimbahPertanian();
    }
    
    // Handler pengolahan
    if (state.menu === 'pengolahan') {
        const pengolahanMap = ['silase', 'hay', 'ampasTahu'];
        const idx = parseInt(input) - 1;
        if (idx >= 0 && idx < pengolahanMap.length) {
            state.menu = null;
            return getInfoPengolahan(pengolahanMap[idx]);
        }
        return '🙏 Pilihan tidak tersedia. ' + getMenuPengolahan();
    }
    
    // Handler strategi musim
    if (state.menu === 'strategi_musim') {
        const musimMap = ['hujan', 'kemarau', 'kombinasi'];
        const idx = parseInt(input) - 1;
        if (idx >= 0 && idx < musimMap.length) {
            state.menu = null;
            return getInfoStrategiMusim(musimMap[idx]);
        }
        return '🙏 Pilihan tidak tersedia. ' + getMenuStrategiMusim();
    }
    
    // Handler harga pakan
    if (state.menu === 'harga_pakan') {
        let jenisTernak = '';
        if (input === '1') jenisTernak = 'sapi';
        else if (input === '2') jenisTernak = 'kambing';
        else if (input === '3') jenisTernak = 'ayam';
        else return '🙏 Pilihan tidak tersedia. ' + getMenuTernak();
        
        state.menu = null;
        return getHargaPakan(jenisTernak);
    }
    
    // Handler hitung pakan (sama seperti sebelumnya)
    if (state.menu === 'hitung_pakan') {
        if (state.step === 1) {
            if (input === '1') state.data.jenisTernak = 'sapi';
            else if (input === '2') state.data.jenisTernak = 'kambing';
            else if (input === '3') state.data.jenisTernak = 'ayam';
            else return '🙏 Pilihan tidak tersedia. ' + getMenuTernak();
            
            state.step = 2;
            return `Berapa jumlah ${state.data.jenisTernak} yang dimiliki?\n\n📝 Ketik angkanya saja\nContoh: *5*`;
        }
        else if (state.step === 2) {
            const jumlah = parseInt(input);
            if (isNaN(jumlah) || jumlah <= 0) {
                return '🙏 Maaf, tolong ketik angka yang benar untuk jumlah ternak.\n\nContoh: *5*';
            }
            state.data.jumlah = jumlah;
            state.step = 3;
            
            if (state.data.jenisTernak === 'ayam') {
                return `Berapa kira-kira berat ayam? (dalam kg)\n\n📝 Ketik angkanya saja\nContoh:\n• Ketik *0.3* untuk ayam kecil (300 gram)\n• Ketik *1.5* untuk ayam dewasa`;
            } else {
                return `Berapa kira-kira berat rata-rata ${state.data.jenisTernak}? (dalam kg)\n\n📝 Ketik angkanya saja\nContoh: *300*`;
            }
        }
        else if (state.step === 3) {
            const berat = parseFloat(input);
            if (isNaN(berat) || berat <= 0) {
                return '🙏 Maaf, tolong ketik angka yang benar untuk berat ternak.\n\nContoh: *300*';
            }
            state.data.berat = berat;
            
            const hasil = hitungPakan(state.data.jenisTernak, state.data.jumlah, state.data.berat);
            
            state.menu = null;
            state.step = 0;
            state.data = {};
            
            return hasil;
        }
    }
    
    // Handler tips
    if (state.menu === 'tips') {
        if (['1', '2', '3', '4'].includes(input)) {
            state.menu = null;
            return getTips(input);
        } else {
            return '🙏 Pilihan tidak tersedia. ' + getMenuTips();
        }
    }
    
    return `🙏 Maaf, saya belum paham maksud "${text}".\n\nSilakan pilih dari menu di bawah ini:\n\n` + getMainMenu();
}

module.exports = { handleMessage };
