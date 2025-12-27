import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dices, Sparkles } from 'lucide-react';

const GachaSystem = () => {
  const prizes = [
    "Dapet Restu... dari keluarga ku 😉",
    "ZONK! Gak dapet apa-apa, coba lagi tahun depan 🤪",
    "Jodohmu inisialnya... A 🤫",
    "Tutorial: Cara tidur sebelum jam 3 pagi (PENTING BUAT MANDA!) 😴",
    "Rezeki lancar, bisa checkout keranjang oren 📦",
    "Hak Milik Hati Azriel (Non-transferable / Gak bisa dipindah) 🔒",
    "Selamat! Kamu dapet piring cantik (Tapi bohong deng) 🍽️",
    "Hati-hati, ada yang diem-diem naksir berat sama kamu 🤫",
    "Nilai aman, uang jajan nambah 🤑",
    "Dapet Obat 'Anti-Batu' (Diminum 3x sehari biar gak keras kepala) 💊",
    "Mimpi indah malam ini (Syarat: Mimpinya harus ada aku) 💤",
    "Selamat! Kamu dapet... Hikmahnya aja ya, yang sabar 🤣",
    "Izin Resmi buat kangen aku tiap hari (Approved!) 📝",
    "Kurangin gengsi, nanti cantiknya ilang lho 📉",
    "Bakal sering ditraktir sama aku 🍜",
    "Helm Anti-Gengsi (Biar kepalanya gak keras-keras amat) ⛑️",
    "Dapet 'Good Morning' spesial besok pagi (Tungguin ya) ☀️",
    "Peringatan: Kurang-kurangin bales chat lama ⏳",
    "Sehat terus & makin happy!",
    "Diskon Gengsi 100% (Khusus dipake pas chat aku) 📉",
    "Tahun ini bakal makin glowing ✨",
    "Voucher 'Jalan Berdua' (Exp: Kapan aja pas kamu luang) 🎟️",
    "Dapet Hikmahnya aja ya... yang sabar 🗿",
    "Selamat! Kamu memenangkan... Hak istimewa buat aku prioritasin chat-nya ❤️",
    "Rezeki Ngalir Deras (Biar bisa traktir aku) 💸",
    "Awas! Bakal kangen aku terus tahun ini 👻",
    "Nilai Ujian Bagus (Aamiin paling kenceng dari aku!) 💯",
    "Hadiah: Kaca... buat ngaca siapa yang paling gengsian? 🪞",
    "Makin manis kalau lagi senyum ke aku, kurangin juteknya 🍬",
    "Tahun ini dilarang galauin cowok fiksi/gepeng! Real life ada aku 🚫",
    "Free Call 24 Jam (Khusus curhat ke aku doang) 📞",
    "Dapet tiket nonton berdua... (Kapan-kapan ya) 🎬",
    "Dapet 1000% stok sabar buat ngadepin keanehan kamu 😇",
    "Doi makin peka tahun ini 🫣",
  ];

  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinGacha = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Efek ngacak kata-kata (Shuffle visual)
    let count = 0;
    const interval = setInterval(() => {
      setResult(prizes[Math.floor(Math.random() * prizes.length)]);
      count++;
      if (count > 20) { // Berhenti setelah 20x ganti (sekitar 2 detik)
        clearInterval(interval);
        const finalResult = prizes[Math.floor(Math.random() * prizes.length)];
        setResult(finalResult);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
      <div className="flex items-center justify-center gap-2 mb-4 text-manda-gold">
        <Dices size={24} />
        <h3 className="font-serif text-lg tracking-widest">HOKI METER 2026</h3>
      </div>

      {/* Area Hasil */}
      <div className="h-20 flex items-center justify-center mb-6">
        {result ? (
          <motion.p
            key={result}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-sans font-bold text-lg ${isSpinning ? 'text-gray-400 blur-sm' : 'text-white'}`}
          >
            {result}
          </motion.p>
        ) : (
          <p className="text-gray-500 text-sm italic">Klik tombol buat cek prediksi...</p>
        )}
      </div>

      {/* Tombol Putar */}
      <button
        onClick={spinGacha}
        disabled={isSpinning}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
      >
        {isSpinning ? (
          "Sedang Meramal..."
        ) : (
          <>
            <Sparkles size={18} /> CEK SEKARANG
          </>
        )}
      </button>
    </div>
  );
};

export default GachaSystem;