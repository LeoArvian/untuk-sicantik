import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LockOpen, Sparkles, X, MessageCircle, DoorOpen, ChevronRight, TriangleAlert, Key } from 'lucide-react';

interface SecretExitProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- LOGIC PUZZLE BERANTAI (TETAP SAMA) ---
const PUZZLE_STEPS = [
  {
    id: 1,
    clue: "🔒 SECURITY LEVEL 1\nTahun target visi misi VVIP kita?",
    placeholder: "YYYY",
    validate: (ans: string) => ans.trim() === "2026",
    errorMsg: "Tahunnya salah. Coba ingat janji kita."
  },
  {
    id: 2,
    clue: "🔒 SECURITY LEVEL 2\nAmbil angka digit terakhir dari tahun itu?",
    placeholder: "Satu Angka",
    validate: (ans: string) => ans.trim() === "6",
    errorMsg: "Angka terakhir dari 2026 berapa?"
  },
  {
    id: 3,
    clue: "🔒 SECURITY LEVEL 3\nAngka tadi (6) dikurangi jumlah poin janji di kontrak?",
    placeholder: "Hasilnya...",
    validate: (ans: string) => ans.trim() === "2",
    errorMsg: "6 dikurang 4 poin janji = ...?"
  },
  {
    id: 4,
    clue: "🔒 SECURITY LEVEL 4\nKalau angka itu (2) adalah jumlah orang di hubungan ini, siapa aja?",
    placeholder: "Nama & Nama",
    validate: (ans: string) => {
      const lower = ans.toLowerCase();
      return lower.includes("azriel") && lower.includes("amanda");
    },
    errorMsg: "Harus nama kita berdua dong."
  },
  {
    id: 5,
    clue: "🔒 SECURITY LEVEL 5\nOrang di urutan kedua (Pemegang Tiket), namanya ada berapa huruf?",
    placeholder: "Angka",
    validate: (ans: string) => ans.trim() === "6", 
    errorMsg: "Hitung huruf 'A-M-A-N-D-A'."
  },
  {
    id: 6,
    clue: "💎 FINAL KEY\nSatu kata (6 huruf) yang mendeskripsikan dia & paling sering Azriel sebut?",
    placeholder: "C.....",
    validate: (ans: string) => ans.toLowerCase().trim() === "cantik",
    errorMsg: "Jujur aja. Depannya C, belakangnya K."
  }
];

const SecretExit = ({ isOpen, onClose }: SecretExitProps) => {
  const [mounted, setMounted] = useState(false);
  
  // State Flow: LOCKED -> UNLOCKING (Animation) -> OPEN (Surat)
  const [viewState, setViewState] = useState<'LOCKED' | 'UNLOCKING' | 'OPEN'>('LOCKED');
  
  const [currentStep, setCurrentStep] = useState(0); 
  const [inputAnswer, setInputAnswer] = useState("");
  const [errorShake, setErrorShake] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);

  const MY_PHONE_NUMBER = "6288746041375"; 
  const msgStop = encodeURIComponent("Zriel, sorry. Kayaknya mending kita stop chatan dulu. Makasih udah pernah peduli, tapi aku butuh ruang.");
  const msgStay = encodeURIComponent("Zriel, aku udah baca semuanya. Jangan mundur dulu ya. Ayo coba balikin asiknya kayak dulu.");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Reset saat ditutup
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setViewState('LOCKED');
        setCurrentStep(0);
        setInputAnswer("");
        setConfirmExit(false);
      }, 500);
    }
  }, [isOpen]);

  const handleSubmitPuzzle = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const currentPuzzle = PUZZLE_STEPS[currentStep];
    
    if (currentPuzzle.validate(inputAnswer)) {
      setInputAnswer(""); 
      if (currentStep < PUZZLE_STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // FINISH - Trigger Animasi
        setViewState('UNLOCKING');
        setTimeout(() => {
            setViewState('OPEN');
        }, 3500);
      }
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const handleStopChat = () => window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${msgStop}`, '_blank');
  const handleStayChat = () => window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${msgStay}`, '_blank');

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden font-sans"
        >
          {/* BACKGROUND LAYERS */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black/50 to-black pointer-events-none" />
          
          <motion.div
            // PERBAIKAN LAYOUT: max-h-[85vh] memastikan kartu tidak lebih tinggi dari layar
            className="w-full max-w-lg relative z-10 flex flex-col max-h-[85vh]" 
            layout 
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* CONTAINER UTAMA (Card) */}
            <div className="bg-zinc-900 border border-yellow-500/30 rounded-2xl shadow-[0_0_80px_rgba(234,179,8,0.15)] overflow-hidden relative flex flex-col h-full w-full">
                
                {/* Efek Shine Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent z-20" />

                {/* --- 1. TAMPILAN PUZZLE (LOCKED) --- */}
                {viewState === 'LOCKED' && (
                   <motion.div 
                     key="locked"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.05 }}
                     className="p-8 md:p-10 text-center flex-1 flex flex-col justify-center relative overflow-y-auto"
                   >
                      <button onClick={onClose} className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors z-30"><X size={20}/></button>

                      {/* Progress Bar */}
                      <div className="absolute top-0 left-0 h-1 bg-yellow-900/50 w-full">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_10px_#EAB308]"
                          initial={{ width: "0%" }}
                          animate={{ width: `${((currentStep) / PUZZLE_STEPS.length) * 100}%` }}
                        />
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                            <div className="mx-auto w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-6 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                                {currentStep === PUZZLE_STEPS.length - 1 ? <Key size={32} /> : <Lock size={32} />}
                            </div>

                            <h3 className="text-yellow-100 font-serif text-xl md:text-2xl leading-relaxed whitespace-pre-line px-2">
                                {PUZZLE_STEPS[currentStep].clue}
                            </h3>

                            <form onSubmit={handleSubmitPuzzle} className="relative max-w-xs mx-auto w-full">
                                <motion.input
                                    autoFocus
                                    type="text"
                                    value={inputAnswer}
                                    onChange={(e) => setInputAnswer(e.target.value)}
                                    placeholder={PUZZLE_STEPS[currentStep].placeholder}
                                    animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
                                    className="w-full bg-white/5 border-b-2 border-yellow-500/30 text-center text-white py-4 px-4 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all placeholder:text-white/20 font-mono text-lg rounded-t-lg"
                                />
                                {errorShake && (
                                    <p className="text-red-400 text-xs mt-2 absolute w-full left-0 animate-pulse font-bold tracking-wide">
                                        ⚠️ {PUZZLE_STEPS[currentStep].errorMsg}
                                    </p>
                                )}
                            </form>

                            <button 
                                onClick={() => handleSubmitPuzzle()}
                                className="mt-6 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-200 px-8 py-3 rounded-full border border-yellow-500/30 text-xs tracking-[0.2em] font-bold uppercase transition-all hover:scale-105 flex items-center gap-2 mx-auto active:scale-95"
                            >
                                {currentStep === PUZZLE_STEPS.length - 1 ? "BUKA SEKARANG" : "LANJUT"} <ChevronRight size={14} />
                            </button>
                        </motion.div>
                      </AnimatePresence>
                   </motion.div>
                )}

                {/* --- 2. TAMPILAN TRANSISI (ANIMASI) --- */}
                {viewState === 'UNLOCKING' && (
                    <motion.div 
                        key="unlocking"
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
                    >
                        <motion.div
                            initial={{ scale: 1, rotate: 0 }}
                            animate={{ 
                                scale: [1, 1.2, 1.2],
                                rotate: [0, -5, 5, -5, 5, 0], 
                            }}
                            transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ opacity: [1, 0] }} 
                                transition={{ delay: 1.5, duration: 0.1 }}
                            >
                                <Lock size={80} className="text-yellow-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.8)]" />
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                transition={{ delay: 1.5, duration: 0.2, type: "spring" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <LockOpen size={80} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,1)]" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 text-center"
                        >
                            <motion.p 
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="text-yellow-500 font-mono text-xs tracking-[0.3em]"
                            >
                                VERIFYING BIOMETRICS...
                            </motion.p>
                            <motion.h2 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                                className="text-white font-bold text-2xl tracking-widest mt-2"
                            >
                                ACCESS GRANTED
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ delay: 2.8, duration: 0.8 }}
                            className="absolute inset-0 bg-white z-[60]"
                        />
                    </motion.div>
                )}

                {/* --- 3. TAMPILAN PESAN RAHASIA (OPEN) --- */}
                {viewState === 'OPEN' && (
                    <motion.div 
                        key="open"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        // PERBAIKAN: Gunakan flex-1 overflow-hidden agar scrollbar ada di dalam child
                        className="relative flex flex-col h-full overflow-hidden"
                    >
                        {/* Header Vault + TOMBOL CLOSE (Sticky) */}
                        <div className="bg-gradient-to-r from-yellow-950/40 to-black p-4 border-b border-yellow-500/20 flex items-center justify-between z-20 backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-3">
                                <Sparkles size={18} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                                <span className="text-yellow-100/80 font-serif tracking-widest text-sm uppercase">
                                    Golden Vault • Unlocked
                                </span>
                            </div>
                            
                            <button 
                                onClick={onClose}
                                className="text-zinc-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* ISI SURAT ASLI - SCROLL DI SINI */}
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar text-zinc-300 font-sans leading-relaxed text-sm md:text-base space-y-6 flex-1">
                            
                            <p className="italic text-yellow-500/60 text-xs font-mono border-l-2 border-yellow-500/30 pl-3">
                                File: undelivered_feelings.log <br/>
                                Status: Decrypted
                            </p>

                            <p>
                                Selamat. Kamu berhasil nemuin pintu darurat ini. <br/>
                                Man, boleh jujur gak? <strong className="text-white text-lg">Aku capek.</strong>
                            </p>

                            <p>
                                Bukan capek ngoding, bukan capek sekolah. Tapi capek nebak-nebak isi kepala kamu.
                            </p>

                            <p>
                                Kita emang gak pacaran. Aku tau. Tapi kedekatan kita kemarin itu nyata kan? Atau cuma aku aja yang ngerasa gitu?
                                Kadang aku ngerasa aku ini cuma <strong className="text-red-400">"NPC"</strong> di hidup kamu. Yang dicari pas ada <em>quest</em> (tugas/butuh bantuan) doang, tapi pas <em>quest</em>-nya kelar, aku dilupain lagi.
                            </p>

                            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-500/50 my-4">
                                <p className="text-yellow-200/90 font-serif italic text-lg mb-2">
                                "Aku kangen Manda yang dulu."
                                </p>
                                <p className="text-xs md:text-sm text-zinc-400">
                                Kangen Manda yang <em>humble</em>. Yang antusias denger ceritaku. Yang bisa diajak chatan seru tanpa mikirin gengsi.
                                Sekarang? Rasanya kayak ngobrol sama tembok. Cuma "iya", "oke". Aku kangen ngerasa <strong className="text-white">dilihat</strong>, bukan cuma <strong className="text-white">dibutuhkan</strong>.
                                </p>
                            </div>

                            <p>
                                Mungkin aku "berlebihan". Aku <em>fast respon</em>, bawel, posesif dikit. <br/>
                                <span className="text-white underline decoration-red-500/50 underline-offset-4">Tapi asal kamu tau:</span> <br/>
                                Orang yang <em>fast respon</em> itu bukan orang gabut. Aku juga punya kesibukan. Tapi aku milih <strong>memprioritaskan kamu</strong>. Sakit rasanya kalau prioritas itu malah dianggap "mengganggu".
                            </p>

                            <p>
                                Aku gak mau maksa kamu buat suka sama aku. Aku juga punya harga diri, Man. Aku gak mau ngejar orang yang gak mau dikejar.
                            </p>

                            <hr className="border-white/10 my-6" />

                            <div className="text-center space-y-2">
                                <h3 className="text-white font-bold tracking-widest text-sm uppercase">Pilihan Terakhir</h3>
                                <p className="text-xs text-zinc-500">
                                Pilih dengan bijak. Keputusanmu hari ini menentukan hubungan kita di 2026.
                                </p>
                            </div>
                        </div>

                        {/* Footer Actions - SELALU DI BAWAH (SHRINK-0) */}
                        <div className="p-6 bg-black/60 border-t border-yellow-500/10 flex flex-col gap-3 shrink-0 z-20">
                            
                            {!confirmExit ? (
                                <button
                                    onClick={() => setConfirmExit(true)}
                                    className="w-full py-4 rounded-xl bg-red-900/10 border border-red-900/30 text-red-400 font-bold hover:bg-red-900/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <DoorOpen size={20} className="group-hover:-translate-x-1 transition-transform" />
                                    AKU BUTUH RUANG (STOP CHAT)
                                </button>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-950/50 border border-red-500 p-4 rounded-xl text-center space-y-3"
                                >
                                    <div className="flex items-center justify-center gap-2 text-red-400 font-bold text-sm">
                                        <TriangleAlert size={16}/> WARNING
                                    </div>
                                    <p className="text-red-200 text-xs">
                                        Yakin Man? Kalau kamu tekan ini, aku bakal beneran mundur dan berhenti ganggu notif kamu.
                                    </p>
                                    <div className="flex gap-3 justify-center pt-2">
                                        <button 
                                            onClick={() => setConfirmExit(false)}
                                            className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button 
                                            onClick={handleStopChat}
                                            className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 shadow-lg shadow-red-900/20 transition-all"
                                        >
                                            Iya, Aku Yakin.
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            <button 
                                onClick={handleStayChat}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-800 text-white font-bold shadow-[0_5px_20px_rgba(234,179,8,0.2)] hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 border border-yellow-400/20"
                            >
                                <MessageCircle size={18} />
                                Jangan Mundur. Ayo Perbaiki.
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SecretExit;