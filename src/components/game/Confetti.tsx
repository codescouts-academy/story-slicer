import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
}

const colors = [
  'hsl(174, 72%, 50%)', // Primary
  'hsl(32, 95%, 55%)',  // Secondary
  'hsl(350, 85%, 60%)', // Accent
  'hsl(42, 95%, 55%)',  // Warning
  'hsl(158, 64%, 45%)', // Success
];

export function Confetti({ isActive }: { isActive: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);

      const timeout = setTimeout(() => setPieces([]), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: '100vh',
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: '-20vh',
            rotate: piece.rotation + 720,
            opacity: 0,
          }}
          transition={{
            duration: 2.5,
            delay: piece.delay,
            ease: 'easeOut',
          }}
          className="fixed w-3 h-3 rounded-sm pointer-events-none z-50"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </AnimatePresence>
  );
}
