import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, MessageCircleHeart, Loader2, ShieldCheck, ChevronDown, ChevronUp, EyeOff, RefreshCcw } from 'lucide-react';
import emailjs from '@emailjs/browser';

const TimeCapsule = () => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // State untuk fitur "Lihat Selengkapnya"
  const [isExpanded, setIsExpanded] = useState(false);
  
  const form = useRef<HTMLFormElement>(null);

  // ==========================================
  // 👇 JANGAN LUPA ISI ID EMAILJS LAGI YA 👇
  // ==========================================
  const SERVICE_ID = "service_g78riy9";   
  const TEMPLATE_ID = "template_bcfqp9m"; 
  const PUBLIC_KEY = "1dX8SHnxzBmxcZ8-y";   
  // ==========================================

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
       alert("Isi dulu dong, jangan dikosongin! 🥺");
       return;
    }

    setIsSending(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, PUBLIC_KEY)
      .then((result) => {
        console.log('Sukses:', result.text);
        setStatus('success');
        setMessage(''); // Reset pesan jadi kosong
      }, (error) => {
        console.log('Gagal:', error.text);
        setStatus('error');
        alert("Gagal koneksi. Coba cek internet kamu.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // Fungsi buat reset form biar bisa kirim lagi
  const handleReset = () => {
    setStatus('idle');
    setMessage('');
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-8 relative group perspective-1000 px-4">
      
      {/* Efek Glow Pink/Ungu */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <motion.div 
        initial={{ rotateX: 10, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl"
      >
        {status === 'success' ? (
            // TAMPILAN SUKSES
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center space-y-4"
            >
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/50">
                    <ShieldCheck size={32} className="text-purple-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg tracking-wide">SECURED 🔒</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-[220px] mx-auto">
                        Pesan sudah dikunci oleh sistem. <br/>
                        Tidak ada yang bisa membukanya (termasuk aku) sampai timer habis di <span className="text-pink-400 font-bold">Akhir 2026</span>.
                    </p>
                </div>

                {/* TOMBOL KIRIM LAGI */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-pink-400 font-bold hover:bg-white/10 transition-colors"
                >
                    <RefreshCcw size={12} />
                    Kirim Pesan Lainnya
                </motion.button>
            </motion.div>
        ) : (
            // TAMPILAN FORMULIR
            <form ref={form} onSubmit={handleSend}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-pink-400">
                        <MessageCircleHeart className="animate-pulse" size={20} />
                        <div>
                            <h3 className="font-mono text-sm tracking-widest uppercase font-bold">Ruang Jujur</h3>
                            <p className="text-[9px] text-gray-500">Anonymous Mode: ON</p>
                        </div>
                    </div>
                    <EyeOff size={18} className="text-gray-500" />
                </div>
                
                {/* Deskripsi dengan "Lihat Selengkapnya" */}
                <div className="text-xs text-gray-300 mb-4 leading-relaxed font-sans bg-white/5 p-3 rounded-lg border-l-2 border-pink-500 transition-all">
                    <p>
                        Bingung mau nulis apa? Boleh tulis harapan kamu buat tahun 2026 nanti.
                    </p>
                    
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-2 space-y-2"
                            >
                                <p>
                                    Atau... boleh juga tulis <strong>pesan & kesan tentang Azriel</strong> yang selama ini kamu pendem. 
                                </p>
                                <p>
                                    Ada rasa kesel? Kecewa? Atau malah kangen momen dulu? Tumpahin aja di sini.
                                </p>
                                <hr className="border-white/10 my-2"/>
                                <div className="flex gap-2 items-start text-gray-400 italic">
                                    <ShieldCheck size={12} className="mt-1 shrink-0 text-green-400" />
                                    <span>
                                        <strong>Tenang aja.</strong> Sistem ini didesain <em>End-to-End Encrypted</em>. Bahkan Azriel (pembuat web) gak bisa ngintip isinya sekarang. Pesan ini murni buat kenang-kenangan 2026.
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 text-pink-400 font-bold mt-2 hover:underline text-[10px] w-full justify-center pt-1"
                    >
                        {isExpanded ? (
                            <>Tutup <ChevronUp size={12} /></>
                        ) : (
                            <>Lihat Selengkapnya (Penting!) <ChevronDown size={12} /></>
                        )}
                    </button>
                </div>

                {/* Input Area */}
                <textarea
                    name="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis apa aja yang ada di pikiranmu..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all h-32 resize-none mb-4 placeholder:text-gray-600 font-sans disabled:opacity-50"
                    disabled={isSending}
                />

                {/* Tombol Kirim */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 py-3 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSending ? (
                        <>
                            <Loader2 size={14} className="animate-spin" />
                            MENGENKRIPSI...
                        </>
                    ) : (
                        <>
                            <Lock size={14} className="group-hover:text-yellow-200 transition-colors" />
                            KUNCI PESAN (RAHASIA) 🔒
                        </>
                    )}
                </motion.button>
            </form>
        )}
      </motion.div>
    </div>
  );
};

export default TimeCapsule;