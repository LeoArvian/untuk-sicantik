import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VenetianMask, Shuffle } from 'lucide-react';

const SecretSignal = () => {
  const [signal, setSignal] = useState<string | null>(null);

  const signals = [
    "Garuk hidung pakai jari kelingking 👃",
    "Benerin kerah baju 2x berturut-turut 👔",
    "Kedip mata kiri pelan-pelan 😉",
    "Tepuk jidat sendiri (pura-pura lupa) 🤦‍♂️",
    "Acungkan jempol tapi sembunyi di saku 👍",
    "Pura-pura liat jam tangan (padahal gak pake) ⌚",
    "Senyum lebar 3 detik terus buang muka 😳"
  ];

  const generateSignal = () => {
    const random = signals[Math.floor(Math.random() * signals.length)];
    setSignal(random);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="p-3 bg-purple-500/20 rounded-full text-purple-300">
          <VenetianMask size={28} />
        </div>
        
        <div>
          <h3 className="text-white font-bold text-lg tracking-wider">SECRET SIGNAL 🤫</h3>
          <p className="text-[10px] text-gray-400 max-w-[200px] mx-auto">
            Biar gak canggung di sekolah, pake kode ini buat nyapa aku tanpa suara.
          </p>
        </div>

        <AnimatePresence mode='wait'>
          {signal ? (
            <motion.div 
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-purple-600 p-4 rounded-lg w-full mt-2 shadow-lg border border-purple-400 relative"
            >
              <p className="text-[10px] text-purple-200 uppercase tracking-widest mb-1">Misi Kamu Besok:</p>
              <p className="text-white font-bold text-sm md:text-base">"{signal}"</p>
              <div className="mt-3 flex justify-center">
                 <button onClick={generateSignal} className="text-[10px] text-white/50 hover:text-white flex items-center gap-1">
                   <Shuffle size={10} /> Ganti Misi Lain
                 </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={generateSignal}
              className="mt-2 px-6 py-3 bg-white text-purple-900 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-2"
            >
              <Shuffle size={14} />
              GENERATE KODE
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SecretSignal;