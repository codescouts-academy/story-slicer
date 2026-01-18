import { motion } from "framer-motion";
import { Trophy, Zap, Brain, ArrowRight, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/game/StarRating";
import { Confetti } from "@/components/game/Confetti";
import { StoryCard } from "@/components/game/StoryCard";
import { CreatedStory } from "@/hooks/useGameState";
import { Level } from "@/data/gameData";

interface ResultsScreenProps {
  level: Level;
  results: {
    score: number;
    stars: number;
    correctCount: number;
    totalExpected: number;
    bonusNoHints: boolean;
    bonusSpeed: boolean;
  };
  createdStories: CreatedStory[];
  onNextLevel: () => void;
  onRetry: () => void;
  onHome: () => void;
  hasNextLevel: boolean;
}

export function ResultsScreen({
  level,
  results,
  createdStories,
  onNextLevel,
  onRetry,
  onHome,
  hasNextLevel,
}: ResultsScreenProps) {
  const isSuccess = results.stars >= 2;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Confetti isActive={isSuccess} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Result header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
            isSuccess ? "gradient-success" : "bg-muted"
          }`}
        >
          <Trophy
            className={`w-12 h-12 ${isSuccess ? "text-white" : "text-muted-foreground"}`}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-display font-bold mb-4"
        >
          {isSuccess ? "¡Excelente trabajo!" : "Buen intento"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-6"
        >
          Nivel {level.id}: {level.name}
        </motion.p>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <StarRating stars={results.stars} size="lg" />
        </motion.div>

        {/* Score breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border p-6 mb-8 text-left"
        >
          <h3 className="font-display font-bold text-lg mb-4">
            Resumen de puntuación
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Historias correctas</span>
              <span className="font-semibold">
                {results.correctCount}/{results.totalExpected} (
                {results.correctCount * 50} pts)
              </span>
            </div>

            {results.stars >= 2 && (
              <div className="flex justify-between items-center text-success">
                <span>Bonus: Patrón dominado</span>
                <span className="font-semibold">+{level.bonusPoints} pts</span>
              </div>
            )}

            {results.bonusNoHints && (
              <div className="flex justify-between items-center text-warning">
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Bonus: Sin pistas
                </span>
                <span className="font-semibold">+200 pts</span>
              </div>
            )}

            {results.bonusSpeed && (
              <div className="flex justify-between items-center text-secondary">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Bonus: Velocidad
                </span>
                <span className="font-semibold">+100 pts</span>
              </div>
            )}

            <div className="pt-3 border-t flex justify-between items-center">
              <span className="font-display font-bold text-lg">Total</span>
              <span className="font-display font-bold text-2xl text-primary">
                {results.score} pts
              </span>
            </div>
          </div>
        </motion.div>

        {/* Created stories review */}
        {createdStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <h3 className="font-display font-bold text-lg mb-4 text-left">
              Tus historias:
            </h3>
            <div className="flex flex-col gap-3 p-4">
              {createdStories.map((story, index) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onRemove={() => {}}
                  index={index}
                  isValidated
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center p-4"
        >
          {hasNextLevel && isSuccess ? (
            <Button
              onClick={onNextLevel}
              size="lg"
              className="gradient-hero text-white font-display font-bold"
            >
              Siguiente Nivel
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={onRetry}
              size="lg"
              className="gradient-hero text-white font-display font-bold"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Intentar de Nuevo
            </Button>
          )}

          <Button variant="outline" size="lg" onClick={onHome}>
            <Home className="w-5 h-5 mr-2" />
            Menú Principal
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
