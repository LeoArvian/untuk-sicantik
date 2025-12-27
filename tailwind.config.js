/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 1. Font Judul (Mewah, Elegan, kayak majalah Vogue)
        // Dipakai di: Judul Besar, Nama Manda, Kata-kata Mutiara
        serif: ['"Playfair Display"', 'serif'],

        // 2. Font Body (Modern, Bersih, Enak dibaca di HP)
        // Dipakai di: Chat, Tombol, Teks panjang
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        
        // 3. Font Standar (Backup kalau body gagal)
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],

        // 4. Font Tulisan Tangan (Estetik)
        // Dipakai di: Tanda tangan, Catatan kecil
        script: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        'manda-gold': '#FFD700', // Warna Emas Khusus
        'manda-accent': '#EC4899', // Pink Aksen
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Optional: Kalo kamu install plugin typography
  ],
}