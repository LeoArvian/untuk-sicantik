import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Download, Loader2, Crown, Stamp, ShieldCheck, X } from 'lucide-react';
import html2canvas from 'html2canvas';

// --- IMPORT KOMPONEN RAHASIA ---
// Pastikan file SecretExit.tsx sudah ada di folder yang sama
import SecretExit from './SecretExit'; 

const Contract = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // State posisi tombol Gak Mau
  const [btnStyle, setBtnStyle] = useState<React.CSSProperties>({}); // Fix type 'any' biar aman deploy
  const [hasMoved, setHasMoved] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  // --- LOGIC SECRET EXIT (TRIGGER FIX) ---
  const [showSecret, setShowSecret] = useState(false);
  
  // Menggunakan useRef untuk counter (Best Practice: Tidak memicu re-render & lolos linter)
  const secretTapRef = useRef(0); 

  const handleBarcodeTap = () => {
    secretTapRef.current += 1; // Tambah hitungan
    
    // Jika diketuk 5x atau lebih
    if (secretTapRef.current >= 5) {
        setShowSecret(true); // Munculkan menu rahasia
        secretTapRef.current = 0; // Reset hitungan
    }

    // (Opsional) Reset otomatis kalau orang iseng ngetuknya lama jedanya
    // Kita biarkan simple dulu biar tidak error
  };

  // --- LOGIC DOWNLOAD ---
  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Tunggu render
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "transparent", 
        scale: 2, 
        ignoreElements: (element) => element.classList.contains('hide-on-print'),
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "Golden-Contract-Manda-2026.png";
      link.click();
    } catch (error) {
      console.error("Gagal download:", error);
      alert("Gagal simpan gambar. Screenshot manual aja ya! 😅");
    }
    setIsDownloading(false);
  };

  // --- LOGIC TOMBOL KABUR ---
  const moveButton = () => {
    setHasMoved(true);
    const randomTop = Math.floor(Math.random() * 80) + 10 + '%';
    const randomLeft = Math.floor(Math.random() * 80) + 10 + '%';
    
    setBtnStyle({ 
        position: 'fixed', 
        top: randomTop, 
        left: randomLeft,
        zIndex: 9999
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      
      {/* RENDER KOMPONEN RAHASIA (Hanya muncul jika showSecret = true) */}
      <SecretExit isOpen={showSecret} onClose={() => setShowSecret(false)} />

      {/* INJECT FONT ROYALISTER */}
      <style>{`
        @font-face {
          font-family: 'Royalister';
          src: url('/royalister.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>

      {/* KERTAS GOLDEN VVIP */}
      <motion.div 
        ref={cardRef}
        initial={{ rotateX: 5, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.4)] overflow-hidden border-4 border-yellow-600/50"
        style={{
            background: `linear-gradient(135deg, #FBF5B7 0%, #BF953F 25%, #FCF6BA 50%, #B38728 75%, #FBF5B7 100%)`,
        }}
      >
        {/* Texture & Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/10 pointer-events-none"></div>
        <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* KONTEN SURAT */}
        <div className="p-6 relative z-10">
            
            {/* HEADER */}
            <div className="text-center mb-6 border-b-2 border-yellow-900/20 pb-4">
                <div className="flex justify-center text-yellow-800 mb-2 drop-shadow-sm">
                    <Crown size={36} strokeWidth={1.5} fill="#FDE68A" />
                </div>
                <h1 className="font-serif font-bold text-2xl md:text-3xl tracking-[0.15em] text-[#3E2723] uppercase drop-shadow-sm">
                    Golden Agreement
                </h1>
                <div className="flex items-center justify-center gap-2 mt-1 opacity-70">
                    <div className="h-[1px] w-8 bg-[#3E2723]"></div>
                    <p className="font-sans text-[8px] text-[#3E2723] font-bold tracking-[0.2em] uppercase">
                        VVIP EXCLUSIVE ACCESS
                    </p>
                    <div className="h-[1px] w-8 bg-[#3E2723]"></div>
                </div>
            </div>

            {/* ISI SURAT */}
            <div className="font-serif text-sm leading-relaxed text-[#2c1810] font-semibold">
                <p className="mb-4 text-justify indent-6">
                    Pemegang tiket ini, <b>Amanda</b>, dengan status VVIP dan kesadaran penuh, menyepakati kontrak eksklusif bersama <b>Azriel</b> untuk:
                </p>
                <ul className="space-y-2 pl-2 text-xs md:text-sm">
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900 shrink-0" /> 
                        <span>Menurunkan gengsi ke level minimum.</span>
                    </li>
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900 shrink-0" /> 
                        <span>Fast response (kecuali ketiduran).</span>
                    </li>
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900 shrink-0" /> 
                        <span>Tetap asik walau "Stranger" di sekolah.</span>
                    </li>
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900 shrink-0" /> 
                        <span>Mengakui kenyamanan dalam obrolan.</span>
                    </li>
                </ul>
            </div>

            {/* FOOTER (MATERAI IMAGE & TTD) */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 relative">
                
                {/* MATERAI IMAGE (DARI FILE PUBLIC) */}
                <div className="relative w-24 h-24 shrink-0 rotate-[-2deg] drop-shadow-md">
                   <img 
                     src="/materai.png" 
                     alt="Materai 10000" 
                     className="w-full h-full object-contain"
                   />
                </div>

                {/* KOLOM TANDA TANGAN */}
                <div className="flex flex-col items-center relative w-full md:w-auto">
                    
                    {/* Teks "Tertanda," */}
                    <p className="text-[10px] font-serif text-[#3E2723] uppercase tracking-wider mb-1 font-bold">
                        Tertanda,
                    </p>

                    <div className="relative w-full md:w-48 h-24 flex items-center justify-center">
                        
                        <AnimatePresence mode='wait'>
                            {isAgreed ? (
                                // HASIL SAH (TANDA TANGAN + NAMA JELAS + STEMPEL)
                                <div className="relative w-full h-full flex flex-col items-center justify-center pt-2">
                                    
                                    {/* TANDA TANGAN (Font Royalister) */}
                                    <motion.div
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        className="text-5xl text-[#3E2723] z-10 leading-none"
                                        style={{ fontFamily: "'Royalister', cursive" }}
                                    >
                                        Amanda
                                    </motion.div>

                                    {/* NAMA JELAS (Garis Bawah) */}
                                    <motion.div
                                         initial={{ opacity: 0 }}
                                         animate={{ opacity: 1 }}
                                         transition={{ delay: 0.5 }}
                                         className="text-[10px] font-serif font-bold text-[#3E2723] uppercase tracking-widest mt-1 border-b border-[#3E2723] pb-[2px] z-10"
                                    >
                                        Amanda Nur Hasanah
                                    </motion.div>

                                    {/* STEMPEL MERAH (Posisi Absolute biar stempelnya NINDIH tanda tangan) */}
                                    <motion.div 
                                        initial={{ scale: 3, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 500,
                                            damping: 15,
                                            delay: 0.2
                                        }}
                                        className="absolute z-20 transform -rotate-12 mix-blend-multiply -top-2"
                                    >
                                        {/* Background transparan, cuma border & text */}
                                        <div className="border-[4px] border-red-700 text-red-700 px-4 py-2 rounded-lg font-black font-serif uppercase tracking-[0.2em] shadow-sm bg-red-500/10">
                                            <div className="flex items-center gap-2 text-xs border-b-2 border-red-700 pb-1 mb-1 justify-center">
                                                <Stamp size={16} /> OFFICIAL
                                            </div>
                                            ACCEPTED
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                // TOMBOL INTERAKTIF
                                <motion.div 
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="w-full h-full relative flex items-center justify-center gap-4 hide-on-print"
                                >
                                    <motion.button
                                        style={hasMoved ? btnStyle : {}} 
                                        animate={hasMoved ? { x: 0, y: 0 } : {}}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                        onHoverStart={moveButton} 
                                        onTouchStart={moveButton} 
                                        onClick={moveButton}
                                        className={`bg-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm text-xs font-bold whitespace-nowrap hover:bg-gray-400 transition-colors z-50 flex items-center gap-1 ${!hasMoved ? 'absolute left-0' : ''}`}
                                    >
                                        <X size={14} /> Gak Mau
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsAgreed(true)}
                                        className="bg-gradient-to-r from-gray-900 to-black text-yellow-400 px-6 py-2 rounded shadow-lg text-sm font-bold flex items-center gap-2 border border-yellow-600 z-10 hover:shadow-yellow-500/20 hover:scale-105 transition-all absolute right-0"
                                    >
                                        <FileSignature size={16} />
                                        Deal 🤝
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ID BARCODE (TEMPAT RAHASIA) */}
            <div 
                onClick={handleBarcodeTap} // <-- TRIGGER DI SINI
                className="mt-6 pt-2 border-t border-yellow-900/20 flex justify-between items-end opacity-60 cursor-pointer active:opacity-100 transition-opacity"
            >
                <div className="h-6 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png')] bg-contain bg-no-repeat opacity-50 grayscale"></div>
                <p className="text-[6px] font-mono text-[#3E2723]">SECURE DOC • ENCRYPTED</p>
            </div>
        </div>
      </motion.div>

      {/* TOMBOL DOWNLOAD (STATIS DI BAWAH) */}
      <AnimatePresence>
        {isAgreed && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 relative z-20"
            >
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-8 py-4 rounded-full shadow-[0_5px_20px_rgba(234,179,8,0.4)] hover:scale-105 transition-transform disabled:opacity-50 border border-yellow-400 font-bold tracking-wide"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span className="text-sm">MENCETAK...</span>
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            <span className="text-sm">SIMPAN TIKET EMAS 📸</span>
                        </>
                    )}
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contract;