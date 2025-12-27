import { useEffect, useState } from 'react'; // Tambah useState
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, RotateCcw } from 'lucide-react';

// IMPORT SEMUA KOMPONEN
import Contract from './Contract';          
import SoulmateScanner from './SoulmateScanner';
import KhodamCheck from './KhodamCheck';
import SecretSignal from './SecretSignal'; 
import GachaSystem from './GachaSystem';
import GoldenTicket from './GoldenTicket';
import GiftBox from './GiftBox'; 
import FutureGallery from './FutureGallery';
import RateMyEffort from './RateMyEffort'; 
// IMPORT PENTING: Ambil LockedMessage DAN UnlockedLetter
import LockedMessage, { UnlockedLetter } from './LockedMessage'; 
import TimeCapsule from './TimeCapsule';    

interface EndingProps {
  onReplay: () => void;
}

const Ending = ({ onReplay }: EndingProps) => {
  // STATE BARU: Untuk nampung status kunci surat
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Efek Confetti (Kembang Api) saat halaman muncul
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  // Efek Klik meledak
  const triggerFireworks = (e: any) => {
    let x = 0; let y = 0;
    if (e.touches) { 
      x = e.touches[0].clientX / window.innerWidth; 
      y = e.touches[0].clientY / window.innerHeight; 
    } else { 
      x = e.clientX / window.innerWidth; 
      y = e.clientY / window.innerHeight; 
    }
    confetti({ 
      origin: { x, y }, 
      particleCount: 30, 
      spread: 70, 
      startVelocity: 30, 
      colors: ['#FFD700', '#FF4D4D', '#FFFFFF', '#00FF00'], 
      disableForReducedMotion: true 
    });
  };

  // Tombol Chat Akhir (WA)
  const handleWhatsApp = (e: any) => {
    e.stopPropagation();
    const phoneNumber = "6288746041375"; // NOMOR WA KAMU
    const text = "Hai Azriel, webnya keren banget! Aku kasih bintang 5 deh ⭐⭐⭐⭐⭐";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Komponen Divider (Pemisah Bagian)
  const SectionDivider = ({ title }: { title: string }) => (
    <div className="w-full flex items-center gap-4 my-8 opacity-40">
      <div className="h-px bg-white/30 flex-1"></div>
      <span className="text-[10px] font-mono tracking-[0.2em] text-white uppercase">{title}</span>
      <div className="h-px bg-white/30 flex-1"></div>
    </div>
  );

  return (
    <div 
      className="h-full w-full overflow-y-auto z-10 relative flex flex-col items-center pt-24 pb-20 no-scrollbar cursor-pointer bg-gradient-to-b from-transparent via-black/40 to-black/90"
      onClick={triggerFireworks} 
    >

      <div className="w-full max-w-md px-6 flex flex-col items-center gap-6 cursor-default" onClick={(e) => e.stopPropagation()}>
        
        {/* === HEADER === */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center cursor-pointer mb-2"
          onClick={(e) => { triggerFireworks(e); }} 
        >
          <h1 className="font-body font-light text-2xl md:text-3xl text-gray-300 mb-2 tracking-[0.3em] uppercase">Happy New Year</h1>
          <h2 className="font-script text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 animate-pulse-slow py-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            2026, Manda
          </h2>
        </motion.div>

        {/* === ZONA 1: SURAT PERJANJIAN (BARU) === */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
          <Contract />
        </motion.div>

        {/* === ZONA 2: FUN ZONE === */}
        <div className="w-full">
          <SectionDivider title="Fun Zone" />
          <div className="flex flex-col gap-6">
             <SoulmateScanner />
             <KhodamCheck />
             <SecretSignal />
          </div>
        </div>

        {/* === ZONA 3: HADIAH (Rewards) === */}
        <div className="w-full">
          <SectionDivider title="Your Rewards" />
          <div className="flex flex-col gap-6 items-center">
             <GachaSystem />
             <GoldenTicket />
             <GiftBox />
          </div>
        </div>

        {/* === ZONA 4: MASA DEPAN & PESAN HATI === */}
        <div className="w-full">
          <SectionDivider title="Our Future" />
          <FutureGallery />
          
          {/* Fitur Pesan Hati ditaruh disini biar flow-nya enak */}
          <div className="mt-8">
            <TimeCapsule />
          </div>
        </div>

        {/* === FEEDBACK & CLOSING === */}
        <div className="w-full space-y-4 mt-8">
          
          {/* Rating Bintang */}
          <RateMyEffort />

          {/* Tombol Chat Utama */}
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-white text-black px-8 py-4 rounded-xl font-body font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            <Send size={20} />
            <span>Chat Azriel Sekarang 💌</span>
          </button>

          {/* Tombol Ulang */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={onReplay} 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs transition-all border border-white/10"
            >
              <RotateCcw size={16} />
              <span>Ulangi Cerita</span>
            </button>
          </div>
        </div>

        {/* === ZONA RAHASIA (Surat Terkunci di paling bawah) === */}
        <div className="mt-8 mb-20 w-full">
            <SectionDivider title="Secret Message" />
            
            {/* LOGIC YANG SUDAH DIPERBAIKI */}
            {!isUnlocked ? (
               // Kalau belum terbuka, tampilkan Gembok
               <LockedMessage onUnlock={() => setIsUnlocked(true)} />
            ) : (
               // Kalau sudah terbuka, tampilkan Surat
               <div className="flex justify-center p-4">
                  <UnlockedLetter />
               </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Ending;