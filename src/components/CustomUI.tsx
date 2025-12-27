import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f172a] overflow-hidden">
      
      {/* BAGIAN PENTING: DEFINISI FILTER CAIR (GOOEY)
        Ini tidak terlihat, tapi ini 'mesin' yang membuat animasinya cair.
      */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-filter">
            {/* 1. Blur-kan objek agar garisnya menyatu */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            {/* 2. Gunakan Color Matrix untuk menajamkan kembali blur tadi (Thresholding) */}
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="goo" 
            />
            {/* 3. Campurkan dengan bayangan/warna asli */}
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      <style>
        {`
          /* PATH DATA:
             Ini adalah koordinat matematika agar Bulat dan Hati punya struktur sama.
             Jangan diubah angkanya agar tidak patah.
          */
          
          /* Bentuk Hati (Heart) */
          :root {
            --path-heart: "M 12 21.5 C 5 15.5 2 12 2 8.5 C 2 5.5 4.5 3 7.5 3 C 9.5 3 11 4 12 5.5 C 13 4 14.5 3 16.5 3 C 19.5 3 22 5.5 22 8.5 C 22 12 19 15.5 12 21.5 Z";
            
            /* Bentuk Bulat (Circle) - Dibuat dengan struktur kurva yang SAMA dengan hati */
            --path-circle: "M 12 22 C 6.5 22 2 17.5 2 12 C 2 6.5 6.5 2 12 2 C 12 2 12 2 12 2 C 17.5 2 22 6.5 22 12 C 22 17.5 17.5 22 12 22 Z";
          }

          /* ANIMASI MORPHING CAIR */
          @keyframes fluid-morph {
            /* FASE 1: Mulai dari HATI (Pink) */
            0% {
              d: path("M 12 21.5 C 5 15.5 2 12 2 8.5 C 2 5.5 4.5 3 7.5 3 C 9.5 3 11 4 12 5.5 C 13 4 14.5 3 16.5 3 C 19.5 3 22 5.5 22 8.5 C 22 12 19 15.5 12 21.5 Z");
              fill: #f43f5e; /* Rose */
              transform: rotate(0deg) scale(1);
            }

            /* FASE 2: Transisi Mencair ke BULAT (Emas) */
            45% {
              d: path("M 12 22 C 6.5 22 2 17.5 2 12 C 2 6.5 6.5 2 12 2 C 12 2 12 2 12 2 C 17.5 2 22 6.5 22 12 C 22 17.5 17.5 22 12 22 Z");
              fill: #fbbf24; /* Amber/Gold */
              transform: rotate(180deg) scale(0.8); /* Mengecil saat mutar kencang */
            }
            
            /* Tahan sebentar jadi bulat... */
            55% {
              d: path("M 12 22 C 6.5 22 2 17.5 2 12 C 2 6.5 6.5 2 12 2 C 12 2 12 2 12 2 C 17.5 2 22 6.5 22 12 C 22 17.5 17.5 22 12 22 Z");
              fill: #fbbf24;
              transform: rotate(200deg) scale(0.8);
            }

            /* FASE 3: Kembali ke HATI (Pink) */
            100% {
              d: path("M 12 21.5 C 5 15.5 2 12 2 8.5 C 2 5.5 4.5 3 7.5 3 C 9.5 3 11 4 12 5.5 C 13 4 14.5 3 16.5 3 C 19.5 3 22 5.5 22 8.5 C 22 12 19 15.5 12 21.5 Z");
              fill: #f43f5e;
              transform: rotate(360deg) scale(1);
            }
          }

          /* Animasi Cipratan (Droplets) yang keluar dari objek utama */
          @keyframes droplet-spin {
            0% { transform: rotate(0deg) translateY(0) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: rotate(360deg) translateY(-40px) scale(0); opacity: 0; }
          }
          
          /* Animasi Cahaya Teks */
          @keyframes shine {
            to { background-position: 200% center; }
          }
        `}
      </style>

      {/* CONTAINER UTAMA */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* AREA ANIMASI LIQUID */}
        {/* Kita aplikasikan filter: url(#liquid-filter) di container ini */}
        <div 
          className="relative w-40 h-40 flex items-center justify-center"
          style={{ filter: 'url(#liquid-filter)' }} 
        >
          {/* OBJEK UTAMA (MORPHING) */}
          <svg viewBox="0 0 24 24" className="w-28 h-28 overflow-visible">
             <path 
               /* Properti animasi CSS diterapkan di sini */
               style={{ 
                 animation: 'fluid-morph 3s cubic-bezier(0.68, -0.6, 0.32, 1.6) infinite',
                 transformOrigin: 'center center'
               }}
             />
          </svg>

          {/* EFEK CIPRATAN (DROPLETS) */}
          {/* Bola-bola kecil ini akan menyatu dengan objek utama karena filter gooey */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
             <div className="absolute top-0 left-1/2 w-4 h-4 bg-rose-500 rounded-full animate-ping opacity-70"></div>
          </div>
        </div>


        {/* --- BAGIAN TEXT (ELEGANT) --- */}
        <div className="mt-4 z-10 text-center">
          <h2 
            className="text-2xl md:text-3xl font-serif tracking-[0.25em] font-medium"
            style={{
              background: 'linear-gradient(to right, #f43f5e 20%, #fbbf24 40%, #f43f5e 60%, #fbbf24 80%)',
              backgroundSize: '200% auto',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite'
            }}
          >
            AMANDA
          </h2>
          
          <div className="flex flex-col items-center gap-2 mt-3">
             <p className="text-[10px] text-slate-400 tracking-widest uppercase">
               Memulai bab baru, berharap itu bersamamu.
             </p>
             {/* Garis Loading Minimalis */}
             <div className="w-16 h-[2px] bg-slate-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-rose-500 animate-[translateX_1s_ease-in-out_infinite] translate-x-[-100%]"></div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};