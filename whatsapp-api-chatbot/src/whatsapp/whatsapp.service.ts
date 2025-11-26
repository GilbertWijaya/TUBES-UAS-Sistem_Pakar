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
