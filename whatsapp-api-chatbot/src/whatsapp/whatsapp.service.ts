// import { Injectable, Logger } from '@nestjs/common';
// import * as path from 'path';
// import * as fs from 'fs';
// import QRCode from 'qrcode-terminal';
// import { handleMessage } from './handler';

// @Injectable()
// export class WhatsappService {
//   private client: any;
//   private readonly logger = new Logger(WhatsappService.name);

//   async onModuleInit() {
//     await this.initializeBot();
//   }

//   private async initializeBot() {
//     try {
//       this.logger.log('🚀 Inisialisasi WhatsApp bot...');

//       // ✅ Dynamic import Baileys (ESM)
//       const baileys = await import('@whiskeysockets/baileys');
//       const {
//         makeWASocket,
//         useMultiFileAuthState,
//         DisconnectReason,
//         fetchLatestBaileysVersion,
//       } = baileys;

//       const { version } = await fetchLatestBaileysVersion();

//       const authDir = path.resolve('./auth_info');
//       if (!fs.existsSync(authDir)) fs.mkdirSync(authDir);

//       const { state, saveCreds } = await useMultiFileAuthState(authDir);

//       this.client = makeWASocket({
//         printQRInTerminal: true,
//         auth: state,
//         version,
//         browser: ['NestJS Bot', 'Chrome', '10.0'],
//       });

//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//       this.client.ev.on('creds.update', saveCreds);

//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//       this.client.ev.on('connection.update', (update) => {
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//         const { connection, lastDisconnect, qr } = update;

//         if (qr) {
//           this.logger.log('🧾 Scan QR untuk login:');
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           QRCode.generate(qr, { small: true });
//         }

//         if (connection === 'open') {
//           this.logger.log('✅ WhatsApp bot terhubung!');
//         } else if (connection === 'close') {
//           const shouldReconnect =
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//             lastDisconnect?.error?.output?.statusCode !==
//             DisconnectReason.loggedOut;
//           this.logger.warn(
//             `⚠️ Koneksi terputus. Reconnect: ${shouldReconnect}`,
//           );
//           if (shouldReconnect) this.initializeBot();
//         }
//       });

//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//       this.client.ev.on('messages.upsert', async (msgUpdate) => {
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//         const message = msgUpdate.messages[0];
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//         if (!message.message || message.key.fromMe) return;

//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//         const from = message.key.remoteJid!;
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//         const text =
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//           message.message.conversation ||
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//           message.message.extendedTextMessage?.text;

//         this.logger.log(`📩 Pesan masuk dari ${from}: ${text}`);

//         // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//         if (text?.toLowerCase() === 'menu') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '😁 Halo, Yarkham Gallery di sini, Silahkan pilih menu 🙏:\n1. Katalog\n2. Bantuan \n3. Rekomendasi \n4. Cek Promo',
//           });
//         } else if (text === '1') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '📦 Katalog kami:\n- 1A. Sofa & Kursi\n- 1B. Dekorasi Meja\n- 1C. Dekorasi Lantai \n- 1D. Set Perlengkapan',
//           });
//         } else if (text === '1A') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🛋️ Sofa dan Kursi: \n1A1. Rangka Rotan \n1A2. Rangka Besi',
//           });
//         } else if (text === '1B') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🛋️ Dekorasi Meja: \n1B1. Kecil \n1B2. Besar',
//           });
//         } else if (text === '1B1' || text === '1B2') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🛋️ Dekorasi Meja: \n1B1A. Bundle \n1B2A. Non-Bundle',
//           });
//         } else if (text === '1B2A') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🛋️ Ukuran Meja: \n1B2A1. 120 * 80 \n1B2A2. Ukuran Lain',
//           });
//         } else if (text === '1C') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🏠 Dekorasi Lantai: \n1C1. Fungsional \n1C2. Hiasan',
//           });
//         } else if (text === '1C1' || text === '1C2') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🏠 Dekorasi Lantai: \n1C1A. Bundle \n1C1B. Non-Bundle',
//           });
//         } else if (text === '1D') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🧰 Set Perlengkapan: \n1D1. Kitchen \n1D2. Meja \n1D4. Buffet \n1D5. Kursi',
//           });
//         } else if (text === '2') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '2A. 🆘 Hubungi admin di wa.me/628xxxxxx \n 2B. 📍Keterangan dan Lokasi',
//           });
//         } else if (text === '3') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: 'Kirimkan preferensi produk, dan kami akan memberikan rekomendasi produk yang sesuai dengan kebutuhan Anda! 😊',
//           });
//         } else if (text === '4') {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//           await this.client.sendMessage(from, {
//             text: '🧾Cek Promo: \n4A. Potongan Harga \n4B. Gratis Ongkir \n4C. Cashback 10% \n4D. Buy 1 Get 1 \n Syarat dan ketentuan berlaku hubungi Admin.',
//           });
//         }
//       });
//     } catch (err) {
//       this.logger.error('❌ Gagal inisialisasi bot:', err);
//     }
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import QRCode from 'qrcode-terminal';
import { handleMessage } from './handler'; // ✅ gunakan handler modular

@Injectable()
export class WhatsappService {
  private client: any;
  private readonly logger = new Logger(WhatsappService.name);

  async onModuleInit() {
    await this.initializeBot();
  }

  private async initializeBot() {
    try {
      this.logger.log('🚀 Inisialisasi WhatsApp bot...');

      const baileys = await import('@whiskeysockets/baileys');
      const {
        makeWASocket,
        useMultiFileAuthState,
        DisconnectReason,
        fetchLatestBaileysVersion,
      } = baileys;

      const { version } = await fetchLatestBaileysVersion();
      const authDir = path.resolve('./auth_info');
      if (!fs.existsSync(authDir)) fs.mkdirSync(authDir);

      const { state, saveCreds } = await useMultiFileAuthState(authDir);

      this.client = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        version,
        browser: ['NestJS Bot', 'Chrome', '10.0'],
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.client.ev.on('creds.update', saveCreds);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.client.ev.on('connection.update', (update) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          this.logger.log('🧾 Scan QR untuk login:');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          QRCode.generate(qr, { small: true });
        }

        if (connection === 'open') {
          this.logger.log('✅ WhatsApp bot terhubung!');
        } else if (connection === 'close') {
          const shouldReconnect =
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            lastDisconnect?.error?.output?.statusCode !==
            DisconnectReason.loggedOut;
          this.logger.warn(
            `⚠️ Koneksi terputus. Reconnect: ${shouldReconnect}`,
          );
          if (shouldReconnect) this.initializeBot();
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.client.ev.on('messages.upsert', async (msgUpdate) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const message = msgUpdate.messages[0];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!message.message || message.key.fromMe) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const from = message.key.remoteJid!;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const text =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message.message.conversation ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message.message.extendedTextMessage?.text;

        this.logger.log(`📩 Pesan masuk dari ${from}: ${text}`);

        // ✅ Gunakan handler untuk menentukan respon
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await handleMessage(this.client, from, text);
      });
    } catch (err) {
      this.logger.error('❌ Gagal inisialisasi bot:', err);
    }
  }
}
