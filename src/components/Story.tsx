import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronRight, Sparkles } from 'lucide-react';

interface StoryProps {
  onFinished: () => void;
}

const Story = ({ onFinished }: StoryProps) => {
  // PESAN TIDAK DIUBAH (SESUAI REQUEST)
  const messages = [
    "Halo, Manda...", 
    "Siap-siap ganti tahun nih.",
    "Sayang banget belum bisa liat kembang api bareng...",
    "Tapi aku tetep seneng bisa kenal deket sama kamu di tahun ini.",
    "Makasih udah jadi bagian cerita aku di tahun ini.",
    "Semoga 2026 jadi tahun yang lebih seru buat kita.",
    "Sebelum lanjut, main game bentar yuk..."
  ];

  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handleNext = () => {
    if (index < messages.length - 1) {
      setShowButton(false);
      setIndex(prev => prev + 1);
    } else {
      onFinished();
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center z-10 overflow-hidden px-6">
      
      {/* LOGIKA ANTI-LOMPAT: 
        Kita bungkus teks dalam container absolute/fixed center.
        Jadi dia punya 'panggung' sendiri yang tidak diganggu elemen lain.
      */}
      
      <div className="relative w-full max-w-2xl h-[200px] flex items-center justify-center">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Font Style: Mewah, Serif, agak besar */}
            <div 
              className="text-2xl md:text-4xl text-white/90 leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }} // Pakai font Intro biar konsisten
            >
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(50) // Kecepatan ngetik (makin kecil makin cepet)
                    .typeString(messages[index])
                    .callFunction(() => {
                      setTimeout(() => setShowButton(true), 800); // Jeda dikit baru tombol muncul
                    })
                    .start();
                }}
                options={{
                  cursor: '<span style="color: #fbbf24; opacity: 0.8;">|</span>', // Kursor warna emas
                  delay: 50,
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TOMBOL POSISI ABSOLUTE 
        Ditaruh di bawah layar secara paksa, jadi gak akan nyundul teks ke atas.
      */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-20 md:bottom-32" // Posisi fix di bawah
          >
            <button
              onClick={handleNext}
              className="group flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300"
            >
              <span className="text-xs font-sans tracking-[0.2em] text-gray-300 group-hover:text-yellow-200 transition-colors uppercase">
                {index === messages.length - 1 ? "Mulai Game" : "Lanjut"}
              </span>
              <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                 {index === messages.length - 1 ? <Sparkles size={14} /> : <ChevronRight size={14} />}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Story;