import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronRight, MessageCircleHeart, Sparkles, BrainCircuit, Loader2, PenLine, Send, X } from 'lucide-react';
import { supabase } from '../supabaseClient'; // IMPORT DARI FILE YANG BARU KITA BUAT

interface QuizProps {
  onFinished: () => void;
}

// --- DATA PERTANYAAN (TETAP SAMA/AMAN) ---
const QUESTIONS_DATA = [
  // BAGIAN 1: INTRO & META
  {
    q: "Cek fokus dulu. Tahun depan tahun berapa?",
    options: [
      { text: "2025", msg: "Yah, gagal move on nih? 🤪" },
      { text: "2026", msg: "Cakep! Fokusnya bagus. Lanjut..." },
      { text: "2077", msg: "Kejauhan woi, kita udah tua nanti 👴👵" },
      { text: "2045", msg: "Siap menyongsong Indonesia Emas? 🇮🇩" }
    ]
  },
  {
    q: "Jujur, pas pertama kali buka link web ini, reaksi kamu gimana?",
    options: [
      { text: "Apaan sih, Alay", msg: "Parah! Udah begadang bikinnya woi 😭" },
      { text: "Biasa aja", msg: "Masa? Coba liat cermin, pasti senyum-senyum 😏" },
      { text: "Kaget & Senyum dikit", msg: "Nah gitu dong jujur. Manis tau kalo senyum 😉" },
      { text: "Bingung", msg: "Bingung kenapa ada cowok se-effort ini ya? 🤭" }
    ]
  },
  // BAGIAN 2: SEKOLAH
  {
    q: "Di sekolah kita emang pura-pura 'Stranger' (Gak kenal), tapi sebenernya...", 
    options: [
      { text: "Aku emang males liat kamu", msg: "Jahat banget... padahal aku ganteng lho 🥺" },
      { text: "Dalem hati pengen nyapa tapi gengsi", msg: "Sama dong... tahan ya, ada waktunya 🤫" },
      { text: "Biasa aja tuh", msg: "Masa? Mata gak bisa bohong lho... 👀" },
      { text: "Nunggu disapa duluan", msg: "Huu dasar gengsian, sama aja kita! 🗿" }
    ]
  },
  {
    q: "Kalau pas kita papasan di kantin/koridor, mata kamu biasanya ke mana?",
    options: [
      { text: "Liatin lantai", msg: "Lantai lebih menarik dari aku? Sedih... 🥀" },
      { text: "Lirik-lirik dikit", msg: "Ketauan deh! Aku juga liat kamu kok 😎" },
      { text: "Liatin tembok", msg: "Awas nabrak temboknya lho mikirin aku 😆" },
      { text: "Pura-pura main HP", msg: "Klise banget triknya, tapi ampuh sih 😂" }
    ]
  },
  // BAGIAN 3: TENTANG KAMU
  {
    q: "Coba tebak, hal apa dari aku yang paling sering kamu perhatiin diem-diem?",
    options: [
      { text: "Gaya jalan / Penampilan", msg: "Ciye merhatiin detail banget nih... 🫣" },
      { text: "Gak ada", msg: "Tombol ini rusak. Kamu pasti bohong 😝" },
      { text: "Aib aku", msg: "Dih, yang bagus-bagus napa diingetnya! 😤" },
      { text: "Senyum aku (Eaa)", msg: "Waduh, bisa diabetes nanti kalau sering liat 🍯" }
    ]
  },
  {
    q: "Menurut kamu, aku tuh orangnya sebenernya gimana?",
    options: [
      { text: "Nyebelin banget", msg: "Nyebelin tapi ngangenin kan? Ngaku! 😜" },
      { text: "Seru & Asik", msg: "Valid! Makanya jangan jutek-jutek dong 😉" },
      { text: "Pendiem", msg: "Salah server bu... aku aslinya rame tau!" },
      { text: "Misterius kayak Intel", msg: "Siap 86! Memantau hatimu... 🕵️‍♂️" }
    ]
  },
  // BAGIAN 4: KEBIASAAN CHAT
  {
    q: "Kalau aku nge-chat jam 7 malem, Manda biasanya bales jam berapa?",
    options: [
      { text: "Jam 7:01 (Gercep)", msg: "Halah, jangan mimpi! Realistis aja deh 🤣" },
      { text: "Jam 9:00 (Lama)", msg: "Nah sadar diri! Keburu lumutan tau nungguinnya 🗿" },
      { text: "Tahun depan", msg: "Kejam banget! Keburu jadi fosil aku..." },
      { text: "Tergantung Mood", msg: "Dih, mood-mood an kayak cuaca aja 🌦️" }
    ]
  },
  {
    q: "Kenapa sih Manda susah banget disuruh bilang 'Good Night' atau kata manis?",
    options: [
      { text: "Lupa caranya ngetik", msg: "Alasan klasik. Gak mempan! 😋" },
      { text: "Takut aku baper", msg: "Dih PD banget! Tapi iya sih dikit... 🫣" },
      { text: "Karena Harga Diri & Ego setinggi langit 👑", msg: "Turunin dikit napa Bu Egonya... sekali-kali nyenengin orang 🥺" },
      { text: "Gak biasa aja", msg: "Bisa dibiasain kok mulai sekarang... 😏" }
    ]
  },
  // BAGIAN 5: CEK PERASAAN
  {
    q: "Misal nih, ada cewek lain di sekolah yang deketin aku. Reaksi Manda?",
    options: [
      { text: "Bodo amat", msg: "Yakin? Awas nanti nyesel lho... 😌" },
      { text: "Panas / Badmood dikit", msg: "Ciye cemburu... tenang, aku setia kok 🔒" },
      { text: "Ikut seneng", msg: "Dih, kok malah didukung? Jahat! 😤" },
      { text: "Labrak ceweknya", msg: "Waduh, Mode Maung-nya keluar... 🦁" }
    ]
  },
  {
    q: "Siapa yang paling sering 'Ngalah' kalau kita lagi debat kecil?",
    options: [
      { text: "Aku (Manda)", msg: "Masa? Perasaan kamu batu banget deh 🗿" },
      { text: "Azriel (Yang bikin web)", msg: "Bener banget. Sabar banget kan aku ngadepin kamu? 😇" },
      { text: "Gak ada", msg: "Perang dunia dong kalau gitu..." },
      { text: "Suit Jepang", msg: "Kalo kalah tetep aja aku yang salah kan? 😂" }
    ]
  },
  {
    q: "Kalau Manda lagi badmood / marah, biasanya pengen diapain?",
    options: [
      { text: "Didiemin aja", msg: "Yakin? Nanti malah makin ngamuk lho..." },
      { text: "Dibujuk / Dihibur", msg: "Dasar manja... tapi oke siap laksanakan! 🫡" },
      { text: "Diajak berantem", msg: "Waduh, nyari mati itu mah 🏳️" },
      { text: "Dibelikan Makanan", msg: "Solusi terbaik! Perut kenyang hati senang 🍔" }
    ]
  },
  // BAGIAN 6: FUTURE PLAN
  {
    q: "Kan kita belum pernah jalan bareng. Kalo nanti 'Debut', enaknya ke mana?",
    options: [
      { text: "KUA langsung", msg: "Waduh... sekolah dulu yang bener ya dek 😂" },
      { text: "Nonton / Timezone", msg: "Gas! Nanti aku yang atur jadwalnya 📅" },
      { text: "Diem di kelas aja", msg: "Bosen kali ah... masa di sekolah mulu 😴" },
      { text: "Makan Seblak/Mie Ayam", msg: "Anak kuliner banget nih? Boleh lah gas 🍜" }
    ]
  },
  {
    q: "Kalau tiba-tiba aku call malem-malem, diangkat gak?",
    options: [
      { text: "Auto Reject", msg: "Jahat banget... awas ya nanti kangen 🥺" },
      { text: "Diangkat dong", msg: "Awas ya kalau bohong, ntar malem aku tes! 📞" },
      { text: "Hape di-silent", msg: "Alasan mulu. Bilang aja grogi kan?" },
      { text: "Angkat tapi diem doang", msg: "Lomba diem-dieman? Boleh siapa takut 😶" }
    ]
  },
  // BAGIAN 7: THE EFFORT
  {
    q: "Tebak, kira-kira berapa lama aku bikin web spesial ini buat kamu?",
    options: [
      { text: "5 Menit jadi", msg: "Enak aja! Emang mie instan? 🍜" },
      { text: "Semaleman suntuk", msg: "Bener banget... hargai dong effort-nya 🥺❤️" },
      { text: "Nyuruh orang", msg: "Sembarangan! Ini murni ketikan tangan sendiri tau!" },
      { text: "Seminggu full senyum", msg: "Lebih dari itu, seumur hidup ku dedikasikan... (lebay) 🤣" }
    ]
  },
  // BAGIAN 8: FINAL HOPE
  {
    q: "Terakhir. Harapan buat hubungan 'Unik' kita di 2026?",
    options: [
      { text: "Makin deket (Real Life)", msg: "Amin paling kenceng! Bismillah ya... ✨" },
      { text: "Tetep jadi 'Temen Online'", msg: "Masa mau virtual terus? Gak kangen liat aslinya? 😤" },
      { text: "Jadi musuh bebuyutan", msg: "Dih, emang berani musuhan sama aku? 🤨" },
      { text: "Partner Kondangan", msg: "Waduh, jauh amat visinya... tapi boleh juga sih 👔👗" }
    ]
  }
];

const QuizSystem = ({ onFinished }: QuizProps) => {
  // --- STATE ---
  const [currentQ, setCurrentQ] = useState(0);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'neutral' | 'selected'>('neutral');
  const [feedback, setFeedback] = useState<string>(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // STATE CUSTOM ANSWER
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customAnswer, setCustomAnswer] = useState("");

  // STATE FINAL Q&A
  const [showFinalSection, setShowFinalSection] = useState(false);
  const [finalQuestion, setFinalQuestion] = useState("");

  // REKAM JAWABAN (Disimpan di Ref)
  const answersRef = useRef<string[]>([]);

  const playSound = () => {
    const audio = new Audio('/correct.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  // --- 1. HANDLE JAWABAN PILIHAN ---
  const handleAnswer = (selectedIndex: number) => {
    if (status !== 'neutral') return;

    setClickedIndex(selectedIndex);
    setStatus('selected');
    
    const questionText = QUESTIONS_DATA[currentQ].q;
    const selectedOption = QUESTIONS_DATA[currentQ].options[selectedIndex];
    
    answersRef.current.push(
      `Q${currentQ + 1}: ${questionText}\nJawaban: ${selectedOption.text}`
    );

    playSound();
    setFeedback(selectedOption.msg);
    moveToNext();
  };

  // --- 2. HANDLE JAWABAN CUSTOM ---
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAnswer.trim()) return;

    setStatus('selected'); 
    
    const questionText = QUESTIONS_DATA[currentQ].q;
    answersRef.current.push(
      `Q${currentQ + 1}: ${questionText}\nJawaban (CUSTOM): ${customAnswer}`
    );

    playSound();
    setFeedback("Noted! Jawaban jujur kamu udah aku simpen 📝");
    moveToNext();
  };

  const moveToNext = () => {
    setTimeout(() => {
      if (currentQ < QUESTIONS_DATA.length - 1) {
        setCurrentQ(prev => prev + 1);
        setStatus('neutral');
        setClickedIndex(null);
        setFeedback("");
        setIsCustomMode(false);
        setCustomAnswer("");
      } else {
        setShowFinalSection(true);
      }
    }, 2500); 
  };

  // --- 3. SUBMIT KE SUPABASE ---
  const handleFinalFinish = async (withQuestion: boolean) => {
    setIsSubmitting(true);

    const questionForAzriel = (withQuestion && finalQuestion.trim() !== "") 
        ? finalQuestion 
        : "(Tidak ada pertanyaan)";

    // Gabungkan jawaban jadi satu teks panjang yang rapi
    const formattedLog = answersRef.current.join('\n\n-------------------\n\n');

    try {
        const { error } = await supabase
            .from('quiz_responses')
            .insert({ 
                answer_log: formattedLog,
                final_message: questionForAzriel
            });

        if (error) {
            console.error("Supabase Error:", error);
            alert("Gagal menyimpan: " + error.message);
        } else {
            console.log("Sukses tersimpan di Database!");
            // alert("Sukses! Data masuk ke Supabase."); // Aktifkan kalau mau debug
        }
    } catch (err) {
        console.error("Connection Error:", err);
        alert("Error koneksi database.");
    } finally {
        setIsSubmitting(false);
        onFinished(); // Lanjut ke Scene WISH
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-0 relative z-10">
      
      {/* GLASSMORPHISM CARD */}
      <motion.div 
        key={showFinalSection ? "final" : currentQ} 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        
        {/* Dekorasi Glow Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none"></div>

        {/* LOADING OVERLAY */}
        {isSubmitting && (
            <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
                <Loader2 className="animate-spin text-pink-400 mb-2" size={40} />
                <p className="text-white font-mono text-sm animate-pulse">Menyimpan kenangan ke Database...</p>
            </div>
        )}

        {!showFinalSection ? (
            // --- TAMPILAN QUIZ ---
            <>
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
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                        className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQ + 1) / QUESTIONS_DATA.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                    </div>
                </div>

                <div className="min-h-[80px] flex items-center justify-center mb-6 relative">
                    <h2 className="text-xl md:text-3xl font-serif text-center text-yellow-50 leading-snug drop-shadow-md" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {QUESTIONS_DATA[currentQ].q}
                    </h2>
                </div>

                {!isCustomMode ? (
                    <>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {QUESTIONS_DATA[currentQ].options.map((opt, idx) => {
                                const isClicked = clickedIndex === idx;
                                let buttonStyle = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-yellow-500/50 text-gray-300";
                                let textStyle = "text-gray-300";
                                let icon = <ChevronRight size={16} className="text-gray-600" />;

                                if (status === 'selected') {
                                    if (isClicked) {
                                        buttonStyle = "bg-yellow-500/20 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]";
                                        textStyle = "text-yellow-100 font-bold";
                                        icon = <CheckCircle size={18} className="text-yellow-400 animate-bounce" />;
                                    } else {
                                        buttonStyle += " opacity-40 grayscale cursor-not-allowed";
                                    }
                                }

                                return (
                                <motion.button
                                    key={idx}
                                    whileHover={status === 'neutral' ? { scale: 1.02 } : {}}
                                    whileTap={status === 'neutral' ? { scale: 0.98 } : {}}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={status !== 'neutral'} 
                                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 flex justify-between items-center group ${buttonStyle}`}
                                >
                                    <span className={`text-sm md:text-base tracking-wide ${textStyle} font-sans`}>{opt.text}</span>
                                    {icon}
                                </motion.button>
                                );
                            })}
                        </div>

                        {status === 'neutral' && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => setIsCustomMode(true)}
                                className="w-full mt-3 py-3 border border-dashed border-white/20 rounded-xl text-gray-400 text-sm hover:text-yellow-300 hover:border-yellow-500/50 transition-colors flex items-center justify-center gap-2"
                            >
                                <PenLine size={14} />
                                Punya jawaban lain? Tulis sendiri di sini
                            </motion.button>
                        )}
                    </>
                ) : (
                    <motion.form 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleCustomSubmit}
                        className="w-full"
                    >
                        <div className="relative">
                            <textarea
                                value={customAnswer}
                                onChange={(e) => setCustomAnswer(e.target.value)}
                                placeholder="Tulis jawaban jujur kamu di sini..."
                                className="w-full h-32 bg-white/5 border border-yellow-500/30 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 resize-none font-sans"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setIsCustomMode(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={!customAnswer.trim()}
                            className="w-full mt-3 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Kirim Jawaban Ini
                        </button>
                    </motion.form>
                )}

                <div className="h-[50px] mt-6 flex items-center justify-center">
                    <AnimatePresence mode='wait'>
                        {feedback && (
                            <motion.div
                                key="feedback"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="px-6 py-2 rounded-full flex items-center gap-3 border shadow-lg backdrop-blur-md bg-yellow-900/40 border-yellow-500/30 text-yellow-200"
                            >
                                <MessageCircleHeart size={18} />
                                <span className="text-xs md:text-sm font-medium">{feedback}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </>
        ) : (
            // --- TAMPILAN FINAL (Q&A) ---
            <div className="flex flex-col items-center text-center py-4">
                 <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                    <Sparkles className="text-white" size={32} />
                 </div>
                 
                 <h2 className="text-2xl font-serif text-white mb-2">Satu Terakhir...</h2>
                 <p className="text-gray-300 text-sm mb-6 max-w-sm">
                    Udah jawab banyak pertanyaan kan tadi? <br/>
                    Sekarang giliran kamu. <strong>Ada pertanyaan buat Azriel?</strong> <br/>
                    <span className="text-xs text-gray-500">(Apapun itu, bakal dijawab nanti di chat)</span>
                 </p>

                 <textarea
                    value={finalQuestion}
                    onChange={(e) => setFinalQuestion(e.target.value)}
                    placeholder="Contoh: Kenapa sih kamu repot-repot bikin ginian?"
                    className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 resize-none font-sans mb-6"
                 />

                 <div className="grid grid-cols-2 gap-4 w-full">
                    <button 
                        onClick={() => handleFinalFinish(false)}
                        className="py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                    >
                        Gak ada, skip
                    </button>
                    <button 
                        onClick={() => handleFinalFinish(true)}
                        disabled={!finalQuestion.trim()}
                        className="py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                        Kirim
                    </button>
                 </div>
            </div>
        )}

      </motion.div>
    </div>
  );
};

export default QuizSystem;