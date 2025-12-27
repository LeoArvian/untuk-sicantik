import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight, HelpCircle, MessageCircleHeart, AlertTriangle, Sparkles, BrainCircuit } from 'lucide-react';

interface QuizProps {
  onFinished: () => void;
}

// --- DATA PERTANYAAN ---
const QUESTIONS_DATA = [
  // BAGIAN 1: INTRO & META
  {
    q: "Cek fokus dulu. Tahun depan tahun berapa?",
    options: [
      { text: "2025", msg: "Yah, gagal move on nih? 🤪" },
      { text: "2026", msg: "Cakep! Fokusnya bagus. Lanjut..." }, // BENAR
      { text: "2077", msg: "Kejauhan woi, kita udah tua nanti 👴👵" },
      { text: "2045", msg: "Siap menyongsong Indonesia Emas? 🇮🇩" }
    ],
    correctIndex: 1
  },
  {
    q: "Jujur, pas pertama kali buka link web ini, reaksi kamu gimana?",
    options: [
      { text: "Apaan sih, Alay", msg: "Parah! Udah begadang bikinnya woi 😭" },
      { text: "Biasa aja", msg: "Masa? Coba liat cermin, pasti senyum-senyum 😏" },
      { text: "Kaget & Senyum dikit", msg: "Nah gitu dong jujur. Manis tau kalo senyum 😉" }, // BENAR
      { text: "Bingung", msg: "Bingung kenapa ada cowok se-effort ini ya? 🤭" }
    ],
    correctIndex: 2
  },

  // BAGIAN 2: SEKOLAH (BACKSTREET LIFE)
  {
    q: "Di sekolah kita emang pura-pura 'Stranger' (Gak kenal), tapi sebenernya...", 
    options: [
      { text: "Aku emang males liat kamu", msg: "Jahat banget... padahal aku ganteng lho 🥺" },
      { text: "Dalem hati pengen nyapa tapi gengsi", msg: "Sama dong... tahan ya, ada waktunya 🤫" }, // BENAR
      { text: "Biasa aja tuh", msg: "Masa? Mata gak bisa bohong lho... 👀" },
      { text: "Nunggu disapa duluan", msg: "Huu dasar gengsian, sama aja kita! 🗿" }
    ],
    correctIndex: 1
  },
  {
    q: "Kalau pas kita papasan di kantin/koridor, mata kamu biasanya ke mana?",
    options: [
      { text: "Liatin lantai", msg: "Lantai lebih menarik dari aku? Sedih... 🥀" },
      { text: "Lirik-lirik dikit", msg: "Ketauan deh! Aku juga liat kamu kok 😎" }, // BENAR
      { text: "Liatin tembok", msg: "Awas nabrak temboknya lho mikirin aku 😆" },
      { text: "Pura-pura main HP", msg: "Klise banget triknya, tapi ampuh sih 😂" }
    ],
    correctIndex: 1
  },

  // BAGIAN 3: TENTANG KAMU (TEST OBSERVASI DIA)
  {
    q: "Coba tebak, hal apa dari aku yang paling sering kamu perhatiin diem-diem?",
    options: [
      { text: "Gaya jalan / Penampilan", msg: "Ciye merhatiin detail banget nih... 🫣" }, // BENAR
      { text: "Gak ada", msg: "Tombol ini rusak. Kamu pasti bohong 😝" },
      { text: "Aib aku", msg: "Dih, yang bagus-bagus napa diingetnya! 😤" },
      { text: "Senyum aku (Eaa)", msg: "Waduh, bisa diabetes nanti kalau sering liat 🍯" }
    ],
    correctIndex: 0
  },
  {
    q: "Menurut kamu, aku tuh orangnya sebenernya gimana?",
    options: [
      { text: "Nyebelin banget", msg: "Nyebelin tapi ngangenin kan? Ngaku! 😜" },
      { text: "Seru & Asik", msg: "Valid! Makanya jangan jutek-jutek dong 😉" }, // BENAR
      { text: "Pendiem", msg: "Salah server bu... aku aslinya rame tau!" },
      { text: "Misterius kayak Intel", msg: "Siap 86! Memantau hatimu... 🕵️‍♂️" }
    ],
    correctIndex: 1
  },

  // BAGIAN 4: KEBIASAAN CHAT (EGO CHECK)
  {
    q: "Kalau aku nge-chat jam 7 malem, Manda biasanya bales jam berapa?",
    options: [
      { text: "Jam 7:01 (Gercep)", msg: "Halah, jangan mimpi! Realistis aja deh 🤣" },
      { text: "Jam 9:00 (Lama)", msg: "Nah sadar diri! Keburu lumutan tau nungguinnya 🗿" }, // BENAR
      { text: "Tahun depan", msg: "Kejam banget! Keburu jadi fosil aku..." },
      { text: "Tergantung Mood", msg: "Dih, mood-mood an kayak cuaca aja 🌦️" }
    ],
    correctIndex: 1
  },
  {
    q: "Kenapa sih Manda susah banget disuruh bilang 'Good Night' atau kata manis?",
    options: [
      { text: "Lupa caranya ngetik", msg: "Alasan klasik. Gak mempan! 😋" },
      { text: "Takut aku baper", msg: "Dih PD banget! Tapi iya sih dikit... 🫣" },
      { text: "Karena Harga Diri & Ego setinggi langit 👑", msg: "Turunin dikit napa Bu Egonya... sekali-kali nyenengin orang 🥺" }, // BENAR
      { text: "Gak biasa aja", msg: "Bisa dibiasain kok mulai sekarang... 😏" }
    ],
    correctIndex: 2
  },

  // BAGIAN 5: CEK PERASAAN (JEALOUSY & DYNAMIC)
  {
    q: "Misal nih, ada cewek lain di sekolah yang deketin aku. Reaksi Manda?",
    options: [
      { text: "Bodo amat", msg: "Yakin? Awas nanti nyesel lho... 😌" },
      { text: "Panas / Badmood dikit", msg: "Ciye cemburu... tenang, aku setia kok 🔒" }, // BENAR
      { text: "Ikut seneng", msg: "Dih, kok malah didukung? Jahat! 😤" },
      { text: "Labrak ceweknya", msg: "Waduh, Mode Maung-nya keluar... 🦁" }
    ],
    correctIndex: 1
  },
  {
    q: "Siapa yang paling sering 'Ngalah' kalau kita lagi debat kecil?",
    options: [
      { text: "Aku (Manda)", msg: "Masa? Perasaan kamu batu banget deh 🗿" },
      { text: "Azriel (Yang bikin web)", msg: "Bener banget. Sabar banget kan aku ngadepin kamu? 😇" }, // BENAR
      { text: "Gak ada", msg: "Perang dunia dong kalau gitu..." },
      { text: "Suit Jepang", msg: "Kalo kalah tetep aja aku yang salah kan? 😂" }
    ],
    correctIndex: 1
  },
  {
    q: "Kalau Manda lagi badmood / marah, biasanya pengen diapain?",
    options: [
      { text: "Didiemin aja", msg: "Yakin? Nanti malah makin ngamuk lho..." },
      { text: "Dibujuk / Dihibur", msg: "Dasar manja... tapi oke siap laksanakan! 🫡" }, // BENAR
      { text: "Diajak berantem", msg: "Waduh, nyari mati itu mah 🏳️" },
      { text: "Dibelikan Makanan", msg: "Solusi terbaik! Perut kenyang hati senang 🍔" }
    ],
    correctIndex: 1
  },

  // BAGIAN 6: FUTURE PLAN
  {
    q: "Kan kita belum pernah jalan bareng. Kalo nanti 'Debut', enaknya ke mana?",
    options: [
      { text: "KUA langsung", msg: "Waduh... sekolah dulu yang bener ya dek 😂" },
      { text: "Nonton / Timezone", msg: "Gas! Nanti aku yang atur jadwalnya 📅" }, // BENAR
      { text: "Diem di kelas aja", msg: "Bosen kali ah... masa di sekolah mulu 😴" },
      { text: "Makan Seblak/Mie Ayam", msg: "Anak kuliner banget nih? Boleh lah gas 🍜" }
    ],
    correctIndex: 1
  },
  {
    q: "Kalau tiba-tiba aku call malem-malem, diangkat gak?",
    options: [
      { text: "Auto Reject", msg: "Jahat banget... awas ya nanti kangen 🥺" },
      { text: "Diangkat dong", msg: "Awas ya kalau bohong, ntar malem aku tes! 📞" }, // BENAR
      { text: "Hape di-silent", msg: "Alasan mulu. Bilang aja grogi kan?" },
      { text: "Angkat tapi diem doang", msg: "Lomba diem-dieman? Boleh siapa takut 😶" }
    ],
    correctIndex: 1
  },
  
  // BAGIAN 7: THE EFFORT
  {
    q: "Tebak, kira-kira berapa lama aku bikin web spesial ini buat kamu?",
    options: [
      { text: "5 Menit jadi", msg: "Enak aja! Emang mie instan? 🍜" },
      { text: "Semaleman suntuk", msg: "Bener banget... hargai dong effort-nya 🥺❤️" }, // BENAR
      { text: "Nyuruh orang", msg: "Sembarangan! Ini murni ketikan tangan sendiri tau!" },
      { text: "Seminggu full senyum", msg: "Lebih dari itu, seumur hidup ku dedikasikan... (lebay) 🤣" }
    ],
    correctIndex: 1
  },

  // BAGIAN 8: FINAL HOPE
  {
    q: "Terakhir. Harapan buat hubungan 'Unik' kita di 2026?",
    options: [
      { text: "Makin deket (Real Life)", msg: "Amin paling kenceng! Bismillah ya... ✨" }, // BENAR
      { text: "Tetep jadi 'Temen Online'", msg: "Masa mau virtual terus? Gak kangen liat aslinya? 😤" },
      { text: "Jadi musuh bebuyutan", msg: "Dih, emang berani musuhan sama aku? 🤨" },
      { text: "Partner Kondangan", msg: "Waduh, jauh amat visinya... tapi boleh juga sih 👔👗" }
    ],
    correctIndex: 0
  }
];

