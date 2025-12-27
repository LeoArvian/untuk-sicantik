import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { useEffect } from 'react';

interface CustomToastProps {
  message: string | null;
  onClose: () => void;
}

const CustomToast = ({ message, onClose }: CustomToastProps) => {
  // Auto close setelah 3 detik
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        >
          <div className="bg-black/80 backdrop-blur-md border border-red-500/30 text-white px-6 py-4 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-4 pointer-events-auto">
            
            {/* Icon Shield Berdenyut */}
            <div className="bg-red-500/20 p-2 rounded-full animate-pulse">
              <ShieldAlert className="text-red-500" size={20} />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase">
                SYSTEM ALERT
              </span>
              <span className="text-xs font-medium text-gray-200">
                {message}
              </span>
            </div>

            {/* Tombol Close Manual */}
            <button 
              onClick={onClose}
              className="ml-2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;