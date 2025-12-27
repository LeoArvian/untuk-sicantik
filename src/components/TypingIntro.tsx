import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const TypingIntro = ({ onComplete }: IntroProps) => {
  const [lines, setLines] = useState<string[]>([]);
  
  // Naskah Intro (Bisa diganti sesuka hati)
  const script = [
    "Initializing secure connection...",
    "Bypassing school firewall...", 
    "Searching for target: Manda...",
    "Target found. Access granted.",
    "Starting 2026 Protocol..."
  ];

  useEffect(() => {
    let delay = 0;

    script.forEach((line, index) => {
      // Jeda waktu antar baris (makin ke bawah makin cepet)
      delay += (index === 0 ? 500 : 800); 

      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        
        // Kalau sudah baris terakhir, tunggu bentar lalu selesai
        if (index === script.length - 1) {
          setTimeout(onComplete, 1500);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-start justify-center p-8 font-mono text-xs md:text-sm text-green-500 overflow-hidden cursor-wait">
      <div className="w-full max-w-md mx-auto space-y-2">
        <div className="flex items-center gap-2 text-green-400 mb-4 opacity-50">
          <Terminal size={16} />
          <span>SYSTEM_BOOT_V.2.0.2.6</span>
        </div>

        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
            <span>{line}</span>
          </motion.div>
        ))}

        {/* Cursor Blinking */}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-green-500 mt-2"
        />
      </div>
      
      {/* Tombol Skip (Jaga-jaga kalau dia gak sabaran) */}
      <button 
        onClick={onComplete} 
        className="absolute bottom-8 right-8 text-gray-700 text-[10px] hover:text-white uppercase tracking-widest"
      >
        [Skip Intro]
      </button>
    </div>
  );
};

export default TypingIntro;