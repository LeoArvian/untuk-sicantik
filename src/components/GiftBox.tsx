import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Ticket, ChevronRight, MessageCircle, Clock, Coffee, Ear, BookOpen, X, Crown, Phone, Zap, HeartHandshake, Video, AlarmClock, Camera, ShieldAlert } from 'lucide-react';

const GiftBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // DATA KUPON (Revisi: Anti-Alay + Tema Warna Luxury)
  // Kita pakai satu background gelap elegan untuk semua, beda di icon color aja.
  const commonBg = "bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20";
  
  const coupons = [
    {
      id: 1,
      title: "Tiket Anti Kacang 🥜",
      desc: "Pakai kupon ini, Azriel WAJIB bales chat Manda dalam 1 menit. Gak boleh alesan ketiduran atau gaming.",
      icon: <Clock size={32} className="text-yellow-400" />,
      waMsg: "Aku mau klaim Tiket Anti Kacang! Bales cepet dong, darurat nih! 😤"
    },
    {
      id: 2,
      title: "Kartu 'Manda Selalu Bener' 👑",
      desc: "Lagi debat? Pake kartu ini, otomatis Azriel yang salah dan Manda yang menang. Valid no debat.",
      icon: <Crown size={32} className="text-yellow-400" />,
      waMsg: "Aku pake Kartu 'Manda Selalu Bener'. Jadi kamu harus ngalah sekarang juga! 👑"
    },
    {
      id: 3,
      title: "Jasa Temen Begadang 🦇",
      desc: "Belum ngantuk jam 2 pagi? Panggil Azriel. Aku siap nemenin chat/call sampe Manda ketiduran.",
      icon: <Phone size={32} className="text-pink-400" />,
      waMsg: "Woi, temenin begadang dong. Jangan tidur dulu! 🦇"
    },
    {
      id: 4,
      title: "Traktiran Jajan Eskrim 🍦",
      desc: "Tukarkan ini di sekolah/luar. Azriel beliin jajan apa aja (Menu bebas pilih, asal jangan minta beli pabriknya aja).",
      icon: <Ticket size={32} className="text-pink-400" />,
      waMsg: "Nagih janji! Kapan nih traktiran jajan eskrim-nya? 🍦"
    },
    {
      id: 5,
      title: "Peredam Mode Maung 🦁",
      desc: "Lagi badmood? Aktifin ini, Azriel bakal ngehibur, ngelawak garing, atau jadi pendengar setia sampe mood kamu balik.",
      icon: <Zap size={32} className="text-yellow-400" />,
      waMsg: "Lagi badmood nih. Buruan hibur aku sekarang! Awas kalo garing! 🦁"
    },
    {
      id: 6,
      title: "Free Call 'Kangen' 🤙",
      desc: "Berlaku kapan aja. Kalau Manda gabut atau kangen, telepon aja. Pasti diangkat. Kalau gak, spam aja.",
      icon: <HeartHandshake size={32} className="text-pink-400" />,
      waMsg: "Ehem... mau pake kupon Free Call nih. Siap-siap ya! 🤙"
    },
    {
      id: 7,
      title: "Tiket VC Dadakan 📹",
      desc: "Bebas Video Call kapan aja tanpa janjian. Azriel wajib angkat (kecuali lagi di WC).",
      icon: <Video size={32} className="text-purple-400" />,
      waMsg: "Mau pake Tiket VC Dadakan! Angkat dong, edisi terbatas nih. 📹"
    },
    {
      id: 8,
      title: "Jasa Alarm Manusia ⏰",
      desc: "Takut telat bangun? Azriel siap telpon/spam chat sampe Manda beneran bangun.",
      icon: <AlarmClock size={32} className="text-yellow-400" />,
      waMsg: "Besok bangunin aku jam ... (isi jamnya). Awas telat banguninnya! ⏰"
    },
    {
      id: 9,
      title: "Bantuan PR / Tugas 📚",
      desc: "Lagi pusing tugas sekolah? Sini Azriel bantuin (atau seenggaknya nemenin pusing bareng biar adil).",
      icon: <BookOpen size={32} className="text-green-400" />,
      waMsg: "Pusing tugas nih. Bantuin kerjain dong (atau semangatin kek)! 📚"
    },
    {
      id: 10,
      title: "Sesi Gibah VIP ☕",
      desc: "Ada hot news di sekolah? Ceritain ke Azriel. Siap jadi pendengar setia dan 'kompor' yang baik.",
      icon: <Coffee size={32} className="text-yellow-600" />,
      waMsg: "Urgent! Ada gosip panas nih. Siap-siap dengerin curhatan aku! ☕"
    },
    {
      id: 11,
      title: "Request PAP Aib 📸",
      desc: "Kamu boleh minta Azriel kirim foto apa aja. Foto muka bantal? Foto aib pas kecil? Gass.",
      icon: <Camera size={32} className="text-gray-400" />,
      waMsg: "Klaim Request PAP! Kirim foto kamu yang lagi... (isi sendiri) 📸"
    },
    {
      id: 12,
      title: "Perlindungan Anti-Ghosting 🛡️",
      desc: "Kalau Azriel ngilang tanpa kabar > 1 jam, Manda berhak spam chat sampe HP aku meledak.",
      icon: <ShieldAlert size={32} className="text-red-400" />,
      waMsg: "Kamu ngilang kemana?! Aktifin Proteksi Anti-Ghosting sekarang! Muncul gak! 🛡️"
    },
    {
      id: 13,
      title: "Tong Sampah Emosi 👂",
      desc: "Lagi kesel? Luapin ke Azriel. Gak bakal di-judge, cuma didengerin.",
      icon: <Ear size={32} className="text-blue-400" />,
      waMsg: "Lagi emosi berat nih. Mau marah-marah, dengerin ya! 👂"
    }
  ];

  const handleNext = () => {
    if (currentIndex < coupons.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  const handleClaim = (msg: string) => {
    const phoneNumber = "6288746041375"; // GANTI NOMOR WA KAMU
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full max-w-sm mx-auto my-6 perspective-1000">
      
      <AnimatePresence mode='wait'>
        {!isOpen ? (
          <motion.div 
            key="box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            {/* KADO DENGAN WARNA GOLD & HITAM BIAR MEWAH */}
            <motion.div 
              animate={{ rotate: [-2, 2, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="relative w-32 h-32 bg-gradient-to-tr from-yellow-700 to-yellow-500 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.4)] flex items-center justify-center border-4 border-white/10"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-full bg-black/20 shadow-sm"></div>
                <div className="absolute w-full h-8 bg-black/20 shadow-sm"></div>
              </div>
              <Gift size={48} className="text-white z-10 animate-bounce" />
            </motion.div>
            
            <div className="text-center">
              <h3 className="text-manda-gold font-serif font-bold text-lg animate-pulse tracking-widest">SPECIAL GIFT 🎁</h3>
              <p className="text-[10px] text-gray-400">Tap untuk buka kado</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="coupon"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-full bg-black/60 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-5 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
               <div className="flex items-center gap-2">
                 <Ticket className="text-yellow-400" size={18} />
                 <span className="text-xs font-bold text-yellow-100 tracking-widest uppercase">Privilege Card</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                 <X size={18} />
               </button>
            </div>

            {/* KARTU KUPON (Carousel) */}
            <div className="relative h-64 w-full perspective-1000">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentIndex}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  // PENGGUNAAN STYLE BG GELAP YANG KONSISTEN
                  className={`absolute inset-0 ${commonBg} rounded-xl p-5 flex flex-col items-center justify-between shadow-inner text-center`}
                >
                  <div className="flex flex-col items-center gap-2 mt-2">
                    <div className="p-3 bg-white/5 rounded-full shadow-sm backdrop-blur-sm border border-white/10">
                      {coupons[currentIndex].icon}
                    </div>
                    <h3 className="font-serif font-bold text-white text-lg leading-tight tracking-wide">
                      {coupons[currentIndex].title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-xs leading-relaxed px-2 font-light">
                    "{coupons[currentIndex].desc}"
                  </p>

                  <button 
                    onClick={() => handleClaim(coupons[currentIndex].waMsg)}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg active:scale-95 border border-yellow-400/30"
                  >
                    <MessageCircle size={14} />
                    KLAIM SEKARANG
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigasi */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1">
                {coupons.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-yellow-400' : 'w-1.5 bg-gray-700'}`} 
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="flex items-center gap-1 text-[10px] text-yellow-500/70 hover:text-yellow-400 transition-colors"
              >
                NEXT <ChevronRight size={12} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftBox;