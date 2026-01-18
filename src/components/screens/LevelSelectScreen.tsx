import { motion } from 'framer-motion';
import { ChevronLeft, Lock, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { levels, slicingPatterns } from '@/data/gameData';
import { GameProgress } from '@/hooks/useGameState';
import { StarRating } from '@/components/game/StarRating';

interface LevelSelectScreenProps {
  onBack: () => void;
  onSelectLevel: (levelId: number) => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  onChangeDifficulty: (d: 'beginner' | 'intermediate' | 'advanced') => void;
  progress: GameProgress;
}

const difficultyConfig = {
  beginner: { label: 'Principiante', color: 'bg-success', textColor: 'text-success' },
  intermediate: { label: 'Intermedio', color: 'bg-warning', textColor: 'text-warning' },
  advanced: { label: 'Avanzado', color: 'bg-accent', textColor: 'text-accent' },
};

export function LevelSelectScreen({
  onBack,
  onSelectLevel,
  difficulty,
  onChangeDifficulty,
  progress,
}: LevelSelectScreenProps) {
  const filteredLevels = levels.filter((l) => l.difficulty === difficulty);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Volver
        </Button>
        <div className="flex items-center gap-4">
          <Trophy className="w-5 h-5 text-warning" />
          <span className="font-display font-bold text-lg">{progress.totalScore} pts</span>
        </div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Selecciona un Nivel</h1>
        <p className="text-muted-foreground">Elige tu desafío y domina los patrones de slicing</p>
      </motion.div>

      {/* Difficulty tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {(['beginner', 'intermediate', 'advanced'] as const).map((d) => (
          <button
            key={d}
            onClick={() => onChangeDifficulty(d)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              difficulty === d
                ? `${difficultyConfig[d].color} text-white`
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {difficultyConfig[d].label}
          </button>
        ))}
      </div>

      {/* Level grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLevels.map((level, index) => {
          const pattern = slicingPatterns.find((p) => p.id === level.patternId);
          const isCompleted = progress.completedLevels.includes(level.id);
          const stars = progress.stars[level.id] || 0;
          const isLocked = level.id > 1 && !progress.completedLevels.includes(level.id - 1);

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => !isLocked && onSelectLevel(level.id)}
                disabled={isLocked}
                className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                  isLocked
                    ? 'bg-muted/50 border-muted cursor-not-allowed opacity-60'
                    : isCompleted
                    ? 'bg-card border-success/30 hover:border-success/50 hover:shadow-lg'
                    : 'bg-card border-primary/20 hover:border-primary/40 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyConfig[level.difficulty].color} text-white`}
                  >
                    Nivel {level.id}
                  </div>
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : isCompleted ? (
                    <StarRating stars={stars} size="sm" animated={false} />
                  ) : null}
                </div>

                <h3 className="font-display font-bold text-lg mb-2">{level.name}</h3>
                
                {pattern && (
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                      pattern.color === 'yellow'
                        ? 'bg-card-yellow'
                        : pattern.color === 'blue'
                        ? 'bg-card-blue'
                        : pattern.color === 'green'
                        ? 'bg-card-green'
                        : pattern.color === 'pink'
                        ? 'bg-card-pink'
                        : pattern.color === 'purple'
                        ? 'bg-card-purple'
                        : 'bg-card-orange'
                    }`}
                  >
                    {pattern.name}
                  </div>
                )}

                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {level.epic.text}
                </p>

                {isCompleted && progress.scores[level.id] && (
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mejor puntuación:</span>
                    <span className="font-bold text-primary">{progress.scores[level.id]} pts</span>
                  </div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
