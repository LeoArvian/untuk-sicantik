import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';

interface OpeningProps {
  onComplete: () => void;
}

const Opening = ({ onComplete }: OpeningProps) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center relative z-10 overflow-hidden">
      
      {/* Container Utama */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="text-center relative z-20 px-4 flex flex-col items-center"
      >
        {/* Dekorasi Garis Emas Atas */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-8"
        />

        {/* SUBJUDUL KECIL */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-yellow-100/70 text-[10px] md:text-xs uppercase font-sans tracking-[0.4em] mb-2"
        >
          The One & Only
        </motion.p>

        {/* JUDUL UTAMA "AMANDA" (REVISI: FONT BARU & NAMA LENGKAP) */}
        <h1 className="relative mt-2 mb-6">
            <span 
              // STYLE BARU: Ukuran super besar, font Italiana, gradient emas lebih tajam
              className="text-[5rem] md:text-[9rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-300 to-amber-700 drop-shadow-[0_0_40px_rgba(234,179,8,0.5)] block"
              style={{ 
                fontFamily: "'Italiana', sans-serif", // <-- FONT KEREN DISINI
                letterSpacing: "0.02em" // Spasi antar huruf dirapetin dikit biar elegan
              }} 
            >
              Amanda {/* <-- NAMA DIUBAH */}
            </span>
            
            {/* Partikel Kilau (Diatur ulang posisinya) */}
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-2 -right-2 md:top-4 md:right-0 text-yellow-200"
            >
              <Sparkles size={32} />
            </motion.div>
        </h1>

        {/* TEXT BAWAH */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-1"
        >
           <span className="font-serif text-white/90 text-lg md:text-xl tracking-[0.2em] uppercase">Special Edition</span>
           <span className="text-yellow-500/80 text-sm font-mono">Let's start the journey</span>
        </motion.div>

        {/* TOMBOL BUKA (Glassmorphism) */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="group mt-12 px-8 py-4 bg-white/10 backdrop-blur-md border border-yellow-400/30 rounded-full flex items-center gap-4 mx-auto transition-all shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:shadow-[0_0_35px_rgba(234,179,8,0.3)]"
        >
          <div className="flex flex-col items-start">
             <span className="text-[9px] text-yellow-200/70 uppercase tracking-wider font-bold">Tap to Enter</span>
             <span className="text-sm font-black text-white tracking-[0.15em]">BUKA DISINI</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-400 flex items-center justify-center text-black group-hover:rotate-90 transition-transform duration-500 shadow-lg">
            <ChevronRight size={20} strokeWidth={3} />
          </div>
        </motion.button>

      </motion.div>

       {/* Peringatan Headset (Paling bawah) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 text-[10px] text-center text-gray-400 font-mono px-4"
        >
          (Pake headset 🎧 biar vibes-nya dapet, serius.)
        </motion.p>
    </div>
  );
};

export default Opening;