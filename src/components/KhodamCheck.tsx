import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Scan, Ghost } from 'lucide-react';

const KhodamCheck = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // DAFTAR KHODAM (LUCU & RELATE)
  const khodams = [
    "Sinyal Edge (Lemot banget bales chatnya) 📶",
    "Kulkas 2 Pintu (Luarnya dingin, dalemnya manis) 🧊",
    "Seblak Ceker (Pedas, tapi bikin nagih) 🌶️",
    "Kasur Empuk (Hatinya lembut, hobinya rebahan) 🛌",
    "CCTV Kantin (Diem-diem memantau gerak-gerikku) 📹",
    "Lem Korea (Sekali nempel/bucin, susah lepas) 🧪",
    "Es Batu (Keras kepala tapi bisa cair juga) 🧊",
    "Bel Istirahat (Paling ditunggu-tunggu kehadirannya) 🔔",
    "Kucing Oren (Galak, bar-bar, tapi gemesin) 🐱",
    "Batre Lowbat (Dikit-dikit minta dicas perhatian) 🪫",
    "Kanebo Kering (Kaku banget bu... senyum dong) 🧹",
    "Tahu Bulat (Mood-nya berubah-ubah dadakan) 🍡",
    "Powerbank (Selalu dicari pas lagi butuh sandaran) 🔋",
    "Kipas Angin (Tukang bikin adem suasana) 🌬️",
    "Wifi Sekolah (Kadang nyambung, kadang ilang tanpa kabar) 📶",
    "Knalpot Brong (Berisik banget kalau lagi ngomel) 🏍️",
    "Google Maps (Suka bikin bingung arah hubungan) 🗺️",
    "Cilok Bumbu Kacang (Kenyal-kenyal ngeselin) 🍢",
    "Payung Hitam (Siap sedia pas lagi sedih/hujan) ☂️",
    "Uang Kaget (Bikin seneng sesaat, terus ngilang lagi) 💸"
  ];

  const handleCheck = () => {
    if (isScanning) return;
    setIsScanning(true);
    setResult(null);

    // Simulasi Scanning 2 detik
    setTimeout(() => {
      const randomKhodam = khodams[Math.floor(Math.random() * khodams.length)];
      setResult(randomKhodam);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode='wait'>
        {!result && !isScanning && (
          <motion.button
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheck}
            className="w-full bg-purple-900/40 border border-purple-500/30 text-purple-200 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-900/60 transition-all shadow-lg backdrop-blur-sm"
          >
            <Fingerprint size={20} />
            <span className="font-body font-bold text-sm">CEK KHODAM 2026</span>
          </motion.button>
        )}

        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-black/50 border border-green-500/50 text-green-400 py-3 rounded-xl flex items-center justify-center gap-2 overflow-hidden relative"
          >
            <Scan size={20} className="animate-spin" />
            <span className="font-mono text-sm animate-pulse">SCANNING AURA...</span>
            {/* Garis Scan Bergerak */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-0 right-0 h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e]"
            />
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-gradient-to-br from-purple-600 to-blue-600 p-4 rounded-xl border border-white/20 text-center relative overflow-hidden shadow-[0_0_20px_rgba(147,51,234,0.5)]"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-2">
                <Ghost className="text-white animate-bounce" size={24} />
              </div>
              <p className="text-[10px] text-purple-200 uppercase tracking-widest mb-1">Khodam Terdeteksi:</p>
              <h3 className="font-body font-bold text-white text-lg leading-tight mb-3">
                {result}
              </h3>
              <button 
                onClick={handleCheck}
                className="text-[10px] bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-white transition-colors"
              >
                Coba Lagi ↻
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KhodamCheck;