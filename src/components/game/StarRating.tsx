import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function StarRating({ stars, maxStars = 3, size = 'md', animated = true }: StarRatingProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: maxStars }, (_, i) => (
        <motion.div
          key={i}
          initial={animated ? { scale: 0, rotate: -180 } : {}}
          animate={animated ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
        >
          <Star
            className={`${sizeClasses[size]} ${
              i < stars
                ? 'text-warning fill-warning'
                : 'text-muted-foreground/30'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}
