import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { TriangleAlert, X, MessageCircle, DoorOpen } from 'lucide-react';

interface SecretExitProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecretExit = ({ isOpen, onClose }: SecretExitProps) => {
  const [confirmExit, setConfirmExit] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Pastikan komponen sudah ter-mount sebelum portal jalan (biar aman di NextJS/Vite)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // --- CONFIG ---
  // GANTI NOMOR INI DENGAN NOMOR WA KAMU (Format: 628xxx)
  const MY_PHONE_NUMBER = "628xxxxxxxxxxx"; 

  // Pesan 1: Kalau dia tekan tombol MERAH (Stop Chatan)
  const msgStop = encodeURIComponent(
    "Zriel, sorry. Kayaknya mending kita stop chatan dulu. Makasih udah pernah peduli, tapi aku butuh ruang."
  );

  // Pesan 2: Kalau dia tekan Link BAWAH (Lanjut)
  const msgStay = encodeURIComponent(
    "Zriel, aku udah baca semuanya. Jangan mundur dulu ya. Ayo coba balikin asiknya kayak dulu."
  );

  const handleStopChat = () => {
    window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${msgStop}`, '_blank');
  };

  const handleStayChat = () => {
    window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${msgStay}`, '_blank');
  };

  // Logic Portal: Kalau belum mounted, jangan render apa-apa
  if (!mounted) return null;

  // Render konten langsung ke BODY (bypass semua z-index parent)
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Z-INDEX SUPER TINGGI (DI ATAS Z-50 NYA AUDIO PLAYER)
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg bg-zinc-900 border border-red-900/50 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.2)] overflow-hidden relative my-auto"
          >
            {/* Header System */}
            <div className="bg-red-950/30 border-b border-red-900/30 p-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-red-500 animate-pulse">
                <TriangleAlert size={18} />
                <span className="font-mono text-xs md:text-sm font-bold tracking-widest">
                  SYSTEM OVERRIDE: HONEST_MODE.exe
                </span>
              </div>
              
              {/* TOMBOL CLOSE (Sekarang pasti bisa diklik) */}
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar text-zinc-300 space-y-6 font-sans leading-relaxed text-sm md:text-base">
              
              <p className="italic text-zinc-500 text-xs font-mono border-l-2 border-zinc-700 pl-3">
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

              <hr className="border-zinc-800 my-6" />

              <div className="text-center space-y-2">
                <h3 className="text-white font-bold tracking-widest text-sm uppercase">Pilihan Terakhir</h3>
                <p className="text-xs text-zinc-500">
                  Pilih dengan bijak. Keputusanmu hari ini menentukan hubungan kita di 2026.
                </p>
              </div>

            </div>

            {/* Footer / Buttons */}
            <div className="p-6 bg-black/40 border-t border-white/5 flex flex-col gap-3">
              
              {!confirmExit ? (
                <button
                  onClick={() => setConfirmExit(true)}
                  className="w-full py-4 rounded-xl bg-red-900/20 border border-red-500/50 text-red-400 font-bold hover:bg-red-900/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-red-900/10"
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
                  <p className="text-red-200 font-bold text-sm">
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
                      className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 shadow-lg shadow-red-900/20 transition-all active:scale-95"
                    >
                      Iya, Aku Yakin.
                    </button>
                  </div>
                </motion.div>
              )}

              <button 
                onClick={handleStayChat}
                className="text-xs text-zinc-500 hover:text-white transition-colors py-3 flex items-center justify-center gap-2 mt-1 opacity-70 hover:opacity-100"
              >
                <MessageCircle size={14} />
                Atau jangan mundur dulu? Chat aku di sini.
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body // <-- INI DIA KUNCINYA (Teleport ke Body)
  );
};

export default SecretExit;