const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const P = require('pino');
const { handleMessage } = require('./handlers/messageHandler');

// Konfigurasi logger
const logger = P({ level: 'silent' });

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version } = await fetchLatestBaileysVersion();
    
    console.log('Menggunakan WA Web versi:', version.join('.'));
    
    const sock = makeWASocket({
        logger,
        printQRInTerminal: true,
        auth: state,
        version,
        browser: ['Chatbot Pakan Ternak', 'Chrome', '120.0.0'],
    });

    // Event ketika QR code dibuat
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('\n===========================================');
            console.log('SCAN QR CODE DI BAWAH INI DENGAN WHATSAPP');
            console.log('===========================================\n');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            
            console.log('Koneksi terputus. Status code:', statusCode);
            
            if (shouldReconnect) {
                console.log('Mencoba reconnect dalam 3 detik...');
                setTimeout(() => {
                    connectToWhatsApp();
                }, 3000);
            } else {
                console.log('Logged out. Silakan hapus folder auth_info_baileys dan jalankan ulang untuk scan QR baru.');
            }
        } else if (connection === 'open') {
            console.log('\n✅ Bot WhatsApp Berhasil Terhubung!');
            console.log('Bot siap menerima pesan...\n');
        }
    });

    // Simpan kredensial
    sock.ev.on('creds.update', saveCreds);

    // Handler pesan masuk
    sock.ev.on('messages.upsert', async (m) => {
        try {
            const msg = m.messages[0];
            
            // Abaikan pesan dari bot sendiri dan pesan tanpa konten
            if (!msg.message || msg.key.fromMe) return;
            
            // Ambil nomor pengirim
            const from = msg.key.remoteJid;
            
            // Ambil text pesan
            const messageText = msg.message.conversation || 
                               msg.message.extendedTextMessage?.text || '';
            
            console.log(`\n📩 Pesan dari ${from}: ${messageText}`);
            
            // Proses pesan dan dapatkan balasan
            const reply = await handleMessage(messageText, from);
            
            // Kirim balasan
            if (reply) {
                await sock.sendMessage(from, { text: reply });
                console.log(`✅ Balasan terkirim ke ${from}`);
            }
            
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    return sock;
}

// Jalankan bot
connectToWhatsApp();

// Handle error global
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
