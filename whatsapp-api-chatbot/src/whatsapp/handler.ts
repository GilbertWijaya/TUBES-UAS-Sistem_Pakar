// import axios from 'axios';
// import { rules } from './rules';

// interface Session {
//   history: string[];
//   waitingFinal?: boolean;
//   expectingInputForRoot3?: boolean; // FLAG root 3
// }

// const sessions: Record<string, Session> = {};

// export async function handleMessage(client: any, from: string, text?: string) {
//   if (!text) return;

//   const cleaned = text.trim().toUpperCase();

//   // ========= START FLOW =========
//   if (cleaned === 'MENU') {
//     sessions[from] = {
//       history: [],
//       waitingFinal: false,
//       expectingInputForRoot3: false,
//     };
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//     await client.sendMessage(from, { text: rules['menu'].message });
//     return;
//   }

//   if (!sessions[from]) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//     await client.sendMessage(from, {
//       text: '👋 Silakan ketik *menu* untuk mulai.',
//     });
//     return;
//   }

//   const session = sessions[from];

//   // ========= BLOCK EXTRA INPUT AFTER COMPLETION =========
//   if (session.waitingFinal) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//     await client.sendMessage(from, {
//       text: '⚠️ Anda sudah menyelesaikan pilihan.\nKetik *menu* untuk mulai ulang.',
//     });
//     return;
//   }

//   // ========= VALIDATE CHOICE =========
//   const matchedKey = Object.keys(rules).find(
//     (key) => key.toUpperCase() === cleaned,
//   );

//   if (!matchedKey) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//     await client.sendMessage(from, {
//       text: '⚠️ Pilihan tidak valid.\nKetik *menu* untuk ulang.',
//     });
//     return;
//   }

//   // ===== SAVE & RESPOND =====
//   const rule = rules[matchedKey];
//   session.history.push(matchedKey);

//   console.log(`📌 HISTORY (${from}):`, session.history);
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//   await client.sendMessage(from, { text: rule.message });

//   // ========= FINAL CHECK (NEW FIX) =========
//   const isFinal =
//     rule.isFinal === true ||
//     rule.next?.length === 0 ||
//     !Array.isArray(rule.next);

//   if (!isFinal) return; // jika bukan final, stop di sini

//   // ========= FINAL PROCESS =========
//   session.waitingFinal = true;
//   // await client.sendMessage(from, {
//   //   text: '🔍 Sedang memproses jawaban Anda...',
//   // });

//   try {
//     if (session.history[0] === '1') {
//       const response = await axios.post(
//         'http://localhost:3000/api/get-product',
//         {
//           user_id: from,
//           selections: session.history,
//         },
//       );

//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//       const result =
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//         response.data?.result ||
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//         response.data?.message ||
//         '⚠️ Tidak ditemukan hasil dari jawaban Anda.';
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//       await client.sendMessage(from, {
//         text: `📦 *Hasil Analisis Anda:*\n\n${result}\n\n👉 Ketik *menu* untuk memulai kembali.`,
//       });
//     }
//   } catch (err: any) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     console.error('❌ API ERROR:', err.message);
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//     await client.sendMessage(from, {
//       text: '❌ Server error. Silakan coba lagi nanti.',
//     });
//   }

//   delete sessions[from]; // reset setelah selesai
// }
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

    // simpan input user ke history
    session.history.push(`USER_INPUT: ${userResponse}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, {
      text: '🔍 Sedang menganalisa jawaban Anda...',
    });

    console.log(session.history[1]);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/free-input',
        {
          user_id: from,
          input: userResponse,
          history: session.history,
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.data?.result ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.data?.message ||
        '⚠️ Tidak ada respon dari sistem.';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await client.sendMessage(from, {
        text: `📌 *Analisa*: \n\n${result}\n\n👉 Ketik *menu* untuk mulai ulang.`,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await client.sendMessage(from, {
        text: '❌ Server error. Silakan coba lagi nanti.',
      });
    }

    delete sessions[from];
    return;
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
  await client.sendMessage(from, { text: rule.message });

  // ========= Jika user memilih ROOT 3 → aktifkan input bebas =========
  if (matchedKey === '3') {
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
    if (session.history[0] === '1') {
      const response = await axios.post(
        'http://localhost:3000/api/get-product',
        {
          user_id: from,
          selections: session.history,
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
        text: `📦 *Hasil Analisa Anda*:\n\n${result}\n\n👉 Ketik *menu* untuk memulai kembali.`,
      });
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
