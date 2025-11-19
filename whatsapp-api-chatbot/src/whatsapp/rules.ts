export interface Rule {
  message: string;
  next: string[];
}

export const rules: Record<string, Rule> = {
  menu: {
    message:
      '😁 Halo, Yarkham Gallery di sini, Silahkan pilih menu 🙏:\n1. Katalog\n2. Bantuan\n3. Rekomendasi\n4. Cek Promo',
    next: ['1', '2', '3', '4'],
  },

  '1': {
    message:
      '📦 Katalog kami:\n- 1A. Sofa & Kursi\n- 1B. Dekorasi\n- 1C. Set Perlengkapan',
    next: ['1A', '1B', '1C', '1D'],
  },

  '1A': {
    message: '🛋️ Sofa dan Kursi:\n1A1. Rangka Rotan Sintetis\n1A2. Rangka Besi',
    next: ['1A1', '1A2'],
  },
  '1A1': {
    message: '🛋️ Sofa dan Kursi:\n1A1A. Menggantung\n1A1B. Berdiri',
    next: ['1A1A', '1A1B'],
  },
  '1A2': {
    message: '🛋️ Sofa dan Kursi:\n1A2A. Menggantung\n1A2B. Berdiri',
    next: ['1A2A', '1A2B'],
  },

  '1B': {
    message: '🪞 Dekorasi:\n1B1. Bundling\n1B2. Non-Bundling',
    next: ['1B1', '1B2'],
  },
  '1B1': {
    message: '🪞 Dekorasi:\n1B1A. Latex\n1B1B. Plastik',
    next: ['1B1A', '1B1B'],
  },
  '1B2': {
    message: '🪞 Dekorasi:\n1B2A. Fungsional\n1B2B. Non-Fungsional',
    next: ['1B2A', '1B2B'],
  },
  '1B2A': {
    message: '📏 Dekorasi: \n1B2A1. Besar\n1B2A2. Kecil',
    next: ['1B2A1', '1B2A2'],
  },
  '1B2B': {
    message: '📏 Dekorasi: \n1B2B1. Besar\n1B2B2. Kecil',
    next: ['1B2B1', '1B2B2'],
  },

  '1C': {
    message: '🏠 Perlengkapan:\n1C1. Dapur\n1C2. Makan&Minum\n1C3. Lain-Lain',
    next: ['1C1', '1C2', '1C3'],
  },

  '1C1': {
    message: '🏠 Perlengkapan:\n1C1A. Bundling\n1C1B. Non-Bundling',
    next: ['1C1A', '1C1B'],
  },
  '1C1A': {
    message: '🏠 Perlengkapan:\n1C1A1. Kokoh\n1C1A2. Besar',
    next: ['1C1A1', '1C1A2'],
  },
  '1C1B': {
    message: '🏠 Perlengkapan:\n1C1B1. Kokoh\n1C1B2. Besar',
    next: ['1C1B1', '1C1B2'],
  },

  '1C2': {
    message: '🏠 Perlengkapan:\n1C2. Bundling\n1C2. Non-Bundling',
    next: ['1C2A', '1C2B'],
  },
  '1C2A': {
    message: '🏠 Perlengkapan:\n1C2A1. Fungsional\n1C2A2. Hiasan',
    next: ['1C2A1', '1C2A2'],
  },
  '1C2B': {
    message: '🏠 Perlengkapan:\n1C2B1. Fungsional\n1C2B2. Hiasan',
    next: ['1C2B1', '1C2B2'],
  },

  '1C3': {
    message: '🏠 Perlengkapan:\n1C3A. Bundling\n1C3B. Non-Bundling',
    next: ['1C3A', '1C3B'],
  },
  '1C3A': {
    message: '🏠 Perlengkapan:\n1C3A1. Fungsional\n1C3A2. Non-Fungsional',
    next: ['1C3A1', '1C3A2'],
  },
  '1C3B': {
    message: '🏠 Perlengkapan:\n1C3B1. Fungsional\n1C3B2. Non-Fungsional',
    next: ['1C3B1', '1C3B2'],
  },

  '2': {
    message:
      '🆘 Bantuan:\n2A. Hubungi admin di wa.me/628xxxxxx\n2B. 📍Keterangan dan Lokasi',
    next: ['2A', '2B'],
  },
  '3': {
    message:
      '💡 Kirimkan preferensi produk, dan kami akan memberikan rekomendasi produk yang sesuai dengan kebutuhan Anda! 😊',
    next: [],
  },
  '4': {
    message:
      '💸 Promo saat ini:\n4A. Potongan Harga\n4B. Gratis Ongkir\n4C. Cashback 10%\n4D. Buy 1 Get 1\n(S&K berlaku, hubungi admin)',
    next: ['4A', '4B', '4C', '4D'],
  },
};
