import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, HeartPulse } from 'lucide-react';

const SoulmateScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startScan = () => {
    if (result) return; // Kalau udah ada hasil, gak usah scan lagi
    setIsScanning(true);
    setProgress(0);

    // Getar HP (Haptic Feedback)
    if (navigator.vibrate) navigator.vibrate(50);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          finishScan();
          return 100;
        }
        return prev + 2; // Kecepatan scan
      });
    }, 30);
  };

  const stopScan = () => {
    if (result) return;
    setIsScanning(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const finishScan = () => {
    setIsScanning(false);
    setResult("MATCH 100% ❤️");
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]); // Getar 2x tanda sukses
  };

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <AnimatePresence mode='wait'>
        {!result ? (
          <div 
            className="relative bg-black/40 border border-cyan-500/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 overflow-hidden select-none touch-none"
            onMouseDown={startScan}
            onMouseUp={stopScan}
            onMouseLeave={stopScan}
            onTouchStart={(e) => { e.preventDefault(); startScan(); }}
            onTouchEnd={stopScan}
          >
            {/* Background Grid Cyberpunk */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b21a_1px,transparent_1px),linear-gradient(to_bottom,#0891b21a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <h3 className="text-cyan-400 font-mono text-xs tracking-[0.2em] animate-pulse relative z-10">
              {isScanning ? "SCANNING DNA..." : "TEMPEL JEMPOL"}
            </h3>

            {/* AREA SCANNER */}
            <div className="relative w-20 h-20 flex items-center justify-center z-10">
              <Fingerprint 
                size={80} 
                className={`text-cyan-500/50 ${isScanning ? 'animate-pulse' : ''}`} 
              />
              
              {/* Garis Scan Bergerak */}
              {isScanning && (
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>

            {/* Progress Bar Circular */}
            {isScanning && (
              <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden relative z-10">
                <motion.div 
                  className="h-full bg-cyan-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          // HASIL SCAN
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 border border-green-500/50 p-6 rounded-2xl text-center shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <div className="flex justify-center mb-3">
              <HeartPulse className="text-green-400 animate-bounce" size={40} />
            </div>
            <h3 className="font-mono text-green-300 text-sm mb-1">COMPATIBILITY CHECK</h3>
            <h2 className="font-sans font-bold text-3xl text-white mb-2 tracking-tighter">
              {result}
            </h2>
            <p className="text-[10px] text-green-200/70 uppercase">
              Status: Jodoh Fix No Debat
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SoulmateScanner;