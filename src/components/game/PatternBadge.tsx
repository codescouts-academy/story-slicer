import { motion } from 'framer-motion';
import { 
  Workflow, Database, Scale, Smile, Layers, Monitor, Users, Lightbulb,
  LucideIcon
} from 'lucide-react';
import { SlicingPattern } from '@/data/gameData';

const iconMap: Record<string, LucideIcon> = {
  Workflow,
  Database,
  Scale,
  Smile,
  Layers,
  Monitor,
  Users,
  Lightbulb,
};

const colorMap: Record<string, string> = {
  yellow: 'bg-card-yellow text-amber-700',
  blue: 'bg-card-blue text-blue-700',
  green: 'bg-card-green text-emerald-700',
  pink: 'bg-card-pink text-pink-700',
  purple: 'bg-card-purple text-purple-700',
  orange: 'bg-card-orange text-orange-700',
};

interface PatternBadgeProps {
  pattern: SlicingPattern;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PatternBadge({ pattern, showDescription = false, size = 'md' }: PatternBadgeProps) {
  const Icon = iconMap[pattern.icon] || Workflow;
  const colorClasses = colorMap[pattern.color];

  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-xl ${colorClasses} ${sizeClasses[size]} shadow-card`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/50 rounded-lg">
          <Icon className={iconSizes[size]} />
        </div>
        <div>
          <h3 className="font-display font-bold">{pattern.name}</h3>
          {showDescription && (
            <p className="mt-1 opacity-80 text-xs md:text-sm max-w-md">
              {pattern.description}
            </p>
          )}
        </div>
      </div>

      {showDescription && pattern.tips.length > 0 && (
        <div className="mt-4 space-y-1">
          {pattern.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="opacity-60">•</span>
              <span className="opacity-80">{tip}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
