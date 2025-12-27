import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Plane, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

const GoldenTicket = () => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    const canvas = await html2canvas(ticketRef.current, { scale: 2, backgroundColor: null });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "Golden-Ticket-2026.png";
    link.click();
  };

  return (
    <div className="w-full perspective-1000 my-6">
      <motion.div
        ref={ticketRef}
        initial={{ rotateY: 10 }}
        whileHover={{ rotateY: 0, scale: 1.05 }}
        className="relative w-full max-w-sm mx-auto bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 rounded-xl p-[2px] shadow-2xl"
      >
        {/* Isian Tiket */}
        <div className="bg-black/90 rounded-[10px] p-4 flex flex-col relative overflow-hidden">
          {/* Efek Kilau Hologram */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none"></div>

          <div className="flex justify-between items-start border-b border-yellow-500/30 pb-3 mb-3">
            <div className="flex items-center gap-2 text-yellow-500">
              <Ticket size={20} />
              <span className="font-serif font-bold tracking-widest text-sm">GOLDEN TICKET</span>
            </div>
            <span className="font-mono text-yellow-200/50 text-xs">NO: 2026-VIP</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <p className="text-[10px] text-gray-400 uppercase">Passenger</p>
              <p className="font-bold text-white text-lg">Manda & Azriel</p>
            </div>
            <Plane className="text-yellow-500 rotate-90" size={24} />
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase">Destination</p>
              <p className="font-bold text-yellow-400 text-lg">Future</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
             <span>CLASS: VVIP ❤️</span>
             <span>DATE: 01 JAN 2026</span>
          </div>
        </div>

        {/* Gerigi Tiket Kiri Kanan */}
        <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#050505] rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#050505] rounded-full transform -translate-y-1/2"></div>
      </motion.div>

      <button 
        onClick={downloadTicket}
        className="mx-auto mt-3 text-[10px] text-yellow-600 hover:text-yellow-400 flex items-center gap-1"
      >
        <Download size={12} /> Simpan Tiket
      </button>
    </div>
  );
};

export default GoldenTicket;