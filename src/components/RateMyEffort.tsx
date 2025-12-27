import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const RateMyEffort = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State buat efek "Nolak" (Getar/Shake)
  const [isShaking, setIsShaking] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  const handleRate = (index: number) => {
    // KALAU BINTANGNYA KURANG DARI 5 (TOLAK MENTAH-MENTAH)
    if (index < 5) {
        // 1. Efek Getar di HP
        if (navigator.vibrate) navigator.vibrate(200);

        // 2. Trigger Animasi Shake
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500); // Reset shake setelah 0.5 detik

        // 3. Munculin Pesan Protes sesuai jumlah bintang
        if (index === 1) setWarningMsg("HEH! Jahat banget bintang 1?! 😭 Ulangi!");
        else if (index === 2) setWarningMsg("Kurang! Masa cuma 2? 😤");
        else if (index === 3) setWarningMsg("Minimal bintang 5 dong! 🥺");
        else if (index === 4) setWarningMsg("Dikit lagi... sempurnakan jadi 5! 🤏");
        
        return; // Stop di sini, jangan disubmit
    }

    // KALAU BINTANG 5 (BARU BOLEH)
    setRating(index);
    setIsSubmitted(true);
    setWarningMsg(""); // Hapus warning

    // Efek Confetti (Kembang Api)
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF4500']
    });
  };

  return (
    <div className="text-center mt-12 mb-8 px-4">
      <h3 className="text-yellow-500 font-serif text-lg mb-2">Rate Usaha Aku Dong? ⭐</h3>
      <p className="text-zinc-400 text-xs mb-4">Harus jujur (tapi ada minimalnya 😝)</p>

      {!isSubmitted ? (
        <div className="flex flex-col items-center">
            {/* Container Bintang yang bisa Goyang (Shake) */}
            <motion.div 
                animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="flex justify-center gap-2 mb-2"
            >
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRate(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="focus:outline-none transition-colors relative"
                    >
                        <Star 
                            size={32} 
                            fill={(hover || rating) >= star ? "#EAB308" : "transparent"} 
                            className={(hover || rating) >= star ? "text-yellow-500" : "text-zinc-600"}
                        />
                    </motion.button>
                ))}
            </motion.div>

            {/* Pesan Peringatan kalau salah pilih */}
            <AnimatePresence>
                {warningMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20"
                    >
                        <AlertCircle size={12} />
                        {warningMsg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      ) : (
        // HASIL SETELAH BINTANG 5
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 px-6 py-4 rounded-xl inline-block"
        >
            <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#EAB308" className="text-yellow-500" />
                ))}
            </div>
            <p className="text-yellow-200 font-bold text-sm">
                Nah gitu dong! I knew you love it! 💖✨
            </p>
            <p className="text-[10px] text-zinc-400 mt-1">
                (Rating 5/5 berhasil disimpan ke hati Azriel)
            </p>
        </motion.div>
      )}
    </div>
  );
};

export default RateMyEffort;