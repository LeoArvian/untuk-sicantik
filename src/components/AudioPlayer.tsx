import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
}

const AudioPlayer = ({ isPlaying }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Audio Play Error:", err);
        });
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted && audioRef.current.paused && isPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    // KITA NAIKKAN LAGI KE z-50 AGAR PASTI MUNCUL & GAK KETUTUP BACKGROUND
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
      
      {error && (
        <div className="bg-red-500/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-md flex items-center gap-2 animate-bounce pointer-events-auto">
          <AlertCircle size={14} />
          <span>File 'public/musik.mp3' tidak ditemukan!</span>
        </div>
      )}

      <audio 
        ref={audioRef} 
        loop 
        onError={() => setError(true)} 
      >
        <source src="/musik.mp3" type="audio/mp3" />
      </audio>

      {isPlaying && !error && (
        <button 
          onClick={toggleMute}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10 pointer-events-auto cursor-pointer shadow-lg"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;