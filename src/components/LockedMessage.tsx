import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LockedMessageProps {
  onUnlock: () => void;
}

const LockedMessage = ({ onUnlock }: LockedMessageProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isShake, setIsShake] = useState(false);

  // --- LOGIC CONFETTI NARSIS (EASTER EGG) ---
  const triggerNarcissistMode = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFFFFF', '#FFA500'] // Gold Theme
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFFFFF', '#FFA500']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.trim().toLowerCase();

    // 1. CEK EASTER EGG (NARSIS CHECK)
    if (cleanInput === 'manda' || cleanInput === 'amanda') {
      triggerNarcissistMode();
      setError("Ciye ngetik nama sendiri... Narsis banget sih cantik? 😜");
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
      return; 
    }

    // 2. CEK PASSWORD (DEFAULT: 2026 atau cantikk)
    if (cleanInput === 'cantik' || cleanInput === 'cantikk' || cleanInput === 'cantikkk' || cleanInput === 'cantikkkk') {
      onUnlock(); // Panggil fungsi unlock dari App.tsx untuk pindah ke next step
    } 
    
    // 3. PASSWORD SALAH
    else {
      setError("Password salah. Clue: Penolakan di hari jum'at.");
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative z-10 py-10">
      
      {/* TAMPILAN LOCK SCREEN */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        
        {/* --- FORM LOCK (KIRI) --- */}
        {/* Konten ini akan selalu muncul sebagai 'cover' pesan */}
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mx-auto mb-6 relative">
                <Lock size={32} className="text-yellow-500" />
                <div className="absolute -top-1 -right-1 animate-bounce">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
                    ?
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-serif text-white mb-2 tracking-widest uppercase">
                Locked Message
            </h2>
            <p className="text-sm text-gray-400 font-sans">
                Masukkan kode akses untuk membuka pesan rahasia.
            </p>
        </div>

        {/* INPUT PASSWORD */}
        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mb-10">
          <motion.div
            animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="relative flex items-center">
              <KeyRound size={20} className="absolute left-4 text-gray-500" />
              <input
                type="text" 
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(""); 
                }}
                placeholder="Masukkan Kode..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all text-center tracking-widest uppercase font-bold"
              />
            </div>
          </motion.div>

          <AnimatePresence mode='wait'>
            {error && (
              <motion.p
                key={error}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-xs mt-3 font-medium text-center ${
                  error.includes("Narsis") ? "text-yellow-400 font-bold" : "text-red-400"
                }`}
              >
                {error.includes("Narsis") && <Sparkles size={12} className="inline mr-1" />}
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full mt-6 bg-white text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 tracking-widest uppercase"
          >
            <Unlock size={18} />
            Buka Rahasia
          </button>
        </form>

        {/* --- PESAN RAHASIA (MUNCUL SETELAH UNLOCK DI LOGIC APP, TAPI KITA SIMPAN TEKSNYA DISINI UNTUK FORMATTING) --- */}
        {/* Catatan: Karena kamu menggunakan onUnlock prop, teks di bawah ini sebenarnya akan di-render di App.tsx atau component parent jika strukturnya begitu. 
            TAPI, jika kamu mau teksnya muncul LANGSUNG di sini menggantikan form, kita ubah logic render-nya sedikit di bawah ini: 
        */}

      </motion.div>
    </div>
  );
};

// --- KOMPONEN SURAT YANG SUDAH TERBUKA (ISI PESAN KAMU) ---
// Gunakan komponen ini di App.tsx saat status isUnlocked = true
export const UnlockedLetter = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
            {/* Dekorasi Sudut Emas */}
            <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-yellow-500/30 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-yellow-500/30 rounded-br-3xl"></div>

            <div className="prose prose-invert max-w-none font-serif text-base md:text-lg leading-relaxed text-gray-300">
                
                <p className="font-bold text-yellow-500 text-2xl mb-8 border-b border-white/10 pb-4">
                    Hai, Manda.
                </p>

                <p>
                    Kalau kamu baca ini, berarti kamu cukup kepo buat mecahin kodenya. Selamat ya.
                </p>

                <p>
                    Kita ini lucu ya. <strong className="text-white">Di chat akrab banget, tapi pas ketemu di sekolah malah kayak orang musuhan.</strong>
                </p>

                <p>
                    Sebenernya gak ada rahasia besar. Aku cuma mau jujur soal satu hal yang mungkin kamu bertanya-tanya (atau mungkin kamu gak peduli): <br/>
                    <span className="italic text-yellow-200/80 block mt-2 pl-4 border-l-2 border-yellow-500/50">
                        "Kenapa sih Azriel kalau di sekolah diem aja atau pura-pura gak kenal?"
                    </span>
                </p>

                <p>
                    Jujur, itu bukan karena aku sombong. Tapi karena aku <strong className="text-white">minder</strong>.
                </p>

                <p>
                    Di mata aku, kamu itu bersinar banget, Man. Sementara aku... ya cuma aku. Kadang ada rasa takut kalau aku deketin kamu di dunia nyata, aku malah ngerusak imej kamu atau bikin kamu risih. Aku ngerasa belum pantas aja.
                </p>

                <p>
                    Jadi, maaf ya kalau aku cuma berani rame di chat.
                </p>

                {/* BOX PERINGATAN BEGADANG (VERSI DARK LUXURY) */}
                <div className="my-8 rounded-xl border border-red-500/30 bg-red-900/10 p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                    <div className="absolute top-2 right-4 opacity-50 text-5xl group-hover:scale-110 transition-transform">😤</div>
                    <p className="mb-2 text-red-200 font-bold tracking-wide">WARNING:</p>
                    <p className="text-gray-300 relative z-10">
                        Oh iya, satu lagi. Tolong ya, itu hobi <strong className="text-white decoration-red-500 underline underline-offset-4">begadang sampai jam 3 pagi</strong> dikurangin. Kemarin pas sakit, dibilangin malah ngeyel <em className="text-white">"gak ngaruh, gak ngaruh"</em>. Dasar batu.
                    </p>
                    <p className="text-xs text-red-300/70 mt-3 italic">
                        Aku ngomel gini karena aku peduli. Jaga kesehatan, Cantikk. Aku gak mau liat kamu sakit.
                    </p>
                </div>

                <p>
                    Tenang aja, aku gak bakal nuntut status apa-apa. Cuma mau bilang: Aku nyaman ngobrol sama kamu. Tolong jangan berubah ya, tetep jadi Manda yang asik, jutek, dan gengsian kayak biasa. Jangan menghilang.
                </p>

                <p>
                    Jadi, untuk sekarang, biarin aku jadi <strong className="text-yellow-400">'Fans VIP'</strong> jalur belakang layar dulu ya?
                </p>

                <p>
                    Semangat terus ya. Kalau dunia lagi jahat sama kamu, chat aku selalu terbuka 24 jam.
                </p>

                {/* FOOTER */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center space-y-4">
                    <p className="font-serif text-3xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600 font-bold">
                        HAPPY NEW YEAR
                    </p>
                    
                    <div className="w-24 h-1 bg-yellow-500/50 mx-auto rounded-full"></div>

                    <p className="text-sm italic text-gray-400 font-serif max-w-md mx-auto">
                        Just be yourself, Manda. Aku bakal tetep support kamu dari sini, entah sebagai temen chat atau... ya liat nanti aja.
                    </p>
                </div>

                <p className="text-right mt-10 font-serif italic text-xl text-yellow-500" style={{ fontFamily: "'Royalister', cursive" }}>
                    ~ Azriel.
                </p>
            </div>
        </motion.div>
    );
}

export default LockedMessage;