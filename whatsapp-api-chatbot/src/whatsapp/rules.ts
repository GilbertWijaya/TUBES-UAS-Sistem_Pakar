export interface Rule {
  message?: string;
  next?: string[];
  isFinal?: boolean;
}

export const rules: Record<string, Rule> = {
  menu: {
    message:
      '😁 Halo, Yarkham Gallery di sini, Silahkan pilih menu 🙏:\n-Katalog\n-Bantuan\n-Rekomendasi\n-Cek Promo',
    next: ['Katalog', 'Bantuan', 'Rekomendasi', 'Cek Promo'],
  },

  Katalog: {
    message:
      '📦 Katalog kami:\n-Kursi\n-Dekorasi\n-Perlengkapan Dapur\n-Perlengkapan Makan&Minum\n-Karpet',
    next: [
      'Kursi',
      'Dekorasi',
      'Perlengkapan Dapur',
      'Perlengkapan Makan&Minum',
      'Karpet',
    ],
  },
  Kursi: {
    message: '🛋️ Kursi:\n1. Rangka Sintetis\n2. Rangka Besi',
    next: ['Rangka Sintetis', 'Rangka Besi'],
  },
  'Rangka Sintetis': {
    message: '🛋️ Kursi Rangka Sintetis:\n- Model Menggantung\n- Model Berdiri',
    next: ['Menggantung', 'Berdiri'],
  },

  'Rangka Besi': {
    message: '🛋️ Kursi Rangka Besi:\n- Model Menggantung\n- Model Berdiri',
    next: ['Menggantung', 'Berdiri'],
  },

  Menggantung: {
    message: '🛋️ Kursi Model Menggantung:\n - Paket\n - Non-Paket',
    next: ['Paket', 'Non-Paket'],
  },

  Berdiri: {
    message: '🛋️ Kursi Model Berdiri:\n - Paket\n - Non-Paket',
    next: ['Paket', 'Non-Paket'],
  },

  Paket: {
    isFinal: true,
  },

  'Non-Paket': {
    isFinal: true,
  },

  Dekorasi: {
    message: '🪞 Dekorasi:\n1. Bundling\n2. Non-Bundling',
    next: ['Bundling', 'Non-Bundling'],
  },

  Bundling: {
    message: '🪞 Dekorasi Bundling:\n- Bahan Latex\n- Bahan Plastik/PVC',
    next: ['Latex', 'Plastik/PVC'],
  },

  Latex: {
    message: '🪞 Dekorasi Latex:\n- Besar\n- Mini',
    next: ['Besar', 'Mini'],
  },

  'Non-Bundling': {
    message: '🪞 Dekorasi Bundling:\n- Bahan Latex\n- Bahan Plastik/PVC',
    next: ['Latex', 'Plastik/PVC'],
  },

  'Plastik/PVC': {
    message: '🪞 Dekorasi Plastik/PVC:\n- Besar\n- Mini',
    next: ['Besar', 'Mini'],
  },

  Besar: {
    isFinal: true,
  },

  Mini: {
    isFinal: true,
  },

  'Perlengkapan Dapur': {
    message: '🏠 Perlengkapan Dapur:\n- Fungsional\n- Non-Fungsional',
    next: ['Fungsional', 'Non-Fungsional'],
  },

  Fungsional: {
    message: '🏠 Perlengkapan Dapur:\n- Bundle\n- Non-Bundle',
    next: ['Bundle', 'Non-Bundle'],
  },

  Bundle: {
    message: '🏠 Perlengkapan Dapur:\n- Kokoh\n- Jumbo',
    next: ['Kokoh', 'Jumbo'],
  },

  'Non-Bundle': {
    message: '🏠 Perlengkapan Dapur:\n- Kokoh\n- Jumbo',
    next: ['Kokoh', 'Jumbo'],
  },

  Kokoh: {
    isFinal: true,
  },

  Jumbo: {
    isFinal: true,
  },

  'Perlengkapan Makan&Minum': {
    message: '🏠 Perlengkapan Makan&Minum:\n- Fungsi\n- Hiasan',
    next: ['Fungsi', 'Hiasan'],
  },

  Fungsi: {
    message: '🏠 Perlengkapan Makan&Minum:\n- Bundel\n- Non-Bundel',
    next: ['Bundel', 'Non-Bundel'],
  },

  Hiasan: {
    message: '🏠 Perlengkapan Makan&Minum:\n- Bundel\n- Non-Bundel',
    next: ['Bundel', 'Non-Bundel'],
  },

  Bundel: {
    message: '🏠 Perlengkapan Makan&Minum:\n- Kramik\n- Kayu/Rotan',
    next: ['Kramik', 'Kayu/Rotan'],
  },
  'Non-Bundel': {
    message: '🏠 Perlengkapan Makan&Minum:\n- Kramik\n- Kayu/Rotan',
    next: ['Kramik', 'Kayu/Rotan'],
  },

  Kramik: {
    isFinal: true,
  },

  'Kayu/Rotan': {
    isFinal: true,
  },

  Karpet: {
    message: '🧶 Karpet:\n- Wol\n- Sintetis',
    next: ['Wol', 'Sintetis'],
  },
  Wol: {
    message: '🧶 Karpet Wol:\n- Motif\n- Polos',
    next: ['Motif', 'Polos'],
  },

  Motif: {
    message: '🧶 Karpet Wol Motif:\n- Luas\n- Sedang',
    next: ['Luas', 'Sedang'],
  },

  Luas: {
    isFinal: true,
  },

  Sedang: {
    isFinal: true,
  },

  Bantuan: {
    message:
      '🆘 Bantuan:\n1. Hubungi admin di wa.me/628xxxxxx\n2. 📍Keterangan dan Lokasi',
    next: ['1', '2'],
  },
  '1': {
    message: 'Anda dapat menghubungi admin kami di wa.me/628xxxxxx',
    isFinal: true,
  },
  '2': {
    message:
      'Yarkham Gallery berlokasi di Jl. Contoh No.123, Kota Contoh. Jam operasional: Senin - Sabtu, 09.00 - 18.00 WIB.',
    isFinal: true,
  },
  Rekomendasi: {
    message:
      '💡 Kirimkan preferensi produk, dan cirinya dengan format "Jenis Produk, Ciri 1, Ciri 2, Ciri 3" / "Dekorasi, Bundling, Latex, Mini"! Kami akan carikan sesuai kebutuhan anda 😊',
    next: [],
    isFinal: true,
  },
  'Cek Promo': {
    message:
      '💸 Promo saat ini:\nP1. Potongan Harga\nP2. Gratis Ongkir\nP3. Cashback 10%\nP4. Buy 1 Get 1\n(S&K berlaku, hubungi admin)',
    next: ['P1', 'P2', 'P3', 'P4'],
  },
  P1: {
    message:
      'Dapatkan potongan harga hingga 20% untuk pembelian produk tertentu! Hubungi admin untuk info lebih lanjut.',
    isFinal: true,
  },
  P2: {
    message:
      'Nikmati gratis ongkir untuk pembelian di atas Rp500.000! Hubungi admin untuk info lebih lanjut.',
    isFinal: true,
  },
  P3: {
    message:
      'Dapatkan cashback 10% untuk setiap pembelian produk tertentu! Hubungi admin untuk info lebih lanjut.',
    isFinal: true,
  },
  P4: {
    message:
      'Promo Buy 1 Get 1 untuk produk pilihan! Hubungi admin untuk info lebih lanjut.',
    isFinal: true,
  },
};

// export const rules: Record<string, Rule> = {
//   menu: {
//     message:
//       '😁 Halo, Yarkham Gallery di sini, Silahkan pilih menu 🙏:\n1. Katalog\n2. Bantuan\n3. Rekomendasi\n4. Cek Promo',
//     next: ['1', '2', '3', '4'],
//   },

//   '1': {
//     message:
//       '📦 Katalog kami:\n- 1A. Sofa & Kursi\n- 1B. Dekorasi\n- 1C. Set Perlengkapan',
//     next: ['1A', '1B', '1C'],
//   },

//   '1A': {
//     message: '🛋️ Sofa dan Kursi:\n1A1. Rangka Rotan Sintetis\n1A2. Rangka Besi',
//     next: ['1A1', '1A2'],
//   },
//   '1A1': {
//     message: '🛋️ Sofa dan Kursi:\n1A1A. Menggantung\n1A1B. Berdiri',
//     next: ['1A1A', '1A1B'],
//   },
//   '1A1A': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1A1B': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1A2': {
//     message: '🛋️ Sofa dan Kursi:\n1A2A. Menggantung\n1A2B. Berdiri',
//     next: ['1A2A', '1A2B'],
//   },
//   '1A2A': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1A2B': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },

//   '1B': {
//     message: '🪞 Dekorasi:\n1B1. Bundling\n1B2. Non-Bundling',
//     next: ['1B1', '1B2'],
//   },
//   '1B1': {
//     message: '🪞 Dekorasi:\n1B1A. Latex\n1B1B. Plastik',
//     next: ['1B1A', '1B1B'],
//   },
//   '1B1A': {
//     message: '🪞 Dekorasi:\n1B1A1. Fungsional\n1B1B1. Non-Fungsional',
//     next: ['1B1A', '1B1B'],
//   },
//   '1B1A1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1B1B1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1B2': {
//     message: '🪞 Dekorasi:\n1B2A. Fungsional\n1B2B. Non-Fungsional',
//     next: ['1B2A', '1B2B'],
//   },
//   '1B2A': {
//     message: '📏 Dekorasi: \n1B2A1. Besar\n1B2A2. Kecil',
//     next: ['1B2A1', '1B2A2'],
//   },
//   '1B2A1': {
//     message: 'Hasilnya Adalah',
//     isFinal: true,
//   },
//   '1B2A2': {
//     message: 'Hasilnya Adalah',
//     isFinal: true,
//   },
//   '1B2B': {
//     message: '📏 Dekorasi: \n1B2B1. Besar\n1B2B2. Kecil',
//     next: ['1B2B1', '1B2B2'],
//   },
//   '1B2B1': {
//     message: 'Hasilnya Adalah',
//     isFinal: true,
//   },
//   '1B2B2': {
//     message: 'Hasilnya Adalah',
//     isFinal: true,
//   },

//   '1C': {
//     message: '🏠 Perlengkapan:\n1C1. Dapur\n1C2. Makan&Minum\n1C3. Lain-Lain',
//     next: ['1C1', '1C2', '1C3'],
//   },

//   '1C1': {
//     message: '🏠 Perlengkapan:\n1C1A. Bundling\n1C1B. Non-Bundling',
//     next: ['1C1A', '1C1B'],
//   },
//   '1C1A': {
//     message: '🏠 Perlengkapan:\n1C1A1. Kokoh\n1C1A2. Besar',
//     next: ['1C1A1', '1C1A2'],
//   },
//   '1C1A1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C1A2': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C1B': {
//     message: '🏠 Perlengkapan:\n1C1B1. Kokoh\n1C1B2. Besar',
//     next: ['1C1B1', '1C1B2'],
//     isFinal: true,
//   },
//   '1C1B1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C1B2': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },

//   '1C2': {
//     message: '🏠 Perlengkapan:\n1C2. Bundling\n1C2. Non-Bundling',
//     next: ['1C2A', '1C2B'],
//   },
//   '1C2A': {
//     message: '🏠 Perlengkapan:\n1C2A1. Fungsional\n1C2A2. Hiasan',
//     next: ['1C2A1', '1C2A2'],
//   },
//   '1C2A1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C2A2': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C2B': {
//     message: '🏠 Perlengkapan:\n1C2B1. Fungsional\n1C2B2. Hiasan',
//     next: ['1C2B1', '1C2B2'],
//     isFinal: true,
//   },
//   '1C2B1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C2B2': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },

//   '1C3': {
//     message: '🏠 Perlengkapan:\n1C3A. Bundling\n1C3B. Non-Bundling',
//     next: ['1C3A', '1C3B'],
//   },
//   '1C3A': {
//     message: '🏠 Perlengkapan:\n1C3A1. Fungsional\n1C3A2. Non-Fungsional',
//     next: ['1C3A1', '1C3A2'],
//   },
//   '1C3A1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C3A2': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C3B': {
//     message: '🏠 Perlengkapan:\n1C3B1. Fungsional\n1C3B2. Non-Fungsional',
//     next: ['1C3B1', '1C3B2'],
//   },
//   '1C3B1': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },
//   '1C3B2': {
//     message: 'Hasilnya adalah',
//     isFinal: true,
//   },

//   '2': {
//     message:
//       '🆘 Bantuan:\n2A. Hubungi admin di wa.me/628xxxxxx\n2B. 📍Keterangan dan Lokasi',
//     next: ['2A', '2B'],
//   },
//   '2A': {
//     message: 'Anda dapat menghubungi admin kami di wa.me/628xxxxxx',
//     isFinal: true,
//   },
//   '2B': {
//     message:
//       'Yarkham Gallery berlokasi di Jl. Contoh No.123, Kota Contoh. Jam operasional: Senin - Sabtu, 09.00 - 18.00 WIB.',
//     isFinal: true,
//   },
//   '3': {
//     message:
//       '💡 Kirimkan preferensi produk, dan kami akan memberikan rekomendasi produk yang sesuai dengan kebutuhan Anda! 😊',
//     next: [],
//     isFinal: true,
//   },
//   '4': {
//     message:
//       '💸 Promo saat ini:\n4A. Potongan Harga\n4B. Gratis Ongkir\n4C. Cashback 10%\n4D. Buy 1 Get 1\n(S&K berlaku, hubungi admin)',
//     next: ['4A', '4B', '4C', '4D'],
//   },
//   '4A': {
//     message:
//       'Dapatkan potongan harga hingga 20% untuk pembelian produk tertentu! Hubungi admin untuk info lebih lanjut.',
//     isFinal: true,
//   },
//   '4B': {
//     message:
//       'Nikmati gratis ongkir untuk pembelian di atas Rp500.000! Hubungi admin untuk info lebih lanjut.',
//     isFinal: true,
//   },
//   '4C': {
//     message:
//       'Dapatkan cashback 10% untuk setiap pembelian produk tertentu! Hubungi admin untuk info lebih lanjut.',
//     isFinal: true,
//   },
//   '4D': {
//     message:
//       'Promo Buy 1 Get 1 untuk produk pilihan! Hubungi admin untuk info lebih lanjut.',
//     isFinal: true,
//   },
// };
