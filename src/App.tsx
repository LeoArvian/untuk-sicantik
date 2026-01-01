import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// --- IMPORT COMPONENTS ---
import ParticlesBackground from './components/ParticlesBackground';
import AuroraBackground from './components/AuroraBackground';
import ShootingStars from './components/ShootingStars';
import AudioPlayer from './components/AudioPlayer';
import { LoadingScreen } from './components/CustomUI';
import CustomToast from './components/CustomToast';

// --- IMPORT SCENES ---
import Opening from './components/Opening'; 
import Story from './components/Story';
import QuizSystem from './components/QuizSystem'; 
import Wish from './components/Wish';
import Ending from './components/Ending';
import AdminDashboard from './components/AdminDashboard'; 

// TAMBAHKAN 'ADMIN' KE TIPE SCENE
type SceneState = 'OPENING' | 'STORY' | 'QUIZ' | 'WISH' | 'ENDING' | 'ADMIN';

function App() {
  // Default Scene
  const [scene, setScene] = useState<SceneState>('OPENING');
  
  // Logic Loading: Default True, tapi kalau Admin nanti jadi False
  const [isLoading, setIsLoading] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  // STATE UNTUK NOTIFIKASI
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- FEATURE: DYNAMIC TITLE ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Jangan rindu ya... 😜" : "2026: Manda ✨";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // --- MAIN LOGIC: ANTI CEPU & SECRET ADMIN ACCESS ---
  useEffect(() => {
    // 1. Cek Apakah URL mengandung kata sakti "adminnn"
    // Ini ngecek seluruh link, jadi mau "localhost:5173/adminnn" atau "website.com/?adminnn" dua-duanya bisa.
    const checkSecretAccess = () => {
        const currentURL = window.location.href; // Ambil seluruh link
        
        if (currentURL.includes('adminnn')) {
            console.log("Secret Admin Access Granted 🔓");
            setIsLoading(false); // Matikan loading screen
            setScene('ADMIN');   // Langsung loncat ke Admin
            return true; // Kasih tau kalau ini mode admin
        }
        return false; // Bukan mode admin
    };

    const isAdmin = checkSecretAccess();

    // 2. Logic Timer Loading (Hanya jalan kalau BUKAN admin)
    // Kalau admin, loadingnya udah dimatikan di atas tadi
    if (!isAdmin) {
        const timer = setTimeout(() => setIsLoading(false), 3500); 
        return () => clearTimeout(timer);
    }

    // 3. Anti Klik Kanan (Tetap jalan)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); 
      setToastMessage("Eits! Dilarang intip codingan 😜");
    };
    document.addEventListener("contextmenu", handleContextMenu);
    
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []); // Jalankan sekali pas buka web

  return (
    <main className="relative w-full h-screen overflow-hidden text-white selection:bg-pink-500 selection:text-white select-none bg-transparent">
      
      {/* Background Layers */}
      <AuroraBackground />       
      <ShootingStars />          
      <ParticlesBackground />
      
      {/* Audio Player (Disembunyikan di Mode Admin biar fokus) */}
      {scene !== 'ADMIN' && <AudioPlayer isPlaying={isMusicPlaying} />}

      {/* --- KOMPONEN NOTIFIKASI --- */}
      <CustomToast 
        message={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />

      <AnimatePresence mode='wait'>
        
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div 
            key={scene} 
            className="w-full h-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {scene === 'OPENING' && (
              <Opening onComplete={() => {
                setIsMusicPlaying(true); 
                setScene('STORY'); 
              }} />
            )}

            {scene === 'STORY' && <Story onFinished={() => setScene('QUIZ')} />}
            {scene === 'QUIZ' && <QuizSystem onFinished={() => setScene('WISH')} />}
            {scene === 'WISH' && <Wish onExplode={() => setScene('ENDING')} />}
            {scene === 'ENDING' && <Ending onReplay={() => setScene('STORY')} />}
            
            {/* PANEL ADMIN RAHASIA */}
            {scene === 'ADMIN' && (
                <AdminDashboard onBack={() => {
                    // Kalau logout, buang "adminnn" dari URL biar gak balik lagi
                    window.location.href = window.location.origin; 
                }} />
            )}

          </motion.div>
        )}

      </AnimatePresence>

      {/* Noise Overlay Global */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-[100] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </main>
  );
}

export default App;