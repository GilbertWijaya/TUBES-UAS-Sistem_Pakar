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
      '📦 Katalog kami:\n- 1A. Sofa & Kursi\n- 1B. Dekorasi Meja\n- 1C. Dekorasi Lantai\n- 1D. Set Perlengkapan',
    next: ['1A', '1B', '1C', '1D'],
  },
  '1A': {
    message: '🛋️ Sofa dan Kursi:\n1A1. Rangka Rotan\n1A2. Rangka Besi',
    next: ['1A1', '1A2'],
  },
  '1A1': {
    message: '🛋️ Sofa dan Kursi:\n1A1A. Bundle\n1A2A. Non-Bundle',
    next: ['1A1A', '1A2A'],
  },
  '1A2': {
    message: '🛋️ Sofa dan Kursi:\n1A1A. Bundle\n1A2A. Non-Bundle',
    next: ['1A1A', '1A2A'],
  },

  '1B': {
    message: '🪞 Dekorasi Meja:\n1B1. Kecil\n1B2. Besar',
    next: ['1B1', '1B2'],
  },
  '1B1': {
    message: '🪞 Dekorasi Meja Kecil:\n1B1A. Bundle\n1B1B. Non-Bundle',
    next: ['1B1A', '1B1B'],
  },
  '1B2': {
    message: '🪞 Dekorasi Meja Besar:\n1B2A. Bundle\n1B2B. Non-Bundle',
    next: ['1B2A', '1B2B'],
  },
  '1B2A': {
    message: '📏 Ukuran Meja:\n1B2A1. 120×80\n1B2A2. Ukuran Lain',
    next: ['1B2A1', '1B2A2'],
  },

  '1C': {
    message: '🏠 Dekorasi Lantai:\n1C1. Fungsional\n1C2. Hiasan',
    next: ['1C1', '1C2'],
  },
  '1C1': {
    message: '🏠 Dekorasi Lantai Fungsional:\n1C1A. Bundle\n1C1B. Non-Bundle',
    next: ['1C1A', '1C1B'],
  },

  '1D': {
    message:
      '🧰 Set Perlengkapan:\n1D1. Kitchen\n1D2. Meja\n1D3. Buffet\n1D4. Kursi',
    next: ['1D1', '1D2', '1D3', '1D4'],
  },
  '1D1': {
    message: '🧰 Set Perlengkapan:\n1D1A. Bundling \n1D2A. Non-Bundling',
    next: ['1D1A', '1D2A'],
  },

  '1D2': {
    message: '🧰 Set Perlengkapan:\n1D1. Bundling \n1D2. Non-Bundling',
    next: ['1D1A', '1D2A'],
  },

  '1D1A': {
    message: '🧰 Set Perlengkapan:\n1D1A1. Fungsional \n1D2A2. Hiasan',
    next: ['1D1A1', '1D2A2'],
  },

  '1D4': {
    message: '🧰 Set Perlengkapan:\n1D4A. Fungsional \n1D4B. Hiasan',
    next: ['1D4A', '1D4B'],
  },

  '1D4B': {
    message: '🧰 Set Perlengkapan:\n1D4B1. Bundling \n1D4B2. Non-Bundling',
    next: ['1D4B1', '1D4B2'],
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
