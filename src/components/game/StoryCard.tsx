import { motion } from 'framer-motion';
import { Trash2, Check, AlertTriangle, X } from 'lucide-react';
import { CreatedStory } from '@/hooks/useGameState';

interface StoryCardProps {
  story: CreatedStory;
  onRemove: (id: string) => void;
  index: number;
  isValidated?: boolean;
}

const cardColors = [
  'bg-card-yellow',
  'bg-card-blue',
  'bg-card-green',
  'bg-card-pink',
  'bg-card-purple',
  'bg-card-orange',
];

export function StoryCard({ story, onRemove, index, isValidated }: StoryCardProps) {
  const colorClass = cardColors[index % cardColors.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`relative p-4 rounded-xl shadow-card ${colorClass} border-2 ${
        isValidated
          ? story.isValid
            ? 'border-success'
            : 'border-destructive'
          : 'border-transparent'
      }`}
    >
      {/* Status indicator */}
      {isValidated && (
        <div
          className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
            story.isValid ? 'bg-success' : 'bg-destructive'
          }`}
        >
          {story.isValid ? (
            <Check className="w-5 h-5 text-success-foreground" />
          ) : (
            <X className="w-5 h-5 text-destructive-foreground" />
          )}
        </div>
      )}

      {/* Story content */}
      <div className="space-y-2 font-medium text-sm">
        <p>
          <span className="text-primary font-semibold">Como</span>{' '}
          <span className="text-foreground">{story.role}</span>
        </p>
        <p>
          <span className="text-primary font-semibold">Quiero</span>{' '}
          <span className="text-foreground">{story.action}</span>
        </p>
        <p>
          <span className="text-primary font-semibold">Para</span>{' '}
          <span className="text-foreground">{story.benefit}</span>
        </p>
      </div>

      {/* Feedback */}
      {isValidated && story.feedback && (
        <div
          className={`mt-3 p-2 rounded-lg text-xs font-medium ${
            story.isValid
              ? 'bg-success/20 text-success'
              : 'bg-destructive/20 text-destructive'
          }`}
        >
          {story.feedback}
        </div>
      )}

      {/* Remove button */}
      {!isValidated && (
        <button
          onClick={() => onRemove(story.id)}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-foreground/10 hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Paper effect */}
      <div className="absolute bottom-0 left-2 right-2 h-1 bg-foreground/5 rounded-b-xl -mb-1" />
    </motion.div>
  );
}
