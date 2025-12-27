import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Noise Halus (Biar gak polos banget, tapi ringan) */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* --- ANIMASI UTAMA: SIMPLE GOLDEN RING --- */}
      <div className="relative flex items-center justify-center mb-8">
        
        {/* Cincin Putar (Loading) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-[3px] border-white/10 border-t-yellow-500"
        />
        
        {/* Titik Cahaya Tengah (Diam) */}
        <div className="absolute w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)] animate-pulse"></div>

      </div>

      {/* --- TEKS STABIL (GAK KELIP-KELIP) --- */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <h2 
          className="text-yellow-100 font-serif text-lg tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Menyiapkan Semesta
        </h2>
        
        {/* Progress Line Kecil */}
        <div className="w-24 h-[1px] bg-gray-800 rounded-full overflow-hidden mt-2">
           <motion.div 
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 3, ease: "easeInOut" }}
             className="h-full bg-yellow-500"
           />
        </div>
      </div>

    </div>
  );
};