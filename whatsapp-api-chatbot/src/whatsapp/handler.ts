import axios from 'axios';
import { rules } from './rules';

interface Session {
  history: string[];
  waitingFinal?: boolean;
  expectingInputForRoot3?: boolean; // FLAG khusus ROOT 3
}

const sessions: Record<string, Session> = {};

export async function handleMessage(client: any, from: string, text?: string) {
  if (!text) return;

  const cleaned = text.trim().toUpperCase();

  // ========= START FLOW =========
  if (cleaned === 'MENU') {
    sessions[from] = {
      history: [],
      waitingFinal: false,
      expectingInputForRoot3: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, { text: rules['menu'].message });
    return;
  }

  if (!sessions[from]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, {
      text: '👋 Silakan ketik *menu* untuk mulai.',
    });
    return;
  }

  const session = sessions[from];

  // ========= Jika ROOT 3 sedang menunggu input bebas =========
  if (session.expectingInputForRoot3) {
    const userResponse = text.trim();

    // Simpan ke history
    session.history.push(`USER_INPUT: ${userResponse}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, {
      text: '🔍 Sedang menganalisa jawaban Anda...',
    });

    // Ambil entry terakhir USER_INPUT
    const latestInput =
      session.history.find((h) => h.startsWith('USER_INPUT:')) || '';

    // Ambil hanya value setelah "USER_INPUT:"
    const cleanInput = latestInput.replace('USER_INPUT:', '').trim();

    // Pisahkan input jadi array
    const values = cleanInput.split(',').map((v) => v.trim().toLowerCase());

    // Susun object ke format API endpoint
    const formattedData = {
      goal: values[0] || '',
      rule1: values[1] || '',
      rule2: values[2] || '',
      rule3: values[3] || '',
    };

    console.log('📌 Formatted Payload:', formattedData);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/data/rule',
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.data?.result ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.data?.message ||
        '⚠️ Tidak ditemukan hasil dari jawaban Anda.';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await client.sendMessage(from, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        text: `📦 *Hasil Analisa Program*:\n\nAnda Membutuhkan *${result[0].Value}*\n\n👉 Ketik *menu* untuk memulai kembali.`,
      });

      // 🔥 FIX: Tutup sesi agar tidak lanjut ke pengecekan rule
      session.expectingInputForRoot3 = false;
      session.waitingFinal = true;
      return;
    } catch (error) {
      console.error('❌ Error:', error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await client.sendMessage(from, {
        text: '⚠️ Terjadi kesalahan server. Coba lagi nanti.',
      });
    }
  }

  // ========= BLOCK EXTRA INPUT AFTER COMPLETION =========
  if (session.waitingFinal) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, {
      text: '⚠️ Anda sudah menyelesaikan pilihan.\nKetik *menu* untuk mulai ulang.',
    });
    return;
  }

  // ========= VALIDATE CHOICE =========
  const matchedKey = Object.keys(rules).find(
    (key) => key.toUpperCase() === cleaned,
  );

  if (!matchedKey) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, {
      text: '⚠️ Pilihan tidak valid.\nKetik *menu* untuk ulang.',
    });
    return;
  }

  const rule = rules[matchedKey];
  session.history.push(matchedKey);

  console.log(`📌 HISTORY (${from}):`, session.history);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await client.sendMessage(from, {
    text: rule.message ?? 'pilihan anda diproses',
  });

  // ========= Jika user memilih ROOT 3 → aktifkan input bebas =========
  if (matchedKey.toLowerCase() === 'Rekomendasi'.toLowerCase()) {
    session.expectingInputForRoot3 = true;
    return; // stop — tidak lanjut final check
  }

  // ========= FINAL CHECK =========
  const isFinal =
    rule.isFinal === true ||
    rule.next?.length === 0 ||
    !Array.isArray(rule.next);

  if (!isFinal) return;

  // ========= FINAL PROCESS =========
  session.waitingFinal = true;

  try {
    // hanya root 1 yg di kirim ke API ini
    if (session.history[0].toLowerCase() === 'katalog') {
      console.log(session.history);

      // ambil semua pilihan setelah 'Katalog'
      const remainder = session.history.slice(1); // ['Karpet','Wol','Motif','Sedang']

      // siapkan payload dengan default ''
      const formattedData: Record<string, string> = {
        goal: remainder[0]?.toLowerCase() || '',
        rule1: remainder[1]?.toLowerCase() || '',
        rule2: remainder[2]?.toLowerCase() || '',
        rule3: remainder[3]?.toLowerCase() || '',
      };

      // Jika kamu mau, bisa trim spasi juga:
      Object.keys(formattedData).forEach((k) => {
        formattedData[k] = (formattedData[k] || '').trim();
      });

      console.log('📦 Data terkirim:', formattedData);

      const response = await axios.post(
        'http://127.0.0.1:5000/api/data/rule',
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(response.data.result);

      // Ambil hasil dari API
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const apiResult = response.data?.result;

      // Jika tidak ada hasil
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!apiResult || apiResult.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await client.sendMessage(from, {
          text: `⚠️ Tidak ditemukan hasil dari pilihan Anda.\n👉 Ketik *menu* untuk memulai kembali.`,
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const item = apiResult[0]; // Ambil record pertama

        // Format output lebih rapi
        const formattedResult =
          `🎯 *Rekomendasi Produk*:\n` +
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `• Produk: ${item.Goal}\n` +
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `• Histori 1: ${item.Rule_1}\n` +
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `• Histori 2: ${item.Rule_2}\n` +
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `• Histori 3: ${item.Rule_3}\n\n` +
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          `📌 *Produk Yang Cocok:* _${item.Value.replace(/_/g, ' ').toUpperCase()}_`;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await client.sendMessage(from, {
          text: `📦 *Hasil Analisa Anda*:\n\n${formattedResult}\n\n👉 Ketik *menu* untuk memulai kembali.`,
        });
      }
    } else {
      // Final tapi bukan root 1 atau 3 → hanya tutup sesi
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await client.sendMessage(from, {
        text: `📍 Anda telah selesai memilih *${matchedKey}*.\n👉 Ketik *menu* untuk mulai ulang.`,
      });
    }
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error('❌ API ERROR:', err.message);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, {
      text: '❌ Server error. Silakan coba lagi nanti.',
    });
  }

  delete sessions[from];
}
