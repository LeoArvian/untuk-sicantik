import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const FutureGallery = () => {
  // Daftar slot foto (REVISI: Momen yang lebih realistis & seru)
  const slots = [
    { title: "First Date 🍿", rotate: -3 },
    { title: "Photobox Date 📸", rotate: 2 }, // <-- Mengganti 'Wisuda Bareng'
    { title: "Random Trip 🛵", rotate: -1 },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full my-8">
      <h3 className="text-center font-serif text-gray-500 text-xs mb-6 tracking-[0.3em] uppercase">
        Memories To Be Created
      </h3>

      {/* Jemuran Foto (Tali) */}
      <div className="relative h-[2px] w-full bg-gray-700 mb-8 rounded-full opacity-50"></div>

      <div className="flex justify-center gap-4 overflow-x-visible pb-4 px-2">
        {slots.map((slot, idx) => (
          <motion.div
            key={idx}
            initial={{ rotate: slot.rotate }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            onClick={() => setActiveIndex(idx === activeIndex ? null : idx)}
            className="relative flex-shrink-0 w-28 md:w-32 bg-gray-200 p-2 pb-8 shadow-xl cursor-pointer transition-all border border-gray-300 transform"
          >
            {/* Paku/Jepitan Jemuran */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm z-10 shadow-sm"></div>

            {/* Area Foto Hitam (Kosong) */}
            <div className="w-full h-28 md:h-32 bg-gray-900 flex flex-col items-center justify-center text-gray-600 gap-2 overflow-hidden relative group">
               {/* Overlay pas diklik */}
               {activeIndex === idx ? (
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   className="absolute inset-0 bg-pink-600/90 flex flex-col items-center justify-center text-white text-center p-1"
                 >
                   <p className="text-[8px] font-bold tracking-widest mb-1">MISSION 2026</p>
                   <p className="text-[10px] leading-tight font-serif">Kita harus isi foto ini bareng! 📸</p>
                 </motion.div>
               ) : (
                 <>
                   <Lock size={16} />
                   <span className="text-[8px] tracking-widest">LOCKED</span>
                 </>
               )}
            </div>

            {/* Caption Tulisan Tangan */}
            <p className="absolute bottom-2 left-0 w-full text-center font-serif italic text-gray-800 text-xs font-bold">
              {slot.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FutureGallery;