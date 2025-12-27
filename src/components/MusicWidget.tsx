import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Disc, Pause, Play, Volume2 } from 'lucide-react';

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pastikan file musik ada di folder public
    audioRef.current = new Audio('/musik.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Auto play (browser biasanya nge-block, jadi butuh interaksi user dulu)
    const tryPlay = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (e) {
        setIsPlaying(false);
      }
    };
    
    // Coba play saat komponen muncul
    document.addEventListener('click', tryPlay, { once: true });
    
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 left-4 z-[9999]">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 pr-6 flex items-center gap-3 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-black/60 transition-colors cursor-pointer"
        onClick={togglePlay}
      >
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isPlaying ? 'border-green-400 bg-gray-800' : 'border-gray-500 bg-gray-900'}`}
        >
          <Disc size={20} className={isPlaying ? 'text-green-400' : 'text-gray-400'} />
        </motion.div>

        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
            Now Playing <Volume2 size={8} />
          </span>
          <span className="text-xs font-bold text-white max-w-[100px] truncate">
            Lagu Spesial.mp3
          </span>
        </div>

        <div className="ml-2">
           {isPlaying ? <Pause size={14} className="text-white"/> : <Play size={14} className="text-white"/>}
        </div>
      </motion.div>
    </div>
  );
};

export default MusicWidget;