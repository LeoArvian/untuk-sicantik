import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Lock, Unlock, RefreshCw, Home, Clock, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

interface AdminProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // GANTI PASSWORD RAHASIA DI SINI
  const SECRET_CODE = "manda2026"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_CODE) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Password salah! Hayo mau ngintip ya? 😜");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { data: responses, error } = await supabase
      .from('quiz_responses')
      .select('*')
      .order('created_at', { ascending: false }); // Yang terbaru paling atas

    if (error) {
      console.error("Error fetching:", error);
      alert("Gagal ambil data.");
    } else {
      setData(responses || []);
    }
    setLoading(false);
  };

  // --- TAMPILAN LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full px-4 relative z-20">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl"
        >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/50">
                <Lock className="text-red-400" size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Restricted Area 🚧</h2>
            <p className="text-gray-400 text-sm mb-6">Halaman ini khusus buat Azriel memantau isi hati Manda.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Kode Rahasia..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-red-500 transition-all"
                />
                <button 
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Unlock size={18} />
                    Buka Data
                </button>
            </form>
            
            <button onClick={onBack} className="mt-6 text-gray-500 text-xs hover:text-white underline">
                Kembali ke Halaman Utama
            </button>
        </motion.div>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD (SETELAH LOGIN) ---
  return (
    <div className="w-full h-full overflow-y-auto px-4 py-10 relative z-20 scrollbar-hide">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 sticky top-0 z-30">
            <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                    Control Center 📡
                </h2>
                <p className="text-xs text-gray-400">Total Respon: {data.length}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={fetchData} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 border border-white/10 text-yellow-400" title="Refresh">
                    {loading ? <Loader2 className="animate-spin" size={20}/> : <RefreshCw size={20}/>}
                </button>
                <button onClick={onBack} className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 border border-red-500/30 text-red-400" title="Logout/Exit">
                    <Home size={20}/>
                </button>
            </div>
        </div>

        {/* List Data */}
        <div className="space-y-6 pb-20">
            {data.length === 0 && !loading && (
                <div className="text-center py-20 text-gray-500">
                    <AlertCircle className="mx-auto mb-2 opacity-50" size={40} />
                    <p>Belum ada data masuk bos...</p>
                </div>
            )}

            {data.map((item) => (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-yellow-500/30 transition-all"
                >
                    {/* Card Header */}
                    <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                            <Clock size={12} className="text-yellow-500" />
                            {new Date(item.created_at).toLocaleString('id-ID', { 
                                dateStyle: 'full', timeStyle: 'short' 
                            })}
                        </div>
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/20">
                            ID: #{item.id}
                        </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-6">
                        
                        {/* Section: Jawaban Quiz */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                                <MessageSquare size={14} className="text-pink-400"/>
                                Rekap Jawaban:
                            </h3>
                            <div className="bg-black/30 rounded-xl p-4 text-xs md:text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-wrap border border-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {item.answer_log}
                            </div>
                        </div>

                        {/* Section: Pesan Terakhir */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                                <AlertCircle size={14} className="text-purple-400"/>
                                Pertanyaan Buat Azriel:
                            </h3>
                            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-4">
                                <p className="text-sm md:text-lg font-serif italic text-white/90 text-center">
                                    "{item.final_message}"
                                </p>
                            </div>
                        </div>

                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;