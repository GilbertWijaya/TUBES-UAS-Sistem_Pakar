import { rules } from './rules';

export async function handleMessage(client: any, from: string, text?: string) {
  if (!text) return;

  const cleaned = text.trim();

  // Jika user ketik "menu"
  if (cleaned.toLowerCase() === 'menu') {
    const rule = rules['menu'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, { text: rule.message });
    return;
  }

  // Jika cocok dengan salah satu kode rule
  if (rules[cleaned]) {
    const rule = rules[cleaned];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await client.sendMessage(from, { text: rule.message });
    return;
  }

  // Jika input tidak dikenali
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await client.sendMessage(from, {
    text: '❓ Maaf, saya belum mengenali pilihan itu.\nKetik *menu* untuk kembali ke awal.',
  });
}
