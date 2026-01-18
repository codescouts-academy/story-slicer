import { motion } from "framer-motion";
import { Scissors, BookOpen, Play, Award, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameProgress } from "@/hooks/useGameState";

interface HomeScreenProps {
  onStartGame: () => void;
  onTutorial: () => void;
  onPatterns: () => void;
  progress: GameProgress;
}

export function HomeScreen({
  onStartGame,
  onTutorial,
  onPatterns,
  progress,
}: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pattern-dots">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-24 h-24 gradient-hero rounded-3xl shadow-glow mb-8"
        >
          <Scissors className="w-12 h-12 text-white rotate-45" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
          <span className="text-gradient">User Story</span>
          <br />
          <span className="text-foreground">Slicer</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Aprende el arte de dividir historias de usuario.
          <br className="hidden md:block" />
          Domina las técnicas de slicing de forma práctica y divertida.
        </p>

        {/* Stats */}
        {progress.totalScore > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6 mb-8"
          >
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-primary">
                {progress.totalScore}
              </div>
              <div className="text-sm text-muted-foreground">Puntos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-secondary">
                {progress.completedLevels.length}
              </div>
              <div className="text-sm text-muted-foreground">Niveles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-warning">
                {progress.achievements.length}
              </div>
              <div className="text-sm text-muted-foreground">Logros</div>
            </div>
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onStartGame}
            size="lg"
            className="gradient-hero text-white font-display font-bold text-lg px-8 py-6 rounded-xl shadow-glow hover:shadow-lg transition-shadow"
          >
            <Play className="w-5 h-5 mr-2" />
            Comenzar a Jugar
          </Button>

          <Button
            onClick={onTutorial}
            variant="outline"
            size="lg"
            className="font-display font-semibold text-lg px-8 py-6 rounded-xl"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Tutorial
          </Button>
        </motion.div>

        {/* Secondary buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <Button
            onClick={onPatterns}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-slate-200"
          >
            <Layers className="w-4 h-4 mr-2" />
            Ver Patrones de Slicing
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          animate={{ opacity: 0.5, x: 0, rotate: -15 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute -left-20 top-1/4 w-48 h-32 bg-card-yellow rounded-2xl shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 12 }}
          animate={{ opacity: 0.5, x: 0, rotate: 12 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -right-16 top-1/3 w-44 h-28 bg-card-blue rounded-2xl shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, y: 100, rotate: -8 }}
          animate={{ opacity: 0.4, y: 0, rotate: -8 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute right-1/4 -bottom-10 w-40 h-24 bg-card-green rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
}
