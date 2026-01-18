import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { UserStory } from '@/data/gameData';

interface EpicCardProps {
  epic: UserStory;
}

export function EpicCard({ epic }: EpicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl gradient-epic p-6 text-white shadow-lg"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
            Épica a dividir
          </span>
        </div>
        
        <p className="text-xl md:text-2xl font-display font-bold leading-relaxed">
          "{epic.text}"
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
            Rol: {epic.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
