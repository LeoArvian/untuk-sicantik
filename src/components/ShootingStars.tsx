import { useEffect, useState } from 'react';

const ShootingStars = () => {
  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    // Generate meteor baru setiap 2-4 detik
    const interval = setInterval(() => {
      const id = Date.now();
      setStars((prev) => [...prev, id]);

      // Hapus meteor setelah selesai animasi (biar gak berat)
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s !== id));
      }, 5000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {stars.map((star) => {
        // Random posisi muncul (top & right)
        const top = Math.floor(Math.random() * 50) + '%';
        const right = Math.floor(Math.random() * 50) + '%';
        const delay = Math.random() * 1 + 's';

        return (
          <span
            key={star}
            className="absolute h-0.5 w-0.5 rounded-[9999px] bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor"
            style={{
              top: top,
              right: right,
              animationDelay: delay,
              width: '100px', // Panjang ekor meteor
              background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
            }}
          />
        );
      })}
    </div>
  );
};

export default ShootingStars;