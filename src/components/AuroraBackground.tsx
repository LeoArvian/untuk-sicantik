import { motion } from 'framer-motion';

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-[#020617]">
      
      {/* 1. DEEP SPACE BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#020617] to-[#000000]" />

      {/* --- PLANET 1: SATURNUS EMAS (SUPER GLOWING) --- */}
      {/* Posisi: Kanan Atas */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-24 -right-24 md:-top-36 md:-right-36 w-72 h-72 md:w-[500px] md:h-[500px] flex items-center justify-center"
      >
         {/* LAYER CAHAYA DEWA (Glow Paling Belakang) - INI YANG BIKIN SILAU */}
         <div className="absolute inset-0 bg-orange-400 rounded-full blur-[80px] opacity-40 animate-pulse-slow"></div>
         <div className="absolute inset-10 bg-yellow-200 rounded-full blur-[50px] opacity-50"></div>

         {/* CINCIN PLANET (Bagian Belakang) */}
         <div className="absolute w-[140%] h-[40%] border-[20px] md:border-[40px] border-orange-500/10 rounded-[50%] transform rotate-[-25deg] blur-[2px]"></div>
         <div className="absolute w-[130%] h-[35%] border-[2px] border-orange-300/30 rounded-[50%] transform rotate-[-25deg]"></div>

         {/* BADAN PLANET */}
         <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-100 via-orange-400 to-amber-900 shadow-[inset_-30px_-30px_90px_rgba(0,0,0,0.9)] z-10 overflow-hidden">
            {/* Tekstur Atmosfer Halus (Biar gak polos) */}
            <div className="absolute inset-0 opacity-30" 
                 style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, transparent 0%, rgba(0,0,0,0.2) 100%)' }}>
            </div>
         </div>

         {/* CINCIN PLANET (Bagian Depan) */}
         <div className="absolute w-[140%] h-[40%] border-t-[8px] border-l-[2px] border-orange-100/50 rounded-[50%] transform rotate-[-25deg] z-20 blur-[1px] shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
      </motion.div>


      {/* --- PLANET 2: ICE PLANET (BERTEKSTUR KAWAH) --- */}
      {/* Posisi: Kiri Bawah */}
      <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-80 md:h-80 rounded-full">
         
         {/* GLOW ATMOSFER BIRU */}
         <div className="absolute -inset-4 bg-cyan-500 rounded-full blur-[40px] opacity-20"></div>

         {/* BADAN PLANET */}
         <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-blue-950 via-blue-800 to-cyan-400 shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* TEKSTUR 1: KAWAH BESAR (Gelap) */}
            <div className="absolute top-[20%] right-[30%] w-[30%] h-[30%] rounded-full bg-black/20 blur-[2px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]"></div>
            
            {/* TEKSTUR 2: KAWAH KECIL (Terang/Es) */}
            <div className="absolute bottom-[30%] left-[20%] w-[15%] h-[15%] rounded-full bg-cyan-100/30 blur-[1px]"></div>
            
            {/* TEKSTUR 3: GARIS BADAI ES (Pola Awan) */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                 style={{ 
                    backgroundImage: 'radial-gradient(circle at 0% 100%, transparent 40%, rgba(255,255,255,0.4) 45%, transparent 50%)'
                 }}>
            </div>

            {/* HIGHLIGHT PERMUKAAN (Biar berdimensi) */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent"></div>
         </div>
      </div>

      {/* --- BULAN KECIL (PEMANIIS) --- */}
      <div className="absolute top-[40%] left-[10%] w-4 h-4 md:w-8 md:h-8 rounded-full bg-gray-300 shadow-[0_0_10px_white]"></div>


      {/* --- DEKORASI NEBULA & BINTANG JAUH --- */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[600px] 
        bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10 blur-[100px] pointer-events-none">
      </div>

      {/* VIGNETTE HALUS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />

    </div>
  );
};

export default AuroraBackground;