const QuizSystem = ({ onFinished }: QuizProps) => {
  // --- STATE ---
  const [currentQ, setCurrentQ] = useState(0);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'neutral' | 'correct' | 'wrong'>('neutral');
  const [feedback, setFeedback] = useState<string>(""); 
  
  // LOGIC TRACKING NGEYEL
  const [wrongStreak, setWrongStreak] = useState(0); 
  const [lastWrongIndex, setLastWrongIndex] = useState<number | null>(null);

  // --- AUDIO HELPER ---
  const playSound = (isCorrect: boolean) => {
    const audioName = isCorrect ? '/correct.mp3' : '/wrong.mp3';
    const audio = new Audio(audioName);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handleAnswer = (selectedIndex: number) => {
    // FIX BUG: Kunci jawaban kalau status sedang tidak netral
    if (status !== 'neutral') return; 

    setClickedIndex(selectedIndex);
    const correctIdx = QUESTIONS_DATA[currentQ].correctIndex;
    const isCorrect = selectedIndex === correctIdx;

    // Play Sound
    playSound(isCorrect);

    if (isCorrect) {
      // BENAR
      setStatus('correct');
      setFeedback(QUESTIONS_DATA[currentQ].options[selectedIndex].msg);
      
      // Reset logic salah
      setWrongStreak(0);
      setLastWrongIndex(null);

      // Delay pindah soal (3 Detik)
      setTimeout(() => {
        if (currentQ < QUESTIONS_DATA.length - 1) {
          setCurrentQ(prev => prev + 1);
          // Reset State untuk soal baru
          setStatus('neutral');
          setClickedIndex(null);
          setFeedback("");
        } else {
          onFinished(); // Selesai semua
        }
      }, 3000); 

    } else {
      // SALAH
      setStatus('wrong');
      
      let currentStreak = wrongStreak;
      // Cek apakah ngeyel di tombol yang sama
      if (lastWrongIndex === selectedIndex) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }

      setWrongStreak(currentStreak);
      setLastWrongIndex(selectedIndex);

      if (currentStreak >= 3) {
         setFeedback("Udah salah, ngeyel lagi! Batu banget sih 🗿🔨");
      } else {
         setFeedback(QUESTIONS_DATA[currentQ].options[selectedIndex].msg);
      }

      // Reset state biar bisa klik lagi (0.8 detik cukup)
      setTimeout(() => {
        setStatus('neutral');
        setClickedIndex(null);
      }, 800);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-0 relative z-10">
      
      {/* GLASSMORPHISM CARD */}
      <motion.div 
        key={currentQ} // Animasi transisi antar soal
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        
        {/* Dekorasi Glow Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none"></div>

        {/* HEADER: PROGRESS & BADGE */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold flex items-center gap-2">
              <BrainCircuit size={14} className="text-yellow-500"/> 
              Mission Progress
            </span>
            <span className="text-xs font-mono text-yellow-500 font-bold">
              {currentQ + 1} <span className="text-gray-600">/</span> {QUESTIONS_DATA.length}
            </span>
          </div>
          
          {/* Progress Bar Neon */}
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / QUESTIONS_DATA.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        {/* SOAL */}
        <div className="min-h-[80px] flex items-center justify-center mb-6 relative">
            <h2 
              className="text-xl md:text-3xl font-serif text-center text-yellow-50 leading-snug drop-shadow-md"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {QUESTIONS_DATA[currentQ].q}
            </h2>
        </div>

        {/* PILIHAN JAWABAN (GRID 2 KOLOM) */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {QUESTIONS_DATA[currentQ].options.map((opt, idx) => {
            const isClicked = clickedIndex === idx;
            // PERBAIKAN: Hapus variabel isCorrect yang tidak dipakai di sini biar gak error TS
            
            // Style Default
            let buttonStyle = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] text-gray-300";
            let textStyle = "text-gray-300";
            let icon = <ChevronRight size={16} className="text-gray-600 group-hover:text-yellow-400 transition-colors" />;

            // Style Saat Ada Status (Benar/Salah)
            if (status !== 'neutral') {
                if (isClicked) {
                    if (status === 'correct') {
                        buttonStyle = "bg-green-500/20 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]";
                        textStyle = "text-green-200 font-bold";
                        icon = <CheckCircle size={18} className="text-green-400 animate-bounce" />;
                    } else if (status === 'wrong') {
                        buttonStyle = "bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                        textStyle = "text-red-200 font-bold";
                        icon = <XCircle size={18} className="text-red-400 animate-pulse" />;
                    }
                } else {
                   // Kalau tombol lain (bukan yg diklik), kasih opacity turun biar fokus ke yg diklik
                   buttonStyle += " opacity-50 cursor-not-allowed";
                }
            }

            return (
              <motion.button
                key={idx}
                whileHover={status === 'neutral' ? { scale: 1.02, x: 5 } : {}}
                whileTap={status === 'neutral' ? { scale: 0.98 } : {}}
                animate={status === 'wrong' && isClicked ? { x: [-5, 5, -5, 5, 0] } : {}} 
                onClick={() => handleAnswer(idx)}
                disabled={status !== 'neutral'} 
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 flex justify-between items-center group relative overflow-hidden ${buttonStyle}`}
              >
                <span className={`text-sm md:text-base tracking-wide relative z-10 ${textStyle} font-sans`}>
                  {opt.text}
                </span>
                
                <div className="relative z-10">
                  {icon}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* FEEDBACK AREA */}
        <div className="h-[60px] mt-6 flex items-center justify-center">
          <AnimatePresence mode='wait'>
            {feedback && (
              <motion.div
                key={feedback} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`
                  px-6 py-3 rounded-full flex items-center gap-3 border shadow-lg backdrop-blur-md
                  ${status === 'correct' 
                    ? "bg-green-900/40 border-green-500/30 text-green-200" 
                    : "bg-red-900/40 border-red-500/30 text-red-200"
                  }
                `}
              >
                {status === 'correct' ? <MessageCircleHeart size={18} /> : (wrongStreak >= 3 ? <AlertTriangle size={18} /> : <HelpCircle size={18} />)}
                <span className="text-xs md:text-sm font-medium tracking-wide">
                  {feedback}
                </span>
              </motion.div>
            )}
            
            {/* Hint saat kosong */}
            {!feedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2"
              >
                <Sparkles size={10} />
                Just be honest
                <Sparkles size={10} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

export default QuizSystem